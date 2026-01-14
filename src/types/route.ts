type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    LoginFace: undefined;
    FrontCamera: { flow?: 'register' | 'loginFace' | 'home' | 'update' } | undefined;
    Home: { isRefresh?: boolean } | undefined;
    Users: undefined;
    EditUser: { isRefresh?: boolean } | undefined;
};

export type { RootStackParamList };