import { SkillItemProps } from "@/types";
import CardItem from "./CardItem"

const Card = (
    { title, description, items }: {
        title: string;
        description: string;
        items: SkillItemProps[]
    }
) => {
    return (
        <div className="h-full rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(108,132,158,0.2),rgba(34,45,58,0.82))] px-4 py-5 shadow-[0_20px_45px_rgba(7,10,16,0.28)]">
            <CardItem title={title} description={description} items={items} />
        </div>
    )
}

export default Card
