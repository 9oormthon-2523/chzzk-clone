import { Dispatch, RefObject, SetStateAction } from "react";
import type * as AgoraRTCType from "agora-rtc-sdk-ng";

interface AudioState {
    isActive: boolean;
    isMuted: boolean;
    volumeLevel: number;
}

type micResource = "screen" | "mic" ;
type mediaResource = "all" | micResource;


interface audioControl {
    micTrackRef: RefObject<null | AgoraRTCType.IMicrophoneAudioTrack>
    screenAudioRef: RefObject<null | AgoraRTCType.ILocalAudioTrack>
    setAudioVolume: Dispatch<SetStateAction<{ screen: number, mic: number}>>
}

export const audioControl = (payload: audioControl) => {
    const { micTrackRef, screenAudioRef, setAudioVolume } = payload;
    const getAudioTrack = (type: micResource) =>
        type === "mic" ? micTrackRef.current : screenAudioRef.current;

    const activeAudio = (type: micResource) => audioState(type).isActive;

    const controlAudio = (type: micResource, volume: number) => {
        const audioTrack = getAudioTrack(type);
        if (!audioTrack) return;

        if (audioTrack.muted) audioTrack.setMuted(false);
        audioTrack.setVolume(volume);
        setAudioVolume((prevState) => ({...prevState,[type]: volume,}));
    };

    const muteAudio = (type: micResource) => {
        const audioTrack = getAudioTrack(type);
        if (!audioTrack) return;

        audioTrack.setMuted(true);
    };

    const audioState = (type: micResource): AudioState => {
        const audioTrack = getAudioTrack(type);

        if (!audioTrack) return { isActive: false, isMuted: false, volumeLevel: 0 };

        return {
            isActive: true,
            isMuted: audioTrack.muted,
            volumeLevel: audioTrack.getVolumeLevel?.() || 0,
        };
    };

    return {
        muteAudio,
        audioState,
        activeAudio,
        controlAudio,
    };
};