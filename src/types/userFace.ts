import { UserData } from "./user";

type UserFaceData = {
    is_verified?: boolean | null;
    confidence?: number | null;
    user?: UserData | null;
}

export type { UserFaceData };