import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Reveal from "./Reveal";
import { apiPost } from "@/lib/api";
import { IMAGES, PRODUCTION_TYPES } from "@/lib/cardData";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  production_type: string;
  dates: string;
  message: string;
  created_at: string;
}

export default function InquirySection() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(PRODUCTION_TYPES[0]);
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await apiPost<Inquiry>("/inquiries", {
        name,
        email,
        production_type: type,
        dates,
        message,
      });
      toast.success("Brief received — expect a reply within 2 hours");
      setOpen(false);
      setName("");
      setEmail("");
      setDates("");
      setMessage("");
    } catch {
      toast.error("Couldn't send — try email instead");
    } finally {
      setSending(false);
    }
  };

  return (
    <section data-testid="inquiry-section" className="mt-16 sm:mt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <img
            src={IMAGES.camera}
            alt="Camera operator silhouetted against stage light"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/80 to-[#0A0A0C]/40" />
          <div className="relative flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400/80">Scene 02 — Your call</p>
              <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                Got a date on the calendar?
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-300">
                Send a 30-second brief — production type, dates, city — and I'll come back with availability and a plan.
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                render={
                  <button
                    data-testid="inquiry-open-button"
                    className="flex shrink-0 items-center gap-2 rounded-full bg-amber-500 px-7 py-4 font-heading text-sm font-bold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-amber-400 active:scale-[0.97]"
                  />
                }
              >
                <Send className="h-4 w-4" />
                Send a quick brief
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" data-testid="quick-inquiry-dialog">
                <DialogHeader>
                  <DialogTitle className="font-heading text-lg font-bold uppercase tracking-tight">
                    Production brief
                  </DialogTitle>
                  <DialogDescription>Thirty seconds. Straight to my inbox.</DialogDescription>
                </DialogHeader>
                <form data-testid="quick-inquiry-form" onSubmit={submit} className="grid gap-3">
                  <Input
                    data-testid="inquiry-name-input"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    data-testid="inquiry-email-input"
                    required
                    type="email"
                    placeholder="Email or phone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {PRODUCTION_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        data-testid={`inquiry-type-${t.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        onClick={() => setType(t)}
                        className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-200 ${
                          type === t
                            ? "border-amber-500/60 bg-amber-500/15 text-amber-300"
                            : "border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <Input
                    data-testid="inquiry-dates-input"
                    placeholder="Target dates / city"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                  />
                  <Textarea
                    data-testid="inquiry-message-input"
                    required
                    placeholder="What are we making?"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    data-testid="inquiry-submit-button"
                    type="submit"
                    disabled={sending}
                    className="mt-1 flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-amber-400 active:scale-[0.98] disabled:opacity-60"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {sending ? "Sending" : "Send brief"}
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
