import { View, Text, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { CustomButton, CustomTextInput } from '../../components'
import { EmailIcon, KeyIcon, PersonIcon } from '../../../assets/icons'
import AuthenticationBackground from '../../components/authentication/AuthenticationBackground'
import { useAlertStore } from '../../stores/alertStore'
import useAuthenticationStore from '../../stores/authenticationStore'
import { Validation } from '../../utils/validate'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
}

const RegisterScreen = (props: Props) => {
    const { translate, showLoading, hideLoading } = useGlobalStore();
    const { showAlert } = useAlertStore();
    const { createUser } = useAuthenticationStore();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    let usernameErrorText = '';
    let emailErrorText = '';
    let passwordErrorText = '';

    if (usernameTouched && username.length === 0) {
        usernameErrorText = translate('requiredField');
    } else if (usernameTouched && username.length < 6) {
        usernameErrorText = translate('usernameAtLeast6');
    } else if (usernameTouched && /\s/.test(username)) {
        usernameErrorText = translate('usernameShouldNotContainSpaces');
    }

    if (emailTouched && email.length === 0) {
        emailErrorText = translate('requiredField');
    } else if (emailTouched && !Validation.isEmail(email)) {
        emailErrorText = translate('invalidEmail');
    }

    if (passwordTouched && password.length === 0) {
        passwordErrorText = translate('requiredField');
    } else if (passwordTouched && password.length < 6) {
        passwordErrorText = translate('passwordAtLeast6');
    }

    const handleRegister = async () => {
        try {
            showLoading();
            const response = await createUser({
                username: username,
                email: email,
                password: password,
            });

            if (response.status === 201) {
                Keyboard.dismiss();
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'FrontCamera', params: { flow: 'register' } }],
                })
            } else {
                showAlert(response.message ?? translate('anErrorOccurred'));
            }
        } finally {
            hideLoading();
        }
    }

    return (
        <AuthenticationBackground
            children={
                <>
                    <View style={tw`h-10`} />
                    <View style={[tw`flex-1 items-center rounded-t-3xl px-6`, { backgroundColor: COLORS.background }]}>
                        <View style={tw`h-8`} />
                        <Text style={[tw`text-[20px] text-center`, { fontFamily: Fonts.bold, color: COLORS.text }]}>
                            {translate('createAnAccount')}
                        </Text>
                        <View style={tw`h-4`} />
                        <Text style={[tw`text-[13px] text-center`, { fontFamily: Fonts.regular, color: COLORS.text}]}>
                            {translate('fillTheFields')}
                        </Text>
                        <View style={tw`h-10`} />
                        <CustomTextInput
                            value={username}
                            autoCapitalize="none"
                            label="Username"
                            preffix={<PersonIcon />}
                            placeholder="CharlesDhiya"
                            errorMessage={usernameErrorText}
                            onChangeText={value => {
                                setUsername(value);
                                if (!usernameTouched) {
                                    setUsernameTouched(true);
                                }
                            }}
                        />
                        <View style={tw`h-6`} />
                        <CustomTextInput
                            value={email}
                            label="Email"
                            autoCapitalize='none'
                            errorMessage={emailErrorText}
                            onChangeText={value => {
                                setEmail(value);
                                if (!emailTouched) {
                                    setEmailTouched(true);
                                }
                            }}
                            preffix={<EmailIcon />}
                            keyboardType='email-address'
                            placeholder="example@gmail.com"
                        />
                        <View style={tw`h-6`} />
                        <CustomTextInput
                            value={password}
                            label="Password"
                            isPassword={true}
                            autoCapitalize='none'
                            preffix={<KeyIcon />}
                            errorMessage={passwordErrorText}
                            onChangeText={value => {
                                setPassword(value);
                                if (!passwordTouched) {
                                    setPasswordTouched(true);
                                }
                            }}
                            placeholder={translate('enterYourPassword')}
                        />
                        <View style={tw`h-10`} />
                        <CustomButton
                            title={translate('register')}
                            onPress={handleRegister}
                            disabled={username.length === 0 || email.length === 0 || password.length === 0}
                        />
                        <View style={tw`h-5`} />
                    </View>
                </>
            }
        />
    )
}

export default RegisterScreen