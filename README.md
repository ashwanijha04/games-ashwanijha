# games.ashwanijha.dev

Landing site for games and interactive experiments. Built with Next.js 15 + Tailwind v4.

The site itself is a directory — each individual game ships from its own repo and links here.

## Local dev

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Adding a game

Edit `lib/data/games.ts` and add an entry at the top:

```ts
{
  slug: "my-game",
  title: "My Game",
  description: "1–2 sentence pitch.",
  status: "live",          // "live" · "wip" · "concept"
  tech: ["TypeScript", "Canvas"],
  link: "https://my-game.vercel.app",  // optional play URL
  repo: "https://github.com/ashwanijha04/my-game", // optional source
  date: "2026-05-02",      // sort key, newer = top
}
```

Push → Vercel auto-rebuilds → game appears.

## Adding a brand-new game

Each game ships in its own repo so heavy deps don't bloat this directory.

1. `gh repo create ashwanijha04/my-game --public`
2. Build the game (Vite + Canvas, Phaser, three.js, whatever fits)
3. Deploy to Vercel — gets a URL like `my-game.vercel.app`
4. Optional: attach a subdomain like `tetris.games.ashwanijha.dev`
5. Add an entry to `lib/data/games.ts` with `link` pointing to the deploy URL

## Deploy

Connected to Vercel. Domain: `games.ashwanijha.dev`.
Push to `main` → auto-deploy.

## Parent site

[ashwanijha.dev](https://ashwanijha.dev) — full portfolio + writing.
