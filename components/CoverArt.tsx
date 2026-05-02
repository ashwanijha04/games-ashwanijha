import type { Game } from "@/lib/data/games";

/**
 * Procedural cover art for each game card.
 * Hue from game.hue drives the gradient + glow tint.
 * Pattern is a CSS-only background overlay (tetromino grid, scanlines, etc.)
 * Centerpiece is the title typeset huge over the gradient.
 */
export default function CoverArt({ game }: { game: Game }) {
  const { hue, pattern, title } = game;
  const titleLines = title.split(" ");

  return (
    <div
      className="cover-art"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, hsla(${hue}, 90%, 55%, 0.55) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, hsla(${(hue + 50) % 360}, 80%, 45%, 0.4) 0%, transparent 50%),
          linear-gradient(135deg, hsl(${hue}, 50%, 16%) 0%, #06060a 90%)
        `,
      }}
    >
      <div className={`cover-art-pattern pattern-${pattern}`} />

      {/* Stacked title — magazine cover style */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-7">
        <div
          className="display"
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
            color: "var(--color-text)",
            textShadow: `0 2px 24px hsla(${hue}, 90%, 50%, 0.6)`,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
        >
          {titleLines.map((word, i) => (
            <div key={i}>{word.toUpperCase()}</div>
          ))}
        </div>
      </div>

      {/* Vignette for legibility */}
      <div className="cover-vignette" />

      {/* Genre tag — top-right */}
      <div
        className="absolute top-3 right-3 text-[0.62rem] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded"
        style={{
          color: "var(--color-text)",
          background: "rgba(0, 0, 0, 0.5)",
          border: `1px solid hsla(${hue}, 80%, 60%, 0.4)`,
          backdropFilter: "blur(6px)",
        }}
      >
        {game.genre}
      </div>
    </div>
  );
}
