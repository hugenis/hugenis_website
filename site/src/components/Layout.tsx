import type { JSX, MouseEvent, ReactNode } from "react";
import { BookOpenCheck, BriefcaseBusiness, Home, UserRound } from "lucide-react";
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
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
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

          <nav className="topbar__nav" aria-label="Navegação">
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
