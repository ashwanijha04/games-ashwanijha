"use client";
import { useState, useCallback } from "react";
import { createDeck, shuffle, dealCard } from "../deck";
import {
  buildHandState,
  shouldDealerHit,
  resolveBlackjackHand,
  canSplit,
  type HandState,
} from "./gameLogic";
import type { Card, RoundOutcome } from "../types";

export type BlackjackPhase =
  | "idle"
  | "player_turn"
  | "dealer_turn"
  | "settled";

export interface BlackjackGameState {
  phase: BlackjackPhase;
  deck: Card[];
  playerHands: HandState[];
  activeHandIndex: number;
  dealerHand: HandState;
  currentBet: number;
  outcome: RoundOutcome | null;
}

function fresh(): BlackjackGameState {
  return {
    phase: "idle",
    deck: shuffle(createDeck()),
    playerHands: [],
    activeHandIndex: 0,
    dealerHand: buildHandState([], 0),
    currentBet: 25,
    outcome: null,
  };
}

function runDealerTurn(s: BlackjackGameState): BlackjackGameState {
  let dealer = buildHandState(
    s.dealerHand.cards.map((c) => ({ ...c, faceUp: true })),
    0
  );
  let deck = s.deck;
  while (shouldDealerHit(dealer)) {
    const { card, remaining } = dealCard(deck, true);
    deck = remaining;
    dealer = buildHandState([...dealer.cards, card], 0);
  }
  const outcomes = s.playerHands.map((h) =>
    resolveBlackjackHand(h, dealer, h.bet)
  );
  const combined: RoundOutcome =
    outcomes.length === 1
      ? outcomes[0]
      : {
          kind: outcomes.some((o) => o.kind === "win" || o.kind === "blackjack")
            ? "win"
            : outcomes.every((o) => o.kind === "lose")
            ? "lose"
            : "push",
          chipDelta: outcomes.reduce((acc, o) => acc + o.chipDelta, 0),
          message: outcomes.map((o) => o.message).join(" / "),
        };
  return { ...s, deck, dealerHand: dealer, phase: "settled", outcome: combined };
}

export function useBlackjackGame() {
  const [state, setState] = useState<BlackjackGameState>(fresh);

  const placeBet = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, currentBet: amount }));
  }, []);

  const deal = useCallback(() => {
    setState((prev) => {
      let deck = prev.deck.length < 15 ? shuffle(createDeck()) : prev.deck;
      const r1 = dealCard(deck, true); deck = r1.remaining;
      const r2 = dealCard(deck, true); deck = r2.remaining;
      const r3 = dealCard(deck, true); deck = r3.remaining;
      const r4 = dealCard(deck, false); deck = r4.remaining;
      const playerHand = buildHandState([r1.card, r3.card], prev.currentBet);
      const dealerHand = buildHandState([r2.card, r4.card], 0);
      const next: BlackjackGameState = {
        ...prev,
        deck,
        playerHands: [playerHand],
        activeHandIndex: 0,
        dealerHand,
        phase: "player_turn",
        outcome: null,
      };
      if (playerHand.isBlackjack) return runDealerTurn({ ...next, phase: "dealer_turn" });
      return next;
    });
  }, []);

  const hit = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "player_turn") return prev;
      const { card, remaining } = dealCard(prev.deck, true);
      const hands = [...prev.playerHands];
      const idx = prev.activeHandIndex;
      hands[idx] = buildHandState([...hands[idx].cards, card], hands[idx].bet);
      if (hands[idx].isBust || hands[idx].value === 21) {
        const nextIdx = idx + 1;
        if (nextIdx < hands.length) {
          return { ...prev, deck: remaining, playerHands: hands, activeHandIndex: nextIdx };
        }
        return runDealerTurn({ ...prev, deck: remaining, playerHands: hands, phase: "dealer_turn" });
      }
      return { ...prev, deck: remaining, playerHands: hands };
    });
  }, []);

  const stand = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "player_turn") return prev;
      const nextIdx = prev.activeHandIndex + 1;
      if (nextIdx < prev.playerHands.length) {
        return { ...prev, activeHandIndex: nextIdx };
      }
      return runDealerTurn({ ...prev, phase: "dealer_turn" });
    });
  }, []);

  const doubleDown = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "player_turn") return prev;
      const idx = prev.activeHandIndex;
      if (prev.playerHands[idx].cards.length !== 2) return prev;
      const { card, remaining } = dealCard(prev.deck, true);
      const hands = [...prev.playerHands];
      hands[idx] = buildHandState(
        [...hands[idx].cards, card],
        hands[idx].bet * 2
      );
      const nextIdx = idx + 1;
      if (nextIdx < hands.length) {
        return { ...prev, deck: remaining, playerHands: hands, activeHandIndex: nextIdx };
      }
      return runDealerTurn({ ...prev, deck: remaining, playerHands: hands, phase: "dealer_turn" });
    });
  }, []);

  const split = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "player_turn") return prev;
      const idx = prev.activeHandIndex;
      const hand = prev.playerHands[idx];
      if (!canSplit(hand)) return prev;
      let deck = prev.deck;
      const r1 = dealCard(deck, true); deck = r1.remaining;
      const r2 = dealCard(deck, true); deck = r2.remaining;
      const newHands = [...prev.playerHands];
      newHands[idx] = buildHandState([hand.cards[0], r1.card], hand.bet);
      newHands.splice(idx + 1, 0, buildHandState([hand.cards[1], r2.card], hand.bet));
      return { ...prev, deck, playerHands: newHands };
    });
  }, []);

  const newRound = useCallback(() => {
    setState((prev) => ({ ...fresh(), deck: prev.deck, currentBet: prev.currentBet }));
  }, []);

  return { state, placeBet, deal, hit, stand, doubleDown, split, newRound };
}
