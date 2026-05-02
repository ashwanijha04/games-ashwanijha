export type Game = {
  slug: string;
  title: string;
  description: string;
  status: "live" | "wip" | "concept";
  tech: string[];
  /** Genre/category — surfaces visually on the cover */
  genre: string;
  /** HSL hue 0-360 — drives the cover art gradient + glow color */
  hue: number;
  /** "shape" of the cover art pattern */
  pattern: "tetromino" | "grid" | "scanlines" | "arena" | "dots";
  link?: string;
  repo?: string;
  date: string;
};

export const games: Game[] = [
  {
    slug: "friday-co-op-tetris",
    title: "Friday Co-op Tetris",
    description:
      "Friday plays the second board, learning your stacking patterns.",
    status: "concept",
    tech: ["TypeScript", "Canvas"],
    genre: "Co-op puzzle",
    hue: 200,
    pattern: "tetromino",
    date: "2026-05-01",
  },
  {
    slug: "agent-dungeon",
    title: "Agent Dungeon",
    description:
      "Roguelike where every NPC is an LLM agent. Talk your way past combat.",
    status: "wip",
    tech: ["Phaser", "LLMs"],
    genre: "Roguelike RPG",
    hue: 280,
    pattern: "grid",
    date: "2026-04-15",
  },
  {
    slug: "type-the-stack",
    title: "Type the Stack",
    description:
      "Speed-typing trainer that throws real production code at you.",
    status: "concept",
    tech: ["Next.js", "TypeScript"],
    genre: "Skill / arcade",
    hue: 140,
    pattern: "scanlines",
    date: "2026-04-01",
  },
  {
    slug: "mcp-arena",
    title: "MCP Arena",
    description:
      "Two AI agents fight by negotiating tool calls through MCP.",
    status: "concept",
    tech: ["MCP", "LLMs"],
    genre: "Spectator AI",
    hue: 20,
    pattern: "arena",
    date: "2026-03-20",
  },
];
