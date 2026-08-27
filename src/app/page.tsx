import { CanvasWrapper } from "@/app/components/CanvasWrapper";
import { TopBar } from "@/app/components/shell/TopBar";
import { SideNav } from "@/app/components/shell/SideNav";
import { SocialRail } from "@/app/components/shell/SocialRail";
import { PersonalAssistant } from "@/app/components/PersonalAssistant";
import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { Projects } from "@/app/components/sections/Projects";
import { Skills } from "@/app/components/sections/Skills";
import { Experiments } from "@/app/components/sections/Experiments";
import { Writing } from "@/app/components/sections/Writing";
import { Contact } from "@/app/components/sections/Contact";
import { site } from "@/lib/site";

function Divider() {
  return <div className="mx-auto h-px max-w-6xl bg-line" />;
}

export default function Home() {
  return (
    <>
      <CanvasWrapper />
      <TopBar />
      <SideNav />
      <SocialRail />
      <PersonalAssistant />

      <main className="relative z-10">
        <Hero />

        {/* Content slab — opaque so sections stay readable above the fixed cosmos */}
        <div className="relative bg-bg">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-bg"
          />
          <About />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Experiments />
          <Divider />
          <Writing />
          <Divider />
          <Contact />

          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center border border-line-strong font-mono text-xs tracking-tight text-fg">
                  {site.monogram}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                  © 2026 {site.fullName.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                DESIGNED &amp; BUILT WITH NEXT.JS · R3F · THREE.JS
              </span>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
