import { View, Text } from 'react-native'
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

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
}

const RegisterScreen = (props: Props) => {
    const { translate } = useGlobalStore();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                            onChangeText={setUsername}
                        />
                        <View style={tw`h-6`} />
                        <CustomTextInput
                            value={email}
                            label="Email"
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            preffix={<EmailIcon />}
                            keyboardType='email-address'
                            placeholder="example@gmail.com"
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
                        <View style={tw`h-10`} />
                        <CustomButton
                            title={translate('register')}
                            onPress={() => {}}
                        />
                        <View style={tw`h-5`} />
                    </View>
                </>
            }
        />
    )
}

export default RegisterScreen