"use client";
import useScreenControl from "@/app/_store/live/useScreenControl";
import LiveStreamWrapper from "./widget/LiveStreamWrapper.client";
import LiveWrapper from "./widget/Wrapper.clinet";
import LiveDetails from "./widget/LiveDetails.client";
import VideoPlayer from "./widget/VideoPlayer.client";
import ChatLayout from "./widget/Chat.client";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { isFullscreen, offFullScreen } = useScreenControl();

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
    <LiveWrapper>
      {/* 라이브 스트리밍 */}
      <LiveStreamWrapper>
        <VideoPlayer />
        <LiveDetails />
      </LiveStreamWrapper>

      {/* 채팅창 */}
      <ChatLayout roomId={params.id} />
    </LiveWrapper>
  );
}
