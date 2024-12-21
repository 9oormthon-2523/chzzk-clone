import { create } from 'zustand';

/**
 * 채팅창 토글
 */

interface Store {
  isFold: boolean;
  toggle: () => void;
}

const useChatToggle = create<Store>()((set) => ({
  isFold: true,
  toggle: () => set((state) => ({ isFold: !state.isFold })),
}));

export default useChatToggle;