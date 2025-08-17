import {useMDXComponents as getThemeComponents} from 'nextra-theme-docs'
import Link from "next/link";
import {ComponentProps} from "react";
import {cn} from "@/lib/utils";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const themeComponents = getThemeComponents()

export function useMDXComponents<T>(components?: T) {
  return {
    ...themeComponents,
    ...components,
    LinkedCard: ({className, ...props}: ComponentProps<typeof Link>) => (
      <Link
        className={cn(
          "bg-card text-card-foreground flex rounded-md border p-4 flex items-center hover:shadow-sm transition-shadow",
          className
        )}
        {...props}
      />
    ),
    Tabs: ({className, ...props}: React.ComponentProps<typeof Tabs>) => {
      return <Tabs className={cn("relative mt-[1.25em] w-full", className)} {...props} />
    },
    TabsList: ({
                 className,
                 ...props
               }: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        className={cn(
          "justify-start gap-4 rounded-none bg-transparent px-2 md:px-0",
          className
        )}
        {...props}
      />
    ),
    TabsTrigger: ({
                    className,
                    ...props
                  }: React.ComponentProps<typeof TabsTrigger>) => (
      <TabsTrigger
        className={cn(
          "cursor-pointer text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent",
          className
        )}
        {...props}
      />
    ),
    TabsContent: ({
                    className,
                    ...props
                  }: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent
        className={cn(
          "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6",
          className
        )}
        {...props}
      />
    ),
    Tab: ({className, ...props}: React.ComponentProps<"div">) => (
      <div className={cn(className)} {...props} />
    ),
    table: ({className, ...props}: React.ComponentProps<typeof Table>) => {
      return <Table className={cn(className, "mt-[0.75em]")} {...props} />
    },
    thead: ({className, ...props}: React.ComponentProps<typeof TableHeader>) => {
      return <TableHeader className={className} {...props} />
    },
    th: ({className, ...props}: React.ComponentProps<typeof TableHead>) => {
      return <TableHead className={className} {...props} />
    },
    tr: ({className, ...props}: React.ComponentProps<typeof TableRow>) => {
      return <TableRow className={className} {...props} />
    },
    tbody: ({className, ...props}: React.ComponentProps<typeof TableBody>) => {
      return <TableBody className={className} {...props} />
    },
    td: ({className, ...props}: React.ComponentProps<typeof TableCell>) => {
      return <TableCell className={cn(className, "whitespace-normal")} {...props} />
    },
  }
}