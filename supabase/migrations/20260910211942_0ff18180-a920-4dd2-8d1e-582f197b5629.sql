CREATE OR REPLACE FUNCTION public.award_epoch_check_for_user(target_user uuid, target_epoch text, target_score integer)
RETURNS TABLE(coins integer, awarded integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  reward integer := 0;
  new_balance integer;
BEGIN
  IF target_user IS NULL OR target_epoch IS NULL OR length(trim(target_epoch)) = 0 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;

  INSERT INTO public.user_stats (user_id) VALUES (target_user)
  ON CONFLICT (user_id) DO NOTHING;

  IF target_score >= 3 THEN
    INSERT INTO public.coin_awards (user_id, kind, award_key, coins)
    VALUES (target_user, 'epoch_check', target_epoch, 40)
    ON CONFLICT (user_id, kind, award_key) DO NOTHING;
    IF FOUND THEN reward := 40; END IF;
  END IF;

  UPDATE public.user_stats AS s
  SET coins = s.coins + reward, updated_at = now()
  WHERE s.user_id = target_user
  RETURNING s.coins INTO new_balance;

  RETURN QUERY SELECT new_balance, reward;
END;
$function$;

CREATE OR REPLACE FUNCTION public.award_epoch_game_for_user(target_user uuid, target_date date, target_round integer, target_score integer)
RETURNS TABLE(coins integer, awarded integer, rounds_today integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  reward integer := 0;
  clamped integer := GREATEST(0, LEAST(coalesce(target_score, 0), 5));
  new_balance integer;
  played integer;
BEGIN
  IF target_user IS NULL OR target_round IS NULL OR target_round < 0 OR target_round > 2 THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;

  INSERT INTO public.user_stats (user_id) VALUES (target_user)
  ON CONFLICT (user_id) DO NOTHING;

  reward := clamped * 10;

  INSERT INTO public.coin_awards (user_id, kind, award_key, coins)
  VALUES (target_user, 'epoch_game', to_char(coalesce(target_date, CURRENT_DATE), 'YYYY-MM-DD') || ':' || target_round, reward)
  ON CONFLICT (user_id, kind, award_key) DO NOTHING;

  IF NOT FOUND THEN reward := 0; END IF;

  UPDATE public.user_stats AS s
  SET coins = s.coins + reward, updated_at = now()
  WHERE s.user_id = target_user
  RETURNING s.coins INTO new_balance;

  SELECT count(*) INTO played FROM public.coin_awards
  WHERE user_id = target_user AND kind = 'epoch_game'
    AND award_key LIKE to_char(coalesce(target_date, CURRENT_DATE), 'YYYY-MM-DD') || ':%';

  RETURN QUERY SELECT new_balance, reward, played;
END;
$function$;

CREATE OR REPLACE FUNCTION public.claim_collection_milestone_for_user(target_user uuid, target_key text, owned_count integer)
RETURNS TABLE(coins integer, awarded integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  required integer;
  reward integer := 0;
  actual integer;
  new_balance integer;
BEGIN
  IF target_user IS NULL OR target_key IS NULL THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;

  required := CASE target_key
    WHEN 'works:5' THEN 5
    WHEN 'works:10' THEN 10
    WHEN 'works:25' THEN 25
    WHEN 'works:50' THEN 50
    ELSE NULL END;

  IF required IS NULL THEN
    RAISE EXCEPTION 'unknown milestone';
  END IF;

  reward := CASE required
    WHEN 5 THEN 100
    WHEN 10 THEN 200
    WHEN 25 THEN 500
    WHEN 50 THEN 1000 END;

  SELECT count(*) INTO actual FROM public.owned_items
  WHERE user_id = target_user AND kind <> 'painter';

  IF actual < required THEN
    RAISE EXCEPTION 'milestone not reached';
  END IF;

  INSERT INTO public.user_stats (user_id) VALUES (target_user)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.coin_awards (user_id, kind, award_key, coins)
  VALUES (target_user, 'milestone', target_key, reward)
  ON CONFLICT (user_id, kind, award_key) DO NOTHING;

  IF NOT FOUND THEN reward := 0; END IF;

  UPDATE public.user_stats AS s
  SET coins = s.coins + reward, updated_at = now()
  WHERE s.user_id = target_user
  RETURNING s.coins INTO new_balance;

  RETURN QUERY SELECT new_balance, reward;
END;
$function$;

CREATE OR REPLACE FUNCTION public.sell_owned_item_for_user(target_user uuid, target_slug text, target_price integer)
RETURNS TABLE(coins integer, sold_price integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  payout integer := GREATEST(50, LEAST(coalesce(target_price, 0), 2000));
  removed uuid;
  new_balance integer;
BEGIN
  IF target_user IS NULL OR target_slug IS NULL THEN
    RAISE EXCEPTION 'invalid arguments';
  END IF;

  DELETE FROM public.owned_items
  WHERE id = (
    SELECT id FROM public.owned_items
    WHERE user_id = target_user AND item_slug = target_slug AND kind <> 'painter'
    ORDER BY purchased_at ASC LIMIT 1
  )
  RETURNING id INTO removed;

  IF removed IS NULL THEN
    RAISE EXCEPTION 'work not owned';
  END IF;

  INSERT INTO public.user_stats (user_id) VALUES (target_user)
  ON CONFLICT (user_id) DO NOTHING;

  UPDATE public.user_stats AS s
  SET coins = s.coins + payout, updated_at = now()
  WHERE s.user_id = target_user
  RETURNING s.coins INTO new_balance;

  UPDATE public.profiles
  SET featured_work_ids = array_remove(featured_work_ids, target_slug), updated_at = now()
  WHERE id = target_user;

  RETURN QUERY SELECT new_balance, payout;
END;
$function$;