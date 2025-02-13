
import { create } from "zustand";

/** LIVE STATE TYPE **/
//#region

type chatType = "side"|"bottom";

// 스크린 제어
interface ScreenState {
    isChatOpen: boolean;
    isWidescreen: boolean;
    isFullscreen: boolean;
    isFullOrWide: boolean; 
    chatPosition: chatType;
}

interface ScreenAction {
    toggleChat: () => void;
    offFullScreen: () => void;
    toggleFullscreen: () => void;
    toggleWideScreen: () => void;
    updateChatPosition: (type : chatType) => void;
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

//#endregion

interface Module<TState, TAction> {
    state: TState;
    actions: TAction;
}

export interface LiveControlState {
    screen: Module<ScreenState,ScreenAction>;
    videoTrack: Module<VideoTrack,VideoAction>;
    audioTrack: Module<AudioTrack,AudioAction>;
}



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
            toggleChat: () => {
                set(({ screen }) => {
                    const updatedState = {
                        ...screen.state,
                        isChatOpen: !screen.state.isChatOpen,
                    };
        
                    return { screen: { ...screen, state: updatedState } };
                });
            },

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

            toggleWideScreen: () => {
                set(({ screen }) => {
                    const updatedState = {
                        ...screen.state,
                        isWidescreen: !screen.state.isWidescreen,
                        isFullOrWide: !screen.state.isWidescreen || screen.state.isFullscreen,
                    };

                    return { screen: { ...screen, state: updatedState } };
                });
            },
            
            updateChatPosition: (type:chatType) => {
                set(({screen}) => {
                    const updatedState = {
                        ...screen.state,
                        chatPosition: type,
                    };
                    return { screen: { ...screen, state: updatedState } };
                });
            }
        }
        
    },


    // 비디오 트랙 제어
    videoTrack: {
        state: {
            isEnabled: true, 
        },
    
        actions: {

            // videoToggle: () => {
            //     set(({ videoTrack }) => {
            //         const updatedState = {
            //             ...videoTrack.state,
            //             isEnabled: !videoTrack.state.isEnabled,
            //         };
    
            //         return { videoTrack: { ...videoTrack, state: updatedState } };
            //     });
            // },

            videoToggle: () => {
                set((state) => {
                    const videoState = !state.videoTrack.state.isEnabled;
            
                    const updatedAudioTrack = {
                        ...state.audioTrack,
                        state: {
                            ...state.audioTrack.state,
                            isMuted: !videoState,
                        },
                    };
            
                    const updatedVideoTrack = {
                        ...state.videoTrack,
                        state: {
                            ...state.videoTrack.state,
                            isEnabled: videoState,
                        },
                    };
            
                    const updatedState = {
                        ...state,
                        audioTrack: updatedAudioTrack,
                        videoTrack: updatedVideoTrack,
                    };
            
                    return updatedState;
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