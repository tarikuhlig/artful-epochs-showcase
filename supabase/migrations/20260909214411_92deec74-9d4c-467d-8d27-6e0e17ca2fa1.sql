CREATE TABLE public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  work_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, work_slug)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.favorites TO authenticated;
GRANT ALL ON public.favorites TO service_role;

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own favorites" ON public.favorites
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER set_favorites_updated_at BEFORE UPDATE ON public.favorites
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.purchase_private_auction_for_user(target_user uuid, target_slug text, target_price integer)
RETURNS TABLE(coins integer, item_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
    VALUES (target_user, target_slug, 'private', target_price);
  RETURN QUERY SELECT s.coins, target_slug FROM public.user_stats s WHERE s.user_id = target_user;
END;
$function$;

REVOKE ALL ON FUNCTION public.purchase_private_auction_for_user(uuid, text, integer) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purchase_private_auction_for_user(uuid, text, integer) TO service_role;