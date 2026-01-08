import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import COLORS from '../constants/color'
import { Fonts } from '../constants/font'

type Props = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
}

const CustomButton = ({ title, onPress, variant = 'primary', disabled = false }: Props) => {
    const getButtonStyle = () => {
        if (variant === 'primary') {
            return tw`bg-[${COLORS.primary}]`
        } else if (variant === 'secondary') {
            return tw`bg-[${COLORS.secondary}]`
        } else {
            return tw`bg-transparent border-2 border-[${COLORS.primary}]`
        }
    }

    const getTextColor = () => {
        return variant === 'outline' ? COLORS.primary : COLORS.white
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}
            style={[
                tw`w-full py-3 px-6 rounded-3xl items-center justify-center`,
                getButtonStyle(),
                (disabled) && tw`opacity-50`
            ]}
        >
            <Text style={[tw`text-[18px]`, { fontFamily: Fonts.bold, color: getTextColor() }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton
