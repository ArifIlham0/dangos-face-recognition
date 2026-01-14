import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { useAlertStore } from '../../stores/alertStore'
import { KeyIcon, PersonIcon } from '../../../assets/icons'
import { CustomButton, CustomTextInput } from '../../components'
import useAuthenticationStore from '../../stores/authenticationStore'
import AuthenticationBackground from '../../components/authentication/AuthenticationBackground'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
    mixBlendMode?: string;
}

const LoginScreen = (props: Props) => {
    const { translate, showLoading, hideLoading } = useGlobalStore();
    const { showAlert } = useAlertStore();
    const { login } = useAuthenticationStore();

    const [emailOrUsername, setEmailOrUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailOrUsernameTouched, setEmailOrUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    let emailOrUsernameErrorText = '';
    let passwordErrorText = '';

    if (emailOrUsernameTouched && emailOrUsername.length === 0) {
        emailOrUsernameErrorText = translate("requiredField");
    }
    if (passwordTouched && password.length === 0) {
        passwordErrorText = translate("requiredField");
    }

    const handleLogin = async () => {
        try {
            showLoading()
            const response = await login({
                email_or_username: emailOrUsername,
                password: password,
            })

            if (response.status === 200) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            } else {
                showAlert(response.message ?? translate('anErrorOccurred'))
            }
        } finally {
            hideLoading()
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
                            {translate('welcomeBack')}
                        </Text>
                        <View style={tw`h-4`} />
                        <Text style={[tw`text-[13px] text-center`, { fontFamily: Fonts.regular, color: COLORS.text}]}>
                            {translate('weHappyToSeeYou')}
                        </Text>
                        <View style={tw`h-10`} />
                        <CustomTextInput
                            value={emailOrUsername}
                            autoCapitalize="none"
                            preffix={<PersonIcon />}
                            keyboardType="email-address"
                            label={translate('usernameOrEmail')}
                            errorMessage={emailOrUsernameErrorText}
                            placeholder={translate('enterUsernameEmail')}
                            onChangeText={value => {
                                setEmailOrUsername(value);
                                if (!emailOrUsernameTouched) {
                                    setEmailOrUsernameTouched(true);
                                }
                            }}
                        />
                        <View style={tw`h-6`} />
                        <CustomTextInput
                            value={password}
                            label="Password"
                            isPassword={true}
                            preffix={<KeyIcon />}
                            errorMessage={passwordErrorText}
                            placeholder={translate('enterYourPassword')}
                            onChangeText={value => {
                                setPassword(value);
                                if (!passwordTouched) {
                                    setPasswordTouched(true);
                                }
                            }}
                        />
                        <View style={tw`h-4`} />
                        <TouchableOpacity style={tw`self-end`}>
                            <Text style={[tw`text-[14px]`, { fontFamily: Fonts.medium, color: COLORS.darkBlue }]}>
                                {translate('forgotPassword')}
                            </Text>
                        </TouchableOpacity>

                        <View style={tw`h-6`} />
                        <CustomButton
                            onPress={handleLogin}
                            title={translate('login')}
                            disabled={emailOrUsername.length === 0 || password.length === 0}
                        />
                        <View style={tw`h-5`} />
                    </View>
                </>
            }
        />
    )
}

export default LoginScreen