import GamesList from "@/components/GamesList";
import { games } from "@/lib/data/games";

export default function GamesPage() {
  const sorted = [...games].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="section pt-28 md:pt-36 pb-20">
      <div className="mb-10 md:mb-14 max-w-[680px]">
        <h1
          className="display mb-5"
          style={{
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            letterSpacing: "-0.035em",
            lineHeight: 1.04,
          }}
        >
          Games.
        </h1>
        <p
          className="text-[1.05rem] md:text-[1.15rem] leading-relaxed"
          style={{ color: "var(--color-text-body)" }}
        >
          Things I&apos;m playing with — small interactive experiments at the
          seam of code and play. Some are concepts, some are live, all are
          scratch-built.
        </p>
      </div>

      <GamesList games={sorted} />
    </section>
  );
}
