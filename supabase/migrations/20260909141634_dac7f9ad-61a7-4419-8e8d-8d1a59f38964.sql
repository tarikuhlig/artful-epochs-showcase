REVOKE ALL ON FUNCTION public.grant_studied_artworks_for_user(uuid, text[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.grant_studied_artworks_for_user(uuid, text[]) TO service_role;