-- Im Auktionshaus soll pro Rotationsslot immer nur ein legendäres Werk angezeigt werden.
-- Löscht überschüssige Legendär-Angebote pro Slot, sodass nur das teuerste verbleibt.

DELETE FROM public.auction_offers
WHERE id IN (
  SELECT id FROM (
    SELECT
      id,
      row_number() OVER (PARTITION BY rotation_slot ORDER BY price DESC, work_slug) AS rn
    FROM public.auction_offers
    WHERE price >= 10000
  ) ranked
  WHERE rn > 1
);
