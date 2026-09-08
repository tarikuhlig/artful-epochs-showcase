REVOKE EXECUTE ON FUNCTION public.complete_art_path_station(integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.purchase_auction_offer(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.complete_art_path_station(integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.purchase_auction_offer(uuid) TO service_role;