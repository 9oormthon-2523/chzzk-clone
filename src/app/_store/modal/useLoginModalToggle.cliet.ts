import { create } from 'zustand';

/**
 * 채팅창 토글
 */

interface Store {
  isFold: boolean;
  toggle: () => void;
}

const useLoginModalToggle = create<Store>()((set) => ({
  isFold: false,
  toggle: () => set((state) => ({ isFold: !state.isFold })),
}));

export default useLoginModalToggle;