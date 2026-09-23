import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import LogoMark from "./LogoMark";
import QrModal from "./QrModal";
import { CARD } from "@/lib/cardData";
import { downloadVCard } from "@/lib/vcard";

export default function Footer() {
  return (
    <footer data-testid="footer" className="mt-16 border-t border-white/8 pt-10 sm:mt-24">
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <LogoMark className="h-12 w-12" />
          <div>
            <p className="font-heading text-base font-bold uppercase tracking-wide">{CARD.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              {CARD.role}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            data-testid="footer-vcard-button"
            onClick={() => {
              downloadVCard();
              toast.success("Contact card downloaded");
            }}
            className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-heading text-xs font-bold uppercase tracking-wide text-zinc-100 transition-colors duration-200 hover:border-amber-500/50 hover:text-amber-300 active:scale-[0.97]"
          >
            <Download className="h-4 w-4" />
            Save contact (.vcf)
          </button>
          <a
            data-testid="resume-download-button"
            href="/Kyle-Terin-Phillip-Resume.pdf"
            download
            className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-heading text-xs font-bold uppercase tracking-wide text-zinc-100 transition-colors duration-200 hover:border-amber-500/50 hover:text-amber-300 active:scale-[0.97]"
          >
            <FileText className="h-4 w-4" />
            Resume (PDF)
          </a>
          <QrModal />
        </div>
      </div>
      <div className="pb-10" />
    </footer>
  );
}
