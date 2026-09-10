/**
 * Coin-Budget von Provenance.
 *
 * Die Summe aller Auktionslose liegt bei rund 40.850 Coins. Das Gesamtbudget
 * ist bewusst etwas höher angesetzt (42.000) und verteilt sich so:
 *   Reise            50 %  = 21.000 Coins (einmalig über 30 Stationen)
 *   Studierkarten    35 %  = 14.700 Coins (350 pro Tag: Studieren + Karten-Quiz)
 *   Tagesinhalte     15 %  =  6.300 Coins (150 pro Tag: Werk, Künstler, Challenge)
 * Damit hat ein Nutzer, der täglich lernt, nach rund 42 Tagen jedes Werk
 * des Auktionshauses erwerben können.
 *
 * Alle Werte müssen mit den Datenbankfunktionen übereinstimmen.
 */

export const COIN_BUDGET_TOTAL = 42_000;

export const JOURNEY_SHARE = 0.5;
export const STUDY_SHARE = 0.35;
export const DAILY_SHARE = 0.15;

/** Reise: 24 × 650 + 6 × 900 = 21.000 */
export const JOURNEY_BUDGET = 21_000;

/** Studieren-Seite: 10 Coins je richtiger Karte, höchstens 25 gewertete Karten pro Tag. */
export const STUDY_CARD_REWARD = 10;
export const STUDY_CARDS_PER_DAY = 25;
/** Karten-Quiz: 2 Coins je Treffer, 4 Bonus bei 8/8, 5 Runden pro Tag. */
export const CARD_QUIZ_DAILY_MAX = 100;
export const STUDY_DAILY_MAX = STUDY_CARD_REWARD * STUDY_CARDS_PER_DAY + CARD_QUIZ_DAILY_MAX; // 350

/** Tagesinhalte: Tageswerk 50 + Tageskünstler 50 + Tages-Challenge 50 */
export const DAILY_LESSON_REWARD = 20;
export const DAILY_LESSON_BONUS = 10;
export const DAILY_LESSON_MAX = DAILY_LESSON_REWARD * 2 + DAILY_LESSON_BONUS; // 50
export const DAILY_CHALLENGE_MAX = 50;
export const DAILY_DAILY_MAX = DAILY_LESSON_MAX * 2 + DAILY_CHALLENGE_MAX; // 150

export const STUDY_BUDGET = 14_700;
export const DAILY_BUDGET = 6_300;

/**
 * Zusätzliche Coin-Quellen außerhalb des Lernbudgets:
 * - Epochen-Check: einmalig 40 Coins je Epoche (nur bei voller Punktzahl)
 * - „Erkenne die Epoche": 3 Runden pro Tag, 10 Coins je richtig erkanntem Werk
 * - Sammler-Meilensteine: 5/10/25/50 Werke → 100/200/500/1000 Coins, einmalig
 * - Verkauf aus der Sammlung: 60 % des Schätzwerts
 */
export const EPOCH_CHECK_REWARD = 40;
export const EPOCH_GAME_HIT_REWARD = 10;
export const MILESTONE_REWARDS = { 5: 100, 10: 200, 25: 500, 50: 1000 } as const;
