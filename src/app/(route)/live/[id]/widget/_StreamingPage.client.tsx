"use client";

const VideoPlayer = dynamic(() => import("./VideoPlayer.client"), {
  ssr: false,
});
import useScreenControl from "@/app/_store/live/useScreenControl";
import LiveStreamWrapper from "./LiveStreamWrapper.client";
import LiveWrapper from "./Wrapper.clinet";
import LiveDetails from "./LiveDetails.client";
import ChatLayout from "./Chat.client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";

interface StreamingPageProps {
  params: string;
}

export default function StreamingPage(props: StreamingPageProps) {
  const { params } = props;
  const { isFullscreen, offFullScreen } = useScreenControl();
  const isOpen = useNavToggle((state) => state.isOpen);

  //esc로 전체화면을 강제 해제 했을 때 풀 스크린 관련 state off
  const clearFullScreenDetect = () => {
    if (!document.fullscreenElement) offFullScreen();
  };

  useEffect(() => {
    (async () => {
      try {
        // 풀 스크린 false 풀 스크린 중인 요소가 있을 때 해제 요청
        if (!isFullscreen && document.fullscreenElement)
          await document.exitFullscreen();
        // 풀 스크린 요청
        else if (isFullscreen) await document.body.requestFullscreen();
      } catch (err) {
        console.error("Error fullscreen:", err);
      }
    })();
  }, [isFullscreen]);

  //풀 스크린 이벤트 핸들러
  useEffect(() => {
    document.addEventListener("fullscreenchange", clearFullScreenDetect);
    return () =>
      document.removeEventListener("fullscreenchange", clearFullScreenDetect);
  }, []);

  return (
    <>
      {isOpen && <NavBar />}
      <LiveWrapper>
        {/* 라이브 스트리밍 */}
        <LiveStreamWrapper>
          <VideoPlayer />
          <LiveDetails />
        </LiveStreamWrapper>

        {/* 채팅창 */}
        <ChatLayout roomId={params} />
      </LiveWrapper>
    </>
  );
}
