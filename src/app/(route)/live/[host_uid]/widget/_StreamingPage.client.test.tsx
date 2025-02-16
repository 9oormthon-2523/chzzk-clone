"use client";

import { HostInfoState, StreamRoomState } from "@/app/_types/live/liveType";
import useLiveInfo from "@/app/_utils/live/db/useLiveInfo.client.test";
import LiveInformationDetail from "./LiveInformationDetail.client";
import useLiveControl from "@/app/_store/stores/live/useLiveControl";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";
import LiveTotalWrapper from "../components/Wrapper/LiveTotalWrapper.clinet";
import LiveStreamWrapper from "../components/Wrapper/LiveStreamWrapper.client";


interface StreamingPageProps {
  hostInfo:HostInfoState,
  streamRoom:StreamRoomState,
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

          {/* 방송 정보 */}
          {!isFullOrWide &&
            <LiveInformationDetail/>
          }

        </LiveStreamWrapper>
      </LiveTotalWrapper>
    </>
  );
}
