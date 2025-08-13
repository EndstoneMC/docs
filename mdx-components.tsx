import {useMDXComponents as getThemeComponents} from 'nextra-theme-docs'
import Link from "next/link";
import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

const themeComponents = getThemeComponents()

export function useMDXComponents<T>(components: T) {
  return {
    ...themeComponents,
    ...components,
    LinkedCard: ({ className, ...props }: ComponentProps<typeof Link>) => (
      <Link
        className={cn(
        "bg-card text-card-foreground flex rounded-md border p-4 flex items-center hover:shadow-sm transition-shadow",
        className
    )}
  {...props}
  />
)
  }
}