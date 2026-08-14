export type TestimonialFormState = {
  author: string;
  role: string;
  institution: string;
  tag: string;
  quote: string;
  honeypot: string;
};

export type TestimonialPageData = {
  testimonials: import("@/types").TestimonialItemProps[];
  page: number;
  totalCount: number;
  totalPages: number;
};

export type TestimonialSubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

export const createEmptyTestimonialForm = (): TestimonialFormState => ({
  author: "",
  role: "",
  institution: "",
  tag: "",
  quote: "",
  honeypot: "",
});

export const createIdleSubmitState = (): TestimonialSubmitState => ({
  type: "idle",
  message: "",
});
