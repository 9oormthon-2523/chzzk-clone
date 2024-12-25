interface DashBoardTitleProps {
    title: string;
    highlight?: string;
    theme?:"white"|"blue"
}

const DashBoardTitle = (props: DashBoardTitleProps) => {
    const { theme = "white", title, highlight } = props;
    const highlightColor = theme === "blue" ? "text-black" : "text-[#4e41db]";

    return (
        <strong className="font-gothic text-[18px] font-black leading-[22px]">
            {highlight && (
                <em style={{ fontStyle: "normal" }} className={highlightColor}>
                    {highlight + " "}
                </em>
            )}
            {title}
        </strong>
    );
};

export default DashBoardTitle;