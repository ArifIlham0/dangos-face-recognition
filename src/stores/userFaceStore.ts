import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/api";
import { GlobalResponse } from "../types/global";
import { UserFaceData } from "../types/userFace";
import { LocalStorage } from "../utils/localStorage";
import { headersMultipartFormNoToken, headersMultipartFormWithToken } from "../services/header";

type UserFaceState = {
    createUserFace: (image: any) => Promise<GlobalResponse<UserFaceData>>;
    updateUserFace: (image: any) => Promise<GlobalResponse<UserFaceData>>;
    verify: (image: any) => Promise<GlobalResponse<UserFaceData>>;
    verifyNotAuthenticated: (image: any) => Promise<GlobalResponse<UserFaceData>>;
};

const useUserFaceStore = create<UserFaceState>(() => ({
    createUserFace: async (image: any) => {
        try {
            const accessToken = await LocalStorage.accessToken();

            const formData = new FormData();
            formData.append('image', image);
            console.log("Request form data", formData);
            
            const response = await api.post(
                '/user-face/',
                formData,
                { headers: headersMultipartFormWithToken(accessToken ?? "") },
            );

            console.log("Response create user face", response);
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
                console.log("Ini coy?");
                
                return {
                    status: response.data.status,
                    message: response.data.message,
                }
            }
            
        } catch (error) {
            console.log("Ini error coy?", error);
            const axiosError = error as AxiosError<{ status: number; message: string }>;
            
            return {
                status: axiosError.response?.data?.status,
                message: axiosError.response?.data?.message,
            }
        }
    },

    updateUserFace: async (image: any) => {
        try {
            const user = await LocalStorage.user();
            const accessToken = await LocalStorage.accessToken();
            
            const formData = new FormData();
            formData.append('image', image);
            
            const response = await api.put(
                `/user-face/${user?.id}/`,
                formData,
                { headers: headersMultipartFormWithToken(accessToken ?? "") },
            );

            if (response.data.status === 200) {
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
            const accessToken = await LocalStorage.accessToken();

            const formData = new FormData();
            formData.append('image', image);
            
            const response = await api.post(
                '/user-face/verify/',
                formData,
                { headers: headersMultipartFormWithToken(accessToken ?? "") },
            );

            if (response.data.status === 200) {
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

    verifyNotAuthenticated: async (image: any) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            
            const response = await api.post(
                '/user-face/verify-not-authenticated/',
                formData,
                { headers: headersMultipartFormNoToken },
            );

            if (response.data.status === 200) {
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
}));

export default useUserFaceStore;