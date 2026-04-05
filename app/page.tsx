import AboutSection from "@/features/about-me/AboutSection";
import LandingPage from "@/features/landing-page/LandingPage";
import SkillSection from "@/features/skills/SkillSection";

export default function Home() {
  return (
    <div className="flex flex-col pt-28" id="home">
      <LandingPage />
      <AboutSection />
      <SkillSection />
    </div>
  );
}