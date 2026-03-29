const InfoItem = ({ label, value }: InfoItemProps) => {
    return (
        <div className="text-sm sm:text-base border border-white w-[175px] sm:w-[250px] max-w-sm p-5 rounded-lg bg-card font-inter">
            <p className="font-bold">{label}</p>
            <p>{value}</p>
        </div>
    )
}

export default InfoItem;