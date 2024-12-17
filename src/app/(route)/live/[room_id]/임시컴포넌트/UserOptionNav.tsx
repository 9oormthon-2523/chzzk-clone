import Image from "next/image"


export default function UserOptionNav(){
    return (
        <div className="top-0 bg-white text-[#2e3033] h-[60px] left-0 min-w-[800px] fixed w-full z-11000"> 
        <div className="items-center flex h-full justify-end pr-[20px] w-full ">
            {/* 로그인 버튼 */}
            <button className="ml-[8px] border-[1px] border-solid border-[#0003] rounded-[8px] text-[12px] font-bold px-[13px] py-[8px] hover:bg-slate-200">
                로그인
            </button>
            {/* 유저 정보 버튼*/}
            <div className="relative ml-[8px]">
                <button className="box-border text-[inherit] p-[3px] cursor-pointer border outline-none rounded-full border-none hover:[background:linear-gradient(45deg,#5bda30,#00000080)]">
                    <div className="rounded-[inherit] bg-white" >
                        <Image className="rounded-[inherit]" width={37} height={37} alt="userImage" src="/userImage.webp"/>
                    </div>
                </button>

                {/* <div className="bg-white break-words bg-layer-02 rounded-lg shadow-lg shadow-layer01-02 shadow-inner text-content-03 font-sandoll-nemony2 font-sans overflow-auto p-4 absolute right-0 top-[calc(100%+7px)] w-[240px] z-[13000]">
    
                </div> */}
            </div>
        </div>
    </div>
    )
}
