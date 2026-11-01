import { useState, useEffect, type JSX, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, BookOpenCheck, BriefcaseBusiness, Mail, Menu, Sparkles, UserRound, X } from "lucide-react";
import { Wordmark } from "./Brand";

type NavItem = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const NAV_ITEMS: NavItem[] = [
  { href: "#o-que-fazemos", label: "O que fazemos", icon: <BriefcaseBusiness size={15} /> },
  { href: "#cases", label: "Transforme Sua Empresa", icon: <Sparkles size={15} /> },
  { href: "#como-trabalhamos", label: "Como trabalhamos", icon: <BookOpenCheck size={15} /> },
  { href: "#sobre-nos", label: "Sobre nós", icon: <UserRound size={15} /> },
  { href: "#contato", label: "Contato", icon: <Mail size={15} /> },
];

type SiteLayoutProps = {
  children: ReactNode;
  currentPath?: string;
  onNavigate?: (path: string, hash?: string) => void;
};

export function SiteLayout({ children, currentPath = "/", onNavigate }: SiteLayoutProps): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 920) {
        setMobileMenuOpen(false);
      }
    };
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 360);
      if (window.scrollY < 260 && currentPath === "/") {
        setActiveSection("");
      }
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [currentPath]);

  useEffect(() => {
    if (currentPath !== "/") {
      setActiveSection("");
      return;
    }
    const ids = ["inicio", "o-que-fazemos", "cases", "como-trabalhamos", "sobre-nos", "contato"];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        
      if (visible?.target?.id) {
        setActiveSection( visible.target.id === "inicio" ? "" : `#${visible.target.id}` );
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: [0.1, 0.25, 0.5],
      rootMargin: "-20% 0px -60% 0px"
    });

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPath]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(path);

    if (currentPath !== "/" && onNavigate) {
      onNavigate("/", path);
      return;
    }

    const id = path.substring(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLegalClick = (event: MouseEvent<HTMLAnchorElement>, legalPath: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(legalPath);
    } else {
      window.location.href = legalPath;
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
      </header>

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

      {children}

      <footer className="footer">
        <div className="container footer__row">
          <div className="footer__left">
            <Wordmark variant="light" />
            <span className="footer__copy">
              © {new Date().getFullYear()} Hugenis. Todos os direitos reservados.
            </span>
            <div className="footer__legalLinks">
              <a
                href="/terms"
                className={`footer__legalLink ${currentPath === "/terms" ? "isActive" : ""}`}
                onClick={(e) => handleLegalClick(e, "/terms")}
              >
                Termos de Uso
              </a>
              <span className="footer__legalDot">•</span>
              <a
                href="/policy"
                className={`footer__legalLink ${currentPath === "/policy" ? "isActive" : ""}`}
                onClick={(e) => handleLegalClick(e, "/policy")}
              >
                Política de Privacidade
              </a>
            </div>
          </div>
          <div className="footer__mid">
            <span>Sites</span>
            <span>Sistemas</span>
            <span>Apps Mobile</span>
            <span>IA &amp; Dados</span>
          </div>
          <div className="footer__right">
            <span className="footer__company">HUGENIS LIMITADA</span>
            <span>CNPJ: 66.842.737/0001-60</span>
            <span>Rua Plínio Espíndola Kerr, 44, Sala 3 - Jd. Ipanema</span>
            <span>São Paulo - SP | CEP: 04784-030</span>
            <span className="footer__contact">
              contato@hugenis.com | (11) 96998-1157
            </span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            className="scrollTopBtn"
            aria-label="Voltar ao topo"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.9 }}
            transition={{ duration: 0.22 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
