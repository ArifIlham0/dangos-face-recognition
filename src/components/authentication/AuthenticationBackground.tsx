import { View, Text, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import React from 'react'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import Svg, { Image as SvgImage } from 'react-native-svg'

type Props = {
    children: React.ReactNode;
    mixBlendMode?: string;
}

const AuthenticationBackground = (props: Props) => {
    const { mixBlendMode = "multiply" } = props

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={tw`flex-1`}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={tw`flex-1 absolute w-full h-full`}
            >
                {Platform.OS === 'ios' ? (
                    <Image
                        source={require("../../../assets/images/motive_background.png")}
                        style={[tw`absolute w-full h-full`, { mixBlendMode }]}
                    />
                ) : (
                    <Svg
                        width="100%"
                        height="100%"
                        style={tw`absolute w-full h-full`}
                    >
                        <SvgImage
                            href={require("../../../assets/images/motive_background.png")}
                            opacity={0.1}
                        />
                    </Svg>
                )}
                <ScrollView
                    bounces={false}
                    contentContainerStyle={tw`flex-grow`}
                >
                    <View style={tw`h-40`} />
                    <View style={tw`flex-row items-center justify-center`}>
                        <Image
                            source={require('../../../assets/images/dangos_white.png')}
                            style={tw`w-15 h-15 rounded`}
                        />
                        <View style={tw`w-7`} />
                        <View style={tw`items-center`}>
                            <Text style={[tw`text-white text-[25px]`, { fontFamily: Fonts.bold }]}>
                                Dangos
                            </Text>
                            <Text style={[tw`text-white text-[15px] mt-1`, { fontFamily: Fonts.light }]}>
                                Face Recognition
                            </Text>
                        </View>
                    </View>
                    {props.children}
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

export default AuthenticationBackground