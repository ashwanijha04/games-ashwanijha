export type Suit = "spades" | "hearts" | "diamonds" | "clubs";
export type Rank =
  | "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  | "J" | "Q" | "K";

export interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
  id: string;
}

export interface ChipStore {
  balance: number;
  addChips: (amount: number) => void;
  deductChips: (amount: number) => void;
  setBalance: (amount: number) => void;
}

export type CasinoGame = "blackjack" | "poker" | "roulette";

export interface TableConfig {
  game: CasinoGame;
  label: string;
  description: string;
  minBet: number;
  maxBet: number;
  hue: number;
  icon: string;
}

export type OutcomeKind =
  | "win" | "blackjack" | "push" | "lose"
  | "pot_win" | "pot_lose"
  | "survived" | "dead";

export interface RoundOutcome {
  kind: OutcomeKind;
  chipDelta: number;
  message: string;
}
