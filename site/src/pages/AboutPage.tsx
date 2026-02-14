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

export default function AboutPage(): JSX.Element {
  return (
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
            Sobre nós
          </motion.div>
          <motion.h2 className="h2" variants={reveal}>
            Construímos tecnologia com propósito, coragem e consistência.
          </motion.h2>
          <motion.p className="p" variants={reveal}>
            Acreditamos que grandes resultados nascem quando visão e execução caminham juntas.
            Na Hugenis, cada projeto é uma oportunidade de transformar complexidade em clareza,
            incerteza em estratégia e potencial em impacto real.
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
              d: "Criar produtos e sistemas que gerem valor de longo prazo, sem atalhos e com responsabilidade.",
            },
          ].map((card) => (
            <motion.div className="card card--hover card--center" key={card.t} variants={reveal}>
              <div className="card__title">{card.t}</div>
              <p className="card__desc">{card.d}</p>
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
            O fundador da Hugenis, Henrique Guilherme, constrói sua trajetória unindo engenharia
            de software, dados e inteligência artificial para resolver problemas reais com
            profundidade técnica e visão de negócio. Seu trabalho é guiado por uma crença simples:
            tecnologia só faz sentido quando melhora decisões, acelera resultados e cria futuro
            com responsabilidade. — Sobre o fundador.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
