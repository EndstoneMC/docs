"use client";

import {NotFoundPage} from 'nextra-theme-docs'
import {usePathname} from "next/navigation";
import {useMounted} from 'nextra/hooks'
import {useThemeConfig} from 'nextra-theme-docs'
import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {LinkArrowIcon} from 'nextra/icons'

function gitUrlParse(url: string) {
  const {href, origin, pathname} = new URL(url)

  const [, owner, name] = pathname.split('/', 3)
  return {
    href,
    origin,
    owner,
    name
  }
}

function getGitIssueUrl({
                          repository = '',
                          title,
                          labels
                        }: {
  repository?: string
  title: string
  labels?: string
}): string {
  const repo = gitUrlParse(repository)
  if (repo.origin.includes('gitlab')) {
    return `${repo.origin}/${repo.owner}/${
      repo.name
    }/-/issues/new?issue[title]=${encodeURIComponent(title)}${
      labels
        ? `&issue[description]=/label${encodeURIComponent(` ~${labels}\n`)}`
        : ''
    }`
  }
  if (repo.origin.includes('github')) {
    return `${repo.origin}/${repo.owner}/${
      repo.name
    }/issues/new?title=${encodeURIComponent(title)}&labels=${labels || ''}`
  }
  return '#'
}

export default function NotFound() {
  const config = useThemeConfig()
  const pathname = usePathname()
  const mounted = useMounted()
  const ref = mounted && document.referrer
  const referrer = ref ? ` from "${ref}"` : ''

  return (
    <NotFoundPage content={<></>}>
      <div className="text-center">
        <p className="text-xl font-semibold">404</p>
        <h1 className="mt-4 text-5xl sm:text-7xl font-semibold">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-muted-foreground sm:text-xl/8">
          Oops, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button className="rounded-xl h-10 group" asChild>
            <Link href="/">
              <ChevronLeft
                className="size-4 shrink-0 transition-all duration-300 ease-out group-hover:-translate-x-0.5"/>
              Go back home
            </Link>
          </Button>
          <Button className="rounded-xl h-10 group" variant="link" asChild>
            <Link href={getGitIssueUrl({
              repository: config.docsRepositoryBase,
              title: `Found broken "${mounted ? pathname : ''}" link${referrer}.`,
              labels: 'bug',
            })}>
              <p>Submit an issue
                <LinkArrowIcon height="1em" className="inline align-baseline shrink-0"/>
              </p>
            </Link>
          </Button>
        </div>
      </div>
    </NotFoundPage>
  )
}