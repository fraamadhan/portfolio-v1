import type { Metadata } from "next";
import "./globals.css";
import { bebasNeue, inter, oswald, rubikDirt, texasCrust } from "@/lib/fonts/font";
import Navbar from "@/components/layout/navbar/Navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal web portfolio that contains with information, such as profile, experience, professional status, and testimonial from colleague",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable} 
          ${oswald.variable} 
          ${bebasNeue.variable} 
          ${rubikDirt.variable}
          ${texasCrust.variable}
          antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
