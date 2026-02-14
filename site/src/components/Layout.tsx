import { useState, type JSX, type MouseEvent, type ReactNode } from "react";
import { BookOpenCheck, BriefcaseBusiness, Home, Menu, UserRound, X } from "lucide-react";
import { Wordmark } from "./Brand";

type NavItem = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Início", icon: <Home size={15} /> },
  { href: "/o-que-fazemos", label: "O que fazemos", icon: <BriefcaseBusiness size={15} /> },
  { href: "/como-trabalhamos", label: "Como trabalhamos", icon: <BookOpenCheck size={15} /> },
  { href: "/sobre-nos", label: "Sobre nós", icon: <UserRound size={15} /> },
];

type SiteLayoutProps = {
  activePath: string;
  onNavigate: (path: string) => void;
  children: ReactNode;
};

export function SiteLayout({ activePath, onNavigate, children }: SiteLayoutProps): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar__inner">
          <a
            className="topbar__logo"
            href="/"
            aria-label="Ir para a página inicial"
            onClick={(event) => handleClick(event, "/")}
          >
            <Wordmark variant="dark" />
          </a>

          <nav className="topbar__nav" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleClick(event, item.href)}
                className={`navLink ${activePath === item.href ? "isActive" : ""}`}
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
                    className={`mobileLink ${activePath === item.href ? "isActive" : ""}`}
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

      <footer className="footer">
        <div className="container footer__row">
          <div className="footer__left">
            <Wordmark variant="dark" />
            <span>© {new Date().getFullYear()} Hugenis Ltda</span>
          </div>
          <div className="footer__mid">
            <span>Software</span>
            <span>Dados</span>
            <span>IA</span>
            <span>Arquitetura</span>
          </div>
          <div className="footer__right">Tecnologia bem aplicada, com responsabilidade.</div>
        </div>
      </footer>
    </div>
  );
}
