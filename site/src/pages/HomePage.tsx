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
              responsável e orientada a resultados reais.
            </motion.p>

            <motion.div className="miniCards" variants={reveal}>
              <div className="miniCard">
                <div className="miniCard__t">Diagnóstico</div>
                <div className="miniCard__d">Antes de propor, entendemos.</div>
              </div>
              <div className="miniCard">
                <div className="miniCard__t">Arquitetura</div>
                <div className="miniCard__d">Base para crescer com segurança.</div>
              </div>
              <div className="miniCard">
                <div className="miniCard__t">Entrega</div>
                <div className="miniCard__d">Qualidade e consistência.</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
