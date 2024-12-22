import { create } from 'zustand';

// export type User = {
//   uid: string;
//   hasAudio: boolean;
//   hasVideo: boolean; 
//   videoTrack: VideoTrack | null; 
//   audioTrack: AudioTrack | null; 
// };

export type VideoTrack = {
  isEnabled: boolean; 
};

export type AudioTrack = {
  trackId: string; 
  isMuted: boolean; 
  volumeLevel: number; 
};

export interface VideoControlState {
    videoTrack: VideoTrack
    audioTrack: AudioTrack
    volumeControl: (vol: number) => void
    videoToggle:() => void
}

const useVideoControl = create<VideoControlState>()((set) => ({
  videoTrack: {
    isEnabled:true,
  },

  audioTrack: {
    trackId: "aaabbbccc",
    isMuted: false, 
    volumeLevel: 50,
  },

  volumeControl: (vol: number) => {
    set((state) => ({
      audioTrack: {
        ...state.audioTrack,
        volumeLevel: vol,
      },
    }));
  },

  videoToggle: () => {
    set((state) => ({
        videoTrack: {
          ...state.videoTrack,
          isEnabled: !state.videoTrack.isEnabled
        },
      }));
    }
}));

export default useVideoControl;