import { CARD } from "./cardData";

export function buildVCard(origin: string): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Phillip;Kyle-Terin;;;",
    `FN:${CARD.name}`,
    `TITLE:${CARD.role}`,
    `TEL;TYPE=CELL:${CARD.phoneRaw}`,
    `EMAIL;TYPE=WORK:${CARD.email}`,
    `URL:${origin}`,
    `NOTE:${CARD.note}`,
    "END:VCARD",
  ].join("\r\n");
}

export function downloadVCard() {
  const blob = new Blob([buildVCard(window.location.origin)], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = CARD.vcfFilename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
