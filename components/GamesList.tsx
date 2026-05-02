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
        <div className="relative max-w-[560px]">
          <input
            id="games-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, tech…"
            className="w-full text-[0.92rem] py-2.5 pl-10 pr-12 rounded-md outline-none transition-colors font-mono"
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
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[0.95rem]"
            style={{ color: "var(--color-text-mute)" }}
          >
            ⌕
          </span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded px-1.5 py-0.5 text-[0.66rem] font-mono uppercase tracking-wider"
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

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* One-line description */}
        <p
          className="text-[0.88rem] leading-relaxed flex-1"
          style={{ color: "var(--color-text-body)" }}
        >
          {game.description}
        </p>

        {/* Action row: status + tech + play */}
        <div className="flex items-center justify-between gap-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="flex items-center gap-3 min-w-0">
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
            <span
              className="text-[0.7rem] font-mono truncate"
              style={{ color: "var(--color-text-dim)" }}
            >
              {game.tech.join(" · ")}
            </span>
          </div>
          {playable ? (
            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-play flex-shrink-0"
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.72rem" }}
            >
              ▶ Play
            </a>
          ) : (
            game.repo && (
              <a
                href={game.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.7rem] font-mono uppercase tracking-[0.12em] flex-shrink-0 transition-colors"
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
            )
          )}
        </div>
      </div>
    </motion.article>
  );
}
