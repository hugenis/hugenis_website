import type { JSX } from "react";

type BrandVariant = "dark" | "light";

function LogoMark(): JSX.Element {
  return <img className="brand__markImage" src="/format-1.png" alt="Logotipo da Hugenis" />;
}

type WordmarkProps = { variant?: BrandVariant };

export function Wordmark({ variant = "light" }: WordmarkProps): JSX.Element {
  const isDark = variant === "dark";

  return (
    <div className={`brand ${isDark ? "brand--dark" : "brand--light"}`}>
      <div className={`brand__mark ${isDark ? "mark--dark" : "mark--light"}`}>
        <LogoMark />
      </div>
      <span className="brand__name">
        hu<span className="accent">gen</span>is
      </span>
    </div>
  );
}
