import { useState, useEffect, type JSX, type MouseEvent, type ReactNode } from "react";
import { BookOpenCheck, BriefcaseBusiness, Home, Menu, UserRound, X, Award } from "lucide-react";
import { Wordmark } from "./Brand";

type NavItem = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const NAV_ITEMS: NavItem[] = [
  { href: "#inicio", label: "Início", icon: <Home size={15} /> },
  { href: "#o-que-fazemos", label: "O que fazemos", icon: <BriefcaseBusiness size={15} /> },
  { href: "#como-trabalhamos", label: "Como trabalhamos", icon: <BookOpenCheck size={15} /> },
  { href: "#cases", label: "Cases", icon: <Award size={15} /> },
  { href: "#sobre-nos", label: "Sobre nós", icon: <UserRound size={15} /> },
];

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");

  useEffect(() => {
    const ids = ["inicio", "o-que-fazemos", "como-trabalhamos", "cases", "sobre-nos"];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the element with the highest intersection ratio that is actually intersecting
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        
      if (visible?.target?.id) {
        setActiveSection(`#${visible.target.id}`);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: [0.1, 0.25, 0.5],
      rootMargin: "-20% 0px -60% 0px"
    });

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(path);
    const id = path.substring(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar__inner">
          <a
            className="topbar__logo"
            href="#inicio"
            aria-label="Ir para o início"
            onClick={(event) => handleClick(event, "#inicio")}
          >
            <Wordmark variant="light" />
          </a>

          <nav className="topbar__nav" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleClick(event, item.href)}
                className={`navLink ${activeSection === item.href ? "isActive" : ""}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <button
            className="iconBtn topbar__showOnMobile"
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <>
            <button
              className="mobileOverlay"
              type="button"
              aria-label="Fechar menu"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="mobileSheet" id="mobile-menu" role="dialog" aria-modal="true">
              <div className="mobileSheet__top">
                <Wordmark variant="light" />
                <button
                  className="iconBtn"
                  type="button"
                  aria-label="Fechar menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mobileSheet__nav">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`mobileLink ${activeSection === item.href ? "isActive" : ""}`}
                    onClick={(event) => handleClick(event, item.href)}
                  >
                    <span className="mobileLink__left">
                      {item.icon}
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </header>

      {children}

      <footer className="footer" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div className="container footer__row">
          <div className="footer__left">
            <Wordmark variant="light" />
            <span style={{ fontSize: "13px", opacity: 0.6, marginTop: "4px" }}>
              © {new Date().getFullYear()} Hugenis. Todos os direitos reservados.
            </span>
          </div>
          <div className="footer__mid">
            <span>Software</span>
            <span>Dados</span>
            <span>IA</span>
            <span>Arquitetura</span>
          </div>
          <div className="footer__right">
            <span style={{ fontWeight: 600, color: "#ffffff", marginBottom: "2px" }}>HUGENIS LIMITADA</span>
            <span>CNPJ: 66.842.737/0001-60</span>
            <span>Rua Plínio Espíndola Kerr, 44, Sala 3 - Jd. Ipanema</span>
            <span>São Paulo - SP | CEP: 04784-030</span>
            <span style={{ marginTop: "2px", fontSize: "11px", opacity: 0.5 }}>
              contato@hugenis.com | (11) 96998-1157
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
