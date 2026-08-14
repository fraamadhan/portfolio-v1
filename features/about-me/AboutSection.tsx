"use client"

import Image from "next/image"
import { useTranslation } from "@/hooks/useTranslation";
import Logo from "./components/Logo";
import { Button } from "@/components/ui/button";
import { EMAIL_MAILTO_URL, GITHUB_URL, LINKEDIN_URL, RESUME_DOWNLOAD_NAME, RESUME_FILE_PATH } from "./function";
import { useLanguage } from "@/context/LanguageContext";
import { blocksToMarkdown, renderMarkdown } from "@/components/admin/utils";

interface AboutSectionProps {
    profile?: any;
}

const AboutSection = ({ profile }: AboutSectionProps) => {
    const { t } = useTranslation();
    const { lang } = useLanguage();

    const imageUrl = profile?.profileImage?.url || '/img/me.jpeg';
    
    // Convert Portable Text blocks to markdown and render as HTML
    const blocks = profile?.fullDescription?.[lang] || [];
    const markdownText = blocksToMarkdown(blocks);
    const htmlContent = renderMarkdown(markdownText);

    // Social Media config
    const platformIcons: Record<string, string> = {
        github: '/svg/github.svg',
        linkedin: '/svg/linkedin.svg',
        email: '/svg/email.svg',
        instagram: '/svg/instagram.svg',
        facebook: '/svg/facebook.svg',
        tiktok: '/svg/tiktok.svg',
    };

    const getIconSrc = (social: any) => {
        if (social.platform === 'custom') {
            return social.customIcon?.url || '/svg/link.svg';
        }
        return platformIcons[social.platform] || '/svg/link.svg';
    };

    const getLabel = (social: any) => {
        if (social.platform === 'custom') {
            return social.customName || 'Custom Link';
        }
        return social.platform.charAt(0).toUpperCase() + social.platform.slice(1);
    };

    const getHref = (social: any) => {
        if (social.platform === 'email') {
            return social.url?.startsWith('mailto:') ? social.url : `mailto:${social.url}`;
        }
        return social.url || '';
    };

    const socialMedias = profile?.socialMedias || [];
    const defaultSocials = [
        { platform: 'github', url: GITHUB_URL },
        { platform: 'linkedin', url: LINKEDIN_URL },
        { platform: 'email', url: EMAIL_MAILTO_URL }
    ];
    const displaySocials = socialMedias.length > 0 ? socialMedias : defaultSocials;
    const activeResumePath = profile?.resume?.url || RESUME_FILE_PATH;
    const downloadResumePath = activeResumePath.includes('cdn.sanity.io')
        ? `${activeResumePath}?dl=${profile?.name ? `${profile.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf` : 'resume.pdf'}`
        : activeResumePath;

    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="flex min-h-[calc(85svh-5rem)] w-full justify-center bg-[radial-gradient(circle_at_top,rgba(146,187,235,0.18),transparent_34%),linear-gradient(180deg,var(--color-neutral-800),var(--color-neutral-700))] p-10 py-20 sm:min-h-[calc(90svh-5rem)] sm:pt-20 md:pb-10 dark:bg-neutral-600"
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

                <div className="flex max-w-5xl flex-col items-center justify-center gap-x-12 gap-y-10 rounded-[2rem] border border-slate-300/80 bg-white/70 p-10 shadow-[0_24px_60px_rgba(148,163,184,0.14)] backdrop-blur-sm md:flex-row md:items-start dark:border-foreground dark:bg-transparent dark:shadow-none">

                    <div className="relative mx-auto h-[400px] md:h-[480px] w-[300px] shrink-0 md:mx-0">
                        <Image
                            src={imageUrl}
                            fill
                            alt={`Photo of ${profile?.name || 'Fakhri'}`}
                            className="rounded-lg border-4 border-white object-cover shadow-[0_18px_40px_rgba(212,226,245,0.24)]"
                        />
                    </div>

                    <div className="flex w-full flex-col items-center gap-y-10 text-center text-base leading-relaxed text-slate-700 md:items-start md:text-left dark:text-gray-100">
                        <div className="flex w-full flex-col gap-y-5">
                            {htmlContent ? (
                                <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="space-y-4" />
                            ) : (
                                <>
                                    <p>
                                        {t("about_section.intro.before_highlight")}
                                        <span className="text-rose-500 dark:text-rose-300">{t("about_section.intro.highlight_one")}</span>
                                        {t("about_section.intro.middle")}
                                        <span className="text-rose-500 dark:text-rose-300">{t("about_section.intro.highlight_two")}</span>
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
                                </>
                            )}
                        </div>
                        <ul className="flex items-center justify-center gap-x-4 md:justify-start">
                            {displaySocials.map((social: any, index: number) => {
                                const iconSrc = getIconSrc(social);
                                const label = getLabel(social);
                                const href = getHref(social);
                                if (!href) return null;
                                return (
                                    <li key={index}>
                                        <Logo src={iconSrc} href={href} label={label} />
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="flex justify-center gap-x-4 md:justify-start">
                            <Button className="px-6 h-10 text-sm sm:text-base bg-gradient-to-r from-[#4B657F] to-[#678EBC] font-inter">
                                <a
                                    href={activeResumePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("about_section.buttons.view_resume")}
                                </a>
                            </Button>

                            <Button
                                variant="outline"
                                className="h-10 border-slate-300/80 bg-white/80 px-6 text-sm text-slate-800 hover:text-background sm:text-base font-inter dark:border-input dark:bg-input/30 dark:text-foreground"
                            >
                                <a
                                    href={downloadResumePath}
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
