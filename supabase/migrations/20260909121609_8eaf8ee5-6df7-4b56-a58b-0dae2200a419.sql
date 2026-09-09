CREATE OR REPLACE FUNCTION public.complete_art_path_station_for_user(target_user uuid, target_station integer)
 RETURNS TABLE(coins integer, awarded integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE current_max integer; reward integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_station < 0 OR target_station > 29 THEN RAISE EXCEPTION 'Invalid station'; END IF;
  SELECT COALESCE(MAX(station_index), -1) INTO current_max FROM public.art_path_progress WHERE user_id = target_user;
  IF target_station <> current_max + 1 THEN RAISE EXCEPTION 'Complete stations in order'; END IF;
  reward := CASE WHEN (target_station + 1) % 5 = 0 THEN 80 ELSE 40 END;
  INSERT INTO public.art_path_progress (user_id, station_index, coin_reward) VALUES (target_user, target_station, reward);
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

CREATE TABLE public.card_quiz_rounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  round_date date NOT NULL DEFAULT CURRENT_DATE,
  round_index integer NOT NULL,
  score integer NOT NULL,
  coin_reward integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, round_date, round_index)
);

GRANT SELECT ON public.card_quiz_rounds TO authenticated;
GRANT ALL ON public.card_quiz_rounds TO service_role;

ALTER TABLE public.card_quiz_rounds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own card quiz rounds" ON public.card_quiz_rounds
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER set_card_quiz_rounds_updated_at BEFORE UPDATE ON public.card_quiz_rounds
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.complete_card_quiz_round_for_user(target_user uuid, target_date date, target_round integer, target_score integer)
 RETURNS TABLE(coins integer, awarded integer, rounds_today integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE reward integer; played integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid quiz date'; END IF;
  IF target_round < 0 OR target_round > 4 THEN RAISE EXCEPTION 'Invalid round'; END IF;
  IF target_score < 0 OR target_score > 8 THEN RAISE EXCEPTION 'Invalid score'; END IF;

  SELECT COUNT(*) INTO played FROM public.card_quiz_rounds
   WHERE user_id = target_user AND round_date = target_date;
  IF played >= 5 THEN RAISE EXCEPTION 'Daily card quiz limit reached'; END IF;

  reward := target_score * 5 + CASE WHEN target_score = 8 THEN 20 ELSE 0 END;

  INSERT INTO public.card_quiz_rounds (user_id, round_date, round_index, score, coin_reward)
  VALUES (target_user, target_date, target_round, target_score, reward)
  ON CONFLICT (user_id, round_date, round_index) DO NOTHING;
  IF NOT FOUND THEN RAISE EXCEPTION 'Round already completed'; END IF;

  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;

  RETURN QUERY SELECT s.coins, reward, played + 1 FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;