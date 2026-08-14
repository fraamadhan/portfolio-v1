import AboutSection from "@/features/about-me/AboutSection";
import ExperienceSection from "@/features/experience/ExperienceSection";
import LandingPage from "@/features/landing-page/LandingPage";
import ProjectSection from "@/features/project/ProjectSection";
import SkillSection from "@/features/skills/SkillSection";
import TestimonialSection from "@/features/testimonial/TestimonialSection";
import { getTestimonialsPage } from "@/features/testimonial/queries";
import { client } from "@/lib/sanity.client";
import NotFound from "@/app/not-found";
import type { Metadata } from "next";

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let profile = null;
  try {
    profile = await client.fetch(`
      *[_type == "user" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
        name,
        shortDescription,
        "profileImageUrl": profileImage.asset->url
      }
    `, { slug });
  } catch (err) {
    console.error("Failed to fetch metadata for slug:", err);
  }

  if (!profile) {
    return {
      title: "Portfolio Not Found",
    };
  }

  const name = profile.name || "Fakhri Fajar R.";
  const description = profile.shortDescription?.en || profile.shortDescription?.id || "Personal web portfolio showcasing skills, experience, and projects.";
  const imageUrl = profile.profileImageUrl || "";

  return {
    title: `${name} | Portfolio`,
    description: description,
    openGraph: {
      title: `${name} | Portfolio`,
      description: description,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, alt: `${name}'s Profile Picture` }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Portfolio`,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { slug } = await params;
  
  let profile = null;
  try {
    profile = await client.fetch(`
      *[_type == "user" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
        _id,
        name,
        landingSlogan,
        skillsSlogan,
        pastRoles,
        shortDescription,
        professionalStatus,
        "resume": resume{
          ...,
          "url": asset->url
        },
        "profileImage": profileImage{
          ...,
          "url": asset->url
        },
        fullDescription,
        socialMedias[]{
          ...,
          customIcon{
            ...,
            "url": asset->url
          }
        }
      }
    `, { slug });
  } catch (err) {
    console.error("Failed to fetch Sanity profile:", err);
  }

  // If no user exists with this slug, render standard 404 Not Found directly
  if (!profile) {
    return <NotFound />;
  }

  const testimonialPage = await getTestimonialsPage({ userId: profile._id });

  let skills = [];
  try {
    skills = await client.fetch(`
      *[_type == "skill" && user._ref == $userId && !(_id in path('drafts.**'))] | order(_createdAt asc){
        _id,
        title,
        description,
        category->{
          _id,
          title
        },
        tools[]->{
          _id,
          name,
          "iconUrl": icon.asset->url
        }
      }
    `, { userId: profile._id });
  } catch (err) {
    console.error("Failed to fetch Sanity skills:", err);
  }

  let experiences = [];
  try {
    experiences = await client.fetch(`
      *[_type == "experience" && user._ref == $userId && !(_id in path('drafts.**'))] | order(dateFrom desc){
        _id,
        role,
        company,
        location,
        dateFrom,
        dateTo,
        isCurrent,
        programType,
        keypoints,
        toolsUsed[]->{
          _id,
          name,
          "iconUrl": icon.asset->url
        }
      }
    `, { userId: profile._id });
  } catch (err) {
    console.error("Failed to fetch Sanity experiences:", err);
  }

  let projects = [];
  try {
    projects = await client.fetch(`
      *[_type == "project" && user._ref == $userId && !(_id in path('drafts.**'))] | order(order asc, _createdAt desc){
        _id,
        title,
        description,
        roleInProject,
        images[]{
          ...,
          "url": asset->url
        },
        keyHighlights,
        toolsUsed[]->{
          _id,
          name,
          "iconUrl": icon.asset->url
        },
        links[]{
          label,
          url,
          icon{
            ...,
            "url": asset->url
          }
        }
      }
    `, { userId: profile._id });
  } catch (err) {
    console.error("Failed to fetch Sanity projects:", err);
  }

  return (
    <div className="flex flex-col bg-[linear-gradient(180deg,rgba(250,252,255,1),rgba(236,242,249,1))] pt-28 dark:bg-[linear-gradient(180deg,#2f3f50_0%,#263544_100%)]">
      <LandingPage profile={profile} />
      <AboutSection profile={profile} />
      <SkillSection initialSkills={skills} skillsSlogan={profile.skillsSlogan} />
      <ExperienceSection experiences={experiences} />
      <ProjectSection initialProjects={projects} />
      <TestimonialSection initialData={testimonialPage} userId={profile._id} />
    </div>
  );
}
