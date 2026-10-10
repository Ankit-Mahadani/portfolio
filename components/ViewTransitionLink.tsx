"use client";

import { useRouter } from "next/navigation";
import { reducedMotionNow } from "@/lib/motion";
import { startViewTransition } from "@/lib/view-transition";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function ViewTransitionLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();

    const nav = () => router.push(href);

    if (reducedMotionNow()) nav();
    else startViewTransition(nav);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
