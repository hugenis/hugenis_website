import { type JSX } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Target,
  Award
} from "lucide-react";
import ScrollLinkedServices from "../components/ScrollLinkedServices";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: easeOut }
  }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

export default function HomePage(): JSX.Element {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="inicio" style={{ paddingTop: "80px" }}> {/* Adicionado padding-top para o menu flutuante */}
      {/* 1. HERO SECTION */}
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
                <span className="chip">Engenharia de Software & IA</span>
              </motion.div>

              <motion.h1 className="hero__title" variants={reveal}>
                Engenharia e inovação <br />
                <span className="accent">que geram confiança</span>.
              </motion.h1>

              <motion.p className="hero__lead" variants={reveal}>
                A Hugenis constrói e evolui sistemas sob medida, automatiza processos complexos e aplica dados e inteligência artificial de forma estruturada, responsável e focada em resultados práticos.
              </motion.p>

              <motion.div className="hero__actions" variants={reveal}>
                <button
                  className="btn btn--primary"
                  onClick={() => handleScrollTo("contato")}
                >
                  Agendar Diagnóstico <ArrowRight size={16} />
                </button>
                <button
                  className="btn btn--ghost"
                  onClick={() => handleScrollTo("o-que-fazemos")}
                >
                  Ver Nossos Serviços
                </button>
              </motion.div>

              <motion.div className="miniCards" variants={reveal}>
                <div className="miniCard">
                  <div className="miniCard__t">Diagnóstico</div>
                  <div className="miniCard__d">Entendemos o seu cenário real antes de propor qualquer código.</div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__t">Arquitetura</div>
                  <div className="miniCard__d">Base técnica sólida para o seu sistema crescer com segurança.</div>
                </div>
                <div className="miniCard">
                  <div className="miniCard__t">Consistência</div>
                  <div className="miniCard__d">Entregas incrementais com altíssimo rigor e qualidade técnica.</div>
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
                src="/hero_dark_graphic.png"
                alt="Composição visual abstrata Hugenis"
                loading="lazy"
                style={{ borderRadius: "12px", width: "100%", height: "260px", objectFit: "cover" }}
              />
              <div className="heroPanel__notes" style={{ marginTop: "1.25rem" }}>
                <div className="note" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "12px" }}>
                  <div className="note__t" style={{ fontSize: "13.5px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>Parceria Tecnológica Premium</div>
                  <div className="note__d" style={{ color: "#9ca3af", fontSize: "12px", lineHeight: "1.5" }}>
                    Não somos apenas uma fábrica de software. Atuamos como seu parceiro de engenharia, ajudando a planejar e construir o futuro digital do seu negócio.
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (SCROLL-LINKED) */}
      <section id="o-que-fazemos" className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              O que fazemos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Tecnologia com profundidade, do software aos dados e à IA.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Projetamos arquiteturas robustas, desenvolvemos código sob medida e aplicamos IA de forma pragmática para impulsionar a operação do seu negócio.
            </motion.p>
          </motion.div>

          <ScrollLinkedServices />
        </div>
      </section>

      {/* 3. PROCESS SECTION */}
      <section id="como-trabalhamos" className="band">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              Como trabalhamos
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Processo estruturado. Entrega previsível.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Combinamos rigor arquitetural com ciclos curtos de entrega para reduzir riscos operacionais e garantir visibilidade completa do projeto.
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
                t: "Diagnóstico Inicial",
                d: "Análise profunda do cenário técnico existente e gargalos operacionais antes de propor soluções.",
              },
              {
                n: "02",
                t: "Desenho Arquitetural",
                d: "Estruturação de componentes, integrações e fluxo de dados. Menos improviso, mais escalabilidade.",
              },
              {
                n: "03",
                t: "Execução Incremental",
                d: "Ciclos de entrega curtos com validações constantes, testes e transparência total de progresso.",
              },
              {
                n: "04",
                t: "Operação & Evolução",
                d: "Suporte, monitoramento contínuo com observabilidade e plano de evolução de médio e longo prazo.",
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

          {/* Abordagem Técnica de Engenharia */}
          <motion.div
            className="graphicCard"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
            style={{ marginTop: "4rem", border: "1px solid rgba(255, 255, 255, 0.05)", background: "rgba(18, 24, 36, 0.3)" }}
          >
            <h3 className="card__title" style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "2rem", textAlign: "center" }}>
              Nossa Abordagem Técnica de Engenharia
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", alignItems: "start", textAlign: "left" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--accent)", background: "rgba(99, 102, 241, 0.1)", padding: "4px 8px", borderRadius: "6px", textAlign: "center" }}>Arquitetura</span>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#ffffff", fontWeight: "700", fontSize: "15px" }}>Design Prévio e Mapeamento de Fluxos</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--mid)", lineHeight: "1.6" }}>Projetamos a base de dados, integrações e limites do sistema antes de escrever a primeira linha de código, prevenindo retrabalhos caros e gargalos estruturais.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", alignItems: "start", textAlign: "left" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-teal)", background: "rgba(16, 185, 129, 0.1)", padding: "4px 8px", borderRadius: "6px", textAlign: "center" }}>Qualidade</span>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#ffffff", fontWeight: "700", fontSize: "15px" }}>Garantia de Rigor e Testes Automatizados</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--mid)", lineHeight: "1.6" }}>Implementamos testes unitários e de integração contínuos nas APIs e rotinas críticas para garantir que a aplicação permaneça confiável a longo prazo.</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", alignItems: "start", textAlign: "left" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--accent)", background: "rgba(99, 102, 241, 0.1)", padding: "4px 8px", borderRadius: "6px", textAlign: "center" }}>Observação</span>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#ffffff", fontWeight: "700", fontSize: "15px" }}>Monitoramento e Rastreamento em Produção</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--mid)", lineHeight: "1.6" }}>Equipamos a infraestrutura com métricas, logs centralizados e alertas preventivos para identificar e mitigar comportamentos inesperados em tempo real.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CASES DE SUCESSO SECTION */}
      <section id="cases" className="band band--tinted">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <Award size={14} style={{ marginRight: "4px" }} /> Cases de sucesso
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Nossas soluções em produção gerando impacto real.
            </motion.h2>
            <motion.p className="p" variants={reveal}>
              Conheça os produtos que arquitetamos e desenvolvemos de ponta a ponta para resolver problemas complexos.
            </motion.p>
          </motion.div>

          <div className="cases-grid">
            {/* Case 1: Afixcode */}
            <motion.div
              className="card case-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={reveal}
            >
              <div className="case-card__content">
                <span className="case-card__kicker">Inteligência Artificial</span>
                <h4 className="case-card__title">Afixcode - Consultor IA</h4>
                <p className="case-card__desc">
                  Um chatbot corporativo altamente especializado em responder a dúvidas complexas sobre gestão e inventário de ativos imobilizados. Treinado com mais de 20 anos de regulamentos internos, normas contábeis e base de conhecimento da Afixcode.
                </p>
              </div>
              <div className="case-card__screenshot-container">
                <div className="case-card__window-header">
                  <span className="case-card__window-dot case-card__window-dot--red"></span>
                  <span className="case-card__window-dot case-card__window-dot--yellow"></span>
                  <span className="case-card__window-dot case-card__window-dot--green"></span>
                  <span className="case-card__window-title">afixcode-consultor-ia.exe</span>
                </div>
                <div className="case-card__window-body">
                  <img src="/case_afixcode.png" alt="Afixcode Consultor IA" />
                </div>
              </div>
            </motion.div>

            {/* Case 2: LP Manager */}
            <motion.div
              className="card case-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={reveal}
            >
              <div className="case-card__content">
                <span className="case-card__kicker">Marketing & Automação</span>
                <h4 className="case-card__title">LP Manager</h4>
                <p className="case-card__desc">
                  Sistema SaaS para automação completa de marketing B2B. Permite a geração dinâmica e 100% automatizada de Landing Pages otimizadas, Quizzes interativos, páginas de agradecimento (ThankYou Pages) e ferramentas de captura de leads.
                </p>
              </div>
              <div className="case-card__screenshot-container">
                <div className="case-card__window-header">
                  <span className="case-card__window-dot case-card__window-dot--red"></span>
                  <span className="case-card__window-dot case-card__window-dot--yellow"></span>
                  <span className="case-card__window-dot case-card__window-dot--green"></span>
                  <span className="case-card__window-title">lp-manager-dashboard.exe</span>
                </div>
                <div className="case-card__window-body">
                  <img src="/case_lpmanager.png" alt="LP Manager Dashboard" />
                </div>
              </div>
            </motion.div>

            {/* Case 3: Neotriad Finance */}
            <motion.div
              className="card case-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={reveal}
            >
              <div className="case-card__content">
                <span className="case-card__kicker">Finanças & Produtividade</span>
                <h4 className="case-card__title">Neotriad Finance</h4>
                <p className="case-card__desc">
                  Plataforma de alta performance focada em produtividade financeira e controle pessoal de finanças. Ajuda o usuário a organizar orçamentos, monitorar gastos diários e planejar investimentos de forma simples e intuitiva.
                </p>
              </div>
              <div className="case-card__screenshot-container">
                <div className="case-card__window-header">
                  <span className="case-card__window-dot case-card__window-dot--red"></span>
                  <span className="case-card__window-dot case-card__window-dot--yellow"></span>
                  <span className="case-card__window-dot case-card__window-dot--green"></span>
                  <span className="case-card__window-title">neotriad-finance.exe</span>
                </div>
                <div className="case-card__window-body">
                  <img src="/case_neotriad.png" alt="Neotriad Finance Dashboard" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT US SECTION (O FUNDADOR) */}
      <section id="sobre-nos" className="band">
        <div className="container">
          <motion.div
            className="sectionHead sectionHead--center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="kicker" variants={reveal}>
              <Target size={14} style={{ marginRight: "4px" }} /> O Fundador
            </motion.div>
            <motion.h2 className="h2" variants={reveal}>
              Liderança técnica dedicada à excelência de engenharia.
            </motion.h2>
          </motion.div>

          {/* Seção O Fundador (Sleek grid) */}
          <motion.div
            className="card founder-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
          >
            <div className="founder-photo-container">
              <img
                src="/founder.png"
                alt="Henrique Guilherme - Fundador da Hugenis"
                className="founder-photo"
                loading="lazy"
              />
            </div>
            
            <div className="founder-bio">
              <h3 className="founder-bio__name">Henrique Guilherme</h3>
              <div className="founder-bio__role">Fundador & Diretor de Tecnologia</div>
              <p className="founder-bio__text">
                Engenheiro de software e especialista em arquitetura de sistemas e inteligência artificial aplicada. Com mais de uma década de experiência projetando soluções digitais escaláveis para o mercado corporativo B2B, ele fundou a Hugenis com um objetivo claro: eliminar o amadorismo tecnológico e construir software com absoluto rigor de engenharia, clareza arquitetural e foco prático em resultados reais.
              </p>
              <p className="founder-bio__quote">
                “Tentativa e erro fazem parte do processo, mas a engenharia de software inteligente reduz o risco. Não buscamos saltos heroicos e improvisados; buscamos consistência diária, focando em ser 1% melhores a cada entrega. É a solidez que constrói parcerias duradouras.”
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CONTACT / CTA SECTION */}
      <section id="contato" className="band band--tinted">
        <div className="container">
          <motion.div
            className="contact-cta-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
          >
            <div className="kicker" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Mail size={14} style={{ marginRight: "6px" }} /> Fale Conosco
            </div>
            
            <h2 className="h2" style={{ fontSize: "2.2rem", maxWidth: "600px", margin: "1rem 0" }}>
              Pronto para estruturar seu próximo passo tecnológico?
            </h2>
            
            <p className="p" style={{ fontSize: "1.1rem", maxWidth: "620px", color: "var(--mid)" }}>
              Fale diretamente com nosso diretor de tecnologia pelo WhatsApp para agendarmos uma conversa técnica diagnóstica de 30 minutos sem compromisso.
            </p>

            <div className="contact-cta-buttons">
              <a
                href="https://wa.me/5511969981157?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Hugenis."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "16.5px 28px", borderRadius: "12px", fontWeight: "700", fontSize: "1.05rem" }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.967 14.11 .94 11.487.94c-5.43 0-9.852 4.37-9.856 9.799-.001 1.764.462 3.483 1.341 5.02L1.936 21.39l5.882-1.53c-1.6 1.001-1.171.745.711.294z" />
                  <path d="M15.75 13.3c-.225-.113-1.33-.656-1.537-.732-.207-.075-.357-.113-.507.113-.15.225-.58.732-.711.882-.132.15-.263.169-.488.056-.225-.113-.95-.35-1.81-1.118-.67-.597-1.12-1.335-1.252-1.56-.131-.225-.014-.346.099-.458.101-.1.225-.263.338-.394.113-.131.15-.225.225-.375.075-.15.038-.281-.019-.394-.056-.113-.507-1.219-.694-1.669-.183-.441-.365-.38-.507-.38-.13-.006-.28-.006-.43-.006-.15 0-.394.056-.6.281-.206.225-.788.77-1.02 1.838-.225 1.031.525 2.025.628 2.156.103.131 1.47 2.244 3.563 3.149 2.093.905 2.093.603 2.469.563.375-.04.1.04.431.131.206.075 1.33.656 1.519.825.188.169.188.319.169.394-.019.075-.225.225-.338.394-.131.188-.131.15-.357.038-.225-.113-.225-.113 0 0z" />
                </svg>
                Falar via WhatsApp
              </a>
              
              <a
                href="mailto:contato@hugenis.com"
                className="btn btn-email-cta"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "16.5px 28px", borderRadius: "12px", fontWeight: "600", fontSize: "1.05rem" }}
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
