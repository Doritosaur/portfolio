import { create } from 'zustand';

interface HeroData {
    name: string;
    role: string;
    skills: string[];
    location: string;
    status: string;
    avatar?: string;
    resumeLink?: string;
}

interface ProjectData {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    year: string;
    image?: string;
    link?: string;
}

interface BlueprintData {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    link?: string;
}

interface MissionData {
    year: string;
    role: string;
    company: string;
    description: string;
    status: 'ACTIVE' | 'COMPLETE' | 'ROOT_ACCESS' | 'ARCHIVED';
}

interface ArsenalGroup {
    category: string;
    items: string[];
}

interface ContentState {
    hero: HeroData;
    projects: ProjectData[];
    blueprints: BlueprintData[];
    missions: MissionData[];
    arsenal: ArsenalGroup[];
}

export const useContentStore = create<ContentState>(() => ({
    hero: {
        name: "Aman Adhikari",
        role: "Full Stack Engineer",
        skills: ["React", "TypeScript", "Node.js", "WebSockets", "D3.js", "System Design", "Real-time Data"],
        location: "DEHRADUN // INDIA",
        status: "AVAILABLE",
        avatar: "/profile.png",
        resumeLink: "https://drive.google.com/file/d/11FiHlMzeQneIJGoQRT-1l4-cHaIZlwQ8/view?usp=sharing"
    },
    missions: [
        {
            year: "2026 - PRESENT",
            role: "FULL_STACK_ENGINEER",
            company: "SUPERLAW",
            description: "Building legal-tech product workflows with modern full-stack systems. Shipping user-facing features, backend services, and integrations for document-heavy legal operations.",
            status: "ACTIVE"
        },
        {
            year: "2022 - 2024",
            role: "CO_FOUNDER",
            company: "CRYPTK",
            description: "Architected real-time charting engine processing 100K+ candles with sub-100ms render times. Built WebSocket pipeline handling 500+ TPS for live crypto feeds. Designed ETH data normalization layer transforming raw RPC data into actionable analytics.",
            status: "ARCHIVED"
        },
        {
            year: "2022 - 2022",
            role: "SOFTWARE_DEV",
            company: "ASCENDEUM",
            description: "Engineered custom analytics dashboard for ad impression tracking serving 50+ enterprise clients. Built campaign performance tooling with real-time visualizations. Reduced reporting latency by 60% through optimized data pipelines.",
            status: "ARCHIVED"
        },
        {
            year: "2020 - 2022",
            role: "SYSTEM_ENGINEER",
            company: "INFOSYS",
            description: "Delivered enterprise supply chain platform for METRO managing 100+ SKUs with real-time inventory tracking. Led TypeScript migration for DHL logistics system improving type safety 40%. Optimized PostgreSQL queries cutting response times by 50% (300ms → 150ms).",
            status: "ARCHIVED"
        },
        {
            year: "2019 - 2019",
            role: "INTERN",
            company: "DRDO_DEAL",
            description: "Developed internal monitoring systems for live telemetry data streams at India's premier defense R&D lab. Implemented data compression algorithms reducing bandwidth usage by 35%. Built real-time visualization dashboards for mission-critical analytics.",
            status: "COMPLETE"
        }
    ],
    arsenal: [
        {
            category: "LANGUAGES",
            items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL"]
        },
        {
            category: "FRONTEND",
            items: ["React", "Redux", "D3.js", "Tailwind CSS", "Shadcn", "HTML5/CSS3"]
        },
        {
            category: "BACKEND",
            items: ["Node.js", "Nest.js", "Spring Boot", "PostgreSQL"]
        },
        {
            category: "TOOLS_&_DEVOPS",
            items: ["Git", "Docker", "AWS", "gRPC", "WebSockets", "Mapbox", "Zod", "Immer", "Zustand"]
        }
    ],
    projects: [
        {
            id: "PROJ_01",
            title: "Plotcraft",
            description: "Interactive charting library",
            longDescription: "A flexible charting library for building clear, interactive data visualizations. Designed around reusable chart components and a polished developer experience for turning complex datasets into responsive visual stories.",
            tags: ["React", "TypeScript", "Data Visualization", "Charting"],
            year: "2026",
            image: "/project-chart.png",
            link: "https://plotcraft-c49c4kynw-amanadhikari2-3531s-projects.vercel.app/"
        },
        {
            id: "PROJ_02",
            title: "Architect",
            description: "Visual software architecture platform",
            longDescription: "A polished product experience for software architects and engineering teams. Presents a visual workflow for designing system diagrams, mapping user flows, collaborating on architecture, and generating production-ready code.",
            tags: ["Next.js", "React", "TypeScript", "Product Design"],
            year: "2026",
            image: "/project-architect.png",
            link: "https://architect-landing-sandy.vercel.app/"
        },
        {
            id: "PROJ_03",
            title: "Lumina",
            description: "High-performance landing page with Framer Motion",
            longDescription: "Visually stunning landing page featuring complex scroll-triggered animations, staggered reveals, and fluid page transitions powered by Framer Motion. Optimized for 60fps performance with GPU-accelerated transforms and reduced motion support for accessibility.",
            tags: ["React", "Framer Motion", "CSS Animations", "Performance"],
            year: "2025",
            image: "/project-landing.png",
            link: "https://landing-001-smoky.vercel.app/"
        },
        {
            id: "PROJ_04",
            title: "Polymarket Terminal",
            description: "Prediction market analytics platform",
            longDescription: "Full-stack analytics terminal for prediction markets. Ingests thousands of daily trades via WebSocket streams. Features interactive heat maps, real-time position tracking, and automated signal generation. Built with React, Node.js, and Redis for sub-second latency.",
            tags: ["React", "Node.js", "WebSockets", "Docker", "Redis"],
            year: "2025",
            image: "/project-poly.png",
            link: "https://polymarket-dashboard-nbyi.onrender.com/"
        },
        {
            id: "PROJ_05",
            title: "HFT Orderbook",
            description: "Ultra-low latency trading interface",
            longDescription: "Professional-grade orderbook visualization for high-frequency trading. Handles 10,000+ updates/second with sub-16ms frame times. Custom Canvas rendering engine with 100K+ candle capacity. Built for institutional traders requiring millisecond precision.",
            tags: ["React", "TypeScript", "Canvas API", "WebSockets", "Performance"],
            year: "2025",
            image: "/project-hft.png",
            link: "https://github.com/Doritosaur/orderbook-ui"
        },
        {
            id: "PROJ_06",
            title: "AI-Powered Docs Platform",
            description: "Intelligent documentation engine",
            longDescription: "Next-generation documentation platform with MDX support, live code previews, and AI-assisted search. Kafka-based content indexing, and intelligent code completion. Reduces documentation lookup time by 70%.",
            tags: ["React", "TypeScript", "MDX", "Kafka"],
            year: "2025",
            image: "/project-docs.png",
            link: "https://ai-docs-app-hp83.onrender.com/"
        }
    ],
    blueprints: [
        {
            title: "WEBSOCKET_PIPE",
            subtitle: "500+ TPS",
            description: "Real-time ingestion with message batching (50ms) and memoized selectors.",
            image: "/blueprint-1.jpg",
            link: "https://github.com/Doritosaur/schema-draw/blob/main/assets/websocket.png"
        },
        {
            title: "CUSTOM_RENDERER",
            subtitle: "CANVAS API",
            description: "Quadtree spatial indexing for efficient zoom/pan on 100k+ data points.",
            image: "/blueprint-2.jpg",
            link: "https://github.com/Doritosaur/schema-draw/blob/main/assets/quad-tree-arch.png"
        },
        {
            title: "DATA_NORMALIZER",
            subtitle: "ETHEREUM RPC",
            description: "Parsing raw RPC responses into strongly-typed domain models with validation.",
            image: "/blueprint-3.jpg",
            link: "https://github.com/Doritosaur/schema-draw/blob/main/assets/eth-rpc-parser.png"
        },
        {
            title: "HFT_ORDERBOOK",
            subtitle: "FAST UI",
            description: "Optimized rendering pipeline achieving sub-16ms frame times under heavy update loads.",
            image: "/blueprint-4.jpg",
            link: "https://github.com/Doritosaur/schema-draw/blob/main/assets/hft-orderbook.png"
        }
    ]
}));
