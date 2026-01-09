import { UserData } from "./user";

type UserFaceData = {
    is_verified?: boolean | null;
    confidence?: number | null;
    user?: UserData | null;
}

type UserFaceDetail = {
    id?: number | null;
    custom_user?: number | null;
    custom_user_id?: number | null;
    image?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}

export type { UserFaceData, UserFaceDetail };