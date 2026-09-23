import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, Download, MapPin } from "lucide-react";
import { toast } from "sonner";
import { CARD, IMAGES } from "@/lib/cardData";
import { downloadVCard } from "@/lib/vcard";

const EASE = [0.16, 1, 0.3, 1] as const;
const BASE_DELAY = 1.55;

function MaskedLine({ text, index, className }: { text: string; index: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EASE, delay: BASE_DELAY + index * 0.13 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative pt-10 sm:pt-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
        <motion.div style={{ y: textY }} className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: BASE_DELAY - 0.15 }}
            className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-zinc-400"
            data-testid="hero-overline"
          >
            Freelance — Production Coordination / Personal Assistance
          </motion.p>

          <h1
            data-testid="hero-headline"
            className="font-heading text-[clamp(3rem,12vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-tighter"
          >
            <MaskedLine text={CARD.line1} index={0} />
            <MaskedLine text={CARD.line2} index={1} className="text-stroke" />
            <span className="block overflow-hidden">
              <motion.span
                className="block font-serif text-[clamp(1.6rem,5vw,3rem)] font-normal normal-case italic tracking-normal text-amber-400/90"
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EASE, delay: BASE_DELAY + 0.32 }}
              >
                runs the show.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: BASE_DELAY + 0.5 }}
            className="mt-6 max-w-md text-base leading-relaxed text-zinc-300"
            data-testid="hero-tagline"
          >
            {CARD.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: BASE_DELAY + 0.62 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              data-testid="save-vcard-button"
              onClick={() => {
                downloadVCard();
                toast.success("Contact card downloaded");
              }}
              className="group flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-amber-400 active:scale-[0.97]"
            >
              <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              Save to Contacts
            </button>
            <a
              data-testid="booking-cta-button"
              href={CARD.booking}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-zinc-100 transition-colors duration-200 hover:border-amber-500/50 hover:text-amber-300 active:scale-[0.97]"
            >
              <Calendar className="h-4 w-4" />
              Book Intro Call
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: BASE_DELAY + 0.8 }}
            className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            <MapPin className="h-3.5 w-3.5 text-amber-500/70" />
            {CARD.location} — {CARD.travel}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: BASE_DELAY + 0.25 }}
          className="relative md:col-span-5"
        >
          <motion.div
            style={{ y: imgY }}
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(245,158,11,0.12)]"
            data-testid="hero-portrait"
          >
            <img
              src={IMAGES.hero}
              alt="Backstage production crew under stage lights"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/85 via-transparent to-[#0A0A0C]/20" />
            <div className="absolute inset-2 rounded-xl border border-amber-500/25" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300">
                Scene 01 — Backstage
              </p>
              <p className="font-serif text-sm italic text-amber-400/90">est. chaos, managed</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
