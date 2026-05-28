import { useEffect, useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import "./pages/hugenisHome.css";
import { SiteLayout } from "./components/Layout";
import HomePage from "./pages/HomePage";

function App(): JSX.Element {
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return window.localStorage.getItem("hugenis:splash-seen") !== "true";
  });

  useEffect(() => {
    if (!showSplash) return;

    window.localStorage.setItem("hugenis:splash-seen", "true");
    const timer = window.setTimeout(() => setShowSplash(false), 2200);

    return () => window.clearTimeout(timer);
  }, [showSplash]);

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
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "#061F51",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <motion.img
              className="splash__logo"
              src="/format-1.png"
              alt="Logotipo da Hugenis"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ width: "120px", height: "auto", marginBottom: "1.5rem" }}
            />
            <motion.p
              className="splash__text"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
              style={{
                color: "#E1B213",
                fontSize: "1.1rem",
                fontWeight: "600",
                letterSpacing: "0.05em",
                margin: 0
              }}
            >
              Hugenis • Engenharia & Inteligência
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteLayout>
        <HomePage />
      </SiteLayout>
    </>
  );
}

export default App;
