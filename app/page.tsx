import { Fragment } from "react";
import ProjectCard from "./components/ProjectCard";
import Sidebar from "./components/Sidebar";
import { hero, projects, roles, skills } from "./content";

const rule = "border-t border-rule";
const item = `${rule} py-6 first:border-t-0 first:pt-0`;

export default function Home() {
  return (
    <div
      id="top"
      className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-10 lg:flex-row lg:gap-24 lg:px-12 lg:py-12"
    >
      <Sidebar />

      <main className="min-w-0 flex-1 pb-24">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Hello! I’m Aman <span className="font-normal text-muted">(he/him)</span>
        </h1>
        <p className="mt-4 text-2xl leading-snug sm:text-3xl">
          I’m a <span className="wavy">{hero.role.toLowerCase()}</span> based in {hero.location}.
        </p>

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>

        <div className="mt-10 max-w-3xl space-y-6">
          <p>
            <strong className="wavy font-semibold">Co-Founder &amp; Founding Engineer.</strong>{" "}
            Built and shipped the core product from 0 to 1, owning architecture, engineering, and
            key technical decisions as part of the founding team. Wore multiple hats across
            product, infrastructure, and growth to take the company from idea to a working
            platform.
          </p>
          <p>
            Most of my work sits where data-heavy interfaces meet the systems behind them. At
            Cryptk that meant a canvas-based charting library rendering 100K+ candles, a
            WebSocket pipeline handling 500+ updates a second, and typed models for raw Ethereum
            data. Before that I built analytics tooling at Ascendeum and a supply chain platform
            for METRO at Infosys, including a 100+ component library shared across three teams.
          </p>
          <p>
            Today I’m a <span className="wavy">full stack engineer</span> at SuperLaw, building
            WebSocket-based chat interfaces for legal document workflows, wiring LLMs into case
            ingestion for AI-powered legal research, and shipping the FastAPI services behind
            document processing. I like owning a feature from the interface down to the backend.
          </p>
        </div>

        <section id="experience" className={`${rule} mt-12 scroll-mt-12 pt-10`}>
          <h2 className="text-2xl font-semibold">Experience</h2>
          <ul className="mt-6">
            {roles.map((r) => (
              <li key={r.company} className={item}>
                <div>
                  <span className="text-muted">{r.period}</span> {r.role},{" "}
                  <span className="text-xl font-semibold">{r.company}</span>
                </div>
                <ul className="mt-2 max-w-3xl list-disc space-y-1 pl-5 text-muted marker:text-rule">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className={`${rule} mt-6 scroll-mt-12 pt-10`}>
          <h2 className="text-2xl font-semibold">Skills</h2>
          <dl className="mt-4 grid grid-cols-[8rem_1fr] gap-x-6 gap-y-1">
            {skills.map((g) => (
              <Fragment key={g.category}>
                <dt className="text-muted">{g.category}</dt>
                <dd>{g.items.join(", ")}</dd>
              </Fragment>
            ))}
          </dl>
        </section>

        <footer className={`${rule} mt-12 flex flex-wrap gap-x-6 gap-y-1 pt-6 text-muted`}>
          <span>
            © {new Date().getFullYear()} {hero.name}
          </span>
          <a href="/LICENSE" className="hover:text-fg">
            MIT License
          </a>
        </footer>
      </main>
    </div>
  );
}
