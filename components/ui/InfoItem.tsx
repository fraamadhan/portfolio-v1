import type { InfoItemProps } from "@/types";

const InfoItem = ({ label, value }: InfoItemProps) => {
    return (
        <div className="text-sm sm:text-base border border-white w-[175px] sm:w-[250px] max-w-sm p-5 rounded-lg bg-card font-inter">
            <dt className="font-bold">{label}</dt>
            <dd>{value}</dd>
        </div>
    )
}

export default InfoItem;
