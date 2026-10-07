"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const STEPS = [
  { img: "/img/closeup.webp", alt: "K4 pronta para decolar", t: "Pedido confirmado.", d: "A loja embala, o sistema traça a rota e a K4 decola em menos de 90 segundos." },
  { img: "/img/flight.webp", alt: "K4 sobrevoando a cidade ao entardecer", t: "Rota direta.", d: "Três quilômetros em linha reta, a 120 metros de altura. Nenhum semáforo no caminho." },
  { img: "/img/terrace.webp", alt: "K4 entregando um pacote em um terraço", t: "Na sua porta.", d: "A aeronave paira, o pacote desce por cabo e pousa suave. Ela nunca toca o chão." },
];

export default function Delivery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const imgs = q("[data-shot]");
      gsap.set(imgs.slice(1), { autoAlpha: 0, scale: 1.08 });

      const show = (i: number) => {
        imgs.forEach((el, j) =>
          gsap.to(el, { autoAlpha: j === i ? 1 : 0, scale: j === i ? 1 : 1.08, duration: 1.4, ease: "expo.out", overwrite: true })
        );
        q("[data-tick]").forEach((el, j) => gsap.to(el, { opacity: j === i ? 1 : 0.25, duration: 0.6, overwrite: true }));
      };

      q("[data-step]").forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step, start: "top 60%", end: "bottom 60%",
          onEnter: () => show(i), onEnterBack: () => show(i),
        });
        gsap.from(step.querySelectorAll("[data-in]"), {
          y: 40, autoAlpha: 0, duration: 1.3, ease: "expo.out", stagger: 0.1,
          scrollTrigger: { trigger: step, start: "top 70%" },
        });
      });

      gsap.fromTo(q("[data-progress]"), { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: q("[data-steps]")[0], start: "top 60%", end: "bottom 60%", scrub: true },
      });
      gsap.from(q("[data-intro] > *"), {
        y: 40, autoAlpha: 0, duration: 1.4, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: q("[data-intro]")[0], start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="entrega" className="relative bg-ink text-white">
      <div data-intro className="mx-auto max-w-[1440px] px-5 pb-[10vh] pt-[24vh] md:px-10">
        <p className="label text-white/40">04 — A entrega</p>
        <h2 className="mt-6 max-w-[14ch] text-[clamp(2.4rem,5.6vw,6rem)] font-light leading-[0.98] tracking-[-0.05em]">
          Da prateleira à porta, em linha reta.
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1440px] md:grid-cols-[1.25fr_1fr] md:gap-16 md:px-10">
        {/* imagem fixa */}
        <div className="sticky top-0 z-10 h-[52svh] px-0 pt-[72px] md:h-[100svh] md:py-[12vh] md:pt-[12vh]">
          <div className="relative h-full overflow-hidden md:rounded-[28px]">
            {STEPS.map((s) => (
              <img key={s.img} data-shot src={s.img} alt={s.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(5,7,13,.7))]" />
            <div className="absolute bottom-5 left-5 flex gap-2">
              {STEPS.map((_, i) => (
                <span key={i} data-tick className="label rounded-full border border-white/25 px-2.5 py-1 text-[9.5px]" style={{ opacity: i === 0 ? 1 : 0.25 }}>0{i + 1}</span>
              ))}
            </div>
          </div>
        </div>

        {/* etapas */}
        <div data-steps className="relative px-5 md:px-0">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-white/10 md:left-0">
            <div data-progress className="h-full w-full origin-top bg-ember" />
          </div>
          {STEPS.map((s, i) => (
            <div key={s.t} data-step className="flex min-h-[70svh] flex-col justify-center pl-8 md:min-h-[100svh] md:pl-14">
              <p data-in className="label text-ember">Etapa 0{i + 1}</p>
              <h3 data-in className="mt-4 text-[clamp(2rem,3.8vw,3.8rem)] font-light leading-none tracking-[-0.04em]">{s.t}</h3>
              <p data-in className="mt-5 max-w-[26rem] text-[16px] leading-relaxed text-white/55">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
