import { type JSX } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Target,
  Workflow,
  Brain,
  KeyRound,
  Link2,
  Globe,
  Cpu,
  Activity,
  ShieldCheck,
  Check
} from "lucide-react";
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easeOut }
  }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const DELIVERABLE_CARDS = [
  {
    id: "web-mobile",
    num: "01",
    icon: Globe,
    title: "Sites, Sistemas & Aplicativos",
    sentence: "Criamos desde páginas comerciais para atrair clientes até sistemas completos e aplicativos para o seu negócio.",
    cta: "Quero criar o meu",
    whatsappUrl: "https://wa.me/5511969981157?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20a%20cria%C3%A7%C3%A3o%20de%20um%20site%2C%20sistema%20ou%20aplicativo%20para%20minha%20empresa.",
    items: [
      "Sites institucionais e Landing Pages",
      "Sistemas internos e painéis de gestão",
      "Portais e áreas exclusivas para seus clientes",
      "Aplicativos mobile para Android e iOS"
    ]
  },
  {
    id: "automacao",
    num: "02",
    icon: Workflow,
    title: "Automação & Integração",
    sentence: "Fazemos as ferramentas da sua empresa conversarem sozinhas para eliminar planilhas manuais e retrabalho.",
    cta: "Quero automatizar rotinas",
    whatsappUrl: "https://wa.me/5511969981157?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20automa%C3%A7%C3%A3o%20de%20rotinas%20e%20integra%C3%A7%C3%A3o%20de%20sistemas%20na%20minha%20empresa.",
    items: [
      "Integração entre sistemas, financeiro e vendas",
      "Fim do retrabalho manual em planilhas",
      "Envio automático de alertas e relatórios",
      "Processos digitais rápidos e organizados"
    ]
  },
  {
    id: "ia-dados",
    num: "03",
    icon: Cpu,
    title: "Inteligência Artificial & Dados",
    sentence: "Colocamos a IA e os dados da sua empresa para agilizar o atendimento, apoiar a equipe e guiar decisões.",
    cta: "Quero aplicar IA",
    whatsappUrl: "https://wa.me/5511969981157?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20a%20aplica%C3%A7%C3%A3o%20de%20Intelig%C3%AAncia%20Artificial%20e%20dados%20na%20minha%20empresa.",
    items: [
      "Assistentes de IA para atendimento e suporte",
      "IA treinada com os documentos da sua empresa",
      "Painéis simples para acompanhar resultados",
      "Dados protegidos e sob controle do seu negócio"
    ]
  }
];

const ENTERPRISE_MODULES = [
  {
    num: "01",
    icon: Workflow,
    title: "Processos Organizados (SOPs)",
    desc: "Mapeie e padronize rotinas. Cada setor sabe exatamente o que fazer, quando fazer e como entregar."
  },
  {
    num: "02",
    icon: Target,
    title: "Metas em Tempo Real",
    desc: "Conecte os objetivos da empresa às entregas diárias da equipe com visibilidade imediata para a diretoria."
  },
  {
    num: "03",
    icon: Brain,
    title: "Segunda Mente da Empresa",
    desc: "Base inteligente que centraliza regras e procedimentos, respondendo dúvidas da equipe na hora."
  },
  {
    num: "04",
    icon: KeyRound,
    title: "IA com Dados Privados (BYOK)",
    desc: "Use os melhores modelos de IA com a chave da sua própria empresa: dados 100% privados e sob seu controle.",
    wide: true
  },
  {
    num: "05",
    icon: Link2,
    title: "Integração sem Fricção",
    desc: "Conecta-se aos canais e agendas que sua equipe já usa, transformando reuniões e mensagens em tarefas organizadas.",
    wide: true
  }
];

const PROCESS_STEPS = [
  {
    n: "01",
    t: "Entendimento",
    d: "Ouvimos sua necessidade e mapeamos onde sua operação perde tempo ou vendas."
  },
  {
    n: "02",
    t: "Desenho da Solução",
    d: "Planejamos o site, sistema ou aplicativo de forma simples e direta."
  },
  {
    n: "03",
    t: "Desenvolvimento",
    d: "Construímos com entregas rápidas para você ver o resultado ganhando vida."
  },
  {
    n: "04",
    t: "Entrega & Suporte",
    d: "Colocamos no ar com segurança e acompanhamos a evolução do seu negócio."
  }
];

