"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SPECS = [
  { x: 59, y: 40, t: "Visão 360°", d: "Três câmeras e radar detectam fios, árvores e pássaros. Desvia sem intervenção humana." },
  { x: 17, y: 36, t: "Motores redundantes", d: "Perde um rotor, mantém o voo e pousa com segurança." },
  { x: 89, y: 32, t: "Sinalização ativa", d: "LEDs visíveis a 1 km, de dia e de noite." },
  { x: 53, y: 74, t: "Compartimento selado", d: "5 kg, resistente à chuva, liberado só com o código do cliente." },
];

export default function Aircraft() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=260%", scrub: 1, pin: true, anticipatePin: 1,
          onUpdate: () => {
            const n = Math.max(0, Math.min(4, Math.floor(tl.time() - 1.4) + 1));
            const el = q("[data-count]")[0];
            if (el) el.textContent = `0${n}`;
          },
        },
      });
      tl.fromTo(q("[data-studio]"), { scale: 1.25, filter: "brightness(.3)" }, { scale: 1, filter: "brightness(1)", duration: 1.2, ease: "none" }, 0)
        .from(q("[data-head] > *"), { y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.6 }, 0.2);

      SPECS.forEach((_, i) => {
        const at = 1.4 + i * 1;
        tl.from(q(`[data-dot="${i}"]`), { scale: 0, autoAlpha: 0, duration: 0.3 }, at)
        ;
        if (i > 0) tl.to(q(`[data-dot="${i - 1}"]`), { autoAlpha: 0.35, scale: 0.7, duration: 0.3 }, at);
        if (i > 0) tl.to(q(`[data-mspec="${i - 1}"]`), { autoAlpha: 0, y: -10, duration: 0.3 }, at);
        tl.from(q(`[data-mspec="${i}"]`), { autoAlpha: 0, y: 10, duration: 0.3 }, at + 0.2);
      });
      tl.to({}, { duration: 0.6 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="aeronave" className="relative h-[100svh] overflow-hidden bg-black text-white">
      {/* caixa 16:9 em "cover" — mantém as coordenadas dos pontos */}
      <div className="absolute left-1/2 top-[46%] aspect-video w-[150vw] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:w-[max(100vw,177.78vh)]">
        <div data-studio className="absolute inset-0">
          <img src="/img/studio.webp" alt="Kestrel K4 em estúdio, fundo preto" className="h-full w-full object-cover" loading="lazy" />
          {SPECS.map((s, i) => (
            <span key={i} data-dot={i} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <span className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full bg-ember shadow-[0_0_0_6px_rgba(255,90,31,.18),0_0_24px_rgba(255,90,31,.7)]" />
              <span className="pulse-dot absolute -left-[14px] -top-[14px] h-[28px] w-[28px] rounded-full border border-ember/60" />
            </span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.85),transparent_38%),linear-gradient(0deg,rgba(0,0,0,.9),transparent_30%)]" />

      <div data-head className="absolute left-5 top-[96px] max-w-[30rem] md:left-10 md:top-[18vh]">
        <p className="label text-white/45">03 — A aeronave</p>
        <h2 className="mt-5 text-[clamp(2.4rem,5.4vw,5.6rem)] font-light leading-[0.95] tracking-[-0.05em]">Projetada<br />para pairar.</h2>
        <p className="mt-5 hidden max-w-[24rem] text-[15px] leading-relaxed text-white/55 md:block">
          O falcão-peneireiro fica imóvel no ar antes de agir. A K4 também: segura posição com vento de 40 km/h enquanto o pacote desce até a porta.
        </p>
      </div>

      {/* especificação ativa */}
      <div className="absolute inset-x-5 bottom-10 h-[96px] md:inset-x-auto md:bottom-[12vh] md:right-10 md:h-[120px] md:w-[340px]">
        {SPECS.map((s, i) => (
          <div key={i} data-mspec={i} className="absolute inset-0">
            <p className="label text-ember">0{i + 1}</p>
            <p className="mt-2 text-[20px] font-light tracking-[-0.02em] md:text-[28px]">{s.t}</p>
            <p className="mt-1 text-[13.5px] leading-snug text-white/55 md:text-[15px]">{s.d}</p>
          </div>
        ))}
      </div>

      <p className="label absolute right-10 top-[18vh] hidden text-white/40 md:block">
        <span data-count className="text-white">00</span> / 04
      </p>
    </section>
  );
}
