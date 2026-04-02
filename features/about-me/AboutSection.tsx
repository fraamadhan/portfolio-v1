"use client"

import Image from "next/image"
import { useTranslation } from "@/hooks/useTranslation";
import Logo from "./components/Logo";
import { Button } from "@/components/ui/button";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_DOWNLOAD_NAME, RESUME_FILE_PATH } from "./function";

const AboutSection = () => {
    const { t } = useTranslation();

    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="flex justify-center bg-neutral-600 w-full py-20 sm:pt-20 md:pb-10 min-h-[calc(85svh-5rem)] sm:min-h-[calc(90svh-5rem)] p-10"
        >
            <div className="flex flex-col gap-y-12 items-center">
                <h2
                    id="about-heading"
                    className="
                    font-sub-heading text-4xl text-center tracking-wide
                    text-gradient-primary font-bold w-fit
                "
                >
                    {t("about_section.title")}
                </h2>

                <div className="flex max-w-5xl flex-col items-center justify-center gap-x-12 gap-y-10 border-2 border-foreground bg-transparent p-10 md:flex-row md:items-start">

                    <div className="relative mx-auto h-[400px] md:h-[480px] w-[300px] shrink-0 md:mx-0">
                        <Image
                            src='/img/sanji.jpeg'
                            fill
                            alt="Photo of Fakhri"
                            className="object-cover border-4 border-white rounded-lg shadow-[0_18px_40px_rgba(212,226,245,0.24)]"
                        />
                    </div>

                    <div className="flex w-full flex-col items-center gap-y-10 text-center text-base leading-relaxed text-gray-100 md:items-start md:text-left">
                        <div className="flex w-full flex-col gap-y-5">
                            <p>
                                {t("about_section.intro.before_highlight")}
                                <span className="text-rose-300">{t("about_section.intro.highlight_one")}</span>
                                {t("about_section.intro.middle")}
                                <span className="text-rose-300">{t("about_section.intro.highlight_two")}</span>
                                {t("about_section.intro.after_highlight")}
                            </p>
                            <p>
                                {t("about_section.stack")}
                            </p>
                            <p>
                                {t("about_section.hobbies")}
                            </p>
                            <p>
                                {t("about_section.closing")}
                            </p>
                        </div>
                        <ul className="flex items-center justify-center gap-x-4 md:justify-start">
                            <li>
                                <Logo src="/logo/ic_github.svg" href={GITHUB_URL} label="GitHub profile" />
                            </li>
                            <li>
                                <Logo src="/logo/ic_linkedin.svg" href={LINKEDIN_URL} label="LinkedIn profile" />
                            </li>
                            <li>
                                <Logo src="/logo/ic_email.svg" href={`${EMAIL}`} label="Send email" />
                            </li>
                        </ul>
                        <div className="flex justify-center gap-x-4 md:justify-start">
                            <Button className="px-6 h-10 text-sm sm:text-base bg-gradient-to-r from-[#4B657F] to-[#678EBC] font-inter">
                                <a
                                    href={RESUME_FILE_PATH}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("about_section.buttons.view_resume")}
                                </a>
                            </Button>

                            <Button
                                variant="outline"
                                className="px-6 h-10 text-sm sm:text-base hover:text-background font-inter"
                            >
                                <a
                                    href={RESUME_FILE_PATH}
                                    download={RESUME_DOWNLOAD_NAME}
                                >
                                    {t("about_section.buttons.download_resume")}
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
