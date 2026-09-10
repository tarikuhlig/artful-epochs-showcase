ALTER TABLE public.auction_offers DROP CONSTRAINT IF EXISTS auction_offers_price_check;
ALTER TABLE public.auction_offers ADD CONSTRAINT auction_offers_price_check CHECK (price > 0 AND price <= 500000);

CREATE OR REPLACE FUNCTION public.purchase_private_auction_for_user(target_user uuid, target_slug text, target_price integer)
RETURNS TABLE(coins integer, item_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
#variable_conflict use_column
BEGIN
  IF target_user IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_price IS NULL OR target_price < 100 OR target_price > 500000 THEN
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

UPDATE public.auction_offers o SET price = v.price, updated_at = now()
FROM (VALUES
  ('mona-lisa',150000),('sternennacht',120000),('der-schrei',110000),('erschaffung-adams',95000),
  ('maedchen-mit-perlenohrring',90000),('das-abendmahl',90000),('nachtwache',85000),('las-meninas',85000),
  ('geburt-der-venus',80000),('der-kuss',80000),('schule-von-athen',70000),('sonnenblumen',70000),
  ('primavera',65000),('der-garten-der-lueste',60000),('wanderer-nebelmeer',60000),('arnolfini-hochzeit',55000),
  ('dame-mit-dem-hermelin',55000),('freiheit-fuehrt-das-volk',55000),('impression-sonnenaufgang',50000),
  ('das-floss-der-medusa',45000),('turmbau-zu-babel',45000),('seerosen',45000),('vincents-schlafzimmer-in-arles',42000),
  ('die-jaeger-im-schnee',40000),('fruehstueck-im-gruenen',40000),('vitruvianischer-mensch',40000),('der-dritte-mai',40000),
  ('olympia',38000),('berufung-des-matthaeus',35000),('isenheimer-altar',35000),('judith-enthauptet-holofernes',35000),
  ('saturn',35000),('ophelia',32000),('die-anatomie-des-dr-tulp',30000),('venus-vor-dem-spiegel',30000),
  ('die-kaempfende-temeraire',30000),('woher-kommen-wir',30000),('moench-am-meer',28000)
) AS v(slug, price)
WHERE o.work_slug = v.slug;