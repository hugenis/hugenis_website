import { useEffect, useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./hugenis-tokens.css";
import "./App.css";
import "./pages/hugenisHome.css";
import { SiteLayout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function normalizePathname(rawPath: string): string {
  const cleaned = rawPath.replace(/\/+$/, "").toLowerCase();
  if (cleaned === "" || cleaned === "/") return "/";
  if (cleaned === "/terms" || cleaned === "/terms-of-use" || cleaned === "/terms-of-service" || cleaned === "/termos") {
    return "/terms";
  }
  if (cleaned === "/policy" || cleaned === "/privacy" || cleaned === "/privacy-policy" || cleaned === "/privacidade") {
    return "/policy";
  }
  return cleaned;
}

function App(): JSX.Element | null {
  const [pathname, setPathname] = useState<string>(() => {
    return typeof window !== "undefined" ? normalizePathname(window.location.pathname) : "/";
  });

  const isPlano = pathname === "/plano_2027";

  const [showSplash, setShowSplash] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const p = normalizePathname(window.location.pathname);
    if (p !== "/") return false;
    return window.localStorage.getItem("hugenis:splash-seen") !== "true";
  });

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePathname(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isPlano) {
      window.location.replace("/plano_2027/");
    }
  }, [isPlano]);

  useEffect(() => {
    if (!showSplash || isPlano) return;

    window.localStorage.setItem("hugenis:splash-seen", "true");
    const timer = window.setTimeout(() => setShowSplash(false), 2200);

    return () => window.clearTimeout(timer);
  }, [showSplash, isPlano]);

  const handleNavigate = (targetPath: string, targetHash?: string) => {
    const normalized = normalizePathname(targetPath);
    const url = targetHash ? `${normalized === "/" ? "" : normalized}${targetHash}` || "/" : normalized;
    window.history.pushState(null, "", url);
    setPathname(normalized);

    if (targetHash) {
      window.setTimeout(() => {
        const id = targetHash.replace(/^#/, "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 40);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isPlano) {
    return null;
  }

  const renderPage = (): JSX.Element => {
    if (pathname === "/terms") {
      return <TermsPage onNavigate={handleNavigate} />;
    }
    if (pathname === "/policy") {
      return <PrivacyPolicyPage onNavigate={handleNavigate} />;
    }
    return <HomePage />;
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              className="splash__logo"
              src="/hugenis-logo.png"
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
              Engenharia de Software &amp; Inteligência Artificial
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteLayout currentPath={pathname} onNavigate={handleNavigate}>
        {renderPage()}
      </SiteLayout>
    </>
  );
}

export default App;
