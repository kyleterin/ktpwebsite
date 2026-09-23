import { MARQUEE_ITEMS } from "@/lib/cardData";

export default function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      data-testid="marquee-ribbon"
      className="relative mt-16 overflow-hidden border-y border-white/8 py-4 sm:mt-24"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-heading text-lg font-bold uppercase tracking-widest text-zinc-500">
                  {item}
                </span>
                <span className="mx-8 text-amber-500/70">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0C] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0C] to-transparent" />
    </div>
  );
}
