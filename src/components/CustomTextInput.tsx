import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native'
import React, { useState } from 'react'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import tw from 'twrnc'
import COLORS from '../constants/color'
import { Fonts } from '../constants/font'

type Props = TextInputProps & {
    label?: string;
    errorMessage?: string;
    isPassword?: boolean;
    preffix?: any;
}

const CustomTextInput = ({ label, errorMessage, isPassword = false, preffix, ...props }: Props) => {
    const [isSecure, setIsSecure] = useState(isPassword)

    return (
        <View style={tw`w-full`}>
            {label && (
                <Text style={[tw`text-[14px] pb-3`, { fontFamily: Fonts.regular, color: COLORS.grey }]}>
                    {label}
                </Text>
            )}
            <View style={[
                tw`flex-row items-center rounded-xl px-4 border`,
                { backgroundColor: COLORS.white, borderColor: errorMessage ? COLORS.error : COLORS.border }
            ]}>
                {preffix && (
                    <View style={tw`pr-3`}>
                        {preffix}
                    </View>
                )}
                <TextInput
                    {...props}
                    secureTextEntry={isSecure}
                    placeholderTextColor={COLORS.grey}
                    style={[
                        tw`flex-1 py-4 text-[13px]`,
                        { fontFamily: Fonts.regular, color: COLORS.text }
                    ]}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                        <FontAwesome6
                            size={18}
                            iconStyle='solid'
                            color={COLORS.text}
                            name={isSecure ? 'eye-slash' : 'eye'}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {errorMessage && (
                <Text style={[tw`text-[12px] pt-1`, { fontFamily: Fonts.regular, color: COLORS.error }]}>
                    {errorMessage}
                </Text>
            )}
        </View>
    )
}

export default CustomTextInput