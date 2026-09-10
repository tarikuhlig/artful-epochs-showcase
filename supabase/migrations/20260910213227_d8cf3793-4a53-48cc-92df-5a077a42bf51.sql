CREATE OR REPLACE FUNCTION public.purchase_private_auction_for_user(target_user uuid, target_slug text, target_price integer)
RETURNS TABLE(coins integer, item_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_price IS NULL OR target_price < 100 OR target_price > 20000 THEN
    RAISE EXCEPTION 'Ungültiger Preis für die Privatauktion.';
  END IF;
  IF EXISTS (SELECT 1 FROM public.owned_items o WHERE o.user_id = target_user AND o.item_slug = target_slug) THEN
    RAISE EXCEPTION 'Dieses Werk befindet sich bereits in deiner Sammlung.';
  END IF;
  INSERT INTO public.user_stats (user_id) VALUES (target_user) ON CONFLICT (user_id) DO NOTHING;
  UPDATE public.user_stats s SET coins = s.coins - target_price, updated_at = now()
    WHERE s.user_id = target_user AND s.coins >= target_price;
  IF NOT FOUND THEN RAISE EXCEPTION 'Dir fehlen noch Coins für dieses Werk.'; END IF;
  INSERT INTO public.owned_items (user_id, item_slug, kind, purchase_price)
    VALUES (target_user, target_slug, 'work', target_price);
  RETURN QUERY SELECT s.coins, target_slug FROM public.user_stats s WHERE s.user_id = target_user;
END;
$$;

REVOKE ALL ON FUNCTION public.purchase_private_auction_for_user(uuid, text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.purchase_private_auction_for_user(uuid, text, integer) TO service_role;