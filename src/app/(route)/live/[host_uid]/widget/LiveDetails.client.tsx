"use client"
import Link from 'next/link';
import React, { CSSProperties } from 'react'
import { getHostInfoType } from '../liveType';
import LiveButton from '../components/LiveDetails/LiveDetailsButton.client'; 
import LiveOptionButton from '../components/LiveDetails/LiveDetailsOptionButton.client';
import { LiveDetailsTime, LiveDetailsViewer, LiveCategory, LiveNickName, LiveHashTag } from '../components/LiveDetails/LiveDetailComponents.client';

/**
 * 라이브 스트리밍 정보 컴포넌트
 */

interface HostInfoProps extends getHostInfoType {
    is_active:boolean
    uid:string
}

interface StreamInfoProps {
    title:string|null
    tags:string[]|null
    audience_cnt:number
    category:string|null
    start_time:string|null
}

type LiveDetailsProps = HostInfoProps & StreamInfoProps;

const LiveDetails = (props:LiveDetailsProps) => {

    const { 
        uid,
        tags,
        title,
        nickname, 
        category,
        is_active,
        start_time,
        profile_img, 
        audience_cnt,
    } = props;

    return (
        <div id="live-information-details" className="flex-none p-[15px_30px_22px]">
            <div id="live-information-details-container" className="break-words break-all">

                {
                    // 스트리밍 정보 (방송 상태가 OFF시 렌더링 안함)
                    is_active &&
                    <StreamInfoCompo 
                        tags={tags}
                        title={title} 
                        category={category}
                        start_time={start_time}
                        audience_cnt={audience_cnt} 
                    />
                }

                {/* 호스트 정보 */}
                <HostInfoCompo 
                    uid={uid}
                    is_active={is_active}
                    nickname={nickname} 
                    profile_img={profile_img}
                />

            </div>
        </div>
  )
}

export default React.memo(LiveDetails);


// 스트리밍 정보
const StreamInfoCompo = (props:StreamInfoProps) => {
    const { title, audience_cnt, start_time, tags, category } = props;

    return (
        <div id="live-informaiton-details-row" className="items-start flex flex-col w-full">
            <h2 className="text-[#2e3033] mb-1 text-[22px] font-bold tracking-[-0.3px] leading-[28px]">
                {title}
            </h2>
            <div className='flex gap-[7px] items-center'>
                { category && <LiveCategory category={category}/>}
                { Array.isArray(tags) && tags.length > 0 &&  <LiveHashTag tags={tags} /> }
                <div>
                    <LiveDetailsViewer viewers={audience_cnt}/>
                    <LiveDetailsTime startTime={start_time}/>
                </div>
            </div>
        </div>
    )
}

// 호스트 정보
const HostInfoCompo = (props:HostInfoProps) => {
    const { uid, nickname, is_active, profile_img} = props;

    const circle_style:CSSProperties = {
        background: is_active ? "linear-gradient(320deg,#5bda30,#a8a8a8d5)" : undefined
    }

    return (
        <div id="live-informaiton-details-row" className="mt-[6px] items-start flex w-full">
            <Link 
                href={`/channel/${uid}`} 
                id="프로필 사진" 
                style={circle_style}
                className="select-none mr-[0.5rem] overflow-hidden relative flex justify-center items-center w-[60px] h-[60px] rounded-full flex-none p-[0.2px] m-[1.8px_3px]"
            >
                <div className='w-[52px] h-[52px] border-[2px] overflow-hidden border-solid border-[white] bg-[#ffffff] left-0 top-0 rounded-full flex justify-center items-center'>
                    <img alt="introduce-img" width={60} height={60} src={profile_img ||"/userImage.webp"} className="bg-[#0000000f] rounded-[inherit] object-cover relative align-top border-0"/>
                </div>
            </Link>

            <div aria-label='방송 정보' className="self-center flex flex-1 flex-col min-w-0">
                <LiveNickName nickname={nickname}/>
                <p className='mt-[2px] text-[13px] font-semibold text-[#666]'>팔로워 11명</p>
                
            </div>
                
            <div className="flex ml-4 pt-[19px] relative">
                <div className="mr-[6px] relative flex gap-2">
                    <LiveButton svgIcon='VideoUnFollow' title='팔로우' svgWight={20} svgHeight={20} style='bg-[#1bb373] text-[#fff]'/>
                    <LiveOptionButton/>
                </div>
            </div>
        </div>
    );
}
