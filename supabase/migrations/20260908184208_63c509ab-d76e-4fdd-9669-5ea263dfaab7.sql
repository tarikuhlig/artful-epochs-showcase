CREATE OR REPLACE FUNCTION public.complete_art_path_station_for_user(target_user uuid, target_station integer)
RETURNS TABLE(coins integer, awarded integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE current_max integer; reward integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_station < 0 OR target_station > 11 THEN RAISE EXCEPTION 'Invalid station'; END IF;
  SELECT COALESCE(MAX(station_index), -1) INTO current_max FROM public.art_path_progress WHERE user_id = target_user;
  IF target_station <> current_max + 1 THEN RAISE EXCEPTION 'Complete stations in order'; END IF;
  reward := CASE WHEN target_station IN (2, 5, 8, 11) THEN 80 ELSE 40 END;
  INSERT INTO public.art_path_progress (user_id, station_index, coin_reward) VALUES (target_user, target_station, reward);
  INSERT INTO public.user_stats (user_id, coins) VALUES (target_user, 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward FROM public.user_stats s WHERE s.user_id = target_user;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.complete_art_path_station_for_user(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.complete_art_path_station_for_user(uuid, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.purchase_auction_offer_for_user(target_user uuid, target_offer uuid)
RETURNS TABLE(coins integer, item_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE offer public.auction_offers%ROWTYPE; active_slot integer;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  active_slot := MOD(EXTRACT(DOY FROM CURRENT_DATE)::integer, 7);
  SELECT * INTO offer FROM public.auction_offers WHERE id = target_offer AND rotation_slot = active_slot;
  IF NOT FOUND THEN RAISE EXCEPTION 'Offer is not active'; END IF;
  IF EXISTS (SELECT 1 FROM public.owned_items WHERE user_id = target_user AND item_slug = offer.work_slug AND kind = 'work') THEN RAISE EXCEPTION 'Item already owned'; END IF;
  UPDATE public.user_stats SET coins = coins - offer.price WHERE user_id = target_user AND coins >= offer.price;
  IF NOT FOUND THEN RAISE EXCEPTION 'Insufficient coins'; END IF;
  INSERT INTO public.owned_items (user_id, item_slug, kind, purchase_price) VALUES (target_user, offer.work_slug, 'work', offer.price);
  RETURN QUERY SELECT s.coins, offer.work_slug FROM public.user_stats s WHERE s.user_id = target_user;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.purchase_auction_offer_for_user(uuid, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purchase_auction_offer_for_user(uuid, uuid) TO service_role;