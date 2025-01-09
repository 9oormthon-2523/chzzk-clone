import { StreamingMutateType } from '@/app/_types/streaming.type';
import { create } from 'zustand';

interface Store {
  data: StreamingMutateType;
  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setPushTags: (tag: string) => void;
  setDeleteTags: (tag: string) => void;
  setThumbnail: (thumbnail: File | string | null) => void;
  init: () => void;
}

const initData = {
  title: '',
  category: '',
  tags: [],
  thumbnail: null,
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
  setThumbnail: (thumbnail) =>
    set((state) => ({
      data: { ...state.data, thumbnail },
    })),
  init: () => set(() => ({ data: initData })),
}));

export default useStreamingSettings;
