import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/api";
import { GlobalResponse } from "../types/global";
import { UserData, UserRequest } from "../types/user";

type AuthenticationState = {
    createUser: (request: UserRequest) => Promise<GlobalResponse<UserData>>;
    login: (request: UserRequest) => Promise<GlobalResponse<UserData>>;
};

const useAuthenticationStore = create<AuthenticationState>(() => ({
    createUser: async (request: UserRequest) => {
        try {
            const response = await api.post('/user/', {...request});

            if (response.data.status === 201) {
                await AsyncStorage.setItem("user", JSON.stringify(response.data.data));

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
}));

export default useAuthenticationStore;