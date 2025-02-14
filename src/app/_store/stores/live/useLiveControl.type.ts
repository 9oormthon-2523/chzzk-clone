import { StreamRoomState } from "@/app/_types/live/liveType";


type chatType = "side"|"bottom";

// 스크린 제어
export interface ScreenState {
    isChatOpen: boolean;
    isWidescreen: boolean;
    isFullscreen: boolean;
    isFullOrWide: boolean; 
    chatPosition: chatType;
}

export interface ScreenAction {
    toggleChat: () => void;
    offFullScreen: () => void;
    toggleFullscreen: () => void;
    toggleWideScreen: () => void;
    updateChatPosition: (type : chatType) => void;
}


export type VideoTrack = {
    isEnabled: boolean; 
};

export interface VideoAction {
    videoToggle:() => void;
};
  

export type AudioTrack = {
    isMuted: boolean; 
    volumeLevel: number; 
};

export interface AudioAction {
    volumeControl: (vol: number) => void;
    audioMute: (mute:boolean) => void;
};


export interface StreamRoomAction {
    updateField: <K extends keyof StreamRoomState>(
        key: K,
        value: StreamRoomState[K]
      ) => void;

    updateState: (newState: Partial<StreamRoomState>) => void;
}