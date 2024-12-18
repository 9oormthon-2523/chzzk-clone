"use client"

import SvgIcon from "../../../../_components/SVGIcon.server";

const IMGURL = "data:image/png;base64,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";export default function SideNav() {
    
    
    return (
        <div id="side-bar" className="w-[78px] top-0 box-content left-0 z-[12000] fixed">
            <div className="bg-[#fff] flex h-[100%] relative w-full z-[13000]">
                <header className="flex">
                    <button className="text-[#2e3033] p-[10px_4px_10px_19px] relative outline-none">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="header_icon__8SHkt"><g clipPath="url(#clip0_1128_3162)"><rect x="11" y="13" width="18" height="2" rx="1" fill="currentColor"></rect><rect x="11" y="19" width="18" height="2" rx="1" fill="currentColor"></rect><rect x="11" y="25" width="18" height="2" rx="1" fill="currentColor"></rect></g><defs><clipPath id="clip0_1128_3162"><rect width="40" height="40" rx="6" fill="white"></rect></clipPath></defs></svg>
                    </button>
                </header>
            </div>

            <section className="flex-1 overflow-auto pb-[30px]" style={{scrollbarWidth: "none"}}>
                <div id="basic-contents" className="p-[4px_16px_10px] box-border flex flex-col">
                <a className="text-[#808080] text-[10px] leading-[15px] p-[6px_6px_4px] mx-auto rounded-sm hover:bg-[#6666662c] hover:text-[#666] box-content cursor-pointer flex flex-col items-center text-center">
                        <SvgIcon name="Video" width={26} height={26}/>
                        <span className="">전체<br/>방송</span>
                    </a>
                    <a className="text-[#808080] text-[10px] leading-[15px] p-[6px_6px_4px] mx-auto rounded-sm hover:bg-[#6666662c] hover:text-[#666] box-content cursor-pointer flex flex-col items-center text-center">
                        <SvgIcon name="Sessor" width={26} height={26}/>
                        <span className="">인기<br/>클립</span>
                    </a>
                    <a className="text-[#808080] text-[10px] leading-[15px] p-[6px_6px_4px] mx-auto rounded-sm hover:bg-[#6666662c] hover:text-[#666] hover: box-content cursor-pointer flex flex-col items-center text-center">
                        <SvgIcon name="Category" width={26} height={26}/>
                        <span className="whitespace-nowrap">카테고리</span>
                    </a>
                    <a className="text-[#808080] text-[10px] leading-[15px] p-[6px_6px_4px] mx-auto rounded-sm hover:bg-[#6666662c] hover:text-[#666] box-content cursor-pointer flex flex-col items-center text-center">
                        <SvgIcon name="EmptyHeart" width={26} height={26}/>
                        <span className="">팔로잉</span>
                    </a>
                </div>

                <nav className="box-border">
                    <div className="p-[11px_20px_16px] relative before:content-[''] before:absolute before:bg-[#0000001f] before:h-[1px] before:left-[21px] before:right-[21px] before:top-0">
                        <h2 className="text-[#666] font-sans text-[10px] font-extrabold leading-[15px] text-center">팔로우</h2>
                        <div className="p-[8px_3px_0] flex flex-col gap-4">

                            <a className="block relative cursor-pointer">
                                <div className="border border-transparent rounded-full relative box-border p-[2px] flex items-center justify-center hover:[background:linear-gradient(45deg,#5bda30,#00000080)]">
                                    <img className="rounded-[inherit] object-cover mr-[0.5px]" alt="follow-img" src={IMGURL}/>
                                </div>
                            </a>

                            <a className="block relative cursor-pointer">
                                <div className="border border-transparent rounded-full relative box-border p-[2px] flex items-center justify-center hover:[background:linear-gradient(45deg,#5bda30,#00000080)]">
                                    <img className="rounded-[inherit] object-cover mr-[0.5px]" alt="follow-img" src={IMGURL}/>
                                </div>
                            </a>

                            <a className="block relative cursor-pointer">
                                <div className="border border-transparent rounded-full relative box-border p-[2px] flex items-center justify-center hover:[background:linear-gradient(45deg,#5bda30,#00000080)]">
                                    <img className="rounded-[inherit] object-cover mr-[0.5px]" alt="follow-img" src={IMGURL}/>
                                </div>
                            </a>

                        </div>
                    </div>
                </nav>
            </section>
        </div>
    )
}