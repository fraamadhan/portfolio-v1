import AboutSection from "@/features/about-me/AboutSection";
import ExperienceSection from "@/features/experience/ExperienceSection";
import LandingPage from "@/features/landing-page/LandingPage";
import ProjectSection from "@/features/project/ProjectSection";
import SkillSection from "@/features/skills/SkillSection";
import TestimonialSection from "@/features/testimonial/TestimonialSection";
import { getTestimonialsPage } from "@/features/testimonial/queries";

export default async function Home() {
  const testimonialPage = await getTestimonialsPage();

  return (
    <div className="flex flex-col bg-[linear-gradient(180deg,rgba(250,252,255,1),rgba(236,242,249,1))] pt-28 dark:bg-[linear-gradient(180deg,#2f3f50_0%,#263544_100%)]">
      <LandingPage />
      <AboutSection />
      <SkillSection />
      <ExperienceSection />
      <ProjectSection />
      <TestimonialSection initialData={testimonialPage} />
    </div>
  );
}
