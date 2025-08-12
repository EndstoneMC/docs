import {AnimatedGridPattern} from "@/components/magicui/animated-grid-pattern";
import {cn} from "@/lib/utils";
import {AnimatedSpan, Terminal, TypingAnimation} from "@/components/magicui/terminal";
import Link from "next/link";
import {ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaGithub} from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <section id="hero" className="relative h-full">
        <AnimatedGridPattern maxOpacity={0.05}
                             numSquares={2000}
                             width={200}
                             height={200}
                             duration={3}
                             className={cn(
                               "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                               "inset-x-0 h-[100%]",
                             )}/>
        <div
          className="relative h-full overflow-hidden mx-auto mx-auto max-w-(--nextra-content-width) pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:py-40">
          <div className="mx-auto max-w-4xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">
              Full-featured Server Software for Minecraft: Bedrock Edition
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque
              faucibus.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <Button className="rounded-xl" asChild>
                <Link href="/docs/getting-started">
                  Getting Started
                  <ChevronRight
                    className="size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"/>
                </Link>
              </Button>
              <Button className="rounded-xl" variant="outline" asChild>
                <Link href="https://github.com/EndstoneMC/endstone">
                  <FaGithub
                    className="size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"/>
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-16 lg:mt-10 items-center justify-center flex">
            <Terminal className="h-[18rem]">
              <TypingAnimation>&gt; pipx run endstone</TypingAnimation>
              <AnimatedSpan>[Server] Starting Server</AnimatedSpan>
              <AnimatedSpan>[Server] Level Name: Bedrock level</AnimatedSpan>
              <AnimatedSpan>[Database] Opening level &#39;worlds/Bedrock level/db&#39;</AnimatedSpan>
              <AnimatedSpan>[Network] IPv4 supported, port: 19132: Used for gameplay and LAN discovery</AnimatedSpan>
              <AnimatedSpan>[Network] IPv6 supported, port: 19133: Used for gameplay</AnimatedSpan>
              <AnimatedSpan className="text-green-500">
                [Server] Server started.
              </AnimatedSpan>
              <TypingAnimation>&gt;</TypingAnimation>
            </Terminal>
          </div>
        </div>
      </section>
      <section id="showcase" className="relative py-14 bg-gray-200 dark:bg-gray-800">
        <div
          className="flex flex-col w-full max-w-full gap-4 py-1 px-7 md:px-10 md:mx-auto mx-auto max-w-(--nextra-content-width) pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
            Why Endstone?
          </h2>
          <h3
            className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </h3>
        </div>
      </section>
    </div>
  );
}
