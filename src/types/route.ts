type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    LoginFace: undefined;
    FrontCamera: { flow?: 'register' | 'loginFace' | 'home' | 'update' } | undefined;
    Home: undefined;
    Users: undefined;
    EditUser: undefined;
};

export type { RootStackParamList };