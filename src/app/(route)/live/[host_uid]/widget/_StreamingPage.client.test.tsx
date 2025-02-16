"use client";

import { HostInfoState, StreamRoomState } from "@/app/_types/live/liveType";
import useLiveInfo from "@/app/_utils/live/db/useLiveInfo.client.test";
import LiveInformationDetail from "./LiveInformationDetail.client";
import useLiveControl from "@/app/_store/stores/live/useLiveControl";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";
import LiveTotalWrapper from "../components/Wrapper/LiveTotalWrapper.clinet";
import LiveStreamWrapper from "../components/Wrapper/LiveStreamWrapper.client";

import dynamic from "next/dynamic";
import ChatLayout from "./Chat.client";
import VideoLoadingCompo from "../components/Loading/VideoLoadingCompo.client";

const VideoPlayer = dynamic(() => import("./VideoPlayer.client"), { 
  ssr: false,
  loading: ()=> <VideoLoadingCompo/>
});

interface StreamingPageProps {
  hostInfo:HostInfoState;
  streamRoom:StreamRoomState;
}

export default function StreamingTestPage(props: StreamingPageProps) {
  const isOpen = useNavToggle((state) => state.isOpen);
  const isFullOrWide = useLiveControl(state => state.screen.state.isFullOrWide);

  useLiveInfo(props);
  
  return (
    <>
    {isOpen && <NavBar />}
      <LiveTotalWrapper>
        <LiveStreamWrapper>

          {/* 비디오 플레이어 */}
          <VideoPlayer 
            uid={props.streamRoom.host_uid}
            is_active={props.streamRoom.is_active}  
          />
          
          {/* 방송 정보 */}
          {!isFullOrWide &&
            <LiveInformationDetail/>
          }

        </LiveStreamWrapper>

        {/* 채팅창 */}
        <ChatLayout client_uid={props.streamRoom.client_uid} roomId={props.streamRoom.host_uid}/>
      </LiveTotalWrapper>
    </>
  );
}
