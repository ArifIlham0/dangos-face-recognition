import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import LinearGradient from 'react-native-linear-gradient'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import { RootStackParamList } from '../../types/route'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Splash">;
}

const SplashScreen = (props: Props) => {
    useEffect(() => {
        const checkUser = async () => {
            const user = await AsyncStorage.getItem('user')
            if (user) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            } else {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginFace' }],
                })
            }
        }
        const timeout = setTimeout(checkUser, 1000)
        return () => clearTimeout(timeout)
    }, [props.navigation])

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={tw`flex-1 items-center justify-end`}
        >
            <View style={tw`flex-row items-center justify-center`}>
                <Image
                    source={require("../../../assets/images/dangos_white.png")}
                    style={tw`w-16 h-16`}
                />
                <View style={tw`w-7`}/>
                <View style={tw`items-center`}>
                    <Text style={[tw`text-white text-[25px]`, { fontFamily: Fonts.bold }]}>
                        Dangos
                    </Text>
                    <View style={tw`h-1`}/>
                    <Text style={[tw`text-white text-[15px]`, { fontFamily: Fonts.light }]}>
                        Face Recognition
                    </Text>
                </View>
            </View>
            <View style={tw`h-10`}/>
            <View style={tw``}>
                <Image
                    source={require('../../../assets/images/hologram_face.png')}
                    style={tw`w-70 h-110`}
                />
                <Image
                    source={require('../../../assets/images/edge_border.png')}
                    style={tw`w-80 h-50 absolute`}
                />
            </View>
        </LinearGradient>
    )
}

export default SplashScreen