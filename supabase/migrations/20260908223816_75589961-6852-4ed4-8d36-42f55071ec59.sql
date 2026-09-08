CREATE TABLE public.daily_coin_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_date date NOT NULL DEFAULT CURRENT_DATE,
  score integer NOT NULL CHECK (score BETWEEN 0 AND 3),
  coin_reward integer NOT NULL CHECK (coin_reward BETWEEN 0 AND 60),
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, challenge_date)
);
GRANT SELECT ON public.daily_coin_challenges TO authenticated;
GRANT ALL ON public.daily_coin_challenges TO service_role;
ALTER TABLE public.daily_coin_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own daily challenges"
ON public.daily_coin_challenges
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
CREATE TRIGGER update_daily_coin_challenges_updated_at
BEFORE UPDATE ON public.daily_coin_challenges
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.complete_daily_coin_challenge_for_user(
  target_user uuid,
  target_date date,
  target_score integer
)
RETURNS TABLE(coins integer, awarded integer, score integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  reward integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid challenge date'; END IF;
  IF target_score < 0 OR target_score > 3 THEN RAISE EXCEPTION 'Invalid score'; END IF;
  reward := target_score * 10 + CASE WHEN target_score = 3 THEN 30 ELSE 0 END;

  INSERT INTO public.daily_coin_challenges (user_id, challenge_date, score, coin_reward)
  VALUES (target_user, target_date, target_score, reward)
  ON CONFLICT (user_id, challenge_date) DO NOTHING;

  IF NOT FOUND THEN RAISE EXCEPTION 'Challenge already completed'; END IF;

  INSERT INTO public.user_stats (user_id, coins)
  VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;

  RETURN QUERY
  SELECT s.coins, reward, target_score
  FROM public.user_stats s
  WHERE s.user_id = target_user;
END;
$$;
REVOKE ALL ON FUNCTION public.complete_daily_coin_challenge_for_user(uuid, date, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.complete_daily_coin_challenge_for_user(uuid, date, integer) TO service_role;