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
  isMuted: boolean; 
  volumeLevel: number; 
};

export interface VideoControlState {
    videoTrack: VideoTrack
    audioTrack: AudioTrack
    volumeControl: (vol: number) => void
    videoToggle:() => void
    audioMute: (mute:boolean) => void
}

const useVideoControl = create<VideoControlState>()((set) => ({
  videoTrack: {
    isEnabled:true,
  },

  audioTrack: {
    isMuted: true, 
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
    },

    audioMute: (mute:boolean) => {
      set(state => ({
        audioTrack: {
          ...state.audioTrack,
          isMuted:mute,
        }
      }));
    }
}));

export default useVideoControl;