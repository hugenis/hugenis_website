import type { JSX } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
          <div className="hero hero--split">
            <motion.div
              className="hero__left"
              initial="hidden"
              animate="show"
              variants={stagger}
            >
              <motion.div className="chips" variants={reveal}>
                <span className="chip">B2B para empresas</span>
                <span className="chip">Arquitetura estratégica digital</span>
                <span className="chip">Parceria de longo prazo</span>
              </motion.div>

              <motion.h1 className="hero__title" variants={reveal}>
                Transformando Futuros Digitais
              </motion.h1>

              <motion.p className="hero__lead" variants={reveal}>
                Arquitetamos soluções digitais com visão, estrutura e
                inteligência aplicada para transformar tecnologia dispersa em
                base estratégica de crescimento.
              </motion.p>

              <motion.div className="hero__actions" variants={reveal}>
                <a className="btn btn--primary" href="/sobre-nos">
                  Começar um projeto
                </a>
                <a className="btn btn--ghost" href="/como-trabalhamos">
                  Construir o próximo passo
                </a>
              </motion.div>

              <motion.div className="miniCards" variants={reveal}>
                <div className="miniCard">
                  <div className="miniCard__t">Missão</div>
                  <div className="miniCard__d">
                    Projetar e construir soluções digitais estruturadas para
                    crescimento sustentável.
                  </div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__t">Visão</div>
                  <div className="miniCard__d">
                    Ser referência em arquitetura e estruturação digital com
                    base sólida.
                  </div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__t">Valores</div>
                  <div className="miniCard__d">
                    Estrutura, propósito, clareza estratégica, evolução contínua
                    e parceria duradoura.
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.aside
              className="heroPanel"
              initial="hidden"
              animate="show"
              variants={reveal}
            >
              <div className="heroPanel__glow" />
              <img
                className="featureImage"
                src="/logo.jpg"
                alt="Composição visual da marca Hugenis"
                loading="lazy"
              />
              <div className="heroPanel__notes">
                <div className="note">
                  <div className="note__t">Proposta de valor</div>
                  <div className="note__d">
                    Estruturamos, modernizamos e direcionamos a evolução
                    tecnológica de empresas com execução própria e arquitetura
                    estratégica.
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
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
              <Sparkles size={14} /> Posicionamento de mercado
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Consultoria técnica estratégica com execução própria.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Atuamos no mercado B2B com foco em empresas que precisam
              organizar, modernizar e escalar sua tecnologia com segurança.
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
                t: "Não somos",
                d: "Fábrica de software, agência digital ou startup hype.",
              },
              {
                t: "Somos",
                d: "Estruturadora de crescimento tecnológico com visão de longo prazo.",
              },
              {
                t: "Foco",
                d: "Arquitetura antes do desenvolvimento para evoluir com segurança e consistência.",
              },
            ].map((item) => (
              <motion.div
                className="card card--hover card--center"
                key={item.t}
                variants={reveal}
              >
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
