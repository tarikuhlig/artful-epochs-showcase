CREATE OR REPLACE FUNCTION public.purchase_auction_offer_for_user(target_user uuid, target_offer uuid)
RETURNS TABLE(coins integer, item_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
DECLARE offer public.auction_offers%ROWTYPE; active_slot integer; bought_slug text;
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  active_slot := MOD(EXTRACT(DOY FROM CURRENT_DATE)::integer, 7);
  SELECT * INTO offer FROM public.auction_offers a WHERE a.id = target_offer AND a.rotation_slot = active_slot;
  IF NOT FOUND THEN RAISE EXCEPTION 'Dieses Los ist heute nicht mehr im Angebot.'; END IF;
  bought_slug := offer.work_slug;
  IF EXISTS (SELECT 1 FROM public.owned_items o WHERE o.user_id = target_user AND o.item_slug = bought_slug) THEN
    RAISE EXCEPTION 'Dieses Werk befindet sich bereits in deiner Sammlung.';
  END IF;
  INSERT INTO public.user_stats (user_id) VALUES (target_user) ON CONFLICT (user_id) DO NOTHING;
  UPDATE public.user_stats s SET coins = s.coins - offer.price, updated_at = now()
    WHERE s.user_id = target_user AND s.coins >= offer.price;
  IF NOT FOUND THEN RAISE EXCEPTION 'Dir fehlen noch Coins für dieses Werk.'; END IF;
  INSERT INTO public.owned_items (user_id, item_slug, kind, purchase_price)
    VALUES (target_user, bought_slug, 'work', offer.price);
  RETURN QUERY SELECT s.coins, bought_slug FROM public.user_stats s WHERE s.user_id = target_user;
END;
$$;