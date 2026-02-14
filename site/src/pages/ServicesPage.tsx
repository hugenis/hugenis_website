import type { JSX } from "react";
import { motion } from "framer-motion";
import { Boxes, Brain, Code2, Database, ShieldCheck, Workflow, Check, ClipboardList, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const COLORS = {
  ink: "#0E2A3A",
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

type FeatureProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
};

function Feature({ icon: Icon, title, desc, bullets }: FeatureProps): JSX.Element {
  return (
    <motion.div className="card card--hover" variants={reveal}>
      <div className="card__head">
        <div className="iconBox" aria-hidden="true">
          <Icon size={18} color={COLORS.ink} />
        </div>
        <div className="card__title">{title}</div>
      </div>
      <div className="card__desc">{desc}</div>
      <ul className="bullets">
        {bullets.map((item) => (
          <li key={item} className="bullets__item">
            <Check size={16} color={COLORS.accent} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ServicesPage(): JSX.Element {
  return (
    <>
      <section className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <Layers size={14} /> O que fazemos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Tecnologia com profundidade, do software aos dados e à IA.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Construímos e evoluímos sistemas, automatizamos processos e aplicamos dados/IA com
              responsabilidade e foco em resultados concretos para o negócio.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <Feature
              icon={Code2}
              title="Software sob medida"
              desc="Soluções desenhadas para contexto, processo e meta de negócio."
              bullets={["Arquitetura sólida", "Escalabilidade", "Manutenibilidade"]}
            />
            <Feature
              icon={Boxes}
              title="Arquitetura & evolução"
              desc="Refatoração estratégica, performance e confiabilidade para crescer com segurança."
              bullets={["Diagnóstico de gargalos", "Plano evolutivo", "Observabilidade"]}
            />
            <Feature
              icon={Workflow}
              title="Automação de processos"
              desc="Redução de tempo e erro operacional com automações rastreáveis."
              bullets={["Mapeamento de fluxo", "Automação incremental", "Métricas de ganho"]}
            />
            <Feature
              icon={Database}
              title="Dados & estratégia"
              desc="Pipeline, qualidade e análises que viram decisão — não só dashboard."
              bullets={["Modelagem e ETL", "Indicadores úteis", "Governança leve"]}
            />
            <Feature
              icon={Brain}
              title="IA aplicada"
              desc="Do experimento ao produto: IA/ML com validação, métricas e limites claros."
              bullets={["Prova de valor", "Métricas e validação", "Integração com produto"]}
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

      <section className="band">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <ClipboardList size={14} /> Entregáveis
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              O que normalmente entregamos em cada frente.
            </motion.h2>
          </motion.div>

          <motion.div
            className="steps steps--cards"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            {[
              {
                n: "01",
                t: "Direcionamento técnico",
                d: "Diagnóstico, arquitetura alvo e priorização de etapas com clareza de investimento.",
              },
              {
                n: "02",
                t: "Plano de implementação",
                d: "Roadmap prático com entregas incrementais, marcos de validação e critérios de qualidade.",
              },
              {
                n: "03",
                t: "Evolução assistida",
                d: "Acompanhamento contínuo para manter estabilidade, performance e aderência ao objetivo.",
              },
            ].map((step) => (
              <motion.div className="stepCard" variants={reveal} key={step.n}>
                <div className="stepCard__badge" aria-hidden="true">
                  {step.n}
                </div>
                <div className="stepCard__body">
                  <div className="stepCard__t">{step.t}</div>
                  <div className="stepCard__d">{step.d}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
