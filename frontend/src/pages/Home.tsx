import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import TopBar from "@/components/card/TopBar";
import Hero from "@/components/card/Hero";
import Marquee from "@/components/card/Marquee";
import ActionLinks from "@/components/card/ActionLinks";
import InquirySection from "@/components/card/InquirySection";
import Footer from "@/components/card/Footer";
import { CARD } from "@/lib/cardData";

export default function Home() {
  const [intro, setIntro] = useState(() => !sessionStorage.getItem("ktp_intro_seen"));
  const [heroBase] = useState(() => (sessionStorage.getItem("ktp_intro_seen") ? 0.2 : 1.55));

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    let raf = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!intro) return;
    sessionStorage.setItem("ktp_intro_seen", "1");
    const t = setTimeout(() => setIntro(false), 1400);
    return () => clearTimeout(t);
  }, [intro]);

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-[#EDEDEE]">
      <AnimatePresence>
        {intro && (
          <motion.div
            data-testid="preloader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">
              Scene 01 — Take 01
            </p>
            <p className="mt-3 font-serif text-2xl italic text-amber-400/90">{CARD.name}</p>
            <motion.div
              className="mt-6 h-px w-40 origin-left bg-amber-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-40 grain opacity-[0.05]" />
      <div className="pointer-events-none fixed -top-40 left-1/2 z-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-[120px]" />

      <main className="relative z-10 mx-auto max-w-4xl px-4 pt-6 sm:px-6 sm:pt-8">
        <TopBar />
        <Hero base={heroBase} />
        <Marquee />
        <ActionLinks />
        <InquirySection />
        <Footer />
      </main>
      <Toaster />
    </div>
  );
}
