"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Game } from "@/lib/data/games";

const statusStyle: Record<
  Game["status"],
  { label: string; color: string; bg: string; pulse: boolean }
> = {
  live: {
    label: "Live",
    color: "#86efac",
    bg: "rgba(34, 197, 94, 0.12)",
    pulse: true,
  },
  wip: {
    label: "WIP",
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.12)",
    pulse: false,
  },
  concept: {
    label: "Concept",
    color: "var(--color-accent-hover)",
    bg: "var(--color-accent-soft)",
    pulse: false,
  },
};

export default function GamesList({ games }: { games: Game[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((g) => {
      return (
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tech.some((t) => t.toLowerCase().includes(q)) ||
        g.status.toLowerCase().includes(q)
      );
    });
  }, [games, query]);

  return (
    <div>
      <div className="mb-10 md:mb-14">
        <label htmlFor="games-search" className="sr-only">
          Search games
        </label>
        <div className="relative">
          <input
            id="games-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tech, or status…"
            className="w-full text-[1rem] md:text-[1.05rem] py-3.5 pl-11 pr-12 rounded-lg outline-none transition-colors"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-accent)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border)")
            }
          />
          <span
            aria-hidden
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[1.05rem]"
            style={{ color: "var(--color-text-mute)" }}
          >
            ⌕
          </span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md px-2 py-1 text-[0.85rem] font-mono"
              style={{
                background: "transparent",
                border: 0,
                color: "var(--color-text-dim)",
              }}
            >
              clear
            </button>
          )}
        </div>
        <p
          className="text-[0.78rem] font-mono mt-3"
          style={{ color: "var(--color-text-mute)" }}
        >
          {filtered.length} of {games.length}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p
          className="text-[0.95rem]"
          style={{ color: "var(--color-text-dim)" }}
        >
          No games match{" "}
          <span style={{ color: "var(--color-text)" }}>“{query}”</span>.
        </p>
      ) : (
        <div
          className="flex flex-col"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {filtered.map((game, idx) => (
            <Row key={game.slug} game={game} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ game, idx }: { game: Game; idx: number }) {
  const s = statusStyle[game.status];
  const playable = !!game.link;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: idx * 0.04,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="py-7 md:py-8"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="grid md:grid-cols-[1fr_auto] gap-4 md:gap-8 items-start">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
            <h3
              className="text-[1.1rem] md:text-[1.2rem] font-semibold leading-snug"
              style={{
                color: "var(--color-text)",
                letterSpacing: "-0.012em",
              }}
            >
              {game.title}
            </h3>
            <span
              className="pill"
              style={{ background: s.bg, color: s.color }}
            >
              {s.pulse && (
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: s.color,
                    display: "inline-block",
                    animation: "status-pulse 2.4s ease-in-out infinite",
                  }}
                />
              )}
              {s.label}
            </span>
          </div>
          <p
            className="text-[0.95rem] leading-relaxed mb-4"
            style={{
              color: "var(--color-text-body)",
              maxWidth: "640px",
            }}
          >
            {game.description}
          </p>
          <p
            className="text-[0.76rem] font-mono"
            style={{ color: "var(--color-text-dim)" }}
          >
            {game.tech.join(" · ")}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          {game.repo && (
            <a
              href={game.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-[0.88rem]"
            >
              Source →
            </a>
          )}
          {playable ? (
            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
              style={{ padding: "0.55rem 1.1rem", fontSize: "0.88rem" }}
            >
              Play
            </a>
          ) : (
            <span
              className="text-[0.78rem] font-mono"
              style={{ color: "var(--color-text-mute)" }}
            >
              not yet
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
