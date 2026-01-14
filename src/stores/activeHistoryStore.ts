import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/api";
import { LocalStorage } from "../utils/localStorage";
import { headersWithToken } from "../services/header";
import { GlobalQueryParams, GlobalResponse } from "../types/global";
import { ActiveHistoryData, ActiveHistoryRequest } from "../types/activeHistory";

type ActiveHistoryState = {
    createActiveHistory: (request: ActiveHistoryRequest) => Promise<GlobalResponse<null>>;
    fetchActiveHistories: (params: GlobalQueryParams) => Promise<GlobalResponse<ActiveHistoryData[]>>;
    fetchActiveHistory: (id: number) => Promise<GlobalResponse<ActiveHistoryData>>;
};

const useActiveHistoryStore = create<ActiveHistoryState>(() => ({
    createActiveHistory: async (request: ActiveHistoryRequest) => {
        try {
            const accessToken = await LocalStorage.accessToken();

            const response = await api.post(
                '/active-history/',
                request,
                { headers: headersWithToken(accessToken || "") },
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

    fetchActiveHistories: async (params: GlobalQueryParams) => {
        try {
            const accessToken = await LocalStorage.accessToken();

            const response = await api.get(
                '/active-history/fetch/',
                { headers: headersWithToken(accessToken || ""), params: params },
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

    fetchActiveHistory: async (id: number) => {
        try {
            const accessToken = await LocalStorage.accessToken();

            const response = await api.get(
                `/active-history/${id}/`,
                { headers: headersWithToken(accessToken || "") },
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
}));

export default useActiveHistoryStore;