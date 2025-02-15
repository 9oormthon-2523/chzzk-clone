"use client";

import { HostInfoState, StreamRoomState } from "@/app/_types/live/liveType";
import useLiveInfo from "@/app/_utils/live/db/useLiveInfo.client.test";
import HostProfile from "../components/LiveDetails/HostProfile.client";
import HostNickName from "../components/LiveDetails/HostNickName.client";
import useLiveControl from "@/app/_store/stores/live/useLiveControl";
import { useFollowerQuery } from "@/app/_store/queries/follow/query";
import HostFollowerBtn from "../components/LiveDetails/HostFollowerBtn.client";
import HostFollowerViwer from "../components/LiveDetails/HostFollwerViewer.client";
import StreamTags from "../components/LiveDetails/StreamTags.client";
import StreamCategory from "../components/LiveDetails/StreamCategory.client";
import StreamTimeView from "../components/LiveDetails/StreamTimeViewer.client";


interface StreamingPageProps {
  hostInfo:HostInfoState,
  streamRoom:StreamRoomState,
}

export default function StreamingTestPage(props: StreamingPageProps) {
  useLiveInfo(props);

  const host_uid = useLiveControl(state => state.streamRoom.state.host_uid);
  const { data, isLoading, error } = useFollowerQuery(host_uid);

  return (
    <>
    <div className="w-screen h-screen flex justify-center items-center">
        <HostProfile/>
        <HostNickName/>
        <HostFollowerBtn data={data} isLoading={isLoading} error={error}/>
        <HostFollowerViwer data={data} isLoading={isLoading} error={error}/>
        <StreamTags/>
        <StreamCategory/>
        <StreamTimeView/>
    </div>
    </>
  );
}
