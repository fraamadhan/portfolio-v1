import Image from "next/image";
import Link from "next/link";

const Logo = (
    { src, href, label }: { src: string, href: string, label: string }
) => {
    const iconMap: Record<string, string> = {
        "/logo/ic_email.svg": "/svg/email.svg",
        "/logo/ic_github.svg": "/svg/github.svg",
        "/logo/ic_linkedin.svg": "/svg/linkedin.svg",
    };
    const iconSrc = iconMap[src] || src;

    return (
        <Link
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/70 bg-white/85 p-2 text-slate-700 shadow-[0_10px_24px_rgba(148,163,184,0.16)] transition-opacity hover:opacity-85 sm:h-10 sm:w-10 dark:border-white/14 dark:bg-primary-300 dark:text-white dark:shadow-none"
        >
            {iconSrc ? (
                <Image
                    src={iconSrc}
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                    className="h-5 w-5 object-contain dark:invert sm:h-4 sm:w-4"
                />
            ) : null}
        </Link>
    )
}

export default Logo
