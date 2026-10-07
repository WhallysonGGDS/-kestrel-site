"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const TEXT = "Toda cidade tem um gargalo. Ele tem quatro rodas, buzina e anda a 14 km/h no horário de pico.";
const ACCENT = ["14", "km/h"];

export default function Context() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(q(".w"), { opacity: 0.16 }, {
        opacity: 1, stagger: 0.08, ease: "none",
        scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 92%", end: "bottom 50%", scrub: 1 },
      });
      gsap.fromTo(q("[data-clip]"), { clipPath: "inset(14% 16% 14% 16% round 28px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: q("[data-clip]")[0], start: "top 90%", end: "top 15%", scrub: 1 },
      });
      gsap.fromTo(q("[data-clip] img"), { yPercent: -10, scale: 1.15 }, {
        yPercent: 8, scale: 1, ease: "none",
        scrollTrigger: { trigger: q("[data-clip]")[0], start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(q("[data-bar]"), {
        scaleX: 0, duration: 1.8, ease: "expo.out", stagger: 0.25,
        scrollTrigger: { trigger: q("[data-compare]")[0], start: "top 80%" },
      });
      gsap.from(q("[data-compare] [data-fade]"), {
        y: 16, autoAlpha: 0, duration: 1.2, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: q("[data-compare]")[0], start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contexto" className="relative bg-ink pt-[14vh] text-white md:pt-[16vh]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="label text-white/40">02 — O problema</p>
        <p data-statement className="mt-8 max-w-[22ch] text-[clamp(2rem,5vw,5.2rem)] font-light leading-[1.04] tracking-[-0.045em]">
          {TEXT.split(" ").map((w, i) => (
            <span key={i} className={`w ${ACCENT.includes(w) ? "text-ember" : ""}`}>{w} </span>
          ))}
        </p>
      </div>

      <div className="relative mt-[16vh] h-[88svh] md:h-[110vh]">
        <div data-clip className="absolute inset-0 overflow-hidden">
          <img src="/img/tower.webp" alt="Torres espelhadas refletindo o pôr do sol sobre o rio" className="h-full w-full object-cover object-[62%_50%]" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,.5),transparent_30%,transparent_55%,rgba(5,7,13,.92))]" />
        </div>

        <div data-compare className="absolute inset-x-5 bottom-8 md:inset-x-auto md:bottom-14 md:right-10 md:w-[460px]">
          <div className="glass-dark rounded-[20px] p-5 md:p-7">
            <p data-fade className="label text-white/45">Tempo médio de entrega · área urbana</p>
            <div className="mt-6 space-y-5">
              <div data-fade>
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-white/60">Carro / moto</span>
                  <span className="text-[28px] font-light tracking-[-0.03em] text-white/70">47 min</span>
                </div>
                <div className="mt-2 h-[3px] w-full rounded-full bg-white/[0.06]"><div data-bar className="h-full w-full origin-left rounded-full bg-white/35" /></div>
              </div>
              <div data-fade>
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-white">Kestrel K4</span>
                  <span className="text-[28px] font-light tracking-[-0.03em]">9 min</span>
                </div>
                <div className="mt-2 h-[3px] w-full rounded-full bg-white/[0.06]"><div data-bar className="h-full w-[19%] origin-left rounded-full bg-ember" /></div>
              </div>
            </div>
            <p data-fade className="mt-6 text-[12px] leading-relaxed text-white/40">Simulação interna em raio de 5 km, horário de pico. Dados ilustrativos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
