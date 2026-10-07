"use client";
import { useRef, useState } from "react";
import Logo from "./Logo";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const links = [
  ["Aeronave", "#aeronave"],
  ["Entrega", "#entrega"],
  ["Plataforma", "#plataforma"],
  ["Segurança", "#aeronave"],
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);

  useGSAP(() => {
    gsap.from(ref.current, { y: -24, autoAlpha: 0, duration: 1.2, delay: 0.2, ease: "expo.out" });
    ScrollTrigger.create({
      trigger: "#contexto",
      start: "top 64px",
      onEnter: () => setDark(true),
      onLeaveBack: () => setDark(false),
    });
  });

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-5">
      <nav
        className={`mx-auto flex h-14 max-w-[1440px] items-center justify-between rounded-full pl-5 pr-2 transition-[background,color,border-color] duration-700 ${
          dark ? "glass-dark text-white" : "border border-transparent text-[#0d1424]"
        }`}
      >
        <a href="#top" aria-label="Kestrel — início"><Logo /></a>
        <ul className="hidden items-center gap-9 text-[13.5px] md:flex">
          {links.map(([l, h]) => (
            <li key={l}>
              <a href={h} className="group relative opacity-70 transition-opacity hover:opacity-100">
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#contato" className={`hidden rounded-full px-4 py-2 text-[13px] transition-colors sm:block ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`}>
            Entrar
          </a>
          <a href="#contato" className="group relative flex h-10 items-center gap-2 overflow-hidden rounded-full bg-ember pl-4 pr-3 text-[13px] font-medium text-white">
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#0d1424] transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
            <span className="relative">Agendar voo-teste</span>
            <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-white/20">
              <svg width="10" height="10" viewBox="0 0 10 10" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"><path d="M2 8 8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.3" fill="none" /></svg>
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
