import { hero, projects } from "../content";
import ThemeToggle from "./ThemeToggle";

const link = "nav-link";

export default function Sidebar() {
  return (
    <aside className="lg:sticky lg:top-12 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:w-56 lg:shrink-0 pb-8">
      <nav className="flex flex-col gap-8">
        <div>
          <a href="#top" className="nav-link">
            {hero.name}
          </a>
          <div>{hero.role}</div>
        </div>

        <ul>
          <li className="text-fg">Projects</li>
          {projects.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className={link}>
                {p.title}
              </a>
            </li>
          ))}
        </ul>

        <ul>
          <li>
            <a href="#experience" className={link}>
              Experience
            </a>
          </li>
          <li>
            <a href="#skills" className={link}>
              Skills
            </a>
          </li>
        </ul>

        <hr className="border-rule" />

        <ul>
          <li>
            <a href={hero.resumeLink} target="_blank" rel="noopener noreferrer" className={link}>
              Resume
            </a>
          </li>
          {hero.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
    </aside>
  );
}
