"use client"

import { Button } from "@/components/ui/button";
import InfoItem from "@/components/ui/InfoItem";
import { useTranslation } from "@/hooks/useTranslation";
import { currentWorkRoleFormatted } from "@/lib";

const LandingPage = () => {
    const { t } = useTranslation();
    return (
        <main className="w-full min-h-[calc(100vh-5.5rem)] flex items-start justify-center pt-20">
            <div className="flex w-full max-w-3xl flex-col items-center gap-12 sm:px-8">
                <section className="flex flex-col gap-4 text-center">
                    <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground font-texas-crust">
                        {t("landing_page_motto")}
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight font-rubik-dirt">
                        Fakhri Fajar Ramadhan
                    </h1>

                    <p className="text-lg sm:text-2xl font-medium text-foreground font-oswald">
                        {currentWorkRoleFormatted()}
                    </p>

                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed md:text-base font-inter">
                        {t("landing_page_description")}
                    </p>
                </section>

                <section className="flex flex-col items-center gap-4 text-center">
                    <p className="text-sm sm:text-lg font-oswald text-foreground">
                        {t("current_professional_status")}
                    </p>

                    <div className="flex flex-col gap-4 md:flex-row">
                        <InfoItem label={t("current_role")} value="Back-End Developer" />
                        <InfoItem label={t("work_based_in")} value="Indonesia" />
                        <InfoItem label={t("status")} value="Internship" />
                    </div>
                </section>

                <section className="flex flex-col md:flex-row gap-4">
                    <Button className="px-6 h-10 text-sm sm:text-base bg-gradient-to-r from-[#4B657F] to-[#678EBC] font-inter">
                        {t("view_projects")}
                    </Button>

                    <Button
                        variant="outline"
                        className="px-6 h-10 text-sm sm:text-base hover:text-background font-inter"
                    >
                        {t("contact_me")}
                    </Button>
                </section>
            </div>
        </main>
    )
}

export default LandingPage