import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { PersonRecognizeIcon } from '../../../assets/icons'
import AuthenticationBackground from '../../components/authentication/AuthenticationBackground'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LoginFace'>;
}

const LoginFaceScreen = (props: Props) => {
    const { translate } = useGlobalStore();

    return (
        <AuthenticationBackground
            children={
                <>
                    <View style={tw`h-10`} />
                    <View style={[tw`flex-1 items-center rounded-t-3xl px-6`, { backgroundColor: COLORS.background }]}>
                        <View style={tw`h-8`} />
                        <Text style={[tw`text-[20px] text-center`, { fontFamily: Fonts.bold, color: COLORS.text }]}>
                            {translate('welcome')}
                        </Text>
                        <View style={tw`h-4`} />
                        <Text style={[tw`text-[13px] text-center`, { fontFamily: Fonts.regular, color: COLORS.text}]}>
                            {translate('loginYourFace')}
                        </Text>
                        <View style={tw`h-20`} />
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('FrontCamera')}
                        >
                            <PersonRecognizeIcon />
                        </TouchableOpacity>
                        <View style={tw`h-3`} />
                        <Text style={[tw`text-[14px]`, { fontFamily: Fonts.regular, color: COLORS.text }]}>
                            {translate('tapButtonAbove')}
                        </Text>
                        <View style={tw`h-6`} />
                        <View style={tw`flex-row items-center my-5`}>
                            <View style={tw`flex-1 h-[1px] bg-gray-300`} />
                            <Text style={[tw`mx-4 text-gray-500 text-[14px]`, { fontFamily: Fonts.regular }]}>
                                {translate('or')}
                            </Text>
                            <View style={tw`flex-1 h-[1px] bg-gray-300`} />
                        </View>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Register')}
                            style={tw`flex-row items-center justify-center`}
                        >
                            <Text style={[tw`text-[13px]`, { fontFamily: Fonts.regular, color: COLORS.text }]}>
                                {translate('ifDontHaveAccount')}{' '}
                            </Text>
                            <Text style={[tw`text-[14px]`, { fontFamily: Fonts.semiBold, color: COLORS.darkBlue }]}>
                                {translate('createAnAccount')}
                            </Text>
                        </TouchableOpacity>
                        <View style={tw`h-5`}/>
                    </View>
                </>
            }
        />
    )
}

export default LoginFaceScreen
