import NotFound from "@/app/not-found";
import { ProjectDetailPage } from "@/features/project/ProjectDetailPage";
import { client } from "@/lib/sanity.client";

interface PageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  let project = null;
  
  try {
    project = await client.fetch(`
      *[_type == "project" && _id == $id && !(_id in path('drafts.**'))][0]{
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
    `, { id });
  } catch (err) {
    console.error("Failed to fetch project detail:", err);
  }

  if (!project) {
    return <NotFound />;
  }

  // Map to compatible props format if needed, but since we are adapting ProjectDetailPage to handle Sanity type directly, we just pass the object
  return <ProjectDetailPage project={project} />;
}
