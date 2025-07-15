import { create } from 'zustand';

type modalProps = {
  isOpen: boolean;
  formData: formdataProps | null;
  setFormData: (value:formdataProps) => void;
  clearFormData: () => void;
  onOpen: () => void;
  onClose: () => void;
};

type formdataProps = {
  user_id: number,
  label: string;
  target: string;
  status: string;
}

export const useRejectionReportModal = create<modalProps>((set) => ({
  isOpen: false,
  formData: null,
  setFormData: (value:formdataProps) => set({formData: value}),
  clearFormData: () => set({formData: null}),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));