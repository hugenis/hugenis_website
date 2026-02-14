import { useEffect, useState } from "react";
import type { JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Brain,
  Boxes,
  Code2,
  Database,
  ShieldCheck,
  Sparkles,
  Workflow,
  Check,
  // Mail,
  // Phone,
  // MapPin,
  Menu,
  X,
} from "lucide-react";
import "./hugenisHome.css";

type BrandVariant = "dark" | "light";

type Colors = {
  ink: string;
  graphite: string;
  mid: string;
  paper: string;
  accent: string;
};

const COLORS: Colors = {
  ink: "#0E2A3A",
  graphite: "#1E1E1E",
  mid: "#6B7280",
  paper: "#F5F7FA",
  accent: "#2CC6B8",
};

type ScrollToFn = (id: string) => void;

function useSmoothScroll(): ScrollToFn {
  return (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

function LogoMark(): JSX.Element {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="21" r="4" fill={COLORS.accent} />
      <circle cx="20" cy="7" r="4" fill="rgba(245,247,250,0.95)" />
      <path
        d="M7 21 L20 7"
        stroke="rgba(245,247,250,0.55)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M7 21 L7 9"
        stroke="rgba(245,247,250,0.55)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M7 9 L12 6"
        stroke="rgba(245,247,250,0.55)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type WordmarkProps = { variant?: BrandVariant };

function Wordmark({ variant = "light" }: WordmarkProps): JSX.Element {
  const isDark = variant === "dark";
  return (
    <div className={`brand ${isDark ? "brand--dark" : "brand--light"}`}>
      <div className={`brand__mark ${isDark ? "mark--dark" : "mark--light"}`}>
        <LogoMark />
      </div>
      <span className="brand__name">
        hu<span className="accent">gen</span>is
      </span>
    </div>
  );
}

/** Motion helpers */
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: easeOut },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pega a entry com maior interseção
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "-25% 0px -55% 0px",
      },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

type FeatureProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets?: string[];
};

function Feature({
  icon: Icon,
  title,
  desc,
  bullets = [],
}: FeatureProps): JSX.Element {
  return (
    <motion.div className="card card--hover" variants={reveal}>
      <div className="card__head">
        <div className="iconBox" aria-hidden="true">
          <Icon size={18} color={COLORS.ink} />
        </div>
        <div className="card__title">{title}</div>
      </div>

      <div className="card__desc">{desc}</div>

      {bullets.length > 0 && (
        <ul className="bullets">
          {bullets.map((b) => (
            <li key={b} className="bullets__item">
              <Check size={16} color={COLORS.accent} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

// type CTAFormState = {
//   name: string;
//   email: string;
//   message: string;
//   sent: boolean;
// };

// function CTAForm(): JSX.Element {
//   const [name, setName] = useState<CTAFormState["name"]>("");
//   const [email, setEmail] = useState<CTAFormState["email"]>("");
//   const [message, setMessage] = useState<CTAFormState["message"]>("");
//   const [sent, setSent] = useState<CTAFormState["sent"]>(false);

//   const canSend = useMemo<boolean>(() => {
//     const emailOk = /.+@.+\..+/.test(email);
//     const nameOk = name.trim().length >= 2;
//     const msgOk = message.trim().length >= 10;
//     return emailOk && nameOk && msgOk;
//   }, [name, email, message]);

//   const submit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!canSend) return;
//     setSent(true);
//   };

//   return (
//     <motion.div className="formCard" variants={reveal}>
//       <div className="formCard__title">Vamos falar sobre seu cenário</div>
//       <div className="formCard__subtitle">
//         Conte contexto e objetivo. A gente devolve com clareza e próximos
//         passos.
//       </div>

//       {sent ? (
//         <div className="successBox" role="status" aria-live="polite">
//           Mensagem enviada. Em breve retornamos com um primeiro diagnóstico.
//         </div>
//       ) : (
//         <form onSubmit={submit} className="form">
//           <div className="form__row">
//             <div className="field">
//               <label htmlFor="nome">Nome</label>
//               <input
//                 id="nome"
//                 value={name}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   setName(e.target.value)
//                 }
//                 placeholder="Seu nome"
//                 autoComplete="name"
//               />
//             </div>

//             <div className="field">
//               <label htmlFor="email">E-mail</label>
//               <input
//                 id="email"
//                 value={email}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   setEmail(e.target.value)
//                 }
//                 placeholder="seu@email.com"
//                 inputMode="email"
//                 autoComplete="email"
//               />
//             </div>
//           </div>

//           <div className="field">
//             <label htmlFor="mensagem">Como podemos ajudar?</label>
//             <textarea
//               id="mensagem"
//               value={message}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 setMessage(e.target.value)
//               }
//               rows={5}
//               placeholder="Contexto, objetivo e prazo (se houver)."
//             />
//           </div>

//           <button
//             className="btn btn--primary btn--wide"
//             disabled={!canSend}
//             type="submit"
//           >
//             Enviar mensagem <ArrowRight size={16} />
//           </button>

//           <div className="hint">
//             *Resposta em horário comercial. Se preferir, mande direto para{" "}
//             <a className="link" href="mailto:henrique.guilherme@hugenis.com">
//               henrique.guilherme@hugenis.com
//             </a>
//             .
//           </div>
//         </form>
//       )}
//     </motion.div>
//   );
// }

type NavItem = { id: string; label: string };

function MobileMenu({
  open,
  onClose,
  items,
  activeId,
  onGo,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId: string;
  onGo: (id: string) => void;
}): JSX.Element {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="mobileOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="mobileSheet"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: easeOut }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="mobileSheet__top">
              <Wordmark variant="dark" />
              <button
                className="iconBtn"
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mobileSheet__nav">
              {items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  className={`mobileLink ${activeId === it.id ? "isActive" : ""}`}
                  onClick={() => {
                    onGo(it.id);
                    onClose();
                  }}
                >
                  {it.label}
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>

            {/* <div className="mobileSheet__cta">
              <button
                className="btn btn--ghost btn--wide"
                type="button"
                onClick={() => onGo("contato")}
              >
                Contato
              </button>
              <button
                className="btn btn--primary btn--wide"
                type="button"
                onClick={() => onGo("contato")}
              >
                Diagnóstico <ArrowRight size={16} />
              </button>
            </div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function HugenisHome(): JSX.Element {
  const scrollTo = useSmoothScroll();
  const navItems: NavItem[] = [
    { id: "o-que-fazemos", label: "O que fazemos" },
    { id: "como-trabalhamos", label: "Como trabalhamos" },
    { id: "sobre-nos", label: "Sobre nós" },
    // { id: "contato", label: "Contato" },
  ];
  const activeId = useActiveSection(navItems.map((n) => n.id));
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: string) => scrollTo(id);

  return (
    <div className="page">
      <a className="skipLink" href="#o-que-fazemos">
        Pular para o conteúdo
      </a>

      <header className="topbar">
        <div className="container topbar__inner">
          <button
            className="topbar__logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            type="button"
            aria-label="Ir para o topo"
          >
            <Wordmark variant="dark" />
          </button>

          <nav className="topbar__nav" aria-label="Navegação">
            {navItems.map((it) => (
              <button
                key={it.id}
                type="button"
                className={`navLink ${activeId === it.id ? "isActive" : ""}`}
                onClick={() => go(it.id)}
              >
                {it.label}
              </button>
            ))}
          </nav>

          <div className="topbar__cta">
            {/* <button
              className="btn btn--ghost topbar__hideOnMobile"
              type="button"
              onClick={() => go("contato")}
            >
              Contato
            </button> */}
            {/* <button
              className="btn btn--primary topbar__hideOnMobile"
              type="button"
              onClick={() => go("contato")}
            >
              Diagnóstico <ArrowRight size={16} />
            </button> */}

            <button
              className="iconBtn topbar__showOnMobile"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navItems}
        activeId={activeId}
        onGo={go}
      />

      {/* HERO BAND (full width) */}
      <section className="band band--hero">
        <div className="container">
          <div className="hero">
            <motion.div
              className="hero__left"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div className="chips" variants={reveal}>
                <span className="chip">Software • Dados • IA</span>
                <span className="chip">Excelência técnica</span>
                <span className="chip">Visão de longo prazo</span>
              </motion.div>

              <motion.h1 className="hero__title" variants={reveal}>
                Engenharia e inovação{" "}
                <span className="accent">que geram confiança</span>.
              </motion.h1>

              <motion.p className="hero__lead" variants={reveal}>
                A Hugenis desenvolve software e soluções com dados e IA de
                forma estruturada, responsável e orientada a resultados reais.
                Com planejamento, método e compromisso com qualidade.
              </motion.p>

              <motion.div className="hero__actions" variants={reveal}>
                {/* <button
                  className="btn btn--primary"
                  type="button"
                  onClick={() => go("contato")}
                >
                  Falar com a Hugenis <ArrowRight size={16} />
                </button> */}
                <button
                  className="btn btn--ghost"
                  type="button"
                  onClick={() => go("o-que-fazemos")}
                >
                  Ver serviços
                </button>
              </motion.div>

              <motion.div className="miniCards" variants={reveal}>
                <div className="miniCard">
                  <div className="miniCard__t">Diagnóstico</div>
                  <div className="miniCard__d">
                    Antes de propor, entendemos.
                  </div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__t">Arquitetura</div>
                  <div className="miniCard__d">
                    Base para crescer com segurança.
                  </div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__t">Entrega</div>
                  <div className="miniCard__d">Qualidade e consistência.</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="heroPanel"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div className="heroPanel__top" variants={reveal}>
                <Wordmark variant="light" />
                <span className="pill">Hugenis Labs</span>
              </motion.div>

              <motion.div className="heroPanel__stats" variants={reveal}>
                <div className="stat">
                  <div className="stat__v">+confiança</div>
                  <div className="stat__l">para decisões técnicas</div>
                </div>
                <div className="stat">
                  <div className="stat__v">+estrutura</div>
                  <div className="stat__l">para sistemas escaláveis</div>
                </div>
                <div className="stat">
                  <div className="stat__v">+valor</div>
                  <div className="stat__l">para IA com propósito</div>
                </div>
              </motion.div>

              <motion.div className="heroPanel__notes" variants={reveal}>
                <div className="note">
                  <div className="note__t">
                    <Workflow size={16} color={COLORS.accent} /> Método claro,
                    com foco
                  </div>
                  <div className="note__d">
                    Diagnóstico → arquitetura → execução → observabilidade.
                  </div>
                </div>
                <div className="note">
                  <div className="note__t">
                    <ShieldCheck size={16} color={COLORS.accent} />{" "}
                    Responsabilidade técnica
                  </div>
                  <div className="note__d">
                    Trabalho técnico consistente, com escolhas sustentáveis e
                    transparência em cada etapa.
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="heroPanel__glow"
                aria-hidden="true"
                variants={reveal}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="o-que-fazemos" className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              O que fazemos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Tecnologia com profundidade, do software aos dados e à IA.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Construímos e evoluímos sistemas, automatizamos processos e
              aplicamos dados/IA com responsabilidade.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <Feature
              icon={Code2}
              title="Software sob medida"
              desc="Aplicações web, APIs, integrações e módulos críticos com engenharia limpa."
              bullets={[
                "Arquitetura e padrões",
                "Qualidade e testes",
                "Documentação objetiva",
              ]}
            />
            <Feature
              icon={Boxes}
              title="Arquitetura & evolução"
              desc="Refatoração estratégica, performance e confiabilidade para crescer com segurança."
              bullets={[
                "Diagnóstico de gargalos",
                "Plano evolutivo",
                "Observabilidade",
              ]}
            />
            <Feature
              icon={Workflow}
              title="Automação de processos"
              desc="Redução de tempo e erro operacional com automações rastreáveis."
              bullets={[
                "Mapeamento de fluxo",
                "Automação incremental",
                "Métricas de ganho",
              ]}
            />
            <Feature
              icon={Database}
              title="Dados & estratégia"
              desc="Pipeline, qualidade e análises que viram decisão — não só dashboard."
              bullets={[
                "Modelagem e ETL",
                "Indicadores úteis",
                "Governança leve",
              ]}
            />
            <Feature
              icon={Brain}
              title="IA aplicada"
              desc="Do experimento ao produto: IA/ML com validação, métricas e limites claros."
              bullets={[
                "Prova de valor",
                "Métricas e validação",
                "Integração com produto",
              ]}
            />
            <Feature
              icon={ShieldCheck}
              title="Consultoria técnica"
              desc="Apoiamos decisões técnicas com análise cuidadosa: stack, riscos, prazos e trade-offs."
              bullets={["Avaliação técnica", "Plano de ação", "Acompanhamento"]}
            />
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="como-trabalhamos" className="band">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              Como trabalhamos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Processo claro. Entrega consistente.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Comunicação objetiva, execução responsável e evolução contínua
              para reduzir riscos e aumentar previsibilidade.
            </motion.p>
          </motion.div>

          <motion.div
            className="steps steps--cards"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {[
              {
                n: "01",
                t: "Diagnóstico",
                d: "Objetivo, contexto e restrições. Riscos e alternativas antes da proposta.",
              },
              {
                n: "02",
                t: "Arquitetura",
                d: "Componentes, integrações, dados e qualidade. Menos improviso, mais clareza.",
              },
              {
                n: "03",
                t: "Execução incremental",
                d: "Entregas por etapas, validação e métricas. Evolução sem perder controle.",
              },
              {
                n: "04",
                t: "Operação & evolução",
                d: "Monitoramento, performance e ajustes. Solução boa continua boa no mundo real.",
              },
            ].map((s) => (
              <motion.div className="stepCard" variants={reveal} key={s.n}>
                <div className="stepCard__badge" aria-hidden="true">
                  {s.n}
                </div>
                <div className="stepCard__body">
                  <div className="stepCard__t">{s.t}</div>
                  <div className="stepCard__d">{s.d}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="principles"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="principles__t" variants={reveal}>
              <Sparkles size={18} color={COLORS.accent} /> Princípios Hugenis
            </motion.div>
            <motion.div className="principles__chips" variants={reveal}>
              <span>Visão prática</span>
              <span>Comunicação clara</span>
              <span>Entrega consistente</span>
              <span>Qualidade & simplicidade</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre-nos" className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              Sobre nós
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Construímos tecnologia com propósito, coragem e consistência.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Acreditamos que grandes resultados nascem quando visão e execução
              caminham juntas. Na Hugenis, cada projeto é uma oportunidade de
              transformar complexidade em clareza, incerteza em estratégia e
              potencial em impacto real.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid--3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {[
              {
                t: "Nosso compromisso",
                d: "Entregar soluções úteis, elegantes e sustentáveis, com qualidade técnica em cada detalhe.",
              },
              {
                t: "Nossa motivação",
                d: "Apoiar pessoas e empresas em seu crescimento com tecnologia confiável, boas decisões e evolução contínua.",
              },
              {
                t: "Nossa visão",
                d: "Criar produtos e sistemas que gerem valor de longo prazo, sem atalhos e sem promessas vazias.",
              },
            ].map((c) => (
              <motion.div
                className="card card--hover card--center"
                key={c.t}
                variants={reveal}
              >
                <div className="card__title">{c.t}</div>
                <p className="card__desc">{c.d}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="principles"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p className="p" variants={reveal}>
              O fundador da Hugenis, Henrique Guilherme, constrói sua trajetória
              unindo engenharia de software, dados e inteligência artificial para
              resolver problemas reais com profundidade técnica e visão de
              negócio. Seu trabalho é guiado por uma crença simples: tecnologia
              só faz sentido quando melhora decisões, acelera resultados e cria
              futuro com responsabilidade. — Sobre o fundador.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contato" className="band band--dark">
        {/* <div className="container">
          <motion.div
            className="sectionHead sectionHead--center sectionHead--dark"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker kicker--dark" variants={reveal}>
              Contato
            </motion.div>
            <motion.h2 className="h2 h2--dark" variants={reveal}>
              Vamos conversar com critério.
            </motion.h2>
            <motion.p className="p p--dark" variants={reveal}>
              Envie contexto e objetivo. A Hugenis devolve com clareza e
              próximos passos.
            </motion.p>
          </motion.div>

          <div className="contact">
            <motion.div
              className="contactLeft"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div className="contactCards" variants={stagger}>
                <motion.a
                  className="contactCard contactCard--dark"
                  href="mailto:henrique.guilherme@hugenis.com"
                  variants={reveal}
                >
                  <Mail size={18} color={COLORS.accent} />
                  <div>
                    <b>E-mail</b>
                    <p>henrique.guilherme@hugenis.com</p>
                  </div>
                </motion.a>

                <motion.div
                  className="contactCard contactCard--dark"
                  variants={reveal}
                >
                  <Phone size={18} color={COLORS.accent} />
                  <div>
                    <b>WhatsApp</b>
                    <p>(11) 9XXXX-XXXX</p>
                  </div>
                </motion.div>

                <motion.div
                  className="contactCard contactCard--dark"
                  variants={reveal}
                >
                  <MapPin size={18} color={COLORS.accent} />
                  <div>
                    <b>Base</b>
                    <p>Brasil (remoto / híbrido)</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="quickBox" variants={reveal}>
                <div className="quickBox__top">
                  <span className="pill pill--dark">Resposta rápida</span>
                </div>
                <div className="quickBox__text">
                  Se preferir, mande um resumo do projeto e o prazo desejado. A
                  gente responde com um caminho sugerido.
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <CTAForm />
            </motion.div>
          </div>
        </div> */}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__row">
          <div className="footer__left">
            <Wordmark variant="dark" />
            <span>© {new Date().getFullYear()} Hugenis Ltda</span>
          </div>
          <div className="footer__mid">
            <span>Software</span>
            <span>Dados</span>
            <span>IA</span>
            <span>Arquitetura</span>
          </div>
          <div className="footer__right">
            Tecnologia bem aplicada, com responsabilidade.
          </div>
        </div>
      </footer>
    </div>
  );
}
