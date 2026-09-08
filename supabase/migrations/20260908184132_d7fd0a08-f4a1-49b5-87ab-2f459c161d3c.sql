ALTER TABLE public.user_stats ADD COLUMN coins integer NOT NULL DEFAULT 120 CHECK (coins >= 0);

CREATE TABLE public.art_path_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  station_index integer NOT NULL CHECK (station_index BETWEEN 0 AND 11),
  coin_reward integer NOT NULL CHECK (coin_reward >= 0),
  completed_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, station_index)
);
GRANT SELECT ON public.art_path_progress TO authenticated;
GRANT ALL ON public.art_path_progress TO service_role;
ALTER TABLE public.art_path_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own art path" ON public.art_path_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_art_path_progress_updated_at BEFORE UPDATE ON public.art_path_progress FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.auction_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_slug text NOT NULL CHECK (char_length(work_slug) BETWEEN 1 AND 160),
  price integer NOT NULL CHECK (price BETWEEN 1 AND 100000),
  rotation_slot integer NOT NULL CHECK (rotation_slot BETWEEN 0 AND 6),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (work_slug, rotation_slot)
);
GRANT SELECT ON public.auction_offers TO anon, authenticated;
GRANT ALL ON public.auction_offers TO service_role;
ALTER TABLE public.auction_offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auction offers are public" ON public.auction_offers FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER update_auction_offers_updated_at BEFORE UPDATE ON public.auction_offers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.owned_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  item_slug text NOT NULL CHECK (char_length(item_slug) BETWEEN 1 AND 160),
  kind text NOT NULL DEFAULT 'work' CHECK (kind IN ('work')),
  purchase_price integer NOT NULL CHECK (purchase_price > 0),
  purchased_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_slug, kind)
);
GRANT SELECT ON public.owned_items TO authenticated;
GRANT ALL ON public.owned_items TO service_role;
ALTER TABLE public.owned_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own purchased art" ON public.owned_items FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_owned_items_updated_at BEFORE UPDATE ON public.owned_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.auction_offers (work_slug, price, rotation_slot) VALUES
  ('mona-lisa', 260, 0), ('erschaffung-adams', 220, 0),
  ('duerer-selbstbildnis', 170, 1), ('wanderer-nebelmeer', 190, 1),
  ('impression-sonnenaufgang', 210, 2), ('sternennacht', 240, 2),
  ('komposition-vii', 180, 3), ('komposition-rot-blau-gelb', 165, 3),
  ('mona-lisa', 260, 4), ('wanderer-nebelmeer', 190, 4),
  ('sternennacht', 240, 5), ('komposition-vii', 180, 5),
  ('duerer-selbstbildnis', 170, 6), ('impression-sonnenaufgang', 210, 6)
ON CONFLICT (work_slug, rotation_slot) DO UPDATE SET price = EXCLUDED.price;

CREATE OR REPLACE FUNCTION public.complete_art_path_station(target_station integer)
RETURNS TABLE(coins integer, awarded integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_max integer;
  reward integer;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF target_station < 0 OR target_station > 11 THEN RAISE EXCEPTION 'Invalid station'; END IF;
  SELECT COALESCE(MAX(station_index), -1) INTO current_max FROM public.art_path_progress WHERE user_id = auth.uid();
  IF target_station <> current_max + 1 THEN RAISE EXCEPTION 'Complete stations in order'; END IF;
  reward := CASE WHEN target_station IN (2, 5, 8, 11) THEN 80 ELSE 40 END;
  INSERT INTO public.art_path_progress (user_id, station_index, coin_reward) VALUES (auth.uid(), target_station, reward);
  INSERT INTO public.user_stats (user_id, coins) VALUES (auth.uid(), 120 + reward)
  ON CONFLICT (user_id) DO UPDATE SET coins = public.user_stats.coins + reward;
  RETURN QUERY SELECT s.coins, reward FROM public.user_stats s WHERE s.user_id = auth.uid();
END;
$$;
GRANT EXECUTE ON FUNCTION public.complete_art_path_station(integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.purchase_auction_offer(target_offer uuid)
RETURNS TABLE(coins integer, item_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  offer public.auction_offers%ROWTYPE;
  active_slot integer;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  active_slot := MOD(EXTRACT(DOY FROM CURRENT_DATE)::integer, 7);
  SELECT * INTO offer FROM public.auction_offers WHERE id = target_offer AND rotation_slot = active_slot;
  IF NOT FOUND THEN RAISE EXCEPTION 'Offer is not active'; END IF;
  IF EXISTS (SELECT 1 FROM public.owned_items WHERE user_id = auth.uid() AND item_slug = offer.work_slug AND kind = 'work') THEN RAISE EXCEPTION 'Item already owned'; END IF;
  UPDATE public.user_stats SET coins = coins - offer.price WHERE user_id = auth.uid() AND coins >= offer.price;
  IF NOT FOUND THEN RAISE EXCEPTION 'Insufficient coins'; END IF;
  INSERT INTO public.owned_items (user_id, item_slug, kind, purchase_price) VALUES (auth.uid(), offer.work_slug, 'work', offer.price);
  RETURN QUERY SELECT s.coins, offer.work_slug FROM public.user_stats s WHERE s.user_id = auth.uid();
END;
$$;
GRANT EXECUTE ON FUNCTION public.purchase_auction_offer(uuid) TO authenticated;