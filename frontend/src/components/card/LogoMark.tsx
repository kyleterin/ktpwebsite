export default function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="#121216" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="8.5" stroke="rgba(255,255,255,0.12)" />
      <path
        d="M10 9V31M10 20L21 9M10 20L21 31"
        stroke="#F59E0B"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 31V9h4.5a5.5 5.5 0 0 1 0 11H24"
        stroke="#EDEDEE"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="33" cy="30" r="2.2" fill="#F59E0B" />
    </svg>
  );
}
