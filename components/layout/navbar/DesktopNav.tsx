import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "@/hooks/useTranslation";

const NAV_ITEMS = [
    { href: "/#about", labelKey: "navbar.about", className: "md:block lg:hidden xl:block" },
    { href: "/#skills", labelKey: "navbar.skills" },
    { href: "/#experience", labelKey: "navbar.experience" },
    { href: "/#projects", labelKey: "navbar.projects", className: "hidden lg:block" },
    { href: "/#testimonials", labelKey: "navbar.testimonials" },
    { href: "/#contact", labelKey: "navbar.contact", className: "hidden lg:block" },
    { href: "/#dashboard", labelKey: "navbar.dashboard", className: "hidden xl:block" },
] as const;

export default function DesktopNav() {
    const { t } = useTranslation();
    return (
        <div className="hidden md:flex items-center gap-5 lg:gap-15 text-xl">
            <ul className="flex items-center gap-5 lg:gap-15">
                {NAV_ITEMS.map((item) => (
                    <li key={item.labelKey}>
                        <Link href={item.href} className={item.className}>
                            {t(item.labelKey)}
                        </Link>
                    </li>
                ))}
            </ul>
            <LanguageSwitch />
        </div>
    );
}
