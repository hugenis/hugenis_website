import type { JSX } from "react";

type BrandVariant = "dark" | "light";

type Colors = {
  accent: string;
};

const COLORS: Colors = {
  accent: "#2CC6B8",
};

function LogoMark(): JSX.Element {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="21" r="4" fill={COLORS.accent} />
      <circle cx="20" cy="7" r="4" fill="rgba(245,247,250,0.95)" />
      <path
        d="M7 21 L20 7"
        stroke="rgba(245,247,250,0.55)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M7 21 L7 9"
        stroke="rgba(245,247,250,0.55)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M7 9 L12 6"
        stroke="rgba(245,247,250,0.55)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
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
