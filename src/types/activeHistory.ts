type ActiveHistoryRequest = {
    operating_system?: string | null;
    model?: string | null;
}

type ActiveHistory = {
    id?: number | null;
    custom_user?: number | null;
    custom_user_id?: number | null;
    operating_system?: string | null;
    model?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
};

export type { ActiveHistoryRequest, ActiveHistory };