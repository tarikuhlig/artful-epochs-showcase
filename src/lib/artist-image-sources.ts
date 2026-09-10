/**
 * Eigene Quellen-Liste für Künstler-Bilder.
 *
 * Hier — und nur hier — werden Abbildungen für geschützte Künstler gepflegt.
 * `imageUrl` bleibt leer, solange keine eigene oder ausdrücklich freigegebene
 * Abbildung vorliegt. In dem Fall zeigt die App die Platzhalter-Kachel und
 * verlinkt über `museumUrl` auf den Rechteinhaber.
 *
 * So trägst du ein Bild ein:
 *   imageUrl: "/__l5e/assets-v1/.../rothko.jpg",   // eigene Datei oder Asset
 *   credit:  "Foto: eigenes Foto, Tate Modern 2024",
 *   license: "Eigene Aufnahme, Genehmigung des Museums",
 *
 * Regel: niemals ein geschütztes Werk hotlinken oder ohne Freigabe hochladen.
 */

export type ArtistImageSource = {
  /** Künstler-Kürzel, identisch mit dem Slug in modern-artists.ts */
  slug: string;
  /** Abbildung, die angezeigt werden darf. Leer lassen, wenn keine Freigabe vorliegt. */
  imageUrl?: string;
  /** Offizielle Seite des Rechteinhabers für die Museums-Ansicht. */
  museumUrl?: string;
  /** Bildnachweis, wird unter dem Bild angezeigt. */
  credit?: string;
  /** Rechtegrundlage: gemeinfrei, eigene Aufnahme, Lizenzvertrag … */
  license?: string;
};

export const artistImageSources: ArtistImageSource[] = [
  { slug: "pablo-picasso", museumUrl: "https://www.museepicassoparis.fr/en/collection" },
  { slug: "henri-matisse", museumUrl: "https://www.moma.org/artists/3832" },
  { slug: "salvador-dali", museumUrl: "https://thedali.org/exhibit/permanent-collection/" },
  { slug: "rene-magritte", museumUrl: "https://www.fine-arts-museum.be/en/the-collection" },
  { slug: "frida-kahlo", museumUrl: "https://museofridakahlo.org.mx/en/" },
  { slug: "edward-hopper", museumUrl: "https://whitney.org/artists/916" },
  { slug: "mark-rothko", museumUrl: "https://www.nga.gov/artists/1839-mark-rothko" },
  { slug: "jackson-pollock", museumUrl: "https://www.moma.org/artists/4675" },
  { slug: "andy-warhol", museumUrl: "https://www.warhol.org/andy-warhols-life/" },
  { slug: "francis-bacon", museumUrl: "https://www.tate.org.uk/art/artists/francis-bacon-682" },
  { slug: "jean-michel-basquiat", museumUrl: "https://www.brooklynmuseum.org/opencollection/artists/6141" },
  { slug: "bridget-riley", museumUrl: "https://www.tate.org.uk/art/artists/bridget-riley-1845" },
];

const bySlug = new Map(artistImageSources.map((entry) => [entry.slug, entry]));

/** Eintrag aus der eigenen Quellen-Liste, falls vorhanden. */
export function findArtistImageSource(slug: string): ArtistImageSource | undefined {
  return bySlug.get(slug);
}

/** Freigegebene Abbildung eines Künstlers — sonst undefined. */
export function artistImageUrl(slug: string): string | undefined {
  const entry = bySlug.get(slug);
  return entry?.imageUrl && entry.imageUrl.trim() ? entry.imageUrl : undefined;
}
