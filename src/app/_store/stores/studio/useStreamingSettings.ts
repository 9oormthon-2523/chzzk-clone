import { create } from 'zustand';

type SettingData = {
  title: string;
  category: string;
  tags: string[];
  image: File | null;
};

interface Store {
  data: SettingData;
  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setPushTags: (tag: string) => void;
  setDeleteTags: (tag: string) => void;
  setImage: (image: File | null) => void;
  init: () => void;
}

const initData = {
  title: '',
  category: '',
  tags: [],
  image: null,
};
const useStreamingSettings = create<Store>()((set) => ({
  data: initData,
  setTitle: (title) =>
    set((state) => ({
      data: { ...state.data, title },
    })),
  setCategory: (category) =>
    set((state) => ({
      data: { ...state.data, category },
    })),
  setPushTags: (tag) =>
    set((state) => {
      const tags = state.data.tags;
      tags.push(tag);
      return {
        data: { ...state.data, tags },
      };
    }),
  setDeleteTags: (tag) =>
    set((state) => {
      return {
        data: {
          ...state.data,
          tags: state.data.tags.filter((item) => item !== tag),
        },
      };
    }),
  setImage: (image) =>
    set((state) => ({
      data: { ...state.data, image },
    })),
  init: () => set(() => ({ data: initData })),
}));

export default useStreamingSettings;
