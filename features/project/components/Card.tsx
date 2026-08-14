import CardItem from "./CardItem"

interface CardProps {
  project: any;
  isDimmed: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Card = ({
  project,
  isDimmed,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: CardProps) => {
  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group h-full overflow-hidden rounded-2xl border transition-all duration-300 ease-out
        ${
          isHovered
            ? "border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-[1.02] -translate-y-1"
            : "border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)]"
        }
        ${isDimmed ? "opacity-45 scale-[0.98] blur-[0.5px]" : "opacity-100"}
        bg-white/80 dark:bg-slate-900/70 backdrop-blur-md`}
    >
      <CardItem project={project} />
    </article>
  )
}

export default Card
