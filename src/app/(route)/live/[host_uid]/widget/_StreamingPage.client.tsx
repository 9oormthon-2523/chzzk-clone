"use client";

import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";
import useFullscreenHandler from "../utils/local/useFullScreenHandler.client";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import useLiveInfo from "../utils/db/useLiveInfo.client";
import LiveStreamWrapper from "./LiveStreamWrapper.client";
import LiveWrapper from "./LiveTotalWrapper.clinet";
import LiveDetails from "./LiveDetails.client";
import ChatLayout from "./Chat.client";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./VideoPlayer.client"), { ssr: false });

import { getHostInfoPayload } from "../liveType";
interface StreamingPageProps extends getHostInfoPayload {}

export default function StreamingPage(props: StreamingPageProps) {
  const { hostInfo, roomInit } = props;

  useFullscreenHandler();

  const isOpen = useNavToggle((state) => state.isOpen);

  const liveInfo = useLiveInfo({
    title: roomInit.title,
    host_uid: roomInit.uid,
    is_active: roomInit.is_active,
    audience_cnt: roomInit.audience_cnt,
  });

  return (
    <>
        {isOpen && <NavBar />}
            <LiveWrapper>
                <LiveStreamWrapper>

                    <VideoPlayer 
                        uid={roomInit.uid} 
                        is_active={liveInfo.is_active}
                    />

                    <LiveDetails
                        {...hostInfo}
                        {...liveInfo}
                        uid={roomInit.uid}
                        start_time={roomInit.start_time}
                    />

                    </LiveStreamWrapper>

            <ChatLayout roomId={roomInit.room_id} />
      </LiveWrapper>
    </>
  );
}
