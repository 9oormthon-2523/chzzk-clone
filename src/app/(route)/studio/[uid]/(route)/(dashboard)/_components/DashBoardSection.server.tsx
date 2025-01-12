import { ReactNode } from "react";

interface DashBoardSectionProps {
    children?:ReactNode
}

const DashBoardSection = (props:DashBoardSectionProps) => {
    const { children } = props;
    return (
        <div className="pr-[15px] w-[100%]">{children}</div>
    )
}

export default DashBoardSection