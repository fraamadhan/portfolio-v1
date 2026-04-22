import type { Metadata } from "next";
import "./globals.css"
import { bebasNeue, inter, oswald, rubikDirt, texasCrust } from "@/lib/fonts/font";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next"
import VisitorTracker from "@/components/analytics/VisitorTracker";

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
          <VisitorTracker />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
