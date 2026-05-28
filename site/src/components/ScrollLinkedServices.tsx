import { useEffect, useRef, useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Boxes,
  Workflow,
  Database,
  Brain,
  ShieldCheck,
  Check,
  Terminal,
  Activity,
  GitMerge,
  PieChart,
  Cpu,
  LineChart
} from "lucide-react";

interface ServiceItem {
  id: string;
  icon: any;
  title: string;
  desc: string;
  bullets: string[];
  color: string;
  visualType: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "software-sob-medida",
    icon: Code2,
    title: "Software Sob Medida",
    desc: "Desenvolvimento de aplicações web modernas, APIs robustas e módulos de software críticos utilizando boas práticas de engenharia, código limpo e padrões consolidados.",
    bullets: [
      "Arquitetura modular e extensível",
      "Cobertura de testes automatizados",
      "Documentação clara e objetiva"
    ],
    color: "#6366F1",
    visualType: "code"
  },
  {
    id: "arquitetura-e-evolucao",
    icon: Boxes,
    title: "Arquitetura & Evolução",
    desc: "Apoio a sistemas legados que precisam escalar ou melhorar performance. Mapeamos gargalos, redesenhamos integrações e planejamos a modernização segura.",
    bullets: [
      "Refatoração estratégica de gargalos",
      "Otimização de custos de infraestrutura",
      "Implantação de Observabilidade"
    ],
    color: "#06B6D4",
    visualType: "architecture"
  },
  {
    id: "automacao-de-processos",
    icon: Workflow,
    title: "Automação de Processos",
    desc: "Eliminação de tarefas manuais repetitivas através de fluxos de integração inteligentes e automatizados, aumentando a eficiência e eliminando erros operacionais.",
    bullets: [
      "Integrações robustas via APIs e Webhooks",
      "Processamento de tarefas em segundo plano",
      "Rastreabilidade em tempo real"
    ],
    color: "#10B981",
    visualType: "automation"
  },
  {
    id: "dados-e-estrategia",
    icon: Database,
    title: "Dados & Estratégia",
    desc: "Criação de pipelines de ETL, modelagem de banco de dados e inteligência de negócios para que a tomada de decisões seja baseada em fatos estruturados.",
    bullets: [
      "Modelagem e higienização de dados",
      "Criação de métricas de negócio claras",
      "ETLs confiáveis e orquestrados"
    ],
    color: "#A855F7",
    visualType: "data"
  },
  {
    id: "ia-aplicada",
    icon: Brain,
    title: "IA Aplicada",
    desc: "Validação e desenvolvimento de modelos preditivos, agentes autônomos ou processamento de linguagem natural (LLMs) focados em gerar valor prático de negócio.",
    bullets: [
      "Provas de Conceito (PoC) validadas",
      "Agentes de IA e processamento com LLMs",
      "Integração perfeita aos fluxos de software"
    ],
    color: "#F43F5E",
    visualType: "ai"
  },
  {
    id: "consultoria-tecnica",
    icon: ShieldCheck,
    title: "Consultoria Técnica",
    desc: "Parceria estratégica para avaliação de stacks, contratação técnica, planejamento de projetos e mitigação de riscos de engenharia antes de grandes investimentos.",
    bullets: [
      "Avaliação técnica imparcial (Auditoria)",
      "Planejamento de capacidade e prazos",
      "Mentoria e direcionamento arquitetural"
    ],
    color: "#EC4899",
    visualType: "consulting"
  }
];

