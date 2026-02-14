import type { JSX } from "react";
import { motion } from "framer-motion";

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

export default function HomePage(): JSX.Element {
  return (
    <>
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
                Engenharia e inovação <span className="accent">que geram confiança</span>.
              </motion.h1>

              <motion.p className="hero__lead" variants={reveal}>
                A Hugenis desenvolve software e soluções com dados e IA de forma estruturada,
                responsável e orientada a resultados reais. Combinamos visão de produto,
                arquitetura e execução para transformar boas ideias em sistemas sólidos.
              </motion.p>

              <motion.div className="miniCards" variants={reveal}>
                <div className="miniCard">
                  <div className="miniCard__t">Diagnóstico</div>
                  <div className="miniCard__d">Antes de propor, entendemos cenário e metas.</div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__t">Arquitetura</div>
                  <div className="miniCard__d">Base técnica para crescer com segurança.</div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__t">Entrega</div>
                  <div className="miniCard__d">Valor contínuo, qualidade e consistência.</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              Nossa atuação
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Tecnologia aplicada com método, proximidade e impacto prático.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Atuamos lado a lado com empresas e equipes para destravar eficiência,
              confiabilidade e crescimento sustentável em produtos e operações.
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
                t: "Parceiros de evolução",
                d: "Não entregamos apenas código: ajudamos a formar direção técnica e visão de produto.",
              },
              {
                t: "Execução com clareza",
                d: "Escopo, prioridades e riscos ficam explícitos para a tomada de decisão ser segura.",
              },
              {
                t: "Resultados mensuráveis",
                d: "Cada entrega nasce com objetivo definido e indicadores para acompanhar valor.",
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
