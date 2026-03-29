import { Bebas_Neue, Inter, Oswald, Rubik_Dirt } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: "400",
  display: "swap",
});

export const texasCrust = localFont({
  src: "./Texas-Crust.ttf",
  variable: "--font-texas-crust",
  display: "swap",
});
