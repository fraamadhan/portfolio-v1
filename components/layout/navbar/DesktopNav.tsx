import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "@/hooks/useTranslation";

export default function DesktopNav() {
    const { t } = useTranslation();
    return (
        <div className="hidden md:flex items-center gap-5 lg:gap-15 text-xl">
            <Link href="#" className="md:block lg:hidden xl:block">{t("navbar.about")}</Link>
            <Link href="#">{t("navbar.skills")}</Link>
            <Link href="#">{t("navbar.experience")}</Link>
            <Link href="#" className="hidden lg:block">{t("navbar.projects")}</Link>
            <Link href="#">{t("navbar.testimonials")}</Link>
            <Link href="#" className="hidden lg:block">{t("navbar.contact")}</Link>
            <Link href="#" className="hidden xl:block">{t("navbar.dashboard")}</Link>

            <LanguageSwitch />
        </div>
    );
}