import type { LinkProps as NextLinkProps } from "next/link";

import Link from "next/link";

// ----------------------------------------------------------------------

interface RouterLinkProps extends Omit<NextLinkProps, "href"> {
  href: string;
  ref?: React.RefObject<HTMLAnchorElement | null>;
}

export function RouterLink({ href, ref, ...other }: RouterLinkProps) {
  return <Link ref={ref} href={href} {...other} />;
}
