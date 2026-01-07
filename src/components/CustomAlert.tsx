import { View, Text, Modal, TouchableOpacity, Platform, Alert } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import COLORS from '../constants/color';
import { Fonts } from '../constants/font';
import { useAlertStore } from '../stores/alertStore';

const CustomAlert = () => {
    const { visible, isTwoButton, title, onConfirm, hideAlert } = useAlertStore();

    return (
        <>
            {Platform.OS !== "ios"
                ? (
                    <Modal
                        statusBarTranslucent
                        transparent
                        visible={visible}
                        animationType="fade"
                        onRequestClose={hideAlert}
                    >
                        <View style={[tw`flex-1 justify-center items-center`, {backgroundColor: COLORS.overlay}]}>
                            <View
                                style={[
                                    tw`border-2 rounded-10px p-20px w-80% items-center`,
                                    {backgroundColor: COLORS.white, borderColor: COLORS.primary},
                                ]}
                            >
                                <Text style={[tw`text-18px text-center`, {fontFamily: Fonts.regular, color: COLORS.black}]}>
                                    {title}
                                </Text>
                                <View style={tw`h-6`}/>
                                <View style={tw`flex-row`}>
                                    {onConfirm && isTwoButton && (
                                        <>
                                            <TouchableOpacity 
                                                style={[tw`pt-5px pb-5px rounded-5px border-2 w-15 items-center justify-center`, {borderColor: COLORS.primary}]} 
                                                onPress={hideAlert}
                                            >
                                                <Text style={[tw`text-14px`, {color: COLORS.primary, fontFamily: Fonts.regular}]}>
                                                    Tidak
                                                </Text>
                                            </TouchableOpacity>
                                            <View style={tw`w-10`}/>
                                        </>
                                    )}
                                    <TouchableOpacity 
                                        style={[tw`pt-5px pb-5px rounded-5px w-15 items-center justify-center`, {backgroundColor: COLORS.primary}]} 
                                        onPress={onConfirm ? onConfirm : hideAlert}
                                    >
                                        <Text style={[tw`text-14px`, {color: COLORS.white, fontFamily: Fonts.regular}]}>
                                            {onConfirm ? "Ya" : "Ok"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                ) : (
                    visible && Alert.alert(
                        "",
                        title,
                        [
                            {
                                text: onConfirm ? "Tidak" : "Ok",
                                onPress: hideAlert,
                                style: "destructive"
                            },
                            ...(onConfirm ? [{
                                text: "Ya",
                                onPress: onConfirm
                            }] : [])
                        ],
                        { cancelable: true }
                    )
                )}
        </>
    );
};

export default CustomAlert;