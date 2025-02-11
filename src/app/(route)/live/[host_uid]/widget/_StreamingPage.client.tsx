"use client";

import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";
import useFullscreenHandler from "@/app/_utils/live/local/useFullScreenHandler.client";
import useScreenControl from "@/app/_store/stores/live/useScreenControl";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import useLiveInfo from "@/app/_utils/live/db/useLiveInfo.client";
import LiveStreamWrapper from "./LiveStreamWrapper.client";
import LiveWrapper from "./LiveTotalWrapper.clinet";
import LiveDetails from "./LiveDetails.client";
import ChatLayout from "./Chat.client";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./VideoPlayer.client"), { ssr: false });

import { getHostInfoPayload } from "@/app/_types/live/liveType";
import usePing from "@/app/_utils/live/db/usePing.client";
import useLiveControl from "@/app/_store/stores/live/useLiveControl";

interface StreamingPageProps extends getHostInfoPayload {
  client_uid: string | undefined
}

/**
 * 스트리밍 페이지 메인
 */

export default function StreamingPage(props: StreamingPageProps) {
  const { hostInfo, roomInit, client_uid } = props;
  const isOpen = useNavToggle((state) => state.isOpen);
  // const isFullOrWide = useScreenControl(state => state.isFullOrWide);
  const isFullOrWide = useLiveControl(state => state.screen.state.isFullOrWide);

  // 풀 스크린 핸들러
  useFullscreenHandler();

  // 실시간 데이터 구독
  const liveInfo = useLiveInfo({
    tags: roomInit.tags,
    title: roomInit.title,
    host_uid: roomInit.uid,
    category: roomInit.category,
    is_active: roomInit.is_active,
    audience_cnt: roomInit.audience_cnt,
  });

  // 호스트 핑(시청자 수)
  usePing({ client_uid, host_uid:roomInit.uid, is_active:liveInfo.is_active });

  return (
    <>
        {isOpen && <NavBar />}
            <LiveWrapper>
                <LiveStreamWrapper>

                    {/* 비디오 플레이어 */}
                    <VideoPlayer 
                        uid={roomInit.uid} 
                        is_active={liveInfo.is_active}
                    />

                    {/* 방송 정보 */}
                    {!isFullOrWide &&
                        <LiveDetails
                          {...hostInfo}
                          {...liveInfo}
                          uid={client_uid}
                          host_uid={roomInit.uid}
                          start_time={roomInit.start_time} 
                        />
                    }

                  </LiveStreamWrapper>

            {/* 채팅창 */}
            <ChatLayout roomId={roomInit.uid} client_uid={client_uid} />
      </LiveWrapper>
    </>
  );
}
