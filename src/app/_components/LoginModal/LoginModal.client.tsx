"use client"

import Image from "next/image";
import CzzSVG from "@public/loginModal/Logo.svg";
import CloseSVG from "@public/loginModal/close.svg";
import useLoginModalToggle from "@/app/_store/modal/useLoginModalToggle.cliet";

const LoginModal = () => {
    const { isFold, toggle } = useLoginModalToggle();

    if(!isFold) return null;

    // before선 스타일
    const beforeLine = "before:content-[''] before:block before:w-full before:h-[0.5px] before:bg-[#66666671] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2"

    const onClickKakaoButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('로그인 api? url')
    }

    return (
            <div
                id="login-modal"  
                onClick={toggle} 
                className="fixed z-[20000] select-none  w-screen h-screen top-0 left-0 backdrop-blur-[2px] bg-[#252525c4] flex items-center justify-center"
            >
                <div className="relative" onClick={e => e.stopPropagation()}>
                    <div 
                        id="login-layer" 
                        style={{scrollbarWidth:"none"}} 
                        className="bg-[#fff] rounded-[12px] overflow-[hidden_auto] max-w-[400px] min-w-[400px] h-full m-[0_auto] p-[44px_32px_35px] box-border shadow-sm"
                    >
                        <div aria-label="로그인 헤더" id="login-header" className="text-[black]">
                            <CzzSVG width={74} height={26} className="mx-auto scale-150"/>
                        </div>

                        <div aria-label="로그인 설명" className="p-[9px_12px] text-[11px] text-center mt-[8px]">
                            로그인하여 간단하게 스트리밍을 시작하세요! <br/>
                            또는 자신이 좋아하는 스트리머를 팔로우하고 <br/>
                            댓글을 달아보세요!
                        </div>

                        <div className={`text-[13px] w-full text-center relative h-[24px] mt-[6px] ${beforeLine}`}>
                            <span className="text-[#363636eb] absolute p-[0_12px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white">
                                간편 로그인
                            </span>
                        </div>

                        <ol aria-label="소셜 로그인 모음" className="mt-[16px] flex flex-col gap-[12px]">
                            <li aria-label="카카오 로그인">
                                <button onClick={onClickKakaoButton} className="w-[95%] text-[14px] mx-auto p-[10px_12px] border-[1px] rounded-[6px] text-[#343434e5] border-solid border-[#6666662d] flex items-center shadow-sm bg-white hover:brightness-[90%]">
                                    <Image alt="로그인 버튼" width={20} height={20} src="/loginModal/kakao.webp" className="rounded-full mr-[8px]"/>
                                    <span className="font-[600]">
                                        카카오 간편 로그인
                                    </span>
                                </button>  
                            </li>
                        </ol>

                        <button onClick={toggle} className="absolute scale-75 top-0 right-0 m-[12px_12px_0_0] bg-white hover:brightness-90">
                            <CloseSVG width={24} height={24} className="scale-75"/>
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default LoginModal;