import { type JSX } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut }
  }
};

type TermsPageProps = {
  onNavigate: (path: string) => void;
};

export default function TermsPage({ onNavigate }: TermsPageProps): JSX.Element {
  return (
    <div className="homeRoot legalPage">
      <section className="band legalBand">
        <div className="container legalContainer">
          <motion.div
            className="legalHeader"
            initial="hidden"
            animate="show"
            variants={reveal}
          >
            <button
              type="button"
              className="hug-btn hug-btn-secondary legalBackBtn"
              onClick={() => onNavigate("/")}
            >
              <ArrowLeft size={16} /> Voltar para o Início
            </button>

            <div className="kicker">
              <FileText size={14} /> Documento Legal • /terms
            </div>
            <h1 className="h2 legalTitle">Termos e Condições de Uso</h1>
            <p className="legalMeta">
              Última atualização: Novembro de 2026 • HUGENIS LIMITADA (CNPJ 66.842.737/0001-60)
            </p>
          </motion.div>

          <motion.article
            className="hug-card legalCard"
            initial="hidden"
            animate="show"
            variants={reveal}
          >
            <section className="legalSection">
              <h2>1. Aceitação dos Termos</h2>
              <p>
                Estes Termos e Condições de Uso regulam o acesso e a utilização do website institucional (<strong>hugenis.com</strong>), da plataforma corporativa <strong>Hugenis Enterprise</strong> e dos serviços de desenvolvimento de sites, sistemas web, aplicativos mobile, integrações e soluções de Inteligência Artificial prestados pela <strong>HUGENIS LIMITADA</strong>, pessoa jurídica de direito privado inscrita no CNPJ sob o nº <strong>66.842.737/0001-60</strong>, com sede na Rua Plínio Espíndola Kerr, 44, Sala 3, Jardim Ipanema, São Paulo – SP, CEP 04784-030.
              </p>
              <p>
                Ao navegar neste website ou contratar nossas soluções tecnológicas, o Usuário ou Cliente declara ter lido, compreendido e concordado integralmente com as disposições destes Termos.
              </p>
            </section>

            <section className="legalSection">
              <h2>2. Objeto e Serviços Prestados</h2>
              <p>
                A Hugenis atua na criação e licenciamento de soluções tecnológicas para empresas e seus clientes, compreendendo:
              </p>
              <ul className="legalList">
                <li>Desenvolvimento de sites institucionais, páginas comerciais (Landing Pages), sistemas de gestão web, portais de clientes e aplicativos para dispositivos móveis (Android e iOS);</li>
                <li>Automação de rotinas operacionais e integração entre sistemas corporativos, ERPs, CRMs e bancos de dados;</li>
                <li>Implementação de assistentes e agentes de Inteligência Artificial conectados à base documental do cliente;</li>
                <li>Licenciamento de uso da plataforma proprietária <strong>Hugenis Enterprise</strong> (gestão de processos SOPs, acompanhamento de metas e Segunda Mente corporativa com arquitetura BYOK).</li>
              </ul>
            </section>

            <section className="legalSection">
              <h2>3. Uso da Plataforma Hugenis Enterprise e Arquitetura BYOK</h2>
              <p>
                No uso da plataforma <strong>Hugenis Enterprise</strong> e de soluções com Inteligência Artificial no modelo <strong>BYOK (Bring Your Own Key)</strong>:
              </p>
              <ul className="legalList">
                <li>O Cliente mantém titularidade e controle exclusivos sobre todos os seus documentos, procedimentos (SOPs), metas e dados operacionais inseridos na plataforma;</li>
                <li>Quando configurada chave de API própria da organização cliente (OpenAI, Anthropic, Google Gemini ou equivalente), o consumo de tokens ocorre diretamente na conta do Cliente junto ao respectivo provedor, com armazenamento criptografado das credenciais;</li>
                <li>O Cliente compromete-se a manter a confidencialidade das credenciais de acesso de seus colaboradores e a utilizar a plataforma em estrita conformidade com a legislação vigente.</li>
              </ul>
            </section>

            <section className="legalSection">
              <h2>4. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo deste website — incluindo logotipos (marca <strong>Hugenis</strong> e <strong>Hugenis Enterprise</strong>), identidade visual, textos, layouts, códigos-fonte, arquitetura de sistemas e materiais gráficos — constitui propriedade intelectual exclusiva da <strong>HUGENIS LIMITADA</strong>, protegida pela Lei de Direitos Autorais (Lei nº 9.610/1998), Lei de Software (Lei nº 9.609/1998) e Lei de Propriedade Industrial (Lei nº 9.279/1996).
              </p>
              <p>
                Nos projetos de desenvolvimento sob encomenda, a titularidade sobre os entregáveis específicos de cada projeto observará o disposto no respectivo Contrato de Prestação de Serviços firmado com o Cliente.
              </p>
            </section>

            <section className="legalSection">
              <h2>5. Responsabilidades e Garantias</h2>
              <p>
                A Hugenis emprega rigorosas práticas de engenharia de software, segurança da informação e governança técnica na entrega de suas soluções. Não nos responsabilizamos por:
              </p>
              <ul className="legalList">
                <li>Indisponibilidades decorrentes de falhas em provedores externos de telecomunicações, hospedagem de terceiros ou serviços de API de terceiros contratados diretamente pelo Cliente;</li>
                <li>Uso indevido de credenciais de acesso por parte de usuários internos ou prepostos do Cliente;</li>
                <li>Decisões administrativas ou financeiras tomadas pelo Cliente com base em dados inseridos de forma incorreta por sua própria equipe.</li>
              </ul>
            </section>

            <section className="legalSection">
              <h2>6. Privacidade e Proteção de Dados (LGPD)</h2>
              <p>
                O tratamento de dados pessoais realizado pela Hugenis observa rigorosamente a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD) e encontra-se detalhado em nossa{" "}
                <a
                  href="/policy"
                  className="legalInlineLink"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/policy");
                  }}
                >
                  Política de Privacidade (/policy)
                </a>.
              </p>
            </section>

            <section className="legalSection">
              <h2>7. Legislação Aplicável e Foro</h2>
              <p>
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca da Capital do Estado de São Paulo – SP para dirimir quaisquer controvérsias oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <div className="legalFooterBox">
              <div className="legalFooterBox__title">
                <ShieldCheck size={18} /> Canal Oficial Jurídico e de Atendimento
              </div>
              <p className="legalFooterBox__text">
                <strong>HUGENIS LIMITADA</strong> • CNPJ: 66.842.737/0001-60<br />
                E-mail: <a href="mailto:contato@hugenis.com" className="legalInlineLink">contato@hugenis.com</a> • Telefone/WhatsApp: (11) 96998-1157
              </p>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
