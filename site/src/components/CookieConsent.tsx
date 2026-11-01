import { useState, useEffect, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Check, SlidersHorizontal } from "lucide-react";

const COOKIE_NAME = "hugenis_cookie_consent";
const STORAGE_KEY = "hugenis:cookie-consent-v1";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type ConsentChoice = "all" | "essential" | "custom";

type ConsentPreferences = {
  choice: ConsentChoice;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsentCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (match) {
    return decodeURIComponent(match.split("=")[1] || "");
  }
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeConsentCookie(prefs: ConsentPreferences): void {
  const serialized = JSON.stringify(prefs);
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(prefs.choice)}; max-age=${ONE_YEAR_SECONDS}; path=/; SameSite=Lax`;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // Ignore storage errors in restricted environments
  }

  // Push Google Consent Mode v2 update signal
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    const gtagFn =
      window.gtag ||
      function (...args: unknown[]) {
        window.dataLayer?.push(args);
      };
    gtagFn("consent", "update", {
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
      functionality_storage: "granted",
      security_storage: "granted"
    });
  }
}

type CookieConsentProps = {
  onNavigate: (path: string) => void;
};

export function CookieConsent({ onNavigate }: CookieConsentProps): JSX.Element {
  const [visible, setVisible] = useState<boolean>(() => {
    return readConsentCookie() === null;
  });
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    if (readConsentCookie() !== null) {
      setVisible(false);
    }
  }, []);

  const handleAcceptAll = () => {
    writeConsentCookie({
      choice: "all",
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    });
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    writeConsentCookie({
      choice: "essential",
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    });
    setVisible(false);
  };

  const handleSaveCustom = () => {
    writeConsentCookie({
      choice: "custom",
      essential: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      timestamp: new Date().toISOString()
    });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="cookieBanner hug-card"
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de Privacidade, Termos e Cookies"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cookieBanner__top">
            <div className="cookieBanner__titleWrap">
              <span className="cookieBanner__icon">
                <ShieldCheck size={18} />
              </span>
              <strong className="cookieBanner__title">
                Privacidade, Cookies &amp; Termos (LGPD)
              </strong>
            </div>
            <button
              type="button"
              className="cookieBanner__ConfigToggle"
              onClick={() => setShowDetails((v) => !v)}
            >
              <SlidersHorizontal size={14} />
              <span>{showDetails ? "Ocultar opções" : "Preferências"}</span>
            </button>
          </div>

          <p className="cookieBanner__desc">
            Utilizamos cookies essenciais e analíticos (padrão Google Consent Mode v2) para garantir o funcionamento seguro do site e melhorar sua experiência, em conformidade com a LGPD. Consulte nossos{" "}
            <a
              href="/terms"
              className="legalInlineLink"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/terms");
              }}
            >
              Termos de Uso
            </a>{" "}
            e{" "}
            <a
              href="/policy"
              className="legalInlineLink"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/policy");
              }}
            >
              Política de Privacidade
            </a>.
          </p>

          {showDetails && (
            <div className="cookieBanner__options">
              <label className="cookieOption cookieOption--locked">
                <input type="checkbox" checked disabled />
                <div>
                  <span className="cookieOption__name">Essenciais &amp; Segurança</span>
                  <span className="cookieOption__sub">Obrigatórios para funcionamento e proteção da sessão.</span>
                </div>
              </label>

              <label className="cookieOption">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                />
                <div>
                  <span className="cookieOption__name">Analíticos &amp; Desempenho</span>
                  <span className="cookieOption__sub">Medição anônima de tráfego e melhoria contínua.</span>
                </div>
              </label>

              <label className="cookieOption">
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                />
                <div>
                  <span className="cookieOption__name">Comunicação &amp; Personalização</span>
                  <span className="cookieOption__sub">Recursos de atendimento e experiência personalizada.</span>
                </div>
              </label>
            </div>
          )}

          <div className="cookieBanner__actions">
            <button
              type="button"
              className="hug-btn hug-btn-secondary cookieBanner__btnSecondary"
              onClick={handleEssentialOnly}
            >
              Apenas Essenciais
            </button>

            {showDetails ? (
              <button
                type="button"
                className="hug-btn hug-btn-primary cookieBanner__btnPrimary"
                onClick={handleSaveCustom}
              >
                <Check size={16} /> Salvar Preferências
              </button>
            ) : (
              <button
                type="button"
                className="hug-btn hug-btn-primary cookieBanner__btnPrimary"
                onClick={handleAcceptAll}
              >
                <Check size={16} /> Aceitar e Continuar
              </button>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
