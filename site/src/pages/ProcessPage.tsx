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
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <GitBranch size={14} /> Como trabalhamos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Processo claro. Entrega consistente.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Comunicação objetiva, execução responsável e evolução contínua para reduzir riscos e
              aumentar previsibilidade.
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

      <section className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <Gauge size={14} /> Governança de execução
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Ritos e práticas para manter qualidade do início ao fim.
            </motion.h2>
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
                t: "Planejamento semanal",
                d: "Revisão de prioridades, dependências e capacidade para manter ritmo saudável.",
              },
              {
                t: "Revisão técnica",
                d: "Critérios de qualidade para código, arquitetura e rastreabilidade das decisões.",
              },
              {
                t: "Métricas de evolução",
                d: "Indicadores simples e úteis para acompanhar avanço e resultados de negócio.",
              },
            ].map((item) => (
              <motion.div className="card card--hover card--center" key={item.t} variants={reveal}>
                <div className="card__title">{item.t}</div>
                <p className="card__desc">{item.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
