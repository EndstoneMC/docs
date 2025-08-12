"use client";

import React from "react";
import {useTheme} from "next-themes";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {FaMoon, FaSun} from "react-icons/fa";

export const ModeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & { className?: string }
>(({className, ...props}, ref) => {
  const {theme, setTheme} = useTheme();

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      className={cn("px-0 w-9 cursor-pointer", className)}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      {...props}
    >
      <FaSun className="size-4 text-neutral-800 dark:hidden dark:text-neutral-200"/>
      <FaMoon className="hidden size-4 text-neutral-800 dark:block dark:text-neutral-200"/>
    </Button>
  );
});

ModeToggle.displayName = "ModeToggle";