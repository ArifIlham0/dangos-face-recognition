import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { useAlertStore } from '../../stores/alertStore'
import useUserFaceStore from '../../stores/userFaceStore'
import { useDimensionInsets } from '../../utils/dimension'

type Props = NativeStackScreenProps<RootStackParamList, 'FrontCamera'>;

const FrontCameraScreen = (props: Props) => {
    const flow = props.route.params?.flow;

    const { insets } = useDimensionInsets()
    const { translate, showLoading, hideLoading } = useGlobalStore();
    const { showAlert, hideAlert } = useAlertStore();
    const { verify, verifyNotAuthenticated, createUserFace, updateUserFace } = useUserFaceStore();

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
        showLoading()
        try {
            const photo = await camera.current.takePhoto({
                enableShutterSound: false,
            })

            const image = {
                uri: 'file://' + photo.path,
                type: 'image/jpeg',
                name: `face_${Date.now()}.jpg`,
            };

            let response;
            if (flow === 'loginFace') {
                response = await verifyNotAuthenticated(image);
            } else if (flow === 'home' || flow === 'register') {
                response = await createUserFace(image);
            } else if (flow === 'update') {
                response = await updateUserFace(image);
            } else {
                response = await verify(image);
            }
            
            if ((response.status === 200 || response.status === 201) && response.data?.is_verified) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            } else if (response.status === 404) {
                showAlert(
                    translate("faceNotRecognized") ?? translate('anErrorOccurred'),
                    async () => {
                        hideAlert()
                        props.navigation.replace('Register')
                    },
                    true,
                )
            } else {
                showAlert(response.message ?? translate('anErrorOccurred'))
            }
        } catch (error) {
            console.log('Capture error:', error);
            showAlert(translate('anErrorOccurred'))
        } finally {
            setIsProcessing(false)
            hideLoading()
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
                <View style={[tw`relative w-[320px] h-[350px]`]}>
                    <View style={tw`absolute -inset-[2px] bg-transparent`} />
                    <View style={tw`w-full h-full rounded-[150px] border-4 border-white/50`} />
                    <View style={tw`absolute top-0 left-0 w-[80px] h-[80px] border-t-4 border-l-4 border-white rounded-tl-3xl`} />
                    <View style={tw`absolute top-0 right-0 w-[80px] h-[80px] border-t-4 border-r-4 border-white rounded-tr-3xl`} />
                    <View style={tw`absolute bottom-0 left-0 w-[80px] h-[80px] border-b-4 border-l-4 border-white rounded-bl-3xl`} />
                    <View style={tw`absolute bottom-0 right-0 w-[80px] h-[80px] border-b-4 border-r-4 border-white rounded-br-3xl`} />
                    {isProcessing && (
                        <View style={tw`absolute top-0 left-0 right-0`}>
                            <View style={[tw`w-full h-1`, { backgroundColor: COLORS.primary }]} />
                        </View>
                    )}
                </View>
            </View>
            <View style={tw`absolute top-12 px-6 items-center w-full`} pointerEvents="none">
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
                                <ActivityIndicator size="large" color={COLORS.white} />
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
