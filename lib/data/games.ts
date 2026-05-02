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
      "Classic Tetris where Friday plays the second board alongside you, learning your stacking patterns over the run. Two-player co-op against gravity.",
    status: "concept",
    tech: ["TypeScript", "Canvas", "Friday SDK"],
    genre: "Co-op puzzle",
    hue: 200,
    pattern: "tetromino",
    date: "2026-05-01",
  },
  {
    slug: "agent-dungeon",
    title: "Agent Dungeon",
    description:
      "Roguelike dungeon crawler where every NPC is an LLM-driven agent with its own goals, memory, and BDI loop. Talk your way past combat.",
    status: "wip",
    tech: ["TypeScript", "Phaser", "LLMs", "BDI agents"],
    genre: "Roguelike RPG",
    hue: 280,
    pattern: "grid",
    date: "2026-04-15",
  },
  {
    slug: "type-the-stack",
    title: "Type the Stack",
    description:
      "Speed-typing trainer that throws real production code at you — lines from Spring, Kafka, Lambda handlers. Track WPM by language.",
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
      "Two AI agents fight by negotiating tool calls through MCP. Watch them try to outsmart each other with your hosted brand layer in the loop.",
    status: "concept",
    tech: ["MCP", "TypeScript", "LLMs"],
    genre: "Spectator AI",
    hue: 20,
    pattern: "arena",
    date: "2026-03-20",
  },
];
