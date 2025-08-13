import {Layout, Navbar} from 'nextra-theme-docs'
import {Banner, Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import '@/app/globals.css'
import {FaDiscord, FaGithub} from 'react-icons/fa'
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {siteConfig} from "@/app/config";
import {ModeToggle} from "@/components/magicui/mode-toggle";
import React from "react";

import {Geist, Geist_Mono} from 'next/font/google'

const geistSans = Geist({
  subsets: ['latin'],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner dismissible={false} storageKey="under-construction">⚠ Under Construction</Banner>

const navbar = (
  <Navbar
    align="left"
    logo={
      <div className="flex gap-2 items-center mr-8">
        <Image src="/logo.png" alt="logo" width={28} height={28}/>
        <b className="text-xl font-mono font-semibold tracking-tighter">Endstone</b>
      </div>
    }
  >
    <div className="flex">
      <Button variant="ghost" className="w-9 h-9" asChild>
        <Link href={siteConfig.repo_url} target="_blank" rel="noreferrer">
          <FaGithub className="size-5"/>
          <span className="sr-only">GitHub</span>
        </Link>
      </Button>
      <Button variant="ghost" className="w-9 h-9" asChild>
        <Link href={siteConfig.extra.social[4].link} target="_blank" rel="noreferrer">
          <FaDiscord className="size-5"/>
          <span className="sr-only">Discord</span>
        </Link>
      </Button>
      <ModeToggle/>
    </div>
  </Navbar>
)


const footer = <footer>
  <div
    className="mx-auto max-w-(--nextra-content-width) pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
    <hr className="nextra-border"/>
    <div className="py-12 md:flex md:items-center md:justify-between">
      <div className="flex gap-x-2 md:order-2">
        {siteConfig.extra.social.map((item, index) => (
          <Button key={index} variant="ghost" className="w-12 h-12" asChild>
            <Link href={item.link} target="_blank" rel="noreferrer">
              <item.icon className="size-6"/>
            </Link>
          </Button>
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
    <html lang="en" dir="ltr" suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
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