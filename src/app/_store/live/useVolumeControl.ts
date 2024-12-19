import { create } from 'zustand';

/**
 * 볼륨 조절
 */

interface Store {
  volume: number;
  volumeControl: (v:number) => void
}

const useVolumeControl = create<Store>()((set) => ({
  volume: 50,
  volumeControl: (v: number) => set(() => ({ volume: v })), 
}));

export default useVolumeControl;