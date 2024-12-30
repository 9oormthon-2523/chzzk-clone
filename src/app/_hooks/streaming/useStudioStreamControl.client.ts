import type * as AgoraRTCType from "agora-rtc-sdk-ng";
import useAgoraClient from "./useAgoraClient.client";
import useAgoraMedia from "./useAgoraMedia.client";


/**
 * 호스트가 사용하는 스트리밍 훅
 */

interface useStreamforStudioPayload {
    uid:string
    channel:string
}

const useStudioStreamControl = (payload: useStreamforStudioPayload) => {
    const { uid, channel } = payload;

    const { 
        getClient, 
        resetClient,
        joinChannel,
        publishMediaTracks,
        clientState,
    } = useAgoraClient();

    const {
        saveTracks,
        resetTracks,
        getAudioTrack,
        getScreenAudioTracks,
    } = useAgoraMedia();

    // 스트리밍을 키는 함수, 성공시 true, 실패시 false 반환
    const streamOn = async () => {
        console.clear();
        try {
            await getClient("host");
            await console.log("클라이언트 생성");

            await joinChannel({uid, CHANNEL:channel, TOKEN:null});
            await console.log("채널 생성 및 참여 완료");

            const tracks: AgoraRTCType.ILocalTrack[] = [];
            const [screenTrack, screenAudioTrack] = await getScreenAudioTracks({});
            await tracks.push(screenTrack, screenAudioTrack);
            await console.log('스크린 리소스 추출 완료');

            try {
                tracks.push(await getAudioTrack());
                await console.log('마이크 리소스 추출 완료');
            } catch (micError) {
                console.log(micError);
            }

            // 공유할 리소스가 없으면 오류로 간주
            if (tracks.length === 0) throw new Error("미디어 리소스가 없습니다..");
            
            // 연결된 상태가 아니라면 오류로 간주
            if (await clientState() !== "CONNECTED") throw new Error("클라이언트 연결이 되지 않았습니다.");
            
            //리소스 저장
            await saveTracks(tracks); 
            await publishMediaTracks(tracks);
            await console.log('트랙 퍼블리싱 완료');
            return true;

        } catch (err: unknown) {
            console.log(err);

            //실패 시 클라이언트 및 리소스 초기화
            await resetTracks();
            await resetClient();   
            return false;
        }
    }

    // 스트리밍을 끄는 함수, 성공시 true, 실패시 false 반환
    const streamOff = async ()=> {
        console.clear();
        try {
            // 트랙 초기화 뒤 클라이언트 연결 해제제
            await resetTracks();
            await resetClient(); 
            return true;
        } catch (err: unknown) {
            console.log(err);
            return false;
        }
    }

    return {
        streamOn,
        streamOff,
    }
}

export default useStudioStreamControl;