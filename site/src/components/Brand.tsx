import type { JSX } from "react";

type BrandVariant = "dark" | "light";

export function LogoMark(): JSX.Element {
  return (
    <img
      className="brand__markImage"
      src="/hugenis-icon.png"
      alt="Símbolo da Hugenis"
      decoding="async"
    />
  );
}

type WordmarkProps = { variant?: BrandVariant };

export function Wordmark({ variant = "light" }: WordmarkProps): JSX.Element {
  const isDark = variant === "dark";

  return (
    <div className={`brand ${isDark ? "brand--dark" : "brand--light"}`}>
      <img
        className="brand__fullLogo"
        src="/hugenis-logo.png"
        alt="Hugenis"
        decoding="async"
      />
    </div>
  );
}
