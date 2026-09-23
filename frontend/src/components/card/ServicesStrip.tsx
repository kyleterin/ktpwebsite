import Reveal from "./Reveal";
import { IMAGES, SERVICES } from "@/lib/cardData";

export default function ServicesStrip() {
  return (
    <section data-testid="services-section" className="relative mt-16 sm:mt-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{ backgroundImage: `url(${IMAGES.crew})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">What I run</p>
        <h2 className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          Four ways I <span className="font-serif normal-case italic tracking-normal text-amber-400/90">take the weight</span>
        </h2>
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <Reveal key={s.code} delay={i * 0.08} className="h-full">
            <article
              data-testid={`service-card-${s.code}`}
              className="flex h-full flex-col rounded-2xl border border-white/8 bg-[#121216] p-5 transition-colors duration-300 hover:border-amber-500/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/80">{s.code}</p>
              <h3 className="mt-3 font-heading text-base font-bold leading-snug text-white">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
