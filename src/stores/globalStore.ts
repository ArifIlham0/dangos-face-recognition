import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { translations } from '../languages/language';

type GlobalState = {
    isLoading: boolean;
    currentLang: string;
    showLoading: () => void;
    hideLoading: () => void;
    changeLang: (langCode: string) => void;
    translate: (key: string, params?: { [key: string]: string }) => string;
};

const useGlobalStore = create<GlobalState>()(
    persist(
        (set, get) => ({
            isLoading: false,
            currentLang: 'id',
            changeLang: langCode => {
                set({ currentLang: langCode });
            },

            translate: (key, params) => {
                const { currentLang } = get();
                let text = translations[currentLang]?.[key] || translations.en[key] || key;

                if (params) {
                    Object.keys(params).forEach(paramKey => {
                        text = text.replace(`{{${paramKey}}}`, params[paramKey]);
                    });
                }
                
                return text;
            },

            showLoading: () => set({ isLoading: true }),
            
            hideLoading: () => set({ isLoading: false }),
        }),
        {
            name: 'language',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export default useGlobalStore;
