import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import React, { RefObject } from "react";

interface initClientPlayload {
    clientRef: RefObject<IAgoraRTCClient | null>,
    APP_ID: string,
    channel: string,
    uid: string
}

// 클라이언트 생성 및 채널 참가
export const initializeClient = async (payload:initClientPlayload) => {
    const { clientRef, APP_ID, channel, uid,} = payload;
    try {
        if (clientRef.current) {
            console.log('이미 클라이언트를 가지고 있습니다.');
            return;
        }
        const client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role: "host" });
        clientRef.current = client;
        await client.join(APP_ID, channel, null, uid);
        console.log("클라이언트 초기화 및 채널 참가 완료");
        client.enableDualStream(); // 네트워크 상태에 따라 적응형 스트림 관리

    } catch (err:unknown) {
        if (!clientRef.current) return;

        await clientRef.current.removeAllListeners();
        clientRef.current = null;
        throw new Error('클라이언트 생성 및 채널 참가 중 오류 발생');
        
    }
};


// 클라이언트 삭제
export const delClient = async (clientRef: React.MutableRefObject<IAgoraRTCClient | null>) => {
  try {
    if (clientRef.current) {
      await clientRef.current.removeAllListeners();
      await clientRef.current.leave();
      console.log("채널 종료 및 클라이언트 해제 완료");
      clientRef.current = null;
    } else {
      console.log("클라이언트가 이미 해제된 상태입니다.");
    }
  } catch (err) {
    console.log("클라이언트를 해제하는 중 오류 발생:", err);
    throw new Error("클라이언트 해제 중 오류 발생");
  }
};  