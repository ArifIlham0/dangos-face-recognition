import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/api";
import { GlobalResponse } from "../types/global";
import { UserData, UserRequest } from "../types/user";
import { LocalStorage } from "../utils/localStorage";
import { headersWithToken } from "../services/header";

type AuthenticationState = {
    createUser: (request: UserRequest) => Promise<GlobalResponse<UserData>>;
    login: (request: UserRequest) => Promise<GlobalResponse<UserData>>;
    logout: () => Promise<GlobalResponse<null>>;
    refreshToken: () => Promise<GlobalResponse<null>>;
};

const useAuthenticationStore = create<AuthenticationState>(() => ({
    createUser: async (request: UserRequest) => {
        try {
            const response = await api.post('/user/', {...request});

            if (response.data.status === 201) {
                await AsyncStorage.setItem("user", JSON.stringify(response.data.data.user));
                await AsyncStorage.setItem("access_token", JSON.stringify(response.data.data.user.access_token));
                await AsyncStorage.setItem("refresh_token", JSON.stringify(response.data.data.user.refresh_token));
                
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

    login: async (request: UserRequest) => {
        try {
            const response = await api.post('/authentication/login/', {...request});

            if (response.data.status === 200) {
                await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
                await AsyncStorage.setItem("access_token", JSON.stringify(response.data.data.access_token));
                await AsyncStorage.setItem("refresh_token", JSON.stringify(response.data.data.refresh_token));

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

    logout: async () => {
        try {
            const token = await LocalStorage.accessToken();

            const response = await api.post(
                '/authentication/logout/',
                {},
                { headers: headersWithToken(token || "") }
            );

            if (response.data.status === 200) {
                await LocalStorage.clear();

                return {
                    status: response.data.status,
                    message: response.data.message,
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

    refreshToken: async () => {
        try {
            const refreshToken = await LocalStorage.refreshToken();

            const response = await api.post(
                '/authentication/refresh-token/',
                { "refresh_token": refreshToken }
            );

            if (response.data.status === 200) {
                return {
                    status: response.data.status,
                    message: response.data.message,
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

export default useAuthenticationStore;