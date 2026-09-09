CREATE OR REPLACE FUNCTION public.purchase_auction_offer(target_offer uuid)
RETURNS TABLE(coins integer, item_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY SELECT * FROM public.purchase_auction_offer_for_user(auth.uid(), target_offer);
END;
$$;