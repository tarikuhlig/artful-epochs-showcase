-- Reise: 50 % der Coin-Wirtschaft (24*650 + 6*900 = 21.000)
CREATE OR REPLACE FUNCTION public.complete_art_path_station_for_user(target_user uuid, target_station integer)
 RETURNS TABLE(coins integer, awarded integer)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE current_max integer; reward integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_station < 0 OR target_station > 29 THEN RAISE EXCEPTION 'Invalid station'; END IF;
  SELECT COALESCE(MAX(station_index), -1) INTO current_max FROM public.art_path_progress WHERE user_id = target_user;
  IF target_station <> current_max + 1 THEN RAISE EXCEPTION 'Complete stations in order'; END IF;
  reward := CASE WHEN (target_station + 1) % 5 = 0 THEN 900 ELSE 650 END;
  INSERT INTO public.art_path_progress (user_id, station_index, coin_reward) VALUES (target_user, target_station, reward);
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

-- Karten-Quiz: Teil des Lern-Budgets, max. 20 Coins je Runde (100/Tag)
CREATE OR REPLACE FUNCTION public.complete_card_quiz_round_for_user(target_user uuid, target_date date, target_round integer, target_score integer)
 RETURNS TABLE(coins integer, awarded integer, rounds_today integer)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer; played integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid quiz date'; END IF;
  IF target_round < 0 OR target_round > 4 THEN RAISE EXCEPTION 'Invalid round'; END IF;
  IF target_score < 0 OR target_score > 8 THEN RAISE EXCEPTION 'Invalid score'; END IF;
  SELECT COUNT(*) INTO played FROM public.card_quiz_rounds WHERE user_id = target_user AND round_date = target_date;
  IF played >= 5 THEN RAISE EXCEPTION 'Daily card quiz limit reached'; END IF;
  reward := target_score * 2 + CASE WHEN target_score = 8 THEN 4 ELSE 0 END;
  INSERT INTO public.card_quiz_rounds (user_id, round_date, round_index, score, coin_reward)
  VALUES (target_user, target_date, target_round, target_score, reward)
  ON CONFLICT (user_id, round_date, round_index) DO NOTHING;
  IF NOT FOUND THEN RAISE EXCEPTION 'Round already completed'; END IF;
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward, played + 1 FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

-- Tages-Challenge: Teil des Tages-Budgets, max. 50 Coins
CREATE OR REPLACE FUNCTION public.complete_daily_coin_challenge_for_user(target_user uuid, target_date date, target_score integer)
 RETURNS TABLE(coins integer, awarded integer, score integer)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid challenge date'; END IF;
  IF target_score < 0 OR target_score > 3 THEN RAISE EXCEPTION 'Invalid score'; END IF;
  reward := target_score * 10 + CASE WHEN target_score = 3 THEN 20 ELSE 0 END;
  INSERT INTO public.daily_coin_challenges (user_id, challenge_date, score, coin_reward)
  VALUES (target_user, target_date, target_score, reward)
  ON CONFLICT (user_id, challenge_date) DO NOTHING;
  IF NOT FOUND THEN RAISE EXCEPTION 'Challenge already completed'; END IF;
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward, target_score FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

-- Studierkarten: 10 Coins je richtiger Karte, max. 25 gewertete Karten pro Tag
CREATE TABLE public.study_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_date date NOT NULL DEFAULT CURRENT_DATE,
  cards_rewarded integer NOT NULL DEFAULT 0,
  coins_awarded integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, reward_date)
);
GRANT SELECT ON public.study_rewards TO authenticated;
GRANT ALL ON public.study_rewards TO service_role;
ALTER TABLE public.study_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own study rewards" ON public.study_rewards
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER set_study_rewards_updated_at BEFORE UPDATE ON public.study_rewards
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.award_study_card_for_user(target_user uuid, target_date date)
 RETURNS TABLE(coins integer, awarded integer, cards_today integer)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer := 10; used integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid study date'; END IF;
  INSERT INTO public.study_rewards (user_id, reward_date, cards_rewarded, coins_awarded)
  VALUES (target_user, target_date, 0, 0)
  ON CONFLICT (user_id, reward_date) DO NOTHING;
  SELECT cards_rewarded INTO used FROM public.study_rewards WHERE user_id = target_user AND reward_date = target_date;
  IF used >= 25 THEN
    RETURN QUERY SELECT s.coins, 0, used FROM public.user_stats s WHERE s.user_id = target_user;
    RETURN;
  END IF;
  UPDATE public.study_rewards
     SET cards_rewarded = cards_rewarded + 1, coins_awarded = coins_awarded + reward
   WHERE user_id = target_user AND reward_date = target_date
   RETURNING cards_rewarded INTO used;
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward, used FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

-- Tageslektionen: Tageswerk und Tageskünstler mit je zwei Fragen
CREATE TABLE public.daily_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_date date NOT NULL DEFAULT CURRENT_DATE,
  kind text NOT NULL CHECK (kind IN ('work', 'artist')),
  score integer NOT NULL,
  coin_reward integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_date, kind)
);
GRANT SELECT ON public.daily_lessons TO authenticated;
GRANT ALL ON public.daily_lessons TO service_role;
ALTER TABLE public.daily_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own daily lessons" ON public.daily_lessons
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER set_daily_lessons_updated_at BEFORE UPDATE ON public.daily_lessons
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.complete_daily_lesson_for_user(target_user uuid, target_date date, target_kind text, target_score integer)
 RETURNS TABLE(coins integer, awarded integer)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid lesson date'; END IF;
  IF target_kind NOT IN ('work', 'artist') THEN RAISE EXCEPTION 'Invalid lesson kind'; END IF;
  IF target_score < 0 OR target_score > 2 THEN RAISE EXCEPTION 'Invalid score'; END IF;
  reward := target_score * 20 + CASE WHEN target_score = 2 THEN 10 ELSE 0 END;
  INSERT INTO public.daily_lessons (user_id, lesson_date, kind, score, coin_reward)
  VALUES (target_user, target_date, target_kind, target_score, reward)
  ON CONFLICT (user_id, lesson_date, kind) DO NOTHING;
  IF NOT FOUND THEN RAISE EXCEPTION 'Lesson already completed'; END IF;
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

REVOKE ALL ON FUNCTION public.award_study_card_for_user(uuid, date) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.complete_daily_lesson_for_user(uuid, date, text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.award_study_card_for_user(uuid, date) TO service_role;
GRANT EXECUTE ON FUNCTION public.complete_daily_lesson_for_user(uuid, date, text, integer) TO service_role;