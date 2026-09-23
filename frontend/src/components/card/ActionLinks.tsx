import { ArrowUpRight, Calendar, Copy, Instagram, Linkedin, Mail, MessageSquare, PhoneCall } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { CARD } from "@/lib/cardData";
import type { ComponentType } from "react";

interface Channel {
  key: string;
  title: string;
  value: string;
  href: string;
  badge: string;
  copyValue: string;
  Icon: ComponentType<{ className?: string }>;
}

const CHANNELS: Channel[] = [
  { key: "email", title: "Email", value: CARD.email, href: `mailto:${CARD.email}`, badge: "Fastest response", copyValue: CARD.email, Icon: Mail },
  { key: "phone", title: "Direct Mobile", value: CARD.phoneDisplay, href: `tel:${CARD.phoneRaw}`, badge: "Urgent production only", copyValue: CARD.phoneRaw, Icon: PhoneCall },
  { key: "whatsapp", title: "WhatsApp", value: "Chat directly", href: CARD.whatsapp, badge: "Instant message", copyValue: CARD.whatsapp, Icon: MessageSquare },
  { key: "booking", title: "Book a 15-min intro", value: CARD.bookingHandle, href: CARD.booking, badge: "Tour / gig scoping", copyValue: CARD.booking, Icon: Calendar },
  { key: "instagram", title: "Instagram", value: CARD.instagramHandle, href: CARD.instagram, badge: "Touring BTS", copyValue: CARD.instagram, Icon: Instagram },
  { key: "linkedin", title: "LinkedIn", value: CARD.linkedinHandle, href: CARD.linkedin, badge: "Credits & endorsements", copyValue: CARD.linkedin, Icon: Linkedin },
];

async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  } catch {
    toast.error("Copy failed — long-press to copy instead");
  }
}

export default function ActionLinks() {
  return (
    <section data-testid="contact-section" className="mt-16 sm:mt-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">Direct lines</p>
        <h2 className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          Get me <span className="font-serif normal-case italic tracking-normal text-amber-400/90">on set</span>
        </h2>
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.06}>
            <div
              data-testid={`contact-channel-${c.key}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-[#18181E] p-4 transition-colors duration-300 hover:border-amber-500/40 hover:bg-[#1C1C23]"
            >
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex min-w-0 flex-1 items-center gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#121216] text-amber-400 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <c.Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-heading text-sm font-bold text-white">{c.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-zinc-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />
                  </span>
                  <span className="block truncate text-sm text-zinc-400">{c.value}</span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    {c.badge}
                  </span>
                </span>
              </a>
              <button
                data-testid={`copy-${c.key}-button`}
                onClick={() => copy(c.copyValue, c.title)}
                aria-label={`Copy ${c.title}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-colors duration-200 hover:border-amber-500/40 hover:text-amber-400 active:scale-90"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
