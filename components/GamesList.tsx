"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Game } from "@/lib/data/games";
import CoverArt from "./CoverArt";

const statusClass: Record<Game["status"], { class: string; label: string }> = {
  live: { class: "pill pill-live", label: "Live" },
  wip: { class: "pill pill-wip", label: "WIP" },
  concept: { class: "pill pill-concept", label: "Concept" },
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
        g.status.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q)
      );
    });
  }, [games, query]);

  return (
    <div>
      {/* Search */}
      <div className="mb-12 md:mb-14">
        <label htmlFor="games-search" className="sr-only">
          Search games
        </label>
        <div className="relative max-w-[640px]">
          <input
            id="games-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, tech…"
            className="w-full text-[0.95rem] py-3 pl-11 pr-12 rounded-md outline-none transition-colors font-mono"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border-bright)",
              color: "var(--color-text)",
              letterSpacing: "0.01em",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-neon-cyan)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor =
                "var(--color-border-bright)")
            }
          />
          <span
            aria-hidden
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[1rem]"
            style={{ color: "var(--color-text-mute)" }}
          >
            ⌕
          </span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded px-2 py-1 text-[0.7rem] font-mono uppercase tracking-wider"
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
          className="text-[0.74rem] font-mono uppercase tracking-[0.16em] mt-3"
          style={{ color: "var(--color-text-mute)" }}
        >
          {filtered.length} of {games.length} games
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p
          className="text-[0.95rem]"
          style={{ color: "var(--color-text-dim)" }}
        >
          No games match{" "}
          <span style={{ color: "var(--color-text)" }}>“{query}”</span>.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((game, idx) => (
            <Card key={game.slug} game={game} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ game, idx }: { game: Game; idx: number }) {
  const status = statusClass[game.status];
  const playable = !!game.link;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: idx * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        boxShadow: `0 16px 40px -16px hsla(${game.hue}, 80%, 50%, 0.45), 0 0 0 1px hsla(${game.hue}, 70%, 55%, 0.35)`,
      }}
      className="game-card flex flex-col"
    >
      <CoverArt game={game} />

      <div className="p-5 md:p-6 flex flex-col flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="text-[1rem] md:text-[1.05rem] font-semibold leading-snug"
            style={{
              color: "var(--color-text)",
              letterSpacing: "-0.012em",
            }}
          >
            {game.title}
          </h3>
          <span className={status.class}>
            {game.status === "live" && (
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "currentColor",
                  display: "inline-block",
                  animation: "status-pulse 2.4s ease-in-out infinite",
                }}
              />
            )}
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-[0.86rem] leading-relaxed mb-5 flex-1"
          style={{ color: "var(--color-text-body)" }}
        >
          {game.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {game.tech.map((t) => (
            <span
              key={t}
              className="text-[0.66rem] font-mono uppercase tracking-[0.1em] px-1.5 py-0.5 rounded"
              style={{
                background: "var(--color-bg-soft)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-dim)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action row */}
        <div
          className="flex items-center justify-between gap-3 pt-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {game.repo ? (
            <a
              href={game.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.74rem] font-mono uppercase tracking-[0.12em] transition-colors"
              style={{ color: "var(--color-text-dim)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-dim)")
              }
            >
              ↗ Source
            </a>
          ) : (
            <span
              className="text-[0.7rem] font-mono uppercase tracking-[0.12em]"
              style={{ color: "var(--color-text-mute)" }}
            >
              No source
            </span>
          )}
          {playable ? (
            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-play"
              style={{ padding: "0.5rem 1rem", fontSize: "0.78rem" }}
            >
              ▶ Play
            </a>
          ) : (
            <span
              className="text-[0.7rem] font-mono uppercase tracking-[0.12em]"
              style={{ color: "var(--color-text-mute)" }}
            >
              not playable yet
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
