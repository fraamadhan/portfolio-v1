import { SkillItemProps } from "@/types";
import Logo from "./Logo";

const CardItem = (
    { title, description, items }: {
        title: string;
        description: string;
        items: SkillItemProps[] | []
    }
) => {
    return (
        <div className="flex h-full flex-col items-center gap-y-5">
            <h4
                className="text-center font-sub-heading text-2xl font-semibold uppercase tracking-wide"
                style={{
                    textShadow: "0 4px 18px rgba(0, 77, 230, 0.35)",
                }}
            >
                {title}
            </h4>
            <p className="text-center text-sm leading-6 text-neutral-200 sm:min-h-[45px] sm:text-base">
                {description}
            </p>
            <ul className="mt-1 grid w-full grid-cols-3 place-items-center gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-7">
                {items.length > 0 ? items.map((item) => (
                    <li key={item.id}>
                        <Logo src={item.src} name={item.name} />
                    </li>
                )) : <p> List not found </p>
                }
            </ul>
        </div>
    )
}

export default CardItem
