export type InfoItemProps = {
  label: string | undefined;
  value: string;
};

export type SkillItemProps = {
  id: number;
  src: string;
  name: string;
};

export type ExperienceTechStackItemProps = {
  name: string;
  src: string;
};

export type ExperienceItemProps = {
  id: string;
  role: string;
  category: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  keypoints: string[];
  techStack: ExperienceTechStackItemProps[];
  isCurrent: boolean;
};

export type ProjectItemProps = {
  id: number;
  imageSrc: string;
  title: string;
  category: string;
  description: string;
  tools: { name: string; logo: string }[];
};

export type ProjectDetailItemProps = {
  id: number;
  title: string;
  category: string;
  role: string;
  description: string;
  project_url: string[];
  key_highlights: string[];
  images: string[];
  tools: { name: string; logo: string }[];
};

export type TestimonialItemProps = {
  id: string;
  author: string;
  role: string;
  institution: string;
  quote: string;
  tag: string;
};
