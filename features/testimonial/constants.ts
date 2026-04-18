export const TESTIMONIALS_PER_PAGE = 6;

export const TESTIMONIAL_CARD_ROTATIONS = [
  "rotate-[-4deg]",
  "rotate-[3deg]",
  "rotate-[-2deg]",
  "rotate-[2deg]",
  "rotate-[-3deg]",
  "rotate-[1.5deg]",
];

export const getPaginationItems = (page: number, totalPages: number) => {
  const items: Array<number | string> = [];

  if (totalPages <= 7) {
    for (let index = 1; index <= totalPages; index += 1) {
      items.push(index);
    }

    return items;
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (page >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", page - 1, page, page + 1, "...", totalPages];
};
