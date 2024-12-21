import { ReactNode } from "react";

interface DashBoardBoxProps {
  theme?: "white" | "blue";
  children?: ReactNode;
}

const DashBoardBox = ({ theme = "white", children }: DashBoardBoxProps) => {
    const style = { boxShadow: "0 0 2px rgba(0, 0, 0, .05), 0 2px 8px rgba(0, 0, 0, .1)"};
    const colorMode = theme === "blue" ? "bg-[#4e41db] text-[#fff]" : "bg-[#fff] text-[#222]";

    return (
        <div style={style} className={`${colorMode} border border-solid border-transparent rounded-[10px] p-[28px] mb-[20px]`}>
            {children}
        </div>
    )
}

export default DashBoardBox;