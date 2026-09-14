/**
 * Leichtgewichtige Kennzahlen zur Reise.
 *
 * Bewusst ohne Import von `art-path.ts` / `art-path-content.ts`: Seiten, die nur
 * die Stationsanzahl anzeigen (z. B. die Startseite), sollen nicht die komplette
 * Stationsdatei (~90 KB) in ihr SSR-Bundle ziehen.
 *
 * Wert wird in `art-path.ts` zur Laufzeit gegengeprüft.
 */
export const ART_PATH_STATION_COUNT = 30;
