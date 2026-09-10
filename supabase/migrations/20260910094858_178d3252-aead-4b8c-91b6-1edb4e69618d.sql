REVOKE ALL ON FUNCTION public.award_epoch_check_for_user(uuid, text, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.award_epoch_game_for_user(uuid, date, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.claim_collection_milestone_for_user(uuid, text, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.sell_owned_item_for_user(uuid, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.award_epoch_check_for_user(uuid, text, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.award_epoch_game_for_user(uuid, date, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.claim_collection_milestone_for_user(uuid, text, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.sell_owned_item_for_user(uuid, text, integer) TO service_role;