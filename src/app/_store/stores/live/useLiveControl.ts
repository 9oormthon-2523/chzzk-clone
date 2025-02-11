
/** TYPE **/
//#region

import { create } from "zustand";

// 스크린 제어
interface ScreenState {
    isChatOpen: boolean;
    isWidescreen: boolean;
    isFullscreen: boolean;
    isFullOrWide: boolean; 
    chatPosition: "side"|"bottom";
}

interface ScreenAction {
    toggleChat: () => void;
    offFullScreen: () => void;
    toggleFullscreen: () => void;
    toggleWideScreen: () => void;
}

export type VideoTrack = {
    isEnabled: boolean; 
};

interface VideoAction {
    videoToggle:() => void;
};
  
export type AudioTrack = {
    isMuted: boolean; 
    volumeLevel: number; 
};

interface AudioAction {
    volumeControl: (vol: number) => void;
    audioMute: (mute:boolean) => void;
};


// 라이브 컨트롤 모듈 형식
interface Module<TState, TAction> {
    state: TState;
    actions: TAction;
}

export interface LiveControlState {
    screen: Module<ScreenState,ScreenAction>;
    videoTrack: Module<VideoTrack,VideoAction>;
    audioTrack: Module<AudioTrack,AudioAction>;
}

//#endregion



const useLiveControl = create<LiveControlState>((set) => ({
    // 스크린 모드 제어
    screen: {
        state: {
            isChatOpen: true, // 채팅
            isWidescreen: false, // 와이드
            isFullscreen: false, // 전체화면
            isFullOrWide: false, // 와이드나 or 전체화면
            chatPosition: "side", // 채팅 포지션
        },

        actions: {
            // 채팅 토글
            toggleChat: () => {
                set(({ screen }) => {
                    const updatedState = {
                        ...screen.state,
                        isChatOpen: !screen.state.isChatOpen,
                    };
        
                    return { screen: { ...screen, state: updatedState } };
                });
            },

            // 풀 스크린 강제 OFF
            offFullScreen: () => {
                set(({ screen }) => {
                    const updatedState = {
                        ...screen.state,
                        isFullscreen: false,
                        isFullOrWide: screen.state.isWidescreen,
                    };

                    return { screen: { ...screen, state: updatedState} };
                });
            },

            toggleFullscreen: () => {
                set(({ screen }) => {
                    const updatedState = {
                        ...screen.state,
                        isFullscreen: !screen.state.isFullscreen, 
                        isFullOrWide: !screen.state.isFullscreen || screen.state.isWidescreen,
                    };
            
                    return { screen: { ...screen, state: updatedState } };
                });
            },

            toggleWideScreen: ()=> {
                set(({ screen }) => {
                    const updatedState = {
                        ...screen.state,
                        isWidescreen: !screen.state.isWidescreen,
                        isFullOrWide: !screen.state.isWidescreen || screen.state.isFullscreen,
                    };

                    return { screen: { ...screen, state: updatedState } };
                });
            },
        }
        
    },


    // 비디오 트랙 제어
    videoTrack: {
        state: {
            isEnabled: true, 
        },
    
        actions: {
            videoToggle: () => {
                set(({ videoTrack }) => {
                    const updatedState = {
                        ...videoTrack.state,
                        isEnabled: !videoTrack.state.isEnabled,
                    };
    
                    return { videoTrack: { ...videoTrack, state: updatedState } };
                });
            },
        },
    },


    // 오디오 트랙 제어
    audioTrack: {
        state: {
            isMuted: true,
            volumeLevel: 50,
        },

        actions: {
            audioMute: (muted:boolean) => {
                set(({ audioTrack }) => {
                    const updatedState = {
                        ...audioTrack.state,
                        isMuted: muted,
                    };
                    return { audioTrack: { ...audioTrack, state: updatedState } };
                });
            },

            volumeControl: (vol:number) => {
                set(({ audioTrack }) => {
                    const updatedState = {
                        ...audioTrack.state,
                        volumeLevel: vol,
                    };
                    return { audioTrack: { ...audioTrack, state: updatedState } };
                });
            },
        }
    }
  }));
  
  export default useLiveControl;