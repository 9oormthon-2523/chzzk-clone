import { create } from 'zustand';

interface Store {
  text: string;
  setText: (value: string) => void;
  init: () => void;
}

const useSearchInput = create<Store>()((set) => ({
  text: '',
  setText: (value: string) => set(() => ({ text: value })),
  init: () => set(() => ({ text: '' })),
}));

export default useSearchInput;
