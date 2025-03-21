import { create } from 'zustand';

type AvatarState = {
  showAvatar: boolean;
  setShowAvatar: (show: boolean) => void;
};

export const useAvatarStore = create<AvatarState>((set) => ({
  showAvatar: true,
  setShowAvatar: (show) => set({ showAvatar: show }),
}));
