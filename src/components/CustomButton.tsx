import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import COLORS from '../constants/color'
import { Fonts } from '../constants/font'

type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}

const CustomButton = ({ title, onPress, disabled = false }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}
            style={[
                tw`w-full py-3 px-6 rounded-3xl items-center justify-center`,
                (disabled) && tw`opacity-50`,
                { backgroundColor: disabled ? COLORS.grey : COLORS.primary },
            ]}
        >
            <Text style={[tw`text-[18px]`, { fontFamily: Fonts.bold, color: COLORS.white }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton
