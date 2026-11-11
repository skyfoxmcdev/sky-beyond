import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ink" | "outline-ink";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  onClick,
}: ButtonLinkProps) {
  const classes = cn("btn", className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        data-variant={variant}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-variant={variant} onClick={onClick}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ComponentProps<"button">;

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={cn("btn", className)} data-variant={variant} {...props}>
      {children}
    </button>
  );
}
