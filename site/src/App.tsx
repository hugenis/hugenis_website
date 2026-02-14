import type { JSX } from "react";
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
  const pathname = getPathname();

  return <SiteLayout activePath={pathname}>{resolvePage(pathname)}</SiteLayout>;
}

export default App;
