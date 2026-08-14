import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = [
    { href: "/#about", labelKey: "navbar.about" },
    { href: "/#skills", labelKey: "navbar.skills" },
    { href: "/#experience", labelKey: "navbar.experience" },
    { href: "/#projects", labelKey: "navbar.projects" },
    { href: "/#testimonials", labelKey: "navbar.testimonials" },
    // { href: "/#contact", labelKey: "navbar.contact" },
    { href: "/dashboard", labelKey: "navbar.dashboard" },
] as const;

export const PRIMARY_ITEMS = [
    { href: "/#about", labelKey: "navbar.about" },
    { href: "/#skills", labelKey: "navbar.skills" },
    { href: "/#experience", labelKey: "navbar.experience" },
    { href: "/#projects", labelKey: "navbar.projects" },
] as const;

export const HOME_HREF = "/#home";

export const getSectionIdFromHref = (href: string) => href.split("#")[1] ?? "";

export const useActiveSlug = () => {
    const pathname = usePathname();
    const [is404, setIs404] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).__is404) {
            setIs404(true);
        }

        const handleActive = () => setIs404(true);
        const handleInactive = () => setIs404(false);

        window.addEventListener("app_404_active", handleActive);
        window.addEventListener("app_404_inactive", handleInactive);

        return () => {
            window.removeEventListener("app_404_active", handleActive);
            window.removeEventListener("app_404_inactive", handleInactive);
        };
    }, []);

    const segments = pathname.split("/").filter(Boolean);
    const urlSlug = segments[0] && !["cms", "dashboard", "gateway", "api"].includes(segments[0]) ? segments[0] : "";

    if (is404) {
        return typeof window !== "undefined" ? localStorage.getItem("last_valid_slug") || "" : "";
    }
    return urlSlug;
};
