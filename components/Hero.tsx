"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const TITLE = "O céu é a nova rota.";

/* ---------- elementos flutuantes ---------- */

function CardAircraft() {
  return (
    <div className="glass flex w-[250px] items-start gap-3.5 rounded-2xl p-4">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="mt-0.5 shrink-0 text-[#0d1424]" aria-hidden>
        <path d="M9 9 25 25M25 9 9 25" stroke="currentColor" strokeWidth="1.2" />
        {[[9, 9], [25, 9], [9, 25], [25, 25]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="5" stroke="currentColor" strokeOpacity=".5" />
        ))}
        <rect x="14" y="14" width="6" height="6" rx="1.5" fill="#ff5a1f" />
      </svg>
      <div>
        <p className="label text-[#0d1424]">Kestrel K4</p>
        <p className="mt-1.5 text-[13px] leading-snug text-[#0d1424]/60">Feita para rotas da loja até a porta.</p>
      </div>
    </div>
  );
}

function CardRadar() {
  return (
    <div className="glass w-[230px] rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[34px] font-light leading-none tracking-[-0.04em]">32<span className="ml-1 text-[16px] tracking-normal text-[#0d1424]/60">km</span></p>
          <p className="mt-1.5 text-[12px] text-[#0d1424]/55">raio de operação</p>
        </div>
        <div className="relative h-[54px] w-[54px] rounded-full border border-[#0d1424]/10">
          <div className="absolute inset-[9px] rounded-full border border-[#0d1424]/10" />
          <div className="sweep absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, rgba(255,90,31,.0) 0deg, rgba(255,90,31,.35) 50deg, transparent 52deg)" }} />
          <span className="absolute left-[34px] top-[16px] h-1.5 w-1.5 rounded-full bg-ember" />
        </div>
      </div>
      <p className="label mt-4 flex items-center gap-2 text-[#0d1424]/70">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" /> Espaço aéreo livre
      </p>
    </div>
  );
}

