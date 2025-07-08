import { create } from 'zustand';

type modalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useRejectionReportModal = create<modalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));