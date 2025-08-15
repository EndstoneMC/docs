import type {NextConfig} from "next";
import nextra from 'nextra'


const withNextra = nextra({
  whiteListTagsStyling: ['table', 'thead', 'tbody', 'tr', 'th', 'td']
})


const nextConfig: NextConfig = withNextra({
  /* config options here */
});

export default nextConfig;
