import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function QrModal() {
  const url = typeof window !== "undefined" ? window.location.origin : "";
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            data-testid="qr-code-trigger"
            className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-heading text-xs font-bold uppercase tracking-wide text-zinc-100 transition-colors duration-200 hover:border-amber-500/50 hover:text-amber-300 active:scale-[0.97]"
          />
        }
      >
        <QrCode className="h-4 w-4" />
        Scan this card
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs" data-testid="qr-code-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-bold uppercase tracking-tight">
            Hand it over
          </DialogTitle>
          <DialogDescription>Point any phone camera — the card opens instantly.</DialogDescription>
        </DialogHeader>
        <div className="mx-auto rounded-2xl bg-white p-4">
          <QRCodeSVG value={url} size={200} level="M" fgColor="#0A0A0C" />
        </div>
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{url}</p>
      </DialogContent>
    </Dialog>
  );
}
