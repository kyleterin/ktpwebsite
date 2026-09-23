# PRD — KTP Contact Card

## Original problem statement
"I want a lightweight, polished, mobile-friendly website to use as a contact card. I'm a freelance production coordinator and personal assistant."
Owner: Kyle-Terin Phillip. Works production & assistance across all fields, mostly music and corporate/experiential. Requested vibe: dark, modern, keynote/showbiz/creative-agency/experiential-marketing feel. Contact actions: email, phone, WhatsApp, Instagram, LinkedIn, booking link, save-contact (vCard). Compact services strip. Resume to be attached later.

## Architecture
- Frontend: Vite + React 19 + TS, Tailwind v4, motion (framer-motion), lenis smooth scroll, qrcode.react, sonner toasts. Single page: `src/pages/Home.tsx` + `src/components/card/*`. All card content in `src/lib/cardData.ts` (swap real details there). vCard generated client-side (`src/lib/vcard.ts`).
- Backend: FastAPI + motor. `POST /api/inquiries` + `GET /api/inquiries` (Mongo `inquiries` collection, index on created_at). Status demo routes retained.
- Custom KP monogram SVG logo (`src/components/card/LogoMark.tsx`, also `/public/favicon.svg`).

## User personas
- Tour manager / agency booker on a phone backstage — needs one-tap contact save and instant messaging.
- Corporate event producer vetting coordinators — scans services + LinkedIn, books intro call.
- C-suite EA seeking discreet PA support — checks protocol/NDA credentials.

## Core requirements (static)
Mobile-first dark contact card; kinetic hero; direct contact channels; vCard download; QR hand-off; services overview; quick inquiry brief; availability signal.

## Implemented (2026-09-23)
- Slate-style preloader ("Scene 01 — Take 01") with wipe exit; masked line-by-line hero reveal; parallax portrait frame
- Top bar: KP logo, live LA clock, pulsing availability badge
- 6 contact rows (email, mobile, WhatsApp, booking, Instagram, LinkedIn) with copy-to-clipboard + toasts
- Slow editorial marquee; 4-card services strip; inquiry brief dialog → POST /api/inquiries → success toast
- Footer with vCard (.vcf) download + scannable QR modal of the live URL
- Grain overlay, amber spotlight glow, lenis momentum scrolling, staggered scroll reveals

## Backlog
- P0 (DONE 2026-09-23): Real email/phone/location pulled from owner's resume; marquee now lists real credits (Allegiant, EDC, Oracle AI World, Cowboy Carter Tour, Pitbull/NKOTB residencies…); services strip removed per owner ("too maximalist")
- P1 (DONE 2026-09-23): Real Instagram (@kyleterin) and LinkedIn added. Only booking URL (cal.com/kyleterin/intro) remains a placeholder — replace with a real Cal.com/Calendly link when the owner has one
- P1: Resume/CV download section once the resume is attached
- P1: Real photo of Kyle-Terin in the hero frame
- P2: Email notification on new inquiry (Resend), past-shows/credits carousel, i18n

## Next tasks
1. Collect real email/phone/WhatsApp/IG/LinkedIn/booking links + resume from owner
2. Wire inquiry notifications to email
3. Optional: credits/recent-shows strip with logos
