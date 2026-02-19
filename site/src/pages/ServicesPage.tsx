import type { JSX } from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  Brain,
  Code2,
  Database,
  ShieldCheck,
  Workflow,
  Check,
  ClipboardList,
  Layers,
} from "lucide-react";
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

function Feature({
  icon: Icon,
  title,
  desc,
  bullets,
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
              <Layers size={14} /> Proposta de valor
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Arquitetura estratégica digital para empresas em crescimento.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Estruturamos, modernizamos e direcionamos a evolução tecnológica
              de empresas, transformando tecnologia dispersa em arquitetura
              estratégica.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <Feature
              icon={Database}
              title="Diagnóstico de maturidade digital"
              desc="Mapeamos cenário técnico atual para orientar decisões de investimento e evolução."
              bullets={[
                "Mapa de maturidade",
                "Riscos e gargalos",
                "Prioridades práticas",
              ]}
            />
            <Feature
              icon={Boxes}
              title="Arquitetura de sistemas"
              desc="Estruturação de base técnica para crescimento sustentável e previsível."
              bullets={[
                "Arquitetura alvo",
                "Padrões de integração",
                "Escalabilidade",
              ]}
            />
            <Feature
              icon={Code2}
              title="Desenvolvimento web sob medida"
              desc="Implementação orientada por escopo definido, entregáveis objetivos e valor de negócio."
              bullets={[
                "Produto sob medida",
                "Qualidade de código",
                "Manutenção simples",
              ]}
            />
            <Feature
              icon={Workflow}
              title="Integração de sistemas"
              desc="Conectamos plataformas e processos para reduzir silos e aumentar eficiência operacional."
              bullets={[
                "Integrações seguras",
                "Fluxos automatizados",
                "Rastreabilidade",
              ]}
            />
            <Feature
              icon={Brain}
              title="Aplicação estratégica de IA"
              desc="IA aplicada com propósito e foco em ROI, conectada ao contexto real da empresa."
              bullets={[
                "Casos de uso viáveis",
                "Validação de impacto",
                "Medição de resultado",
              ]}
            />
            <Feature
              icon={ShieldCheck}
              title="Planejamento com visão de longo prazo"
              desc="Direcionamos a evolução técnica de médio e longo prazo com governança clara."
              bullets={[
                "Roadmap estratégico",
                "Marcos de evolução",
                "Sustentabilidade técnica",
              ]}
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
              <ClipboardList size={14} /> Modelo de parceria
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Diagnóstico → Arquitetura → Desenvolvimento → Evolução.
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
                t: "Diagnóstico",
                d: "Entendimento técnico do cenário e definição de prioridades.",
              },
              {
                n: "02",
                t: "Arquitetura",
                d: "Estruturação de soluções com base sólida e visão de escala.",
              },
              {
                n: "03",
                t: "Desenvolvimento",
                d: "Execução própria com foco em entregáveis e qualidade de engenharia.",
              },
              {
                n: "04",
                t: "Evolução contínua",
                d: "Acompanhamos a solução para garantir que ela continue gerando resultado.",
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
