"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Climax() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", scrub: 1, pin: true, anticipatePin: 1 },
      });
      tl.fromTo(q("[data-night]"), { scale: 1.3 }, { scale: 1, duration: 3 }, 0)
        .from(q("[data-l1] .lw"), { yPercent: 110, stagger: 0.08, duration: 0.6, ease: "power3.out" }, 0.2)
        .from(q("[data-l2] .lw"), { yPercent: 110, stagger: 0.08, duration: 0.6, ease: "power3.out" }, 1.2)
        .to(q("[data-l1]"), { opacity: 0.35, duration: 0.5 }, 1.2)
        .from(q("[data-foot]"), { autoAlpha: 0, y: 20, duration: 0.5 }, 2.1);
    },
    { scope: root }
  );

  const line = (t: string) =>
    t.split(" ").map((w, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
        <span className="lw inline-block">{w}&nbsp;</span>
      </span>
    ));

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-ink text-white">
      <img data-night src="/img/night.webp" alt="K4 sobrevoando a cidade iluminada à noite" className="absolute inset-0 h-full w-full object-cover object-[30%_30%]" loading="lazy" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#05070d_0%,transparent_30%,rgba(5,7,13,.55)_62%,#05070d_100%)]" />
      <div className="relative flex h-full flex-col items-center justify-end px-5 pb-[13vh] text-center">
        <h2 className="text-[clamp(2.6rem,7.4vw,8.4rem)] font-light leading-[0.98] tracking-[-0.055em]">
          <span data-l1 className="block">{line("A cidade para às 18h.")}</span>
          <span data-l2 className="block">{line("A sua entrega, não.")}</span>
        </h2>
        <p data-foot className="label mt-10 text-white/55">
          Tempo médio porta a porta <span className="ml-3 text-white">9 min</span>
        </p>
      </div>
    </section>
  );
}
