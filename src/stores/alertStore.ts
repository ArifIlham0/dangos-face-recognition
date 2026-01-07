import { create } from 'zustand';

type AlertState = {
    visible: boolean;
    isTwoButton: boolean;
    title: string;
    onConfirm?: () => void;
    showAlert: (title: string, onConfirm?: () => void, isTwoButton?: boolean) => void;
    hideAlert: () => void;
};

export const useAlertStore = create<AlertState>(set => ({
    visible: false,
    isTwoButton: false,
    title: '',
    onConfirm: undefined,

    showAlert: (title, onConfirm, isTwoButton) => {
        set({ visible: true, title, onConfirm, isTwoButton });
    },

    hideAlert: () => {
        set({ visible: false, title: '', onConfirm: undefined });
    },
}));