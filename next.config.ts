import type {NextConfig} from "next";
import nextra from 'nextra'


const withNextra = nextra({
  whiteListTagsStyling: ['table', 'thead', 'tbody', 'tr', 'th', 'td']
})


const nextConfig: NextConfig = withNextra({
  /**
   * Enable static exports.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
});

export default nextConfig;
