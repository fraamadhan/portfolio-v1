export type InfoItemProps = {
  label: string | undefined;
  value: string;
};

export type SkillItemProps = {
  id: number;
  src: string;
  name: string;
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
