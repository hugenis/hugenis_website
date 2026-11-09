import { type JSX } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut }
  }
};

type PrivacyPolicyPageProps = {
  onNavigate: (path: string) => void;
};

export default function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps): JSX.Element {
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
              <Lock size={14} /> Privacidade &amp; LGPD • /policy
            </div>
            <h1 className="h2 legalTitle">Política de Privacidade e Proteção de Dados</h1>
            <p className="legalMeta">
              Última atualização: Novembro de 2026 • Em conformidade com a LGPD (Lei nº 13.709/2018)
            </p>
          </motion.div>

          <motion.article
            className="hug-card legalCard"
            initial="hidden"
            animate="show"
            variants={reveal}
          >
            <section className="legalSection">
              <h2>1. Compromisso com a Privacidade e Identificação do Controlador</h2>
              <p>
                A <strong>HUGENIS LIMITADA</strong>, inscrita no CNPJ sob o nº <strong>66.842.737/0001-60</strong>, com sede na Rua Plínio Espíndola Kerr, 44, Sala 3, Jardim Ipanema, São Paulo – SP, CEP 04784-030, tem a privacidade, o sigilo corporativo e a segurança da informação como pilares inegociáveis de sua atuação.
              </p>
              <p>
                Esta Política de Privacidade descreve de forma clara e transparente como coletamos, utilizamos, armazenamos e protegemos dados pessoais em nosso website institucional (<strong>hugenis.com</strong>), em nossos canais de atendimento e nas plataformas <strong>Hugenis Enterprise</strong> e <strong>Hugenis Aura</strong>, em estrita observância à Lei Geral de Proteção de Dados Pessoais (<strong>Lei nº 13.709/2018 – LGPD</strong>).
              </p>
            </section>

            <section className="legalSection">
              <h2>2. Dados Coletados</h2>
              <p>
                Coletamos apenas os dados estritamente necessários para atendimento comercial, execução contratual e funcionamento seguro de nossas plataformas:
              </p>
              <ul className="legalList">
                <li><strong>Dados de Contato Comercial:</strong> nome, empresa, cargo, endereço de e-mail e número de telefone/WhatsApp fornecidos voluntariamente pelo titular ao solicitar diagnóstico, demonstração ou orçamento;</li>
                <li><strong>Dados de Autenticação em Plataformas:</strong> nome, e-mail, permissões de acesso e registros de auditoria (logs de acesso com data, hora e endereço IP) para usuários autenticados no <strong>Hugenis Enterprise</strong> e no <strong>Hugenis Aura</strong>;</li>
                <li><strong>Dados Técnicos de Navegação:</strong> informações básicas de dispositivo, navegador e páginas acessadas para garantia de estabilidade, segurança cibernética e prevenção a fraudes.</li>
              </ul>
            </section>

            <section className="legalSection">
              <h2>3. Finalidades do Tratamento e Bases Legais</h2>
              <p>
                O tratamento de dados pessoais pela Hugenis fundamenta-se nas hipóteses legais do art. 7º da LGPD e destina-se a:
              </p>
              <ul className="legalList">
                <li><strong>Atendimento e Propostas Comerciais (Preliminar a Contrato / Legítimo Interesse):</strong> responder solicitações de contato via WhatsApp, e-mail ou assistente virtual e elaborar propostas técnicas;</li>
                <li><strong>Execução de Contrato:</strong> prover acesso, suporte técnico, hospedagem e evolução dos sistemas contratados e das plataformas Hugenis Enterprise e Hugenis Aura;</li>
                <li><strong>Segurança e Prevenção à Fraude:</strong> monitorar integridade das aplicações, autenticar acessos e manter trilhas de auditoria;</li>
                <li><strong>Cumprimento de Obrigação Legal ou Regulatória:</strong> emissão de notas fiscais, escrituração contábil e guarda de registros conforme o Marco Civil da Internet (Lei nº 12.965/2014).</li>
              </ul>
            </section>

            <section className="legalSection">
              <h2>4. Privacidade em Inteligência Artificial e Arquitetura BYOK</h2>
              <p>
                A Hugenis adota padrões rigorosos de isolamento de dados em suas soluções de Inteligência Artificial:
              </p>
              <ul className="legalList">
                <li><strong>Isolamento por Empresa (Multi-Tenant Seguro):</strong> os documentos, procedimentos (SOPs), metas e bases de conhecimento de cada empresa cliente são estritamente isolados e jamais são compartilhados entre diferentes organizações;</li>
                <li><strong>Chave Privada do Cliente (BYOK – Bring Your Own Key):</strong> no <strong>Hugenis Enterprise</strong>, o cliente utiliza sua própria chave de API corporativa criptografada em repouso (padrão AES-256-GCM);</li>
                <li><strong>Privacidade no Disparo de Convites (Hugenis Aura):</strong> na conexão do WhatsApp via QR Code, a plataforma realiza exclusivamente os envios de convites autorizados pelo organizador e não lê, não acessa nem armazena conversas pessoais;</li>
                <li><strong>Não Treinamento de Modelos Públicos:</strong> a Hugenis jamais utiliza dados confidenciais ou bases de conhecimento de seus clientes para treinar modelos públicos de Inteligência Artificial.</li>
              </ul>
            </section>

            <section className="legalSection">
              <h2>5. Compartilhamento de Dados com Terceiros</h2>
              <p>
                A Hugenis <strong>não comercializa, aluga ou compartilha</strong> dados pessoais para fins publicitários de terceiros. O compartilhamento ocorre exclusivamente com:
              </p>
              <ul className="legalList">
                <li>Provedores de infraestrutura em nuvem e bancos de dados de alta segurança, vinculados por cláusulas de confidencialidade e proteção de dados;</li>
                <li>Autoridades públicas ou judiciais, estritamente quando houver determinação legal obrigatória.</li>
              </ul>
            </section>

            <section className="legalSection">
              <h2>6. Segurança da Informação e Retenção</h2>
              <p>
                Adotamos controles técnicos e administrativos alinhados às melhores práticas de governança em cibersegurança, incluindo comunicação criptografada (TLS/HTTPS), criptografia de credenciais sensíveis, controle de acesso baseado em funções (RBAC) e backups regulares. Os dados são mantidos apenas pelo período necessário ao cumprimento das finalidades contratuais e obrigações legais.
              </p>
            </section>

            <section className="legalSection">
              <h2>7. Direitos do Titular dos Dados (Art. 18 da LGPD)</h2>
              <p>
                O titular dos dados pessoais pode solicitar a qualquer momento, mediante requisição gratuita ao nosso canal oficial:
              </p>
              <ul className="legalList">
                <li>Confirmação da existência de tratamento e acesso aos seus dados;</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a LGPD;</li>
                <li>Informação sobre entidades com as quais houve uso compartilhado de dados e revogação de consentimento, quando aplicável.</li>
              </ul>
              <p>
                Para consultar as regras de utilização de nossas plataformas, acesse também nossos{" "}
                <a
                  href="/terms"
                  className="legalInlineLink"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/terms");
                  }}
                >
                  Termos de Uso (/terms)
                </a>.
              </p>
            </section>

            <div className="legalFooterBox">
              <div className="legalFooterBox__title">
                <ShieldCheck size={18} /> Encarregado pelo Tratamento de Dados (DPO) &amp; Contato
              </div>
              <p className="legalFooterBox__text">
                <strong>HUGENIS LIMITADA</strong> • CNPJ: 66.842.737/0001-60<br />
                Responsável: Henrique Germano • E-mail: <a href="mailto:contato@hugenis.com" className="legalInlineLink">contato@hugenis.com</a> • WhatsApp: (11) 96998-1157
              </p>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
