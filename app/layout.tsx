import {Layout, Navbar} from 'nextra-theme-docs'
import {Banner, Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import '@/app/globals.css'
import {FaDiscord, FaGithub} from 'react-icons/fa'
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {siteConfig} from "@/app/config";
import {ModeToggle} from "@/components/magicui/mode-toggle";
import React from "react";


export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner dismissible={false} storageKey="under-construction">⚠ Under Construction</Banner>

const navbar = (
  <Navbar
    logo={
      <div className="flex gap-2 items-center">
        <Image src="/logo.png" alt="logo" width={28} height={28}/>
        <b className="text-xl">Endstone</b>
      </div>
    }
  >
    <div className="flex">
      <Link
        href={siteConfig.repo_url}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "w-9 px-0",
          )}
        >
          <FaGithub className="size-5"/>
          <span className="sr-only">GitHub</span>
        </div>
      </Link>
      <Link
        href={siteConfig.extra.social[4].link}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "w-9 px-0",
          )}
        >
          <FaDiscord className="size-5"/>
          <span className="sr-only">Discord</span>
        </div>
      </Link>
      <ModeToggle/>
    </div>
  </Navbar>
)


const footer = <footer>
  <div
    className="mx-auto max-w-(--nextra-content-width) pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
    <hr className="nextra-border"/>
    <div className="py-12 md:flex md:items-center md:justify-between">
      <div className="flex gap-x-5 md:order-2">
        {siteConfig.extra.social.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0",
              )}
            >
              <item.icon className="size-6"/>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 md:order-1 md:mt-0">
        <p className="text-sm"> Copyright &copy; 2023 - {new Date().getFullYear()} EndstoneMC. </p>
        <p className="text-xs pt-1"> Made with <a href="https://nextra.site/" className="font-semibold">Nextra</a></p>
      </div>
    </div>
  </div>
</footer>

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
    <Head/>
    <body>
    <Layout
      banner={banner}
      navbar={navbar}
      pageMap={await getPageMap()}
      docsRepositoryBase="https://github.com/EndstoneMC/docs/tree/main"
      footer={footer}
      // ... Your additional layout options
    >
      {children}
    </Layout>
    </body>
    </html>
  )
}