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

const founderImageUrl =
  "https://media.licdn.com/dms/image/v2/D4D03AQGsK1jXMDXXUA/profile-displayphoto-scale_200_200/B4DZxPkw8hKEAY-/0/1770861564897?e=1772668800&v=beta&t=xy74UVyb9ehj-xqo2xWB63mrdP9WjCpGelKZjsowXSU";

export default function AboutPage(): JSX.Element {
  return (
    <>
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
        </div>
      </section>

      <section className="band">
        <div className="container">
          <motion.div
            className="sectionHead"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              Formação de novos talentos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Uma frente dedicada a preparar jovens para uma carreira técnica fora da média.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Além dos projetos com empresas, a Hugenis também atua na capacitação de iniciantes
              no desenvolvimento. Nossa proposta é formar profissionais com base sólida de lógica,
              engenharia e pensamento crítico — especialmente em um mercado já saturado de perfis
              medianos.
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
                t: "IA com sabedoria",
                d: "Ensinamos a usar inteligência artificial para aprender melhor, pesquisar e validar ideias — não para pensar no lugar do desenvolvedor.",
              },
              {
                t: "Método de aprendizado",
                d: "Aplicamos técnicas como prática deliberada, resolução guiada de problemas reais e revisão de código com feedback estruturado.",
              },
              {
                t: "Formação diferenciada",
                d: "O objetivo é formar profissionais autônomos, éticos e tecnicamente consistentes, capazes de gerar valor acima da média.",
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
              Sobre o fundador
            </motion.div>
          </motion.div>

          <motion.div
            className="card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
            style={{ display: "grid", gap: 20, alignItems: "center", gridTemplateColumns: "120px 1fr" }}
          >
            <img
              src={founderImageUrl}
              alt="Henrique Guilherme, fundador da Hugenis"
              width={120}
              height={120}
              style={{ borderRadius: 16, objectFit: "cover", border: "1px solid rgba(15, 23, 42, 0.12)" }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <p className="p" style={{ margin: 0 }}>
              Henrique Guilherme conduz a Hugenis unindo engenharia de software, dados e
              inteligência artificial para resolver desafios reais com profundidade técnica e visão
              de negócio. Sua atuação valoriza clareza, responsabilidade e evolução contínua,
              sempre com foco em construir soluções robustas e formar profissionais preparados para
              o futuro.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
