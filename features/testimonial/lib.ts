import { TestimonialItemProps } from "@/types";

import { TestimonialFormState } from "./types";

export type TestimonialRow = {
  id: string;
  name: string;
  role: string;
  institution: string | null;
  quote: string;
  tag: string | null;
  created_at: string;
  updated_at: string | null;
};

export const TESTIMONIAL_SELECT_FIELDS =
  "id, name, role, institution, quote, tag, created_at, updated_at";

export const mapTestimonialRow = (row: TestimonialRow): TestimonialItemProps => ({
  id: row.id,
  author: row.name,
  role: row.role,
  institution: row.institution ?? "",
  quote: row.quote,
  tag: row.tag ?? "",
});

export const createTestimonialInsertPayload = (form: TestimonialFormState) => ({
  name: form.author.trim(),
  role: form.role.trim(),
  institution: form.institution.trim(),
  quote: form.quote.trim(),
  tag: form.tag.trim(),
});
