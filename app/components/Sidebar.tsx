import { hero, projects } from "../content";
import NavSpy from "./NavSpy";
import ThemeToggle from "./ThemeToggle";

type Item = { label: string; href: string; external?: boolean };

const projectItems: Item[] = projects.map((p) => ({ label: p.title, href: `#${p.id}` }));

const elsewhere: Item[] = [
  { label: "Resume", href: hero.resumeLink, external: true },
  ...hero.socials.map((s) => ({ ...s, external: true })),
];

// Top-level headings, each optionally followed by a smaller list
const outline: { label: string; href?: string; items?: Item[] }[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects", items: projectItems },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Elsewhere", items: elsewhere },
];

function Outline() {
  return (
    <ul className="flex flex-col gap-4">
      {outline.map((section) => (
        <li key={section.label}>
          {section.href ? (
            <a href={section.href} className="nav-link is-primary">
              {section.label}
            </a>
          ) : (
            <span className="font-medium">{section.label}</span>
          )}
          {section.items && (
            <ul className="mt-1 border-l border-rule pl-3 text-[0.9rem] leading-snug">
              {section.items.map((i) => (
                <li key={i.href} className="py-0.5">
                  <a
                    href={i.href}
                    className="nav-link"
                    {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar() {
  return (
    <>
      <NavSpy projectIds={projects.map((p) => p.id)} />
      {/* Small screens: a one-line bar; the menu stays collapsed until opened */}
      <header className="lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="font-semibold">
            {hero.name}
          </a>
          <ThemeToggle />
        </div>
        <details className="group mt-2">
          <summary className="cursor-pointer list-none text-muted hover:text-fg [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu +</span>
            <span className="hidden group-open:inline">Close −</span>
          </summary>
          <nav aria-label="Sections" className="mt-3">
            <Outline />
          </nav>
        </details>
      </header>

      {/* Large screens: sticky rail */}
      <aside className="hidden lg:sticky lg:top-12 lg:block lg:max-h-[calc(100vh-6rem)] lg:w-40 lg:shrink-0 lg:self-start lg:overflow-y-auto">
        <nav aria-label="Sections" className="flex flex-col gap-7">
          <a href="#top" className="font-semibold">
            {hero.name}
          </a>
          <Outline />
          <div className="border-t border-rule pt-5">
            <ThemeToggle />
          </div>
        </nav>
      </aside>
    </>
  );
}
