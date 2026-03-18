import type { ReactNode } from "react";
import { type DocEntry, slugToHref } from "../lib/docs";
import { DocsDetailLayout } from "./docs/DocsDetailLayout";
import { DocsLandingLayout } from "./docs/DocsLandingLayout";
import { DocsShell } from "./docs/DocsShell";

type DocsLayoutProps = {
  children: ReactNode;
  currentSlug: string[];
  entry: DocEntry;
};

export function DocsLayout({ children, currentSlug, entry }: DocsLayoutProps) {
  const currentPath = slugToHref(currentSlug);
  const isLanding = entry.pageType === "landing";

  return (
    <DocsShell currentPath={currentPath} entry={entry} isLanding={isLanding}>
      {isLanding ? <DocsLandingLayout entry={entry}>{children}</DocsLandingLayout> : <DocsDetailLayout entry={entry}>{children}</DocsDetailLayout>}
    </DocsShell>
  );
}
