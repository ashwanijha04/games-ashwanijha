import GamesList from "@/components/GamesList";
import { games } from "@/lib/data/games";

export default function GamesPage() {
  const sorted = [...games].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="section pt-24 md:pt-32 pb-16 md:pb-20">
      {/* Hero */}
      <div className="mb-12 md:mb-16">
        <h1
          className="display mb-6"
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
          className="text-[1rem] md:text-[1.15rem] leading-relaxed"
          style={{ color: "var(--color-text-body)", maxWidth: "560px" }}
        >
          Things I&apos;m playing with — interactive experiments at the seam
          of code and play.
        </p>
      </div>

      <GamesList games={sorted} />
    </section>
  );
}
