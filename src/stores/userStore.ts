import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/api";
import { UserDetail } from "../types/user";
import { LocalStorage } from "../utils/localStorage";
import { headersWithToken } from "../services/header";
import { GlobalQueryParams, GlobalResponse } from "../types/global";

type UserState = {
    fetchUser: () => Promise<GlobalResponse<UserDetail>>;
    fetchUsers: (params: GlobalQueryParams) => Promise<GlobalResponse<UserDetail[]>>;
};

const useUserStore = create<UserState>(() => ({
    fetchUser: async () => {
        try {
            const user = await LocalStorage.user();
            const accessToken = await LocalStorage.accessToken();
            console.log("Access token", accessToken);
            

            const response = await api.get(
                `/user/${user?.id}/`,
                { headers: headersWithToken(accessToken ?? "0ad5213eedc5a7e16c4909de2993c7f467f7cd50") },
            );

            if (response.data.status === 200) {
                await AsyncStorage.setItem("user", JSON.stringify(response.data.data.user));

                return {
                    status: response.data.status,
                    message: response.data.message,
                    data: response.data.data,
                }
            } else {
                return {
                    status: response.data.status,
                    message: response.data.message,
                }
            }
            
        } catch (error) {
            const axiosError = error as AxiosError<{ status: number; message: string }>;
            return {
                status: axiosError.response?.data?.status,
                message: axiosError.response?.data?.message,
            }
        }
    },

    fetchUsers: async (params: GlobalQueryParams) => {
        try {
            const accessToken = await LocalStorage.accessToken();
            console.log("Access token", accessToken);
            

            const response = await api.get(
                `/user/`,
                { headers: headersWithToken(accessToken || ""), params: params },
            );

            if (response.data.status === 200) {
                return {
                    status: response.data.status,
                    message: response.data.message,
                    data: response.data.data,
                    total_item: response.data.total_item,
                    page: response.data.page,
                    page_size: response.data.page_size,
                    total_page: response.data.total_page,
                }
            } else {
                return {
                    status: response.data.status,
                    message: response.data.message,
                }
            }
            
        } catch (error) {
            const axiosError = error as AxiosError<{ status: number; message: string }>;
            return {
                status: axiosError.response?.data?.status,
                message: axiosError.response?.data?.message,
            }
        }
    },
}));

export default useUserStore;