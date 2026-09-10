-- Studierkarten: 40 Coins je Karte, 40 gewertete Karten pro Tag
CREATE OR REPLACE FUNCTION public.award_study_card_for_user(target_user uuid, target_date date)
RETURNS TABLE(coins integer, awarded integer, cards_today integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer := 40; used integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid study date'; END IF;
  INSERT INTO public.study_rewards (user_id, reward_date, cards_rewarded, coins_awarded)
  VALUES (target_user, target_date, 0, 0)
  ON CONFLICT (user_id, reward_date) DO NOTHING;
  SELECT cards_rewarded INTO used FROM public.study_rewards WHERE user_id = target_user AND reward_date = target_date;
  IF used >= 40 THEN
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

-- Kartenquiz: 10 Coins je Treffer, 20 Bonus bei 8/8, 8 Runden pro Tag
CREATE OR REPLACE FUNCTION public.complete_card_quiz_round_for_user(target_user uuid, target_date date, target_round integer, target_score integer)
RETURNS TABLE(coins integer, awarded integer, rounds_today integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer; played integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid quiz date'; END IF;
  IF target_round < 0 OR target_round > 7 THEN RAISE EXCEPTION 'Invalid round'; END IF;
  IF target_score < 0 OR target_score > 8 THEN RAISE EXCEPTION 'Invalid score'; END IF;
  SELECT COUNT(*) INTO played FROM public.card_quiz_rounds WHERE user_id = target_user AND round_date = target_date;
  IF played >= 8 THEN RAISE EXCEPTION 'Daily card quiz limit reached'; END IF;
  reward := target_score * 10 + CASE WHEN target_score = 8 THEN 20 ELSE 0 END;
  INSERT INTO public.card_quiz_rounds (user_id, round_date, round_index, score, coin_reward)
  VALUES (target_user, target_date, target_round, target_score, reward)
  ON CONFLICT (user_id, round_date, round_index) DO NOTHING;
  IF NOT FOUND THEN RAISE EXCEPTION 'Round already completed'; END IF;
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward, played + 1 FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

-- Tageslektion: 60 je richtiger Antwort, 30 Bonus bei 2/2
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
  reward := target_score * 60 + CASE WHEN target_score = 2 THEN 30 ELSE 0 END;
  INSERT INTO public.daily_lessons (user_id, lesson_date, kind, score, coin_reward)
  VALUES (target_user, target_date, target_kind, target_score, reward)
  ON CONFLICT (user_id, lesson_date, kind) DO NOTHING;
  IF NOT FOUND THEN RAISE EXCEPTION 'Lesson already completed'; END IF;
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

-- Tages-Challenge: 60 je Treffer, 120 Bonus bei 3/3
CREATE OR REPLACE FUNCTION public.complete_daily_coin_challenge_for_user(target_user uuid, target_date date, target_score integer)
RETURNS TABLE(coins integer, awarded integer, score integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_date <> CURRENT_DATE THEN RAISE EXCEPTION 'Invalid challenge date'; END IF;
  IF target_score < 0 OR target_score > 3 THEN RAISE EXCEPTION 'Invalid score'; END IF;
  reward := target_score * 60 + CASE WHEN target_score = 3 THEN 120 ELSE 0 END;
  INSERT INTO public.daily_coin_challenges (user_id, challenge_date, score, coin_reward)
  VALUES (target_user, target_date, target_score, reward)
  ON CONFLICT (user_id, challenge_date) DO NOTHING;
  IF NOT FOUND THEN RAISE EXCEPTION 'Challenge already completed'; END IF;
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward, target_score FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

-- Epochen-Check: einmalig 400 Coins je Epoche
CREATE OR REPLACE FUNCTION public.award_epoch_check_for_user(target_user uuid, target_epoch text, target_score integer)
RETURNS TABLE(coins integer, awarded integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer := 0; new_balance integer;
BEGIN
  IF target_user IS NULL OR target_epoch IS NULL OR length(trim(target_epoch)) = 0 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  INSERT INTO public.user_stats (user_id) VALUES (target_user) ON CONFLICT (user_id) DO NOTHING;
  IF target_score >= 3 THEN
    INSERT INTO public.coin_awards (user_id, kind, award_key, coins)
    VALUES (target_user, 'epoch_check', target_epoch, 400)
    ON CONFLICT (user_id, kind, award_key) DO NOTHING;
    IF FOUND THEN reward := 400; END IF;
  END IF;
  UPDATE public.user_stats AS s SET coins = s.coins + reward, updated_at = now()
  WHERE s.user_id = target_user RETURNING s.coins INTO new_balance;
  RETURN QUERY SELECT new_balance, reward;
END;
$function$;

-- Epochen-Spiel: 40 Coins je Treffer
CREATE OR REPLACE FUNCTION public.award_epoch_game_for_user(target_user uuid, target_date date, target_round integer, target_score integer)
RETURNS TABLE(coins integer, awarded integer, rounds_today integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE reward integer := 0; clamped integer := GREATEST(0, LEAST(coalesce(target_score, 0), 5)); new_balance integer; played integer;
BEGIN
  IF target_user IS NULL OR target_round IS NULL OR target_round < 0 OR target_round > 2 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;
  INSERT INTO public.user_stats (user_id) VALUES (target_user) ON CONFLICT (user_id) DO NOTHING;
  reward := clamped * 40;
  INSERT INTO public.coin_awards (user_id, kind, award_key, coins)
  VALUES (target_user, 'epoch_game', to_char(coalesce(target_date, CURRENT_DATE), 'YYYY-MM-DD') || ':' || target_round, reward)
  ON CONFLICT (user_id, kind, award_key) DO NOTHING;
  IF NOT FOUND THEN reward := 0; END IF;
  UPDATE public.user_stats AS s SET coins = s.coins + reward, updated_at = now()
  WHERE s.user_id = target_user RETURNING s.coins INTO new_balance;
  SELECT count(*) INTO played FROM public.coin_awards
  WHERE user_id = target_user AND kind = 'epoch_game'
    AND award_key LIKE to_char(coalesce(target_date, CURRENT_DATE), 'YYYY-MM-DD') || ':%';
  RETURN QUERY SELECT new_balance, reward, played;
END;
$function$;

-- Reise: 2.500 pro Station, 4.000 an jeder fünften
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
  reward := CASE WHEN (target_station + 1) % 5 = 0 THEN 4000 ELSE 2500 END;
  INSERT INTO public.art_path_progress (user_id, station_index, coin_reward) VALUES (target_user, target_station, reward);
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

-- Sammler-Meilensteine bis 500 Werke
CREATE OR REPLACE FUNCTION public.claim_collection_milestone_for_user(target_user uuid, target_key text, owned_count integer)
RETURNS TABLE(coins integer, awarded integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE required integer; reward integer := 0; actual integer; new_balance integer;
BEGIN
  IF target_user IS NULL OR target_key IS NULL THEN RAISE EXCEPTION 'invalid arguments'; END IF;
  required := CASE target_key
    WHEN 'works:5' THEN 5 WHEN 'works:10' THEN 10 WHEN 'works:25' THEN 25 WHEN 'works:50' THEN 50
    WHEN 'works:100' THEN 100 WHEN 'works:250' THEN 250 WHEN 'works:500' THEN 500
    ELSE NULL END;
  IF required IS NULL THEN RAISE EXCEPTION 'unknown milestone'; END IF;
  reward := CASE required
    WHEN 5 THEN 1000 WHEN 10 THEN 2500 WHEN 25 THEN 8000 WHEN 50 THEN 20000
    WHEN 100 THEN 50000 WHEN 250 THEN 150000 WHEN 500 THEN 400000 END;
  SELECT count(*) INTO actual FROM public.owned_items WHERE user_id = target_user AND kind <> 'painter';
  IF actual < required THEN RAISE EXCEPTION 'milestone not reached'; END IF;
  INSERT INTO public.user_stats (user_id) VALUES (target_user) ON CONFLICT (user_id) DO NOTHING;
  INSERT INTO public.coin_awards (user_id, kind, award_key, coins)
  VALUES (target_user, 'milestone', target_key, reward)
  ON CONFLICT (user_id, kind, award_key) DO NOTHING;
  IF NOT FOUND THEN reward := 0; END IF;
  UPDATE public.user_stats AS s SET coins = s.coins + reward, updated_at = now()
  WHERE s.user_id = target_user RETURNING s.coins INTO new_balance;
  RETURN QUERY SELECT new_balance, reward;
END;
$function$;

-- Verkauf: auch legendäre Werke dürfen ihren vollen Erlös bringen
CREATE OR REPLACE FUNCTION public.sell_owned_item_for_user(target_user uuid, target_slug text, target_price integer)
RETURNS TABLE(coins integer, sold_price integer)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE payout integer := GREATEST(50, LEAST(coalesce(target_price, 0), 200000)); removed uuid; new_balance integer;
BEGIN
  IF target_user IS NULL OR target_slug IS NULL THEN RAISE EXCEPTION 'invalid arguments'; END IF;
  DELETE FROM public.owned_items
  WHERE id = (
    SELECT id FROM public.owned_items
    WHERE user_id = target_user AND item_slug = target_slug AND kind <> 'painter'
    ORDER BY purchased_at ASC LIMIT 1
  ) RETURNING id INTO removed;
  IF removed IS NULL THEN RAISE EXCEPTION 'work not owned'; END IF;
  INSERT INTO public.user_stats (user_id) VALUES (target_user) ON CONFLICT (user_id) DO NOTHING;
  UPDATE public.user_stats AS s SET coins = s.coins + payout, updated_at = now()
  WHERE s.user_id = target_user RETURNING s.coins INTO new_balance;
  UPDATE public.profiles SET featured_work_ids = array_remove(featured_work_ids, target_slug), updated_at = now()
  WHERE id = target_user;
  RETURN QUERY SELECT new_balance, payout;
END;
$function$;