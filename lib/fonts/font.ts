import localFont from "next/font/local";

const fallbackFont = { variable: "" } as const;

export const inter = fallbackFont;

export const oswald = fallbackFont;

export const bebasNeue = fallbackFont;

export const rubikDirt = fallbackFont;

export const texasCrust = localFont({
  src: "./Texas-Crust.ttf",
  variable: "--font-texas-crust",
  display: "swap",
});
