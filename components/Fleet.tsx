"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STATS = [
  { v: 1284, dec: 0, suf: "", l: "voos hoje" },
  { v: 99.97, dec: 2, suf: "%", l: "missões concluídas" },
  { v: 78, dec: 0, suf: "%", l: "menos CO₂ por entrega" },
];

const ROUTES = [
  "M40 150 C 90 120, 140 70, 220 60",
  "M40 150 C 110 160, 170 140, 250 120",
  "M40 150 C 70 190, 140 200, 200 180",
];

export default function Fleet() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(q("[data-bg]"), { yPercent: -12, scale: 1.12 }, {
        yPercent: 10, scale: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 55%" }, defaults: { ease: "expo.out" } });
      tl.from(q("[data-copy] > *"), { y: 40, autoAlpha: 0, duration: 1.4, stagger: 0.1 })
        .from(q("[data-panel]"), { y: 60, autoAlpha: 0, duration: 1.6 }, 0.2)
        .from(q("[data-route]"), { strokeDashoffset: 300, duration: 2, stagger: 0.2, ease: "power2.inOut" }, 0.6);
      q("[data-stat]").forEach((el, i) => {
        const s = STATS[i];
        const o = { n: 0 };
        tl.to(o, {
          n: s.v, duration: 2.2, ease: "power3.out",
          onUpdate: () => { el.textContent = o.n.toLocaleString("pt-BR", { minimumFractionDigits: s.dec, maximumFractionDigits: s.dec }) + s.suf; },
        }, 0.5 + i * 0.12);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="plataforma" className="relative min-h-[110svh] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <img data-bg src="/img/fleet.webp" alt="Frota de aeronaves K4 sobre a cidade ao pôr do sol" className="h-full w-full object-cover object-[60%_50%]" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#05070d_0%,rgba(5,7,13,.2)_25%,rgba(5,7,13,.25)_60%,#05070d_100%),linear-gradient(90deg,rgba(5,7,13,.85),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[110svh] max-w-[1440px] flex-col justify-between gap-12 px-5 py-[16vh] md:flex-row md:items-end md:px-10">
        <div data-copy className="max-w-[34rem]">
          <p className="label text-white/50">05 — A plataforma</p>
          <h2 className="mt-6 text-[clamp(2.6rem,6vw,6.4rem)] font-light leading-[0.95] tracking-[-0.05em]">Uma frota.<br />Um painel.</h2>
          <p className="mt-6 max-w-[26rem] text-[16px] leading-relaxed text-white/60">
            Despache, acompanhe e otimize cada voo a partir da sua própria operação. Integra com o seu e-commerce em dias, não meses.
          </p>
        </div>

        <div data-panel className="glass-dark w-full rounded-[24px] p-5 md:w-[440px] md:p-6">
          <div className="flex items-center justify-between">
            <p className="label text-white/55">Controle de frota</p>
            <p className="label flex items-center gap-2 text-[9.5px] text-emerald-400"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />Ao vivo</p>
          </div>
          <svg viewBox="0 0 280 220" className="mt-4 w-full" aria-hidden>
            <path d="M0 200 C 60 170, 120 210, 180 160 S 260 120, 280 90" stroke="rgba(255,255,255,.06)" strokeWidth="18" fill="none" />
            {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" x2="280" y1={i * 36 + 4} y2={i * 36 + 4} stroke="rgba(255,255,255,.04)" />)}
            {ROUTES.map((d, i) => (
              <g key={i}>
                <path data-route d={d} fill="none" stroke="#ff5a1f" strokeOpacity={0.9 - i * 0.2} strokeWidth="1.2" strokeDasharray="300" />
                <circle r="3" fill="#fff">
                  <animateMotion dur={`${5 + i * 1.5}s`} repeatCount="indefinite" path={d} />
                </circle>
              </g>
            ))}
            <circle cx="40" cy="150" r="5" fill="#ff5a1f" />
            <text x="40" y="172" textAnchor="middle" className="fill-white/50 font-mono text-[8px] uppercase tracking-[0.15em]">Loja</text>
            {[[220, 60, "Lagoa"], [250, 120, "Orla"], [200, 180, "Vila Sul"]].map(([x, y, t]) => (
              <g key={t as string}>
                <circle cx={x} cy={y} r="3.5" fill="none" stroke="#fff" strokeOpacity=".7" />
                <text x={(x as number) + 8} y={(y as number) + 3} className="fill-white/50 font-mono text-[8px] uppercase tracking-[0.15em]">{t}</text>
              </g>
            ))}
          </svg>
          <div className="mt-4 grid grid-cols-3 border-t border-white/10 pt-4">
            {STATS.map((s) => (
              <div key={s.l}>
                <p data-stat className="text-[22px] font-light tracking-[-0.03em] md:text-[26px]">0</p>
                <p className="mt-1 text-[11px] leading-tight text-white/45">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
