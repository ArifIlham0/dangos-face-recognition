import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../types/user";

const LocalStorage = {
    user: async (): Promise<UserData | null> => {
        try {
            const userString = await AsyncStorage.getItem("user");
            if (!userString) return null;
            return JSON.parse(userString) as UserData;
        } catch {
            return null;
        }
    },

    accessToken: async (): Promise<string | null> => {
        try {
            const accessToken = await AsyncStorage.getItem("access_token");
            if (!accessToken) return null;
            return JSON.parse(accessToken) as string;
        } catch {
            return null;
        }
    },

    refreshToken: async (): Promise<string | null> => {
        try {
            const refreshToken = await AsyncStorage.getItem("refresh_token");
            if (!refreshToken) return null;
            return JSON.parse(refreshToken) as string;
        } catch {
            return null;
        }
    },

    clear: async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("access_token");
            await AsyncStorage.removeItem("refresh_token");
        } catch {}
    }
}

export { LocalStorage };