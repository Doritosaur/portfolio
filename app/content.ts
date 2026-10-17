export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image?: string;
  link?: string;
}

export interface Role {
  period: string;
  role: string;
  company: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const hero = {
  name: "Aman Adhikari",
  role: "Full Stack Engineer",
  location: "Bengaluru, India",
  resumeLink:
    "https://drive.google.com/file/d/11FiHlMzeQneIJGoQRT-1l4-cHaIZlwQ8/view?usp=sharing",
  socials: [
    { label: "Github", href: "https://github.com/Doritosaur" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amanadhikari31" },
    { label: "X", href: "https://x.com/amanneox" },
  ],
};

export const roles: Role[] = [
  {
    period: "Feb 2026 – Present",
    role: "Full Stack Engineer",
    company: "SuperLaw",
    highlights: [
      "Building WebSocket-based chat interfaces for legal document workflows and integrating LLM models into case ingestion pipelines for AI-powered legal research.",
      "Developed intuitive interfaces for document review, case management, and AI-assisted legal research, improving usability across complex workflows.",
      "Built FastAPI backend services for document tooling, including file conversion, translation, and OpenAI-powered document processing workflows.",
    ],
  },
  {
    period: "Oct 2022 – Dec 2024",
    role: "Co-Founder / Frontend Engineer",
    company: "Cryptk",
    highlights: [
      "Built custom charting library handling 100K+ candlestick renders with sub-100ms draw times using canvas-based rendering and quadtree spatial indexing for efficient zoom/pan operations on time-series OHLCV data.",
      "Designed WebSocket ingestion pipeline processing 500+ price updates/sec; implemented middleware with message batching (50ms windows) and memoized selectors reducing re-renders.",
      "Built data normalization layer parsing raw Ethereum RPC responses and DEX swap events into strongly typed domain models with schema validation.",
    ],
  },
  {
    period: "Mar 2022 – Sep 2022",
    role: "Software Engineer / Frontend Engineer",
    company: "Ascendeum",
    highlights: [
      "Built custom charting library for impression analytics; implemented interactive visualizations with custom controls and real-time data updates for ad performance metrics.",
      "Developed ads impression and tracking tooling; integrated campaign tracking, budget management, and multi-dimensional filtering across 50+ client accounts.",
    ],
  },
  {
    period: "Aug 2020 – Mar 2022",
    role: "System Engineer Specialist",
    company: "Infosys",
    highlights: [
      "Developed supply chain platform for METRO serving 100+ clients; built reusable components library with 100+ components, eliminating duplicate UI code across 3 development teams.",
      "Enhanced DHL client system handling inventory, orders, and shipment tracking for 10K+ daily operations; refactored code to TypeScript, significantly reducing bundle size.",
      "Designed database schemas for shipment/inventory management; implemented migrations and indexing optimizations reducing query time from 300ms to 150ms across 5M+ records.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Redux", "D3.js", "Tailwind CSS", "Shadcn", "HTML5/CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Nest.js", "Spring Boot", "PostgreSQL"],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "AWS", "gRPC", "WebSockets", "Mapbox", "Zod", "Immer", "Zustand"],
  },
];

export const projects: Project[] = [
  {
    id: "xplot",
    title: "Xplot",
    description: "High-performance charting library",
    longDescription:
      "Xplot delivers columnar data handling, incredible rendering speed, and simplified chart configuration — no matter the size of your dataset. Backed by typed arrays and automatic decimation, xplot makes drawing hundreds of thousands of points simpler than ever.",
    tags: ["Charting", "Typed Arrays", "Decimation"],
    link: "https://xplot-wf8j-iota.vercel.app/",
  },
  {
    id: "redline",
    title: "Redline",
    description: "Performance auditing for localhost and live URLs",
    longDescription:
      "Redline audits localhost and live URLs, ranks fixes by impact, and points to the source file or npm package responsible. Use it from the CLI, in CI, or straight from Claude.",
    tags: ["CLI", "CI", "Performance"],
    link: "https://redline-landing-sand.vercel.app/",
  },
  {
    id: "lumina",
    title: "Lumina",
    description: "Landing page for an AI-powered document product",
    longDescription: "Lumina is a landing page for an AI-powered document product.",
    tags: [],
    link: "https://landing-001-smoky.vercel.app/",
  },
  {
    id: "project-4",
    title: "Project 4",
    description: "Placeholder description",
    longDescription: "Placeholder for an upcoming project.",
    tags: [],
  },
];
