import type { JSX, ReactNode } from "react";
import { Wordmark } from "./Brand";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/o-que-fazemos", label: "O que fazemos" },
  { href: "/como-trabalhamos", label: "Como trabalhamos" },
  { href: "/sobre-nos", label: "Sobre nós" },
];

type SiteLayoutProps = {
  activePath: string;
  children: ReactNode;
};

export function SiteLayout({ activePath, children }: SiteLayoutProps): JSX.Element {
  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar__inner">
          <a className="topbar__logo" href="/" aria-label="Ir para a página inicial">
            <Wordmark variant="dark" />
          </a>

          <nav className="topbar__nav" aria-label="Navegação">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`navLink ${activePath === item.href ? "isActive" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
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
