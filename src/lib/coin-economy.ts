/**
 * Coin-Budget von Provenance.
 *
 * Seit die legendären Ikonen (Mona Lisa & Co.) fünf- bis sechsstellige
 * Preise haben, ist das Verdienstmodell darauf ausgelegt, dass wirklich
 * jedes Werk durch harte, tägliche Arbeit erreichbar bleibt.
 *
 * Tageswerte bei vollem Einsatz:
 *   Studierkarten     40 × 40  = 1.600
 *   Karten-Quiz        8 × 100 =   800
 *   Tageslektionen     2 × 150 =   300
 *   Tages-Challenge             =   300
 *   „Erkenne die Epoche" 3 × 160 = 480
 *   ------------------------------------
 *   Summe pro Tag              ≈ 3.480  (≈ 1,27 Mio. pro Jahr)
 *
 * Einmalige Quellen:
 *   Reise: 24 × 2.500 + 6 × 4.000            = 84.000
 *   Epochen-Checks: 9 × 400                  =  3.600
 *   Sammler-Meilensteine bis 500 Werke       = 631.500
 *   Verkäufe aus der Sammlung: 60 % des Schätzwerts
 *
 * Damit kostet das teuerste Werk (150.000 Coins) rund 43 Tage vollen
 * Einsatzes; die komplette Sammlung bleibt ein Langzeitziel.
 *
 * Alle Werte müssen mit den Datenbankfunktionen übereinstimmen.
 */

/** Studieren-Seite: 40 Coins je richtiger Karte, höchstens 40 gewertete Karten pro Tag. */
export const STUDY_CARD_REWARD = 40;
export const STUDY_CARDS_PER_DAY = 40;

/** Karten-Quiz: 10 Coins je Treffer, 20 Bonus bei 8/8, 8 Runden pro Tag. */
export const CARD_QUIZ_DAILY_MAX = 800;
export const STUDY_DAILY_MAX = STUDY_CARD_REWARD * STUDY_CARDS_PER_DAY + CARD_QUIZ_DAILY_MAX; // 2.400

/** Tagesinhalte: Tageswerk 150 + Tageskünstler 150 + Tages-Challenge 300 */
export const DAILY_LESSON_REWARD = 60;
export const DAILY_LESSON_BONUS = 30;
export const DAILY_LESSON_MAX = DAILY_LESSON_REWARD * 2 + DAILY_LESSON_BONUS; // 150
export const DAILY_CHALLENGE_REWARD = 60;
export const DAILY_CHALLENGE_BONUS = 120;
export const DAILY_CHALLENGE_MAX = DAILY_CHALLENGE_REWARD * 3 + DAILY_CHALLENGE_BONUS; // 300
export const DAILY_DAILY_MAX = DAILY_LESSON_MAX * 2 + DAILY_CHALLENGE_MAX; // 600

/** Reise: 24 × 2.500 + 6 × 4.000 = 84.000 (einmalig) */
export const JOURNEY_BUDGET = 84_000;

/**
 * Zusätzliche Coin-Quellen:
 * - Epochen-Check: einmalig 400 Coins je Epoche (nur bei voller Punktzahl)
 * - „Erkenne die Epoche": 3 Runden pro Tag, 40 Coins je richtig erkanntem Werk
 * - Sammler-Meilensteine bis 500 Werke
 * - Verkauf aus der Sammlung: 60 % des Schätzwerts
 */
export const EPOCH_CHECK_REWARD = 400;
export const EPOCH_GAME_HIT_REWARD = 40;
export const MILESTONE_REWARDS = {
  5: 1_000,
  10: 2_500,
  25: 8_000,
  50: 20_000,
  100: 50_000,
  250: 150_000,
  500: 400_000,
} as const;

/** Was ein Nutzer bei vollem Tageseinsatz maximal verdienen kann. */
export const EPOCH_GAME_DAILY_MAX = 480;
export const COINS_PER_FULL_DAY = STUDY_DAILY_MAX + DAILY_DAILY_MAX + EPOCH_GAME_DAILY_MAX; // 3.480
