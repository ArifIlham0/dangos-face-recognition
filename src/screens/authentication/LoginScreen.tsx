import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { KeyIcon, PersonIcon } from '../../../assets/icons'
import { CustomButton, CustomTextInput } from '../../components'
import AuthenticationBackground from '../../components/authentication/AuthenticationBackground'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
    mixBlendMode?: string;
}

const LoginScreen = (props: Props) => {
    const { translate, showLoading, hideLoading } = useGlobalStore();

    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        showLoading()
        setTimeout(() => {
            hideLoading()
            props.navigation.replace('Home')
        }, 1500)
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
                            value={usernameOrEmail}
                            autoCapitalize="none"
                            preffix={<PersonIcon />}
                            onChangeText={setUsernameOrEmail}
                            keyboardType="email-address"
                            label={translate('usernameOrEmail')}
                            placeholder={translate('enterUsernameEmail')}
                        />
                        <View style={tw`h-6`} />
                        <CustomTextInput
                            value={password}
                            label="Password"
                            isPassword={true}
                            preffix={<KeyIcon />}
                            onChangeText={setPassword}
                            placeholder={translate('enterYourPassword')}
                        />
                        <View style={tw`h-4`} />
                        <TouchableOpacity style={tw`self-end`}>
                            <Text style={[tw`text-[14px]`, { fontFamily: Fonts.medium, color: COLORS.darkBlue }]}>
                                {translate('forgotPassword')}
                            </Text>
                        </TouchableOpacity>

                        <View style={tw`h-6`} />
                        <CustomButton
                            title={translate('login')}
                            onPress={handleLogin}
                        />
                        <View style={tw`h-5`} />
                    </View>
                </>
            }
        />
    )
}

export default LoginScreen