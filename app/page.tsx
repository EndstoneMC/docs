import {AnimatedGridPattern} from "@/components/magicui/animated-grid-pattern";
import {cn} from "@/lib/utils";
import {AnimatedSpan, Terminal, TypingAnimation} from "@/components/magicui/terminal";
import Link from "next/link";
import {ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaGithub} from "react-icons/fa";
import {BentoCard, BentoGrid} from "@/components/magicui/bento-grid";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section id="hero" className="relative h-full">
        <AnimatedGridPattern maxOpacity={0.1}
                             numSquares={30}
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
            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty sm:text-6xl">
              Full-featured server software
              <span
                className="font-bold bg-gradient-to-b from-black to-gray-500/90 dark:from-white dark:to-slate-900/10 bg-clip-text text-transparent"> built for Bedrock.</span>
            </h1>
            <p className="mt-8 text-lg font-medium text-muted-foreground sm:text-xl/8">
              Experience Bedrock the way it was meant to be played:
              <span className="font-bold text-primary"> every vanilla feature intact, with zero compromises</span>.
              Endstone delivers a modern, powerful and familiar API that empowers you to extend, customise, and scale
              your server effortlessly.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <Button className="rounded-xl has-[svg]:pl-4 h-10 group" asChild>
                <Link href="/docs/getting-started">
                  Getting Started
                  <ChevronRight
                    className="size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-0.5"/>
                </Link>
              </Button>
              <Button className="rounded-xl h-10" variant="outline" asChild>
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
      <section id="features" className="relative py-14 bg-zinc-100 dark:bg-zinc-900/30">
        <div
          className="flex flex-col w-full gap-4 py-1 px-7 md:px-10 md:mx-auto mx-auto max-w-(--nextra-content-width) pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
            Features
          </h2>
          <h3
            className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
            Everything you need for a modern bedrock server.
          </h3>
          <BentoGrid className="grid-cols-1 lg:grid-cols-3 w-full">
            <BentoCard name="All Vanilla Features"
                       className="col-span-1 lg:col-span-2 dark"
                       background={<Image fill={true} objectFit="cover" src="/assets/vanilla-features.jpg"
                                          alt="Vanilla Features"/>}
                       description="Endstone supports every vanilla feature, from mob AI to world generation, redstone mechanics, and behavior packs."
                       href="#" cta="Get Started"/>
            <BentoCard name="Up to Date. Cross-platform."
                       className="col-span-1"
                       background={<></>}
                       description="Stay current with the game: major updates supported within 1–2 days, minor updates even faster. Works on both Windows and Linux with native builds."
                       href="#" cta="Get Started"/>
            <BentoCard name="Better Events, More Control."
                       className="col-span-1"
                       background={<></>}
                       description="Frustrated with immutable events in the Script API? Endstone offers more before events that let you cancel actions, modify results, and fine-tune gameplay logic."
                       href="#" cta="Get Started"/>
            <BentoCard name="Paper-Style Developer Experience"
                       className="col-span-1"
                       background={<></>}
                       description="If you’ve developed for Paper or Bukkit, you’ll feel right at home. Our API design mirrors the best parts of Java server development, making your transition smooth and intuitive."
                       href="#" cta="Get Started"/>
            <BentoCard name="Low-Level Packet Access"
                       className="col-span-1"
                       background={<></>}
                       description="Easily hook into network packets to implement advanced features like anti-xray, cross-version support, or protocol monitoring."
                       href="#" cta="Get Started"/>

          </BentoGrid>
        </div>
      </section>
      <section id="features" className="relative py-14">
        <div
          className="flex flex-col w-full gap-4 py-1 px-7 md:px-10 md:mx-auto mx-auto max-w-(--nextra-content-width) pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
            Why Endstone?
          </h2>
          <h3
            className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
            Feature Comparison
          </h3>
        </div>
      </section>
    </div>
  );
}