export default function HomePage(): JSX.Element {
  return (
    <div id="inicio" className="homeRoot">
      {/* 1. HERO SECTION — CENTRALIZADO COM BACKGROUND ARQUITETURAL LEVE (32 KB) */}
      <section className="band band--hero">
        <div className="container">
          <motion.div
            className="hero hero--centered"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.h1 className="hero__title" variants={reveal}>
              Engenharia e inovação <br />
              <span className="accent">que geram confiança</span>.
            </motion.h1>

            <motion.p className="hero__lead" variants={reveal}>
              Soluções tecnológicas sob medida para estruturar e escalar o seu negócio: sites, sistemas de gestão, aplicativos mobile e automações com Inteligência Artificial.
            </motion.p>

            <motion.div className="hero__actions" variants={reveal}>
              <a
                href="https://wa.me/5511969981157?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto%20para%20minha%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                className="hug-btn hug-btn-primary hero__ctaBtn"
              >
                Vamos Conversar sobre seu Projeto <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. O QUE FAZEMOS (#o-que-fazemos) — LINGUAGEM SIMPLES, DIRETA E COMERCIAL */}
      <section id="o-que-fazemos" className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--compact"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <Globe size={14} /> O que fazemos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Soluções digitais para você e seus clientes.
            </motion.h2>
          </motion.div>

          <motion.div
            className="visualCardsGrid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {DELIVERABLE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.id}
                  className="visualCard hug-card"
                  variants={reveal}
                >
                  <div className="visualCard__topRow">
                    <div className="visualCard__iconBox">
                      <Icon size={22} />
                    </div>
                    <span className="visualCard__num">{card.num}</span>
                  </div>

                  <h3 className="visualCard__title">{card.title}</h3>
                  <p className="visualCard__sentence">{card.sentence}</p>

                  <ul className="deliverableCleanList">
                    {card.items.map((item) => (
                      <li key={item} className="deliverableCleanItem">
                        <span className="deliverableCheckIcon">
                          <Check size={15} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={card.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="visualCard__linkBtn"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight size={15} />
                  </a>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. HUGENIS ENTERPRISE (#cases) — LOGO GRANDE NO TOPO & BENTO SHOWCASE */}
      <section id="cases" className="band">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--enterprise"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="enterpriseHeroLogoWrap" variants={reveal}>
              <img
                src="/hugenis-enterprise-logo.png"
                alt="Hugenis Enterprise"
                className="enterpriseHeroLogo"
                loading="lazy"
                decoding="async"
              />
              <span className="enterpriseHeroLogo__hShimmer" aria-hidden="true" />
            </motion.div>
            <motion.p className="enterpriseHeroSub" variants={reveal}>
              O Sistema Operacional da sua Empresa
            </motion.p>
          </motion.div>

          <motion.div
            className="enterpriseShowcaseCard hug-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={reveal}
          >
            {/* Topo do Card: Proposta de Valor + CTA Direto */}
            <div className="enterpriseBanner">
              <div className="enterpriseBanner__content">
                <blockquote className="enterpriseMainQuote">
                  “Menos microgestão, mais execução previsível.”
                </blockquote>
                <p className="enterpriseMainLead">
                  Diga adeus às reuniões intermináveis de alinhamento e aos processos que se perdem em planilhas ou chats. O Hugenis Enterprise opera como o centro nervoso da sua empresa, garantindo que prazos sejam cumpridos, gargalos sejam antecipados e o negócio cresça com governança sólida.
                </p>
              </div>
              <div className="enterpriseBanner__cta">
                <a
                  href="https://wa.me/5511969981157?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20uma%20demonstra%C3%A7%C3%A3o%20do%20Hugenis%20Enterprise."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hug-btn hug-btn-primary"
                >
                  Solicitar Demonstração <ArrowRight size={17} />
                </a>
              </div>
            </div>

            {/* Bento Grid dos 5 Pilares */}
            <div className="enterpriseBentoGrid">
              {ENTERPRISE_MODULES.map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.title}
                    className={`enterpriseBentoItem ${mod.wide ? "enterpriseBentoItem--wide" : ""}`}
                  >
                    <div className="enterpriseBentoItem__top">
                      <div className="enterpriseModuleClean__icon">
                        <Icon size={20} />
                      </div>
                      <span className="enterpriseBentoItem__num">{mod.num}</span>
                    </div>
                    <h3 className="enterpriseModuleClean__title">{mod.title}</h3>
                    <p className="enterpriseModuleClean__desc">{mod.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. COMO TRABALHAMOS (#como-trabalhamos) — 4 CARDS HORIZONTAIS LIMPOS */}
      <section id="como-trabalhamos" className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--compact"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <Activity size={14} /> Como trabalhamos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Do primeiro papo à entrega no ar.
            </motion.h2>
          </motion.div>

          <motion.div
            className="processTimeline"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div className="processStep" variants={reveal} key={step.n}>
                <div className="processStep__header">
                  <span className="processStep__num">{step.n}</span>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <span className="processStep__line" aria-hidden="true" />
                  )}
                </div>
                <h3 className="processStep__title">{step.t}</h3>
                <p className="processStep__desc">{step.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. QUEM ESTÁ À FRENTE (#sobre-nos) — CARD EXECUTIVO LIMPO E LEGÍVEL */}
      <section id="sobre-nos" className="band">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--compact"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <ShieldCheck size={14} /> Liderança Técnica
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Quem está à frente da Hugenis
            </motion.h2>
          </motion.div>

          <motion.div
            className="hug-card founderExecutiveCard"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
          >
            <div className="founder-photo-container">
              <picture>
                <source srcSet="/founder.webp" type="image/webp" />
                <img
                  src="/founder.png"
                  alt="Henrique Germano - Fundador da Hugenis"
                  className="founder-photo"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            <div className="founder-bio">
              <h3 className="founder-bio__name">Henrique Germano</h3>
              <p className="founder-bio__subtitle">
                Fundador da Hugenis
              </p>
              <p className="founder-bio__text">
                A Hugenis foi fundada por Henrique Germano, profissional com formação em Ciência da Computação e especializações em Data Science (USP/ESALQ) e Governança em Cibersegurança (Mackenzie).
              </p>
              <p className="founder-bio__text">
                Com ampla bagagem prática como líder técnico e arquiteto de sistemas, Henrique combina rigor de engenharia com visão estratégica de negócios. Sua atuação é guiada pela criação de plataformas que eliminam gargalos de gestão, integram inteligência analítica com total privacidade de dados e garantem governança sólida para empresas em crescimento.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* 6. CONTACT / CTA SECTION */}
      <section id="contato" className="band band--tinted">
        <div className="container">
          <motion.div
            className="contact-cta-card hug-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
          >
            <div className="kicker kicker--center">
              <Mail size={14} /> Vamos Conversar
            </div>
            
            <h2 className="h2 contact-cta__title">
              Vamos conversar sobre o seu projeto?
            </h2>
            
            <p className="p contact-cta__desc">
              Conte rapidamente o que você precisa criar ou melhorar na sua empresa. Nosso time responde rápido pelo WhatsApp ou e-mail.
            </p>

            <div className="contact-cta-buttons">
              <a
                href="https://wa.me/5511969981157?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Hugenis."
                target="_blank"
                rel="noopener noreferrer"
                className="hug-btn btn-whatsapp"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.967 14.11 .94 11.487.94c-5.43 0-9.852 4.37-9.856 9.799-.001 1.764.462 3.483 1.341 5.02L1.936 21.39l5.882-1.53c-1.6 1.001-1.171.745.711.294z" />
                  <path d="M15.75 13.3c-.225-.113-1.33-.656-1.537-.732-.207-.075-.357-.113-.507.113-.15.225-.58.732-.711.882-.132.15-.263.169-.488.056-.225-.113-.95-.35-1.81-1.118-.67-.597-1.12-1.335-1.252-1.56-.131-.225-.014-.346.099-.458.101-.1.225-.263.338-.394.113-.131.15-.225.225-.375.075-.15.038-.281-.019-.394-.056-.113-.507-1.219-.694-1.669-.183-.441-.365-.38-.507-.38-.13-.006-.28-.006-.43-.006-.15 0-.394.056-.6.281-.206.225-.788.77-1.02 1.838-.225 1.031.525 2.025.628 2.156.103.131 1.47 2.244 3.563 3.149 2.093.905 2.093.603 2.469.563.375-.04.1.04.431.131.206.075 1.33.656 1.519.825.188.169.188.319.169.394-.019.075-.225.225-.338.394-.131.188-.131.15-.357.038-.225-.113-.225-.113 0 0z" />
                </svg>
                Falar via WhatsApp
              </a>
              
              <a
                href="mailto:contato@hugenis.com"
                className="hug-btn hug-btn-secondary btn-email-cta"
              >
                ✉ contato@hugenis.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
