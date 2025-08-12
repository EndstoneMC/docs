import {Footer, Layout, Navbar} from 'nextra-theme-docs'
import {Banner, Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import '@/app/globals.css'
import {FaDiscord, FaDocker, FaGithub, FaPython} from 'react-icons/fa'
import {FaXTwitter} from "react-icons/fa6";

const extra = {
  social: [
    {
      icon: FaGithub,
      link: 'https://github.com/EndstoneMC',
    },
    {
      icon: FaPython,
      link: 'https://pypi.org/project/endstone',
    },
    {
      icon: FaDocker,
      link: 'https://hub.docker.com/u/endstone',
    },
    {
      icon: FaXTwitter,
      link: 'https://twitter.com/endstone_mc',
    },
    {
      icon: FaDiscord,
      link: 'https://discord.gg/xxgPuc2XN9',
    },
  ]
}

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>

const navbar = (
  <Navbar
    logo={<b>Nextra</b>}
    // ... Your additional navbar options
  />
)

const footer = <footer className="bg-gray-100 dark:bg-neutral-900">
  <div
    className="mx-auto max-w-(--nextra-content-width) pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
    <hr className="nextra-border"/>
    <div className="py-12 md:flex md:items-center md:justify-between">
      <div className="flex gap-x-5 md:order-2">
        {extra.social.map((item, index) => (
          <a key={index} href={item.link} className="text-gray-600 hover:text-gray-800">
            <item.icon aria-hidden="true" className="size-6"/>
          </a>
        ))}
      </div>
      <div className="mt-8 text-gray-600 md:order-1 md:mt-0">
        <p className="text-sm"> Copyright &copy; 2023 - {new Date().getFullYear()} EndstoneMC. </p>
        <p className="text-xs pt-1"> Made with <a href="https://nextra.site/">Nextra</a> </p>
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
    <Head
      // ... Your additional head options
    >
      {/* Your additional tags should be passed as `children` of `<Head>` element */}
    </Head>
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