export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* asas abertas pairando + o pacote logo abaixo */}
      <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden>
        <path d="M1 5.5 L13 10 L25 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 2 L13 5 L20 2" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="11" y="14" width="4" height="4" rx="1" fill="#ff5a1f" />
      </svg>
      <span className="text-[15px] font-medium tracking-[0.22em]">KESTREL</span>
    </span>
  );
}
