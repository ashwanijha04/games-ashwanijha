import GamesList from "@/components/GamesList";
import { games } from "@/lib/data/games";

export default function GamesPage() {
  const sorted = [...games].sort((a, b) => (a.date < b.date ? 1 : -1));
  const liveCount = games.filter((g) => g.status === "live").length;
  const wipCount = games.filter((g) => g.status === "wip").length;
  const conceptCount = games.filter((g) => g.status === "concept").length;

  return (
    <section className="section pt-24 md:pt-32 pb-16 md:pb-20">
      {/* Hero — big title + stats line */}
      <div className="mb-10 md:mb-14">
        <p
          className="text-[0.78rem] font-mono uppercase tracking-[0.2em] mb-5"
          style={{ color: "var(--color-text-mute)" }}
        >
          ▮ Now playing · {games.length} titles
        </p>

        <h1
          className="display mb-7"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 8rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.92,
          }}
        >
          GAMES
          <span
            style={{
              color: "var(--color-neon-cyan)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.45em",
              fontWeight: 500,
              verticalAlign: "super",
              marginLeft: "0.4rem",
              letterSpacing: "0.04em",
            }}
          >
            .dev
          </span>
        </h1>

        <p
          className="text-[1rem] md:text-[1.15rem] leading-relaxed mb-6"
          style={{ color: "var(--color-text-body)", maxWidth: "640px" }}
        >
          Things I&apos;m playing with — small interactive experiments at the
          seam of code and play. Some are concepts, some are live, all are
          scratch-built.
        </p>

        <div
          className="flex flex-wrap gap-x-6 gap-y-2 text-[0.74rem] font-mono uppercase tracking-[0.14em]"
          style={{ color: "var(--color-text-dim)" }}
        >
          <span>
            <span style={{ color: "#86efac" }}>● {liveCount}</span> live
          </span>
          <span>
            <span style={{ color: "var(--color-neon-amber)" }}>
              ● {wipCount}
            </span>{" "}
            in progress
          </span>
          <span>
            <span style={{ color: "var(--color-accent-hover)" }}>
              ● {conceptCount}
            </span>{" "}
            concepts
          </span>
        </div>
      </div>

      <GamesList games={sorted} />
    </section>
  );
}
