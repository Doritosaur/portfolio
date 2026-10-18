import { Fragment } from "react";
import ProjectStack from "./components/ProjectStack";
import Sidebar from "./components/Sidebar";
import { hero, projects, roles, skills } from "./content";

const rule = "border-t border-rule";
const item = `${rule} pt-5`;

export default function Home() {
  return (
    <div
      id="top"
      className="mx-auto flex max-w-[1800px] flex-col gap-8 px-5 py-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-10"
    >
      <Sidebar />

      <main className="min-w-0 flex-1 pb-24">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Hello! I’m Aman
        </h1>
        <p className="mt-4 text-2xl leading-snug sm:text-3xl">
          I’m a <span className="wavy">{hero.role.toLowerCase()}</span> based in {hero.location}.
        </p>

        <div id="about" className="mt-10 max-w-3xl scroll-mt-12 space-y-6">
          <p>I love building things with computers.</p>
          <p>
            I enjoy exploring ideas, experimenting with new technologies, and turning things I’m
            curious about into something real. I’m especially drawn to understanding how things
            work under the hood, from the systems that power an application to the details that
            make a product feel right.
          </p>
          <p>
            Over the years, that curiosity has taken me from building products from scratch as a
            founding engineer to exploring AI, backend systems, and everything in between.
          </p>
          <p>
            I like having the freedom to explore an idea, get my hands dirty, and see what I can
            make of it. This website is a collection of some of those explorations.
          </p>
        </div>

        <section id="projects" className={`${rule} mt-10 scroll-mt-12 pt-8`}>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <ProjectStack projects={projects} />
        </section>

        <section id="experience" className={`${rule} mt-10 scroll-mt-12 pt-8`}>
          <h2 className="text-2xl font-semibold">Experience</h2>
          <ul className="mt-5 space-y-6">
            {roles.map((r) => (
              <li key={r.company} className={item}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                  <h3 className="text-xl font-semibold">
                    {r.company} <span className="text-base font-normal text-muted">{r.role}</span>
                  </h3>
                  <p className="text-muted">{r.period}</p>
                </div>
                <p className="mt-2 max-w-3xl text-muted">{r.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className={`${rule} mt-10 scroll-mt-12 pt-8`}>
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
