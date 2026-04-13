import { ProjectItemProps } from "@/types"
import CardItem from "./CardItem"

const Card = ({ project }: { project: ProjectItemProps }) => {
    return (
        <article className="group h-full overflow-hidden rounded-2xl border border-primary-200/55 bg-[linear-gradient(180deg,rgba(54,72,95,0.95),rgba(35,45,59,0.98))] shadow-[0_20px_45px_rgba(4,10,18,0.26)] transition-transform duration-300 hover:-translate-y-1 hover:border-primary-100/75">
            <CardItem project={project} />
        </article>
    )
}

export default Card
