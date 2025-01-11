import { create } from "zustand";

export interface screenControlState {
  isChatOpen: boolean;
  isWideScreen: boolean;
  isFullscreen: boolean;
  isFullOrWide: boolean; 
  chatPosition: "side"|"bottom";
  toggleFullscreen: () => void;
  toggleChat: () => void;
  toggleWideScreen: () => void;
  offFullScreen: () => void;
  updateChatPosition: (videoHeight:number) => void;
  
}

const useScreenControl = create<screenControlState>((set) => ({
  isChatOpen: true, //채팅
  isWideScreen: false, //와이드
  isFullscreen: false, //전체화면
  isFullOrWide: false, //와이드나 or 전체화면
  chatPosition: "side",

  toggleFullscreen: () => {
    set((state) => {
      const updatedFullscreen = !state.isFullscreen;
      const updatedIsFullOrWide = updatedFullscreen || state.isWideScreen;

      return {
        isFullscreen: updatedFullscreen,
        isFullOrWide: updatedFullscreen || state.isWideScreen,
        chatPosition: !updatedIsFullOrWide ? "side" : "bottom",
      };
    });
  },

  toggleChat: () =>
    set((state) => ({ isChatOpen: !state.isChatOpen })),

  toggleWideScreen: () => {
    set((state) => {
      const updatedWideScreen = !state.isWideScreen;
      const updatedIsFullOrWide = updatedWideScreen || state.isFullscreen;

      return {
        isWideScreen: updatedWideScreen,
        isFullOrWide: updatedWideScreen || state.isFullscreen,
        chatPosition: !updatedIsFullOrWide ? "side" : "bottom",
      };
    });
  },
  offFullScreen: () => {
    set(() => {
      return {
        isFullscreen:false,
        isFullOrWide:false,
        chatPosition:"side",
      }
    })
  },

  updateChatPosition: (resizeRate: number) => {
    const heightRate = 0.6;
    set((state) => {
      // 와이드 모드, 전체화면이 아니거나 채팅이 닫혀있으면 작동 안함
      if (!state.isFullOrWide || !state.isChatOpen) return state;
      
      const h = window.innerWidth * resizeRate;
      const totalH = window.innerHeight;
      
      //비디오 화면 비율이 전체화면의 60% 이상을 차지하면 채팅창 사이드 배치
      if (h / totalH > heightRate) 
        return { ...state, chatPosition: "side" }; 

      //비디오 화면 비율이 전체화면의 60프로를 차지하지 않음 바텀 배치
      else 
        return { ...state, chatPosition: "bottom" }; // 아래로 배치
      
    });
  },

}));

export default useScreenControl;
