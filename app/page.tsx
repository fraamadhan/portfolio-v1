import AboutSection from "@/features/about-me/AboutSection";
import LandingPage from "@/features/landing-page/LandingPage";

export default function Home() {
  return (
    <div className="flex flex-col pt-28">
      <LandingPage />
      <AboutSection />
    </div>
  );
}