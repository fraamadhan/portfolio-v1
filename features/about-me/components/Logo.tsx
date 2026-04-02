import Image from 'next/image'
import Link from 'next/link'

const Logo = (
    { src, href, label }: { src: string, href: string, label: string }
) => {
    return (
        <Link
            href={href}
            aria-label={label}
            target='_blank'
            rel="noopener noreferrer"
            className="relative flex h-12 w-12 items-center justify-center rounded-md bg-primary-300 p-2 transition-opacity hover:opacity-85 sm:h-10 sm:w-10"
        >
            <Image
                src={src}
                alt=""
                fill
                className="object-contain p-1"
            />
        </Link>
    )
}

export default Logo
