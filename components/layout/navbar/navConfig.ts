export const NAV_ITEMS = [
    { href: "/#about", labelKey: "navbar.about" },
    { href: "/#skills", labelKey: "navbar.skills" },
    { href: "/#experience", labelKey: "navbar.experience" },
    { href: "/#projects", labelKey: "navbar.projects" },
    { href: "/#testimonials", labelKey: "navbar.testimonials" },
    { href: "/#contact", labelKey: "navbar.contact" },
    { href: "/#dashboard", labelKey: "navbar.dashboard" },
] as const;

export const PRIMARY_ITEMS = [
    { href: "/#about", labelKey: "navbar.about" },
    { href: "/#skills", labelKey: "navbar.skills" },
    { href: "/#experience", labelKey: "navbar.experience" },
    { href: "/#projects", labelKey: "navbar.projects" },
] as const;

export const HOME_HREF = "/#home";

export const getSectionIdFromHref = (href: string) => href.split("#")[1] ?? "";
