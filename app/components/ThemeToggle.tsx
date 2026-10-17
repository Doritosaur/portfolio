"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const subscribe = (cb: () => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const applyTheme = (next: Theme) => {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "light");

  const option = (value: Theme, label: string) => (
    <button
      type="button"
      onClick={() => applyTheme(value)}
      aria-pressed={theme === value}
      className={`cursor-pointer transition-colors hover:text-fg ${
        theme === value ? "text-fg" : "text-muted"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex gap-2" role="group" aria-label="Theme">
      {option("light", "Light")}
      <span className="text-rule" aria-hidden>
        |
      </span>
      {option("dark", "Dark")}
    </div>
  );
}
