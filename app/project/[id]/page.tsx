import { notFound } from "next/navigation";
import { project as projectDetails } from "@/data/dummy";
import { ProjectDetailPage } from "@/features/project/ProjectDetailPage";

export function generateStaticParams() {
  return projectDetails.map((item) => ({
    id: String(item.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectDetails.find((item) => String(item.id) === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
