import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/api";
import { UserData } from "../types/user";
import { GlobalResponse } from "../types/global";
import { UserFaceData } from "../types/userFace";
import { headersMultipartFormNoToken } from "../services/header";

type UserFaceState = {
    createUserFace: (image: any) => Promise<GlobalResponse<UserData>>;
    verify: (image: any) => Promise<GlobalResponse<UserFaceData>>;
};

const useUserFaceStore = create<UserFaceState>(() => ({
    createUserFace: async (image: any) => {
        try {
            const formData = new FormData();
            formData.append('image', image);

            const response = await api.post(
                '/user-face/',
                formData,
                { headers: headersMultipartFormNoToken },
            );

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

    verify: async (image: any) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            
            const response = await api.post(
                '/user-face/verify/',
                formData,
                { headers: headersMultipartFormNoToken },
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
}));

export default useUserFaceStore;