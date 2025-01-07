"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import LiveButton from '../components/LiveDetails/LiveDetailsButton.client'; 
import LiveHashTag from '../components/LiveDetails/LiveDetailsHashTags.client'; 
import LiveNickName from '../components/LiveDetails/LiveDetailsNickName.client'; 
import LiveCategory from '../components/LiveDetails/LiveDetailsCategory.client'; 
import LiveOptionButton from '../components/LiveDetails/LiveDetailsOptionButton.client'; 
import LiveDetailsViewerStats from '../components/LiveDetails/LiveDetailsViewerStats.client';
import useScreenControl from '@/app/_store/live/useScreenControl';

/**
 * 라이브 스트리밍 정보 컴포넌트
 */

//가짜 URL
const IMGURL = "data:image/png;base64,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";

const LiveDetails = () => {
    const isFullOrWide = useScreenControl(state => state.isFullOrWide);

    //풀 스크린이나 와이드일 때는 렌더 안함
    if(isFullOrWide) return null;

    //가상 데이터
    const tags = [
        { path: "/", tagname:"관련태그"},
        { path: "/", tagname:"관련태그"},
        { path: "/", tagname:"관련태그"},
    ]

    return (
        <div id="live-information-details" className="flex-none p-[15px_30px_22px]">
            <div id="live-information-details-container" className="break-words break-all">

                {/* 제목 */}
                <div id="live-informaiton-details-row" className="items-start flex w-full">
                    <h2 className="text-[#2e3033] text-[22px] font-bold tracking-[-0.3px] leading-[28px]">
                        제목
                    </h2>
                </div>

                <div id="live-informaiton-details-row" className="mt-[15px] items-start flex w-full">

                    {/* 프로필 + 링크*/}
                    <Link href={"/"} id="프로필 사진" className="relative rounded-full flex-none p-[0.2px] m-[1.8px_3px]  hover:[background:linear-gradient(45deg,#5bda30,#00000080)]">
                        <Image alt="introduce-img" width={60} height={60} src={IMGURL} className="bg-[#0000000f] rounded-[inherit] m-[3px] object-cover relative align-top border-0"/>
                    </Link>

                    {/* 방송 정보 */}
                    <div aria-label='방송 정보' className="self-center flex flex-1 flex-col min-w-0">
                        <LiveNickName nickname={"닉네임"}/>
                        <LiveCategory category={"카테고리"}/>
                        <LiveHashTag tags={tags}/>
                        <LiveDetailsViewerStats viewers={525} startTime={"02:15:06"} />
                    </div>
                        
                    {/* 팔로잉 및 구독 */}
                    <div className="flex ml-4 pt-[19px] relative">
                        <div className="mr-[6px] relative flex gap-2">
                            <LiveButton svgIcon='VideoUnFollow' title='팔로우' svgWight={20} svgHeight={20} style='bg-[#1bb373] text-[#fff]'/>
                            <LiveOptionButton/>
                        </div>
                    </div>
                </div>
            </div>


        </div>
  )
}


export default LiveDetails;