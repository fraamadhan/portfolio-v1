import Image from 'next/image'

const Logo = (
    { src, name }: { src: string; name: string; }
) => {
    return (
        <div className="group relative flex w-[84px] flex-col items-center justify-start text-center sm:w-[88px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-3 shadow-[0_16px_30px_rgba(7,10,16,0.2)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-white/25 group-hover:shadow-[0_20px_40px_rgba(7,10,16,0.3)]">
                <Image
                    src={src}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.24)]"
                />
            </div>
            <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-center text-[11px] font-medium leading-5 tracking-wide text-neutral-200 md:hidden">
                {name}
            </p>
            <div className="pointer-events-none absolute -bottom-12 left-1/2 z-10 hidden -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                <p className="whitespace-nowrap rounded-full border border-white/14 bg-[linear-gradient(180deg,rgba(76,101,127,0.95),rgba(31,41,53,0.98))] px-3 py-1.5 text-xs font-medium tracking-wide text-neutral-100 shadow-[0_12px_24px_rgba(4,10,18,0.32)] backdrop-blur-sm">
                    {name}
                </p>
            </div>
        </div>
    )
}

export default Logo
