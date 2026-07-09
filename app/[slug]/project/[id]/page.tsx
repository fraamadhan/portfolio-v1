import NotFound from "@/app/not-found";
import { project as projectDetails } from "@/data/dummy";
import { ProjectDetailPage } from "@/features/project/ProjectDetailPage";

interface PageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const project = projectDetails.find((item) => String(item.id) === id);

  if (!project) {
    return <NotFound />;
  }

  return <ProjectDetailPage project={project} />;
}
