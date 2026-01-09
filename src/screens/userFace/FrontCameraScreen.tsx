import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { useDimensionInsets } from '../../utils/dimension'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'FrontCamera'>;
}

const FrontCameraScreen = (props: Props) => {
    const { insets } = useDimensionInsets()
    const { translate } = useGlobalStore();

    const [isProcessing, setIsProcessing] = useState(false)
    const [hasPermission, setHasPermission] = useState(false)

    const camera = useRef<Camera>(null)
    const device = useCameraDevice("front");

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const handleCapture = async () => {
        if (!camera.current) return
        setIsProcessing(true)

        try {
            const photo = await camera.current.takePhoto()
            setTimeout(() => {
                setIsProcessing(false)
                props.navigation.replace('Home')
            }, 2000)
        } catch (e) {
            if (__DEV__) console.log("Ini error photo", e);
            setIsProcessing(false)
        }
    }

    if (device == null || !hasPermission) {
        return (
            <View style={tw`flex-1 bg-black items-center justify-center`}>
                <ActivityIndicator size="large" color={COLORS.white} />
                <View style={tw`h-4`} />
                <Text style={tw`text-white`}>
                    {translate('loading')}
                </Text>
            </View>
        )
    }

    return (
        <View style={tw`flex-1 bg-black`}>
            <Camera
                ref={camera}
                photo={true}
                isActive={true}
                device={device}
                style={tw`flex-1`}
            />
            <View style={tw`absolute w-full h-full items-center justify-center`}>
                <View style={tw`w-70 h-85 relative`}>
                    <View style={tw`w-full h-full rounded-[150px] border-4 border-white/50`} />
                    <View style={tw`absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white`} />
                    <View style={tw`absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-white`} />
                    <View style={tw`absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-white`} />
                    <View style={tw`absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white`} />
                    {isProcessing && (
                        <View style={[tw`absolute w-full h-1`, { backgroundColor: COLORS.grey }]} />
                    )}
                </View>
            </View>
            <View style={tw`absolute top-12 px-6 items-center w-full`}>
                <View style={tw`bg-black/70 rounded-xl p-4`}>
                    <Text style={[tw`text-white text-[16px] text-center`, { fontFamily: Fonts.medium }]}>
                        {isProcessing ? translate('processing') : translate('makeSureFace')}
                    </Text>
                </View>
            </View>
            <View style={[tw`absolute bottom-0 w-full`, { paddingBottom: insets.bottom + 15}]}>
                <View style={tw`flex-row items-center justify-center px-6`}>
                    <TouchableOpacity
                        onPress={handleCapture}
                        disabled={isProcessing}
                        style={tw`w-20 h-20 rounded-full bg-white items-center justify-center`}
                        activeOpacity={0.8}
                    >
                        {isProcessing ? (
                            <View style={[tw`w-16 h-16 rounded-full items-center justify-center`, { backgroundColor: COLORS.grey }]}>
                                <FontAwesome6
                                    size={32}
                                    name="spinner"
                                    iconStyle='solid'
                                    color={COLORS.white}
                                />
                            </View>
                        ) : (
                            <View style={[tw`w-16 h-16 rounded-full`, { backgroundColor: COLORS.primary }]} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default FrontCameraScreen
