import { ReactNode } from "react";

interface DashBoardWrapperProps {
    children?:ReactNode
}


const DashBoardWrapper = (props:DashBoardWrapperProps) => {
    const { children } = props;
    return (
        <div className="pr-[15px] w-[100%]">{children}</div>
    )
}

export default DashBoardWrapper