import { create } from 'zustand';

type NavbarState = {
  isScrolled: boolean;
  isOpen: boolean;
  setIsScrolled: (scrolled: boolean) => void;
  setIsOpen: (open: boolean) => void;
  toggleMenu: () => void;
};

export const useNavbarStore = create<NavbarState>((set) => ({
  isScrolled: false,
  isOpen: false,
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
  setIsOpen: (open) => set({ isOpen: open }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
