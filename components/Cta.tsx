"use client";
import { useRef } from "react";
import Logo from "./Logo";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Cta() {
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const q = gsap.utils.selector(root);
      gsap.from(q("[data-in]"), {
        y: 50, autoAlpha: 0, duration: 1.6, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      gsap.from(q("[data-horizon]"), {
        scaleX: 0, duration: 2.4, ease: "expo.inOut",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });

      // botão magnético
      const el = btn.current!;
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });
      const move = contextSafe!((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      const leave = contextSafe!(() => { xTo(0); yTo(0); });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contato" className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-[22%] h-[60vh] bg-[radial-gradient(50%_60%_at_50%_100%,rgba(255,90,31,.16),transparent_70%)]" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col items-center justify-center px-5 py-[18vh] text-center md:px-10">
        <p data-in className="label text-white/40">06 — Próximo passo</p>
        <h2 data-in className="mt-7 text-[clamp(2.8rem,8vw,9rem)] font-light leading-[0.94] tracking-[-0.06em]">
          Coloque sua<br />loja no ar.
        </h2>
        <p data-in className="mt-7 max-w-[30rem] text-[16px] leading-relaxed text-white/55">
          Um voo-teste na sua operação, com rota real e clientes reais. Em 30 dias você sabe se faz sentido.
        </p>
        <div data-in className="mt-12 flex flex-col items-center gap-6 sm:flex-row">
          <a ref={btn} href="mailto:voo@kestrel.example" className="group relative flex h-16 items-center gap-4 overflow-hidden rounded-full bg-white pl-8 pr-2 text-[15px] font-medium text-[#0d1424]">
            <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
            <span className="relative transition-colors duration-500 group-hover:text-white">Agendar voo-teste na minha loja</span>
            <span className="relative grid h-12 w-12 place-items-center rounded-full bg-[#0d1424] text-white transition-transform duration-700 ease-out-expo group-hover:rotate-45">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.4" fill="none" /></svg>
            </span>
          </a>
          <a href="#aeronave" className="group text-[14px] text-white/60 transition-colors hover:text-white">
            Ver especificações técnicas
            <span className="mt-1 block h-px origin-left scale-x-50 bg-white/40 transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
          </a>
        </div>
      </div>
      <div data-horizon className="mx-auto h-px max-w-[1440px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <footer className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-10 text-[12.5px] text-white/40 md:flex-row md:items-center md:justify-between md:px-10">
        <Logo className="text-white/80" />
        <ul className="flex gap-7">
          <li><a href="#aeronave" className="hover:text-white">Aeronave</a></li>
          <li><a href="#plataforma" className="hover:text-white">Plataforma</a></li>
          <li><a href="#contato" className="hover:text-white">Contato</a></li>
        </ul>
        <p>© 2026 Kestrel Aeronaves · Projeto conceitual</p>
      </footer>
    </section>
  );
}
