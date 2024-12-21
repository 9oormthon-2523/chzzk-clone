//기본 레이어가 안짜져있어서 테스트 용으로 만들었어요 삭제해야함

import { ReactNode } from "react"


const TestWireFrame = ({ children }: { children : ReactNode}) => {
    return (
        <div className="pl-[240px] pt-[62px] flex h-screen p-[60px_0_0_70px] w-full box-border">
            <nav className="border-solid border-r-[1px] shadow-sm fixed w-[240px] h-screen left-0 t-[60px] z-[1000]"></nav>
            {children}
        </div>
    )
}

export default TestWireFrame