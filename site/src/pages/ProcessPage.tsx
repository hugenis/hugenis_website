import type { JSX } from "react";
import { motion } from "framer-motion";
import { Gauge, GitBranch, Sparkles } from "lucide-react";

const COLORS = {
  accent: "#2CC6B8",
};

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

export default function ProcessPage(): JSX.Element {
  return (
    <>
      <section className="band">
        <div className="container">
          <motion.div className="sectionHead sectionHead--center" initial="hidden" animate="show" variants={stagger}>
            <motion.div className="kicker" variants={reveal}>
              <GitBranch size={14} /> Estratégia de diferenciação
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Arquitetura antes do desenvolvimento.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Nossa atuação combina método técnico, inteligência aplicada com propósito e
              planejamento tecnológico de longo prazo para construir crescimento sustentável.
            </motion.p>
          </motion.div>

          <motion.div className="steps steps--cards" initial="hidden" animate="show" variants={stagger}>
            {[
              { n: "01", t: "Estrutura antes da velocidade", d: "Primeiro consolidamos direção e arquitetura, depois aceleramos execução." },
              { n: "02", t: "IA com foco em ROI", d: "Aplicamos IA onde há impacto mensurável e ganho claro para o negócio." },
              { n: "03", t: "Planejamento 3-5 anos", d: "Definimos evolução técnica de médio e longo prazo, não apenas ações imediatas." },
              { n: "04", t: "Parceria contínua", d: "Atuação permanente para manter coerência entre estratégia e operação tecnológica." },
            ].map((step) => (
              <motion.div className="stepCard" variants={reveal} key={step.n}>
                <div className="stepCard__badge" aria-hidden="true">{step.n}</div>
                <div className="stepCard__body">
                  <div className="stepCard__t">{step.t}</div>
                  <div className="stepCard__d">{step.d}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="graphicCard" initial="hidden" animate="show" variants={reveal}>
            <h3 className="card__title">Curva de evolução tecnológica orientada por arquitetura</h3>
            <svg viewBox="0 0 420 190" className="inlineChart" role="img" aria-label="Gráfico com evolução de estrutura, integração e escala">
              <rect x="0" y="0" width="420" height="190" rx="14" fill="#f5f7fa" />
              <line x1="40" y1="150" x2="390" y2="150" stroke="#6b7280" strokeOpacity="0.4" />
              <line x1="40" y1="40" x2="40" y2="150" stroke="#6b7280" strokeOpacity="0.4" />
              <polyline points="40,138 120,122 200,98 280,76 390,56" fill="none" stroke="#0E2A3A" strokeWidth="3" />
              <polyline points="40,144 120,134 200,116 280,94 390,72" fill="none" stroke="#2CC6B8" strokeWidth="3" />
              <text x="50" y="32" fontSize="11" fill="#1E1E1E">Maturidade tecnológica</text>
              <text x="265" y="56" fontSize="11" fill="#0E2A3A">Arquitetura</text>
              <text x="292" y="72" fontSize="11" fill="#2CC6B8">Escala</text>
            </svg>
          </motion.div>
        </div>
      </section>

      <section className="band band--tinted">
        <div className="container">
          <motion.div className="sectionHead" initial="hidden" animate="show" variants={stagger}>
            <motion.div className="kicker" variants={reveal}>
              <Gauge size={14} /> Valores
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Princípios que guiam cada decisão técnica.
            </motion.h2>
          </motion.div>

          <motion.div className="grid grid--3" initial="hidden" animate="show" variants={stagger}>
            {[
              { t: "Estrutura antes da velocidade", d: "Construção sólida para evitar retrabalho e decisões frágeis." },
              { t: "Tecnologia com propósito", d: "Aplicações orientadas por resultado real e contexto de negócio." },
              { t: "Clareza estratégica", d: "Decisões transparentes, direcionamento técnico e priorização objetiva." },
              { t: "Evolução contínua", d: "Aprimoramento constante de arquitetura, processos e entregas." },
              { t: "Parceria de longo prazo", d: "Atuação próxima para sustentar crescimento com previsibilidade." },
            ].map((item) => (
              <motion.div className="card card--hover card--center" key={item.t} variants={reveal}>
                <div className="card__title">{item.t}</div>
                <p className="card__desc">{item.d}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="principles" initial="hidden" animate="show" variants={stagger}>
            <motion.div className="principles__t" variants={reveal}>
              <Sparkles size={18} color={COLORS.accent} /> Frase de impacto
            </motion.div>
            <motion.div className="principles__chips" variants={reveal}>
              <span>Hugenis - Empresa de arquitetura estratégica digital para empresas em crescimento</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
