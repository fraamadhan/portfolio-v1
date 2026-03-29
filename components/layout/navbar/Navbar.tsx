import NavItems from "./NavItems";

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-99 backdrop-blur-sm px-7">
            <div className="flex justify-center py-5">
                <div
                    className="
                    w-full lg:max-w-[84rem] h-[5rem]
                    border border-foreground
                    border-2
                    rounded-md
                    flex items-center justify-between px-8
                    bg-[linear-gradient(to_right,#7FA6CE_0%,#7FA6CE_50%,#3A4E63_70%,#1E2A38_100%)]
                    md:bg-[linear-gradient(to_right,#7FA6CE_0%,#7FA6CE_12%,#3A4E63_22%,#1E2A38_100%)]
                "
                >
                    <NavItems />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;