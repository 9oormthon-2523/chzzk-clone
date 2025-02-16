"use client";

import { HostInfoState, StreamRoomState } from "@/app/_types/live/liveType";
import useLiveInfo from "@/app/_utils/live/db/useLiveInfo.client.test";
import LiveInformationDetail from "./LiveInformationDetail.client";


interface StreamingPageProps {
  hostInfo:HostInfoState,
  streamRoom:StreamRoomState,
}

export default function StreamingTestPage(props: StreamingPageProps) {
  useLiveInfo(props);

  return (
    <>
    <div className="w-screen h-screen flex justify-center items-center">
      <LiveInformationDetail/>
    </div>
    </>
  );
}
