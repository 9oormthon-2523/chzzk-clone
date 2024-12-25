// 이거를 따로 만든 이유가
// 요 레이아웃 프레임을 베이스로 모든 페이지가 사용하더라구요

/**
 * 와이어 프레임
 */

import { ReactNode } from "react";

interface StudioContainer {
    children?: ReactNode
    label?:string
}

const StudioWrapper = (props: StudioContainer) => {
    const { children, label } = props

    return (
        <section aria-label={label} className="flex overflow-auto flex-1 flex-col bg-[#f1f3f5]">
            <div className="flex flex-col overflow-auto h-full ">
                <div className="flex flex-1 m-[0_auto] max-w-[1200px] min-w-[698px] p-[40px_50px_0] w-full box-border">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default StudioWrapper;