import { create } from 'zustand';

interface Store {
  isFold: boolean;
  toggle: () => void;
}

const useNavSizeToggle = create<Store>()((set) => ({
  isFold: false,
  toggle: () => set((state) => ({ isFold: !state.isFold })),
}));

export default useNavSizeToggle;
