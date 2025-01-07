"use client";

import dynamic from "next/dynamic";
import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import useScreenControl from "@/app/_store/live/useScreenControl";
import LiveStreamWrapper from "./LiveStreamWrapper.client";
import LiveWrapper from "./LiveTotalWrapper.clinet";
import LiveDetails from "./LiveDetails.client";
import ChatLayout from "./Chat.client";
import useLiveInfo from "../utils/db/useLiveInfo.client";
import { useEffect } from "react";
import { getHostInfoPayload } from "../liveType";

const VideoPlayer = dynamic(() => import("./VideoPlayer.client"), { ssr: false });

interface StreamingPageProps extends getHostInfoPayload {}

export default function StreamingPage(props: StreamingPageProps) {
    const { hostInfo, roomInit } = props;

    const { isFullscreen, offFullScreen } = useScreenControl();
    const isOpen = useNavToggle((state) => state.isOpen);
    const { title, is_active, audience_cnt } = useLiveInfo({
        title: roomInit.title,
        host_uid: roomInit.uid,
        is_active: roomInit.is_active,
        audience_cnt: roomInit.audience_cnt,
    });

    const clearFullScreenDetect = () => {
        if (!document.fullscreenElement) offFullScreen();
    };

    const handleFullscreenToggle = async () => {
        try {
            if (!isFullscreen && document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (isFullscreen) {
                await document.body.requestFullscreen();
            }
        } catch (err) {
            console.error("Error fullscreen:", err);
        }
    };

    useEffect(() => {
        handleFullscreenToggle();
    }, [isFullscreen]);

    useEffect(() => {
        document.addEventListener("fullscreenchange", clearFullScreenDetect);
        return () => {
            document.removeEventListener("fullscreenchange", clearFullScreenDetect);
        };
    }, []);

    // Rendering
    return (
        <>
            {isOpen && <NavBar />}
            <LiveWrapper>
                {/* Live Streaming */}
                <LiveStreamWrapper>
                    <VideoPlayer />
                    <LiveDetails />
                </LiveStreamWrapper>

                {/* Chat Layout */}
                <ChatLayout roomId={roomInit.room_id} />
            </LiveWrapper>
        </>
    );
}
