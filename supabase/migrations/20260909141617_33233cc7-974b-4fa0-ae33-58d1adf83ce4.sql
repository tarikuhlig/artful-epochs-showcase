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
  reward := CASE WHEN (target_station + 1) % 5 = 0 THEN 2000 ELSE 1200 END;
  INSERT INTO public.art_path_progress (user_id, station_index, coin_reward) VALUES (target_user, target_station, reward);
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

CREATE OR REPLACE FUNCTION public.grant_studied_artworks_for_user(target_user uuid, work_slugs text[])
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE granted integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  WITH candidates AS (
    SELECT DISTINCT unnest(work_slugs) AS slug
  ), fresh AS (
    SELECT c.slug FROM candidates c
    WHERE c.slug NOT IN (SELECT work_slug FROM public.auction_offers)
      AND NOT EXISTS (
        SELECT 1 FROM public.owned_items o
        WHERE o.user_id = target_user AND o.item_slug = c.slug
      )
  ), inserted AS (
    INSERT INTO public.owned_items (user_id, item_slug, kind, purchase_price)
    SELECT target_user, slug, 'journey', 0 FROM fresh
    RETURNING 1
  )
  SELECT count(*)::integer INTO granted FROM inserted;
  RETURN granted;
END;
$function$;

REVOKE ALL ON FUNCTION public.grant_studied_artworks_for_user(uuid, text[]) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.grant_studied_artworks_for_user(uuid, text[]) TO service_role;