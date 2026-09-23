import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, Download, MapPin } from "lucide-react";
import { toast } from "sonner";
import { CARD, IMAGES } from "@/lib/cardData";
import { downloadVCard } from "@/lib/vcard";

const EASE = [0.16, 1, 0.3, 1] as const;

function MaskedLine({ text, index, base, className }: { text: string; index: number; base: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EASE, delay: base + index * 0.13 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero({ base = 1.55 }: { base?: number }) {
  const BASE_DELAY = base;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 sm:mt-8"
    >
      <motion.img
        data-testid="hero-portrait"
        src={IMAGES.hero}
        alt="Kyle-Terin Phillip at a live show"
        style={{ y: imgY, scale: 1.15 }}
        className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/95 via-[#0A0A0C]/65 to-[#0A0A0C]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/30" />

      <div className="relative px-6 py-14 sm:px-12 sm:py-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: BASE_DELAY - 0.15 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-zinc-300"
          data-testid="hero-overline"
        >
          Freelance — Production Coordination / Personal Assistance
        </motion.p>

        <h1
          data-testid="hero-headline"
          className="font-heading text-[clamp(3rem,12vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-tighter"
        >
          <MaskedLine text={CARD.line1} index={0} base={base} />
          <MaskedLine text={CARD.line2} index={1} base={base} className="text-stroke" />
        </h1>

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
            className="flex items-center gap-2 rounded-full border border-white/25 bg-[#0A0A0C]/40 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-zinc-100 backdrop-blur-sm transition-colors duration-200 hover:border-amber-500/50 hover:text-amber-300 active:scale-[0.97]"
          >
            <Calendar className="h-4 w-4" />
            Book Intro Call
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: BASE_DELAY + 0.8 }}
          className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300"
        >
          <MapPin className="h-3.5 w-3.5 text-amber-500/80" />
          {CARD.location} — {CARD.travel}
        </motion.p>
      </div>
    </section>
  );
}
