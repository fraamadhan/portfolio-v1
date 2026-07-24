import ExperienceTimelinePage from "@/features/experience/ExperienceTimelinePage";
import { client } from "@/lib/sanity.client";
import NotFound from "@/app/not-found";

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  let profile = null;
  try {
    profile = await client.fetch(`
      *[_type == "user" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
        _id
      }
    `, { slug });
  } catch (err) {
    console.error("Failed to fetch Sanity profile for experience page:", err);
  }

  if (!profile) {
    return <NotFound />;
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

  return <ExperienceTimelinePage initialExperiences={experiences} />;
}

