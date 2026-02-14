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

  return (
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
  );
}

export default App;
