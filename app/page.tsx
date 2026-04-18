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
    <div className="flex flex-col pt-28">
      <LandingPage />
      <AboutSection />
      <SkillSection />
      <ExperienceSection />
      <ProjectSection />
      <TestimonialSection initialData={testimonialPage} />
    </div>
  );
}
