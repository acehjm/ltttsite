import { create } from 'zustand';

type LayoutState = {
  mounted: boolean;
  setMounted: (mounted: boolean) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  mounted: false,
  setMounted: (mounted) => set({ mounted: mounted }),
}));
