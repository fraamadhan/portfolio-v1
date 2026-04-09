import AboutSection from "@/features/about-me/AboutSection";
import ExperienceSection from "@/features/experience/ExperienceSection";
import LandingPage from "@/features/landing-page/LandingPage";
import SkillSection from "@/features/skills/SkillSection";

export default function Home() {
  return (
    <div className="flex flex-col pt-28">
      <LandingPage />
      <AboutSection />
      <SkillSection />
      <ExperienceSection />
    </div>
  );
}
