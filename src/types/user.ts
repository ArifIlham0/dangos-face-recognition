type UserData = {
    id?: number | null;
    username?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    is_superuser?: boolean | null;
    job?: string | null;
    is_active?: boolean | null;
    date_joined?: string | null;
    access_token?: string | null;
    refresh_token?: string | null;
}

type UserRequest = {
    username?: string | null;
    email?: string | null;
    email_or_username?: string | null;
    password?: string | null;
}

export type { UserData, UserRequest };