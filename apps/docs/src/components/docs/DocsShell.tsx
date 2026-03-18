import type { ReactNode } from "react";
import type { DocEntry } from "../../lib/docs";
import { DocsSidebar } from "./DocsSidebar";
import { DocsToc } from "./DocsToc";

type DocsShellProps = {
  children: ReactNode;
  entry: DocEntry;
  currentPath: string;
  isLanding: boolean;
};

export function DocsShell({ children, entry, currentPath, isLanding }: DocsShellProps) {
  return (
    <div className="docs-shell">
      <DocsSidebar currentPath={currentPath} entry={entry} />
      <main className="docs-main">{children}</main>
      <DocsToc entry={entry} isLanding={isLanding} />
    </div>
  );
}
