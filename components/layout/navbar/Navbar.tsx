import NavItems from "./NavItems";

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full z-99 backdrop-blur-sm px-7">
            <div className="flex justify-center py-5">
                <nav
                    aria-label="Primary"
                    className="
                    w-full lg:max-w-[84rem] h-[5rem]
                    border border-slate-300/80 dark:border-foreground
                    border-2
                    rounded-md
                    flex items-center justify-between px-8
                    bg-[linear-gradient(to_right,rgba(214,229,247,0.98)_0%,rgba(214,229,247,0.95)_22%,rgba(243,248,255,0.96)_58%,rgba(230,238,249,0.98)_100%)]
                    shadow-[0_16px_36px_rgba(148,163,184,0.18)]
                    md:bg-[linear-gradient(to_right,rgba(191,216,246,0.98)_0%,rgba(191,216,246,0.94)_12%,rgba(241,246,254,0.96)_28%,rgba(228,237,249,0.98)_100%)]
                    dark:bg-[linear-gradient(to_right,#7FA6CE_0%,#7FA6CE_50%,#3A4E63_70%,#1E2A38_100%)]
                    dark:shadow-none
                    dark:md:bg-[linear-gradient(to_right,#7FA6CE_0%,#7FA6CE_12%,#3A4E63_22%,#1E2A38_100%)]
                "
                >
                    <NavItems />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
