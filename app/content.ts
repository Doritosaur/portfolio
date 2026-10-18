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
    "https://drive.google.com/file/d/1U6MGHOY_zNJB7DsK5WxidJntIDfYqBsM/view?usp=sharing",
  socials: [
    { label: "Github", href: "https://github.com/Doritosaur" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amanadhikari31" },
    { label: "X", href: "https://x.com/amanneox" },
  ],
};

export const roles: Role[] = [
  {
    period: "Feb 2026 – Now",
    role: "Full Stack Engineer",
    company: "SuperLaw",
    highlights: [
      "Built chat and document-review interfaces for legal work, with AI-assisted case research.",
      "Built the backend services for file conversion, translation and AI document processing.",
    ],
  },
  {
    period: "Oct 2022 – Dec 2024",
    role: "Co-Founder / Full Stack Engineer",
    company: "Cryptk",
    highlights: [
      "Built a charting library that draws 100K+ candles in under 100ms.",
      "Built a live price feed handling 500+ updates a second.",
    ],
  },
  {
    period: "Mar 2022 – Sep 2022",
    role: "Software Engineer / Frontend Engineer",
    company: "Ascendeum",
    highlights: [
      "Built an interactive charting library for ad analytics.",
      "Built ad tracking and budget tools used across 50+ client accounts.",
    ],
  },
  {
    period: "Aug 2020 – Mar 2022",
    role: "System Engineer Specialist",
    company: "Infosys",
    highlights: [
      "Built a supply chain platform for METRO, with a 100+ component library shared by 3 teams.",
      "Improved the DHL shipment system (10K+ daily operations) and halved database query times.",
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
    id: "meridian",
    title: "Meridian",
    description: "Web project",
    longDescription: "Meridian, a web project.",
    tags: [],
    link: "https://meridian-steel-two.vercel.app/",
  },
];