function CardCommerce() {
  const items = [
    ["Farmácias", "M7 2v10M2 7h10"],
    ["Mercados", "M1.5 2.5h2l1.6 6.5h6l1.4-4.5H4.4"],
    ["Restaurantes", "M2 6h10M3 6a4 4 0 0 1 8 0M2 9.5h10"],
  ];
  return (
    <div className="glass w-[248px] rounded-2xl p-4">
      <p className="text-[13.5px] font-medium">Feita para o varejo</p>
      <ul className="mt-3 divide-y divide-[#0d1424]/[0.07]">
        {items.map(([t, d]) => (
          <li key={t} className="group flex cursor-pointer items-center justify-between py-2.5">
            <span className="flex items-center gap-3 text-[13px] text-[#0d1424]/75">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d={d} stroke="#ff5a1f" strokeWidth="1.3" strokeLinecap="round" /></svg>
              {t}
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#0d1424]/40 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" aria-hidden><path d="M4 2l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.2" /></svg>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CardPayload() {
  return (
    <div className="glass w-[236px] rounded-2xl p-4">
      <div className="space-y-2 text-[13px]">
        <p className="flex items-center gap-2.5"><span className="label w-14 text-[#0d1424]/45">Carga</span><span className="font-medium">5 kg</span></p>
        <p className="flex items-center gap-2.5"><span className="label w-14 text-[#0d1424]/45">Recarga</span><span className="font-medium">90 s</span></p>
      </div>
      <div className="relative mt-4 h-4">
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#0d1424]/15" />
        <div className="route-fill absolute left-0 top-1/2 h-px w-0 bg-ember" />
        <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-ember" />
        <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-[#0d1424]/40 bg-white" />
        <span className="route-dot absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0d1424]">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden><path d="M2 2 14 10M14 2 2 10" stroke="currentColor" strokeWidth="1.2" /><rect x="6" y="4" width="4" height="4" rx="1" fill="currentColor" /></svg>
        </span>
      </div>
      <div className="label mt-1.5 flex justify-between text-[9.5px] text-[#0d1424]/45"><span>Loja</span><span>Cliente</span></div>
    </div>
  );
}

/* ---------- hero ---------- */

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const q = gsap.utils.selector(root);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* entrada — cena 01 */
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(q("[data-bg] img"), { scale: 1.18, duration: 3.2, ease: "power2.out" }, 0)
        .from(q(".word"), { yPercent: 115, duration: 1.7, stagger: 0.07 }, 0.25)
        .from(q("[data-sub]"), { y: 18, autoAlpha: 0, duration: 1.4 }, 0.8)
        .from(q("[data-frame]"), { y: 60, autoAlpha: 0, scale: 0.96, duration: 1.8 }, 0.7)
        .from(q("[data-drone-in]"), { y: 120, autoAlpha: 0, scale: 0.9, filter: "blur(12px)", duration: 2.2 }, 0.85)
        .from(q(".card"), { y: 28, autoAlpha: 0, scale: 0.97, duration: 1.4, stagger: 0.12 }, 1.5)
        .from(q("[data-lines]"), { autoAlpha: 0, duration: 1.2 }, 2.1)
        .from(q("[data-pin]"), { autoAlpha: 0, duration: 1.2, stagger: 0.15 }, 2);

      if (!reduce) {
        // pairar
        gsap.to(q("[data-hover]"), { y: -14, rotation: 0.6, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        // rota do card de carga
        gsap.timeline({ repeat: -1, repeatDelay: 0.8, delay: 2.4 })
          .fromTo(q(".route-dot"), { left: "0%" }, { left: "100%", duration: 3.2, ease: "power1.inOut" })
          .fromTo(q(".route-fill"), { width: "0%" }, { width: "100%", duration: 3.2, ease: "power1.inOut" }, 0);
      }

      /* parallax por mouse */
      const layers = q("[data-depth]").map((el) => {
        const d = parseFloat((el as HTMLElement).dataset.depth || "0");
        return { d, x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3.out" }) };
      });
      const onMove = contextSafe!((e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => { l.x(nx * l.d); l.y(ny * l.d); });
      });
      window.addEventListener("pointermove", onMove);

      /* scroll — o hero se dissolve na noite */
      const mm = gsap.matchMedia();
      mm.add({ desk: "(min-width: 768px)", mob: "(max-width: 767px)" }, (ctx) => {
        const { desk } = ctx.conditions as { desk: boolean };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: desk ? "+=130%" : "+=90%", scrub: 1, pin: true, anticipatePin: 1 },
        });
        tl.to(q("[data-title]"), { yPercent: -60, autoAlpha: 0, duration: 0.5 }, 0)
          .to(q("[data-sub]"), { y: -30, autoAlpha: 0, duration: 0.35 }, 0)
          .to(q("[data-bg] img"), { scale: 1.14, duration: 1 }, 0)
          .to(q("[data-frame]"), { scale: 1.08, autoAlpha: 0, duration: 0.55 }, 0.1)
          .to(q("[data-drone-scroll]"), { scale: desk ? 1.35 : 1.2, yPercent: desk ? -38 : -30, duration: 0.8 }, 0)
          .to(q("[data-side='l']"), { x: -90, autoAlpha: 0, stagger: 0.06, duration: 0.4 }, 0.05)
          .to(q("[data-side='r']"), { x: 90, autoAlpha: 0, stagger: 0.06, duration: 0.4 }, 0.05)
          .to(q("[data-mcards]"), { y: 40, autoAlpha: 0, duration: 0.35 }, 0.05)
          .to(q("[data-pin]"), { autoAlpha: 0, duration: 0.2 }, 0)
          .to(q("[data-night]"), { autoAlpha: 1, duration: 0.38 }, 0.62)
          .to(q("[data-drone-scroll]"), { autoAlpha: 0, duration: 0.25 }, 0.75);
      });

      /* linhas conectando cards ao drone */
      const paths = q("[data-line]") as unknown as SVGPathElement[];
      const ends = q("[data-end]") as unknown as SVGCircleElement[];
      const anchors = [
        [0.2, 0.28], // motor esquerdo
        [0.82, 0.25], // motor direito
        [0.38, 0.7], // compartimento
        [0.66, 0.72],
      ];
      const draw = () => {
        if (!root.current || !svg.current || window.innerWidth < 768) return;
        const r = root.current.getBoundingClientRect();
        const drone = q("[data-drone-img]")[0] as HTMLElement;
        const dr = drone.getBoundingClientRect();
        q("[data-card]").forEach((c, i) => {
          const cr = (c as HTMLElement).getBoundingClientRect();
          const op = Number(gsap.getProperty((c as HTMLElement).closest("[data-side]")!, "opacity")) * Number(gsap.getProperty(c.querySelector(".card")!, "opacity"));
          const left = i % 2 === 0;
          const sx = (left ? cr.right : cr.left) - r.left;
          const sy = cr.top + cr.height / 2 - r.top;
          const ex = dr.left + dr.width * anchors[i][0] - r.left;
          const ey = dr.top + dr.height * anchors[i][1] - r.top;
          const mx = sx + (ex - sx) * 0.55;
          paths[i].setAttribute("d", `M${sx},${sy} C${mx},${sy} ${mx},${ey} ${ex},${ey}`);
          paths[i].style.opacity = String(op);
          ends[i * 2].setAttribute("cx", String(sx)); ends[i * 2].setAttribute("cy", String(sy));
          ends[i * 2 + 1].setAttribute("cx", String(ex)); ends[i * 2 + 1].setAttribute("cy", String(ey));
          ends[i * 2].style.opacity = ends[i * 2 + 1].style.opacity = String(op);
        });
      };
      gsap.ticker.add(draw);

      return () => {
        window.removeEventListener("pointermove", onMove);
        gsap.ticker.remove(draw);
        mm.revert();
      };
    },
    { scope: root }
  );

  const sides = [
    { side: "l", pos: "left-[3vw] top-[47%]", depth: 22, el: <CardAircraft /> },
    { side: "r", pos: "right-[3.5vw] top-[42%]", depth: 26, el: <CardRadar /> },
    { side: "l", pos: "left-[5.5vw] top-[67%]", depth: 16, el: <CardCommerce /> },
    { side: "r", pos: "right-[6vw] top-[72%]", depth: 18, el: <CardPayload /> },
  ];

  return (
    <section ref={root} id="top" className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-mist text-[#0d1424]">
      {/* fotografia atmosférica */}
      <div data-depth="-12" className="absolute inset-[-3%]">
        <div data-bg className="absolute inset-0">
          <img src="/img/city.webp" alt="" className="h-full w-full object-cover object-[50%_70%]" fetchPriority="high" />
        </div>
      </div>
      {/* névoa para leitura do título + vinheta */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,241,245,.92)_0%,rgba(238,241,245,.6)_26%,rgba(238,241,245,.08)_52%,rgba(5,7,13,.0)_70%,rgba(5,7,13,.35)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_70%,transparent_55%,rgba(5,7,13,.28))]" />

      {/* marcadores de mapa */}
      <div className="hidden md:block">
        {[["Centro", "left-[24%] top-[80%]"], ["Orla Norte", "right-[22%] top-[62%]"], ["Ponte Leste", "left-[12%] top-[90%]"]].map(([t, p]) => (
          <span key={t} data-pin className={`label absolute ${p} flex items-center gap-1.5 text-[9.5px] text-white/80`}>
            <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden><path d="M4.5 10.5S1 6.6 1 4.4a3.5 3.5 0 1 1 7 0c0 2.2-3.5 6.1-3.5 6.1Z" fill="none" stroke="currentColor" /></svg>
            {t}
          </span>
        ))}
      </div>

      {/* título */}
      <div className="relative z-10 px-4 pt-[clamp(108px,15vh,150px)] text-center">
        <h1 data-title aria-label={TITLE} className="mx-auto text-[clamp(3.1rem,9.2vw,10.5rem)] font-light leading-[0.92] tracking-[-0.06em]">
          {TITLE.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="word inline-block" aria-hidden>{w}{i < TITLE.split(" ").length - 1 ? " " : ""}</span>
            </span>
          ))}
        </h1>
        <p data-sub className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-relaxed text-[#0d1424]/65 md:mt-6 md:text-[17px]">
          Aeronaves autônomas e software de frota para o varejo que quer entregar em minutos — sem semáforo, sem trânsito.
        </p>
      </div>

      {/* linhas */}
      <svg ref={svg} data-lines className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full md:block" aria-hidden>
        {sides.map((_, i) => (
          <path key={i} data-line className="dash-flow" fill="none" stroke="#ff5a1f" strokeOpacity=".95" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        {sides.flatMap((_, i) => [
          <circle key={`a${i}`} data-end r="2.5" fill="#ff5a1f" />,
          <circle key={`b${i}`} data-end r="3.5" fill="white" stroke="#ff5a1f" strokeWidth="1.2" />,
        ])}
      </svg>

      {/* palco: moldura + aeronave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] z-10 md:top-[40%]">
        <div data-depth="8" className="absolute bottom-[25%] left-1/2 w-[74vw] -translate-x-1/2 md:bottom-[7%] md:w-[min(40vw,600px)]">
          <div data-frame className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/50 shadow-[0_40px_80px_-40px_rgba(5,7,13,.6)] md:rounded-[28px]">
            <img src="/img/city.webp" alt="" className="absolute inset-0 h-full w-full scale-[1.6] object-cover object-[46%_62%] saturate-[1.15]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.15),transparent_40%,rgba(5,7,13,.35))]" />
            {/* HUD */}
            {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
              <span key={c} className={`absolute h-3.5 w-3.5 border-white/80 ${c}`} />
            ))}
            <span className="label absolute bottom-5 left-6 text-[9px] text-white/85">Cam 02 · Rota 114</span>
            <span className="label absolute bottom-5 right-6 hidden text-[9px] text-white/85 md:block">Alt 120 m</span>
          </div>
        </div>

        <div data-drone-scroll className="absolute bottom-[39%] left-1/2 w-[98vw] -translate-x-1/2 md:bottom-[22%] md:w-[min(56vw,840px)]">
          <div data-depth="18">
            <div data-drone-in>
              <div data-hover>
                <img data-drone-img src="/img/drone.webp" alt="Aeronave de entrega Kestrel K4 em voo" className="w-full drop-shadow-[0_50px_40px_rgba(5,7,13,.45)]" />
              </div>
            </div>
          </div>
        </div>

        <a href="#entrega" data-sub className="pointer-events-auto group absolute bottom-[19%] left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-[13px] glass md:bottom-[9%] md:flex">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-white transition-transform duration-500 ease-out-expo group-hover:scale-110">
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden><path d="M1 1l8 5-8 5z" fill="currentColor" /></svg>
          </span>
          Acompanhar uma entrega
        </a>
      </div>

      {/* cards — desktop */}
      <div className="absolute inset-0 z-30 hidden md:block">
        {sides.map((s, i) => (
          <div key={i} data-side={s.side} className={`absolute ${s.pos}`}>
            <div data-depth={s.depth}>
              <div data-card>
                <div className="card">{s.el}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* cards — mobile: composição própria */}
      <div data-mcards className="absolute inset-x-4 bottom-5 z-30 grid grid-cols-2 gap-2.5 md:hidden">
        <div className="card glass rounded-2xl p-3.5">
          <p className="text-[26px] font-light leading-none tracking-[-0.04em]">32<span className="ml-1 text-[13px] text-[#0d1424]/55">km</span></p>
          <p className="mt-1 text-[11.5px] text-[#0d1424]/55">raio de operação</p>
          <p className="label mt-2.5 flex items-center gap-1.5 text-[8.5px] text-[#0d1424]/70"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />Espaço livre</p>
        </div>
        <div className="card glass rounded-2xl p-3.5">
          <p className="text-[26px] font-light leading-none tracking-[-0.04em]">5<span className="ml-1 text-[13px] text-[#0d1424]/55">kg</span></p>
          <p className="mt-1 text-[11.5px] text-[#0d1424]/55">por voo</p>
          <a href="#entrega" className="label mt-2.5 flex items-center gap-1.5 text-[8.5px] text-[#0d1424]/80"><span className="text-ember">▶</span> Ver entrega</a>
        </div>
      </div>

      {/* transição para a noite */}
      <div data-night className="pointer-events-none invisible absolute inset-0 z-40 bg-ink opacity-0" />
    </section>
  );
}
