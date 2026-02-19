import type { JSX } from "react";
import { motion } from "framer-motion";
import { Mail, Target, UserRound } from "lucide-react";

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

export default function AboutPage(): JSX.Element {
  return (
    <>
      <section className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <Target size={14} /> Missão, visão e valores
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Fundamento estratégico para construir evolução tecnológica real.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              A Hugenis é uma empresa de arquitetura estratégica digital para
              empresas em crescimento. Nossa atuação une consultoria técnica
              estratégica e execução própria.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid--3"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            {[
              {
                t: "Missão",
                d: "Projetar e construir soluções digitais estruturadas que direcionam crescimento tecnológico sustentável e estratégico.",
              },
              {
                t: "Visão",
                d: "Ser referência em arquitetura e estruturação digital para empresas que querem evoluir com base sólida.",
              },
              {
                t: "Valores",
                d: "Estrutura antes da velocidade, tecnologia com propósito, clareza estratégica, evolução contínua e parceria de longo prazo.",
              },
            ].map((card) => (
              <motion.div
                className="card card--hover card--center"
                key={card.t}
                variants={reveal}
              >
                <div className="card__title">{card.t}</div>
                <p className="card__desc">{card.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <motion.div
            className="sectionHead"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <UserRound size={14} /> Manifesto
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              A Hugenis não desenvolve apenas sistemas.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Estruturamos o caminho tecnológico que sustenta o crescimento da
              empresa, com arquitetura bem pensada, execução disciplinada e
              evolução contínua.
            </motion.p>
          </motion.div>

          <motion.div
            className="card quoteCard"
            initial="hidden"
            animate="show"
            variants={reveal}
          >
            <img
              src="/founder.png"
              alt="Henrique Guilherme - Fundador da Hugenis"
              className="quoteCard__image"
              loading="lazy"
            />
            <div className="quoteCard__content">
              <p className="quoteCard__text">
                “Tentativa e erro fazem parte do processo.
                <br />
                Não buscamos saltos heroicos, buscamos consistência, sendo 1%
                melhores do que fomos ontem.
                <br />
                <br />
                Porque, no fim,
                <br />
                o futuro não pertence aos que acertam de primeira —
                <br />
                pertence aos que persistem e avançam.”
              </p>

              <p className="quoteCard__signature">
                — Henrique Guilherme
                <span>Fundador da Hugenis</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <Mail size={14} /> Contato
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Vamos estruturar o próximo ciclo da sua evolução digital.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              comercial@hugenis.com
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
