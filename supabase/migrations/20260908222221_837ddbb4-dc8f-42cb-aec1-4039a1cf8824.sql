UPDATE public.auction_offers
SET price = CASE work_slug
  WHEN 'mona-lisa' THEN 2400
  WHEN 'sternennacht' THEN 2200
  WHEN 'erschaffung-adams' THEN 1900
  WHEN 'wanderer-nebelmeer' THEN 1450
  WHEN 'impression-sonnenaufgang' THEN 1250
  WHEN 'duerer-selbstbildnis' THEN 1050
  WHEN 'komposition-vii' THEN 900
  WHEN 'komposition-rot-blau-gelb' THEN 780
  ELSE price
END
WHERE work_slug IN ('mona-lisa', 'sternennacht', 'erschaffung-adams', 'wanderer-nebelmeer', 'impression-sonnenaufgang', 'duerer-selbstbildnis', 'komposition-vii', 'komposition-rot-blau-gelb');