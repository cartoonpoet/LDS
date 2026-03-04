import type { ComponentPropsWithoutRef, JSX } from "react";
import Link from "next/link";

type MDXComponents = Record<string, (props: any) => JSX.Element>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 {...props} />,
    h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
    h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
    p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
    a: (props: ComponentPropsWithoutRef<"a">) => {
      const href = typeof props.href === "string" ? props.href : "";
      if (href.startsWith("/")) {
        return <Link href={href}>{props.children}</Link>;
      }

      return <a {...props} />;
    },
    ...components
  };
}
