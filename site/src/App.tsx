import { useEffect, useMemo, useState, type JSX } from "react";
import { motion } from "framer-motion";
import "./App.css";
import "./pages/hugenisHome.css";
import { SiteLayout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ProcessPage from "./pages/ProcessPage";
import AboutPage from "./pages/AboutPage";

function getPathname(): string {
  const cleanPath = window.location.pathname.replace(/\/$/, "");
  return cleanPath === "" ? "/" : cleanPath;
}

function scrollPageToTop(behavior: ScrollBehavior = "auto"): void {
  const page = document.querySelector(".page");

  if (page instanceof HTMLElement) {
    page.scrollTo({ top: 0, behavior });
    return;
  }

  window.scrollTo({ top: 0, behavior });
}

function resolvePage(pathname: string): JSX.Element {
  switch (pathname) {
    case "/o-que-fazemos":
      return <ServicesPage />;
    case "/como-trabalhamos":
      return <ProcessPage />;
    case "/sobre-nos":
      return <AboutPage />;
    default:
      return <HomePage />;
  }
}

function App(): JSX.Element {
  const [pathname, setPathname] = useState<string>(getPathname());
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return window.localStorage.getItem("hugenis:splash-seen") !== "true";
  });

  useEffect(() => {
    const handlePopState = () => setPathname(getPathname());
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath: string) => {
    if (nextPath === pathname) return;
    window.history.pushState({}, "", nextPath);
    setPathname(nextPath);
  };

  const content = useMemo(() => resolvePage(pathname), [pathname]);

  useEffect(() => {
    scrollPageToTop("auto");
  }, [pathname]);

  useEffect(() => {
    if (!showSplash) return;

    window.localStorage.setItem("hugenis:splash-seen", "true");
    const timer = window.setTimeout(() => setShowSplash(false), 2200);

    return () => window.clearTimeout(timer);
  }, [showSplash]);

  return (
    <>
      {showSplash && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            className="splash__logo"
            src="/format-1.png"
            alt="Logotipo da Hugenis"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.p
            className="splash__text"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          >
            Hugenis · Soluções ágeis e confiáveis para o seu negócio
          </motion.p>
        </motion.div>
      )}

      <SiteLayout activePath={pathname} onNavigate={navigate}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0.98 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12, ease: "linear" }}
        >
          {content}
        </motion.main>
      </SiteLayout>
    </>
  );
}

export default App;
