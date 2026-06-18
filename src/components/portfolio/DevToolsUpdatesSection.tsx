import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";

const HINT_DISMISSED_KEY = "code-suggestions-hint-dismissed";

const updates = [
  {
    id: "agentic-extensions-debugging",
    title: "Agentic extensions debugging",
    description:
      "You can now debug extensions through a coding agent using new tools in DevTools for agents, available through the MCP server.",
  },
  {
    id: "sort-network-requests",
    title: "Sort network requests",
    description:
      "The Network panel introduces a new Request # column, allowing you to sort requests by their absolute chronological order of occurrence, independent of priority or duration.",
  },
  {
    id: "accessibility-tree",
    title: "Accessibility tree",
    description:
      "To streamline the Elements panel, the Accessibility tree toggle has moved from the DOM tree to the Accessibility tab within the panel.",
  },
];

export function DevToolsUpdatesSection() {
  const [showHint, setShowHint] = useState(false);
  const [shortcutModifier, setShortcutModifier] = useState("Ctrl");

  useEffect(() => {
    const dismissed = window.localStorage.getItem(HINT_DISMISSED_KEY) === "true";
    const navigatorWithUAData = window.navigator as Navigator & {
      userAgentData?: { platform?: string };
    };
    const platform = navigatorWithUAData.userAgentData?.platform ?? window.navigator.platform;
    const isMacLike = /(Mac|iPhone|iPad|iPod)/i.test(platform);

    setShowHint(!dismissed);
    setShortcutModifier(isMacLike ? "Cmd" : "Ctrl");
  }, []);

  const dismissHint = () => {
    window.localStorage.setItem(HINT_DISMISSED_KEY, "true");
    setShowHint(false);
  };

  return (
    <section className="container-x py-10 md:py-12">
      {showHint && (
        <div className="mb-8 rounded-2xl border border-border bg-surface p-4 text-sm text-foreground md:flex md:items-center md:justify-between md:gap-4">
          <p>
            Press{" "}
            <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
              {shortcutModifier} + I
            </kbd>{" "}
            to enable code suggestions. Press{" "}
            <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
              {shortcutModifier} + X
            </kbd>{" "}
            to disable code suggestions.
          </p>
          <button
            onClick={dismissHint}
            className="mt-3 text-sm font-medium text-primary underline underline-offset-4 md:mt-0"
          >
            Don't show again
          </button>
        </div>
      )}

      <SectionHeader
        label="DevTools updates"
        title={
          <>
            Latest <span className="text-primary">DevTools</span> improvements
          </>
        }
        subtitle="Highlights from recent tooling updates."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {updates.map((update) => (
          <article key={update.id} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="font-display text-xl font-semibold text-foreground">{update.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {update.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
