import type { Card, RoundOutcome } from "../types";

const RANK_VALUES: Record<string, number> = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8,
  "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10, "A": 11,
};

export interface HandState {
  cards: Card[];
  value: number;
  isSoft: boolean;
  isBust: boolean;
  isBlackjack: boolean;
  bet: number;
}

export function handValue(cards: Card[]): { value: number; isSoft: boolean } {
  let value = 0;
  let aces = 0;
  for (const c of cards) {
    if (!c.faceUp) continue;
    value += RANK_VALUES[c.rank];
    if (c.rank === "A") aces++;
  }
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  return { value, isSoft: aces > 0 && value <= 21 };
}

export function buildHandState(cards: Card[], bet: number): HandState {
  const { value, isSoft } = handValue(cards);
  const visibleCards = cards.filter((c) => c.faceUp);
  return {
    cards,
    value,
    isSoft,
    isBust: value > 21,
    isBlackjack: visibleCards.length === 2 && value === 21,
    bet,
  };
}

export function canSplit(hand: HandState): boolean {
  return (
    hand.cards.length === 2 && hand.cards[0].rank === hand.cards[1].rank
  );
}

export function shouldDealerHit(hand: HandState): boolean {
  if (hand.value < 17) return true;
  if (hand.value === 17 && hand.isSoft) return true;
  return false;
}

export function resolveBlackjackHand(
  player: HandState,
  dealer: HandState,
  bet: number
): RoundOutcome {
  if (player.isBust) {
    return { kind: "lose", chipDelta: -bet, message: "Bust! Dealer wins." };
  }
  if (dealer.isBust) {
    if (player.isBlackjack) {
      return {
        kind: "blackjack",
        chipDelta: Math.floor(bet * 1.5),
        message: "Blackjack! You win 3:2!",
      };
    }
    return { kind: "win", chipDelta: bet, message: "Dealer busts! You win!" };
  }
  if (player.isBlackjack && !dealer.isBlackjack) {
    return {
      kind: "blackjack",
      chipDelta: Math.floor(bet * 1.5),
      message: "Blackjack! You win 3:2!",
    };
  }
  if (!player.isBlackjack && dealer.isBlackjack) {
    return { kind: "lose", chipDelta: -bet, message: "Dealer Blackjack. You lose." };
  }
  if (player.value > dealer.value) {
    return { kind: "win", chipDelta: bet, message: "You win!" };
  }
  if (player.value === dealer.value) {
    return { kind: "push", chipDelta: 0, message: "Push — bet returned." };
  }
  return { kind: "lose", chipDelta: -bet, message: "Dealer wins." };
}