export default function ScrollLinkedServices(): JSX.Element {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0.2
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SERVICES.forEach((service) => {
      const el = cardRefs.current[service.id];
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const renderVisual = (type: string) => {
    switch (type) {
      case "code":
        return (
          <motion.div
            key="code"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="visual-mockup code-mockup"
          >
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="mockup-title">App.tsx</span>
            </div>
            <div className="mockup-body">
              <pre>
                <code>
                  <span className="code-keyword">import</span>{" "}
                  <span className="code-variable">React</span>{" "}
                  <span className="code-keyword">from</span>{" "}
                  <span className="code-string">"react"</span>;
                  <br />
                  <span className="code-keyword">const</span>{" "}
                  <span className="code-function">hugenisCore</span> = () =&gt; &#123;
                  <br />
                  &nbsp;&nbsp;<span className="code-keyword">return</span> (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">Engine</span>{" "}
                  <span className="code-attr">status</span>=
                  <span className="code-string">"excellent"</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-tag">Scale</span>{" "}
                  /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="code-tag">Engine</span>&gt;
                  <br />
                  &nbsp;&nbsp;);
                  <br />
                  &#125;;
                </code>
              </pre>
            </div>
            <div className="mockup-footer-info">
              <Terminal size={14} /> <span>TypeScript • Clean Architecture</span>
            </div>
          </motion.div>
        );

      case "architecture":
        return (
          <motion.div
            key="architecture"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="visual-mockup arch-mockup"
          >
            <div className="arch-canvas">
              <div className="arch-node node-client">Client Web</div>
              <div className="arch-connector"></div>
              <div className="arch-node node-gateway">API Gateway</div>
              <div className="arch-connector-split">
                <div className="connector-branch branch-up"></div>
                <div className="connector-branch branch-down"></div>
              </div>
              <div className="arch-branches">
                <div className="arch-node node-service">Service A</div>
                <div className="arch-node node-service">Service B</div>
              </div>
            </div>
            <div className="mockup-footer-info">
              <Activity size={14} /> <span>Redundância • Escalabilidade • CQRS</span>
            </div>
          </motion.div>
        );

      case "automation":
        return (
          <motion.div
            key="automation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="visual-mockup auto-mockup"
          >
            <div className="auto-pipeline">
              <div className="pipeline-step step-done">
                <div className="step-check">✓</div>
                <span>Leitura do ERP</span>
              </div>
              <div className="pipeline-line line-active"></div>
              <div className="pipeline-step step-done">
                <div className="step-check">✓</div>
                <span>Transformação de Dados</span>
              </div>
              <div className="pipeline-line line-active"></div>
              <div className="pipeline-step step-running">
                <div className="step-pulse"></div>
                <span>Sincronização Cloud</span>
              </div>
            </div>
            <div className="mockup-footer-info">
              <GitMerge size={14} /> <span>n8n • Automação de Fluxo • Integridade</span>
            </div>
          </motion.div>
        );

      case "data":
        return (
          <motion.div
            key="data"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="visual-mockup data-mockup"
          >
            <div className="data-visualizer">
              <div className="data-bars">
                <div className="bar" style={{ height: "40%" }}></div>
                <div className="bar" style={{ height: "70%" }}></div>
                <div className="bar active-bar" style={{ height: "95%" }}></div>
                <div className="bar" style={{ height: "55%" }}></div>
                <div className="bar" style={{ height: "80%" }}></div>
              </div>
              <div className="data-metrics">
                <div className="metric">
                  <span className="metric-label">Decisão Baseada em Dados</span>
                  <span className="metric-value">99.8% Precisão</span>
                </div>
              </div>
            </div>
            <div className="mockup-footer-info">
              <PieChart size={14} /> <span>ETL • Data Lakehouses • Analytics</span>
            </div>
          </motion.div>
        );

      case "ai":
        return (
          <motion.div
            key="ai"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="visual-mockup ai-mockup"
          >
            <div className="ai-console">
              <div className="console-prompt">
                <span className="console-label">USER:</span> Como otimizar meu estoque?
              </div>
              <div className="console-response">
                <span className="console-label">AGENT:</span>
                <span className="typing-text"> Analisando histórico de vendas... Identificado gargalo no Setor B. Sugestão: Reabastecer 15 unidades.</span>
              </div>
            </div>
            <div className="mockup-footer-info">
              <Cpu size={14} /> <span>OpenAI • LangChain • IA Conversacional</span>
            </div>
          </motion.div>
        );

      case "consulting":
        return (
          <motion.div
            key="consulting"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="visual-mockup consulting-mockup"
          >
            <div className="consulting-metrics">
              <div className="consulting-metric">
                <div className="metric-top">
                  <span>Redução de Riscos</span>
                  <span className="percentage">85%</span>
                </div>
                <div className="metric-progress"><div className="progress-fill" style={{ width: "85%" }}></div></div>
              </div>
              <div className="consulting-metric">
                <div className="metric-top">
                  <span>Eficiência de Arquitetura</span>
                  <span className="percentage">92%</span>
                </div>
                <div className="metric-progress"><div className="progress-fill" style={{ width: "92%" }}></div></div>
              </div>
            </div>
            <div className="mockup-footer-info">
              <LineChart size={14} /> <span>Trade-offs claros • Tomada de Decisão</span>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="services-scroll-container">
      <div className="services-grid">
        {/* Coluna da Esquerda (Conteúdo Rolável) */}
        <div className="services-left">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            const isActive = activeId === service.id;

            return (
              <div
                key={service.id}
                id={service.id}
                ref={(el) => { cardRefs.current[service.id] = el; }}
                className={`service-scroll-card ${isActive ? "active" : ""}`}
              >
                <div className="card-top">
                  <div className="service-icon-box" style={{ borderColor: isActive ? service.color : "transparent" }}>
                    <IconComponent size={24} style={{ color: isActive ? service.color : "#9ca3af" }} />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                </div>
                
                <p className="service-card-desc">{service.desc}</p>
                
                <ul className="service-card-bullets">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="service-bullet-item">
                      <Check size={16} className="bullet-check" style={{ color: service.color }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Coluna da Direita (Painel Fixo) */}
        <div className="services-right">
          <div className="sticky-visual-container">
            <div className="visual-wrapper">
              <AnimatePresence mode="wait">
                {SERVICES.map((s) => s.id === activeId && renderVisual(s.visualType))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
