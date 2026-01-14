import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Fonts } from '../../constants/font';
import COLORS from '../../constants/color';

type Props = {
    title: string;
    subtitle: string;
}

const ActiveHistoryDetailTile = (props: Props) => {
    return (
        <View>
            <Text
                style={[tw`text-xs mb-1`, { fontFamily: Fonts.regular, color: COLORS.text }]}
            >
                {props.title}
            </Text>
            <Text
                style={[tw`text-sm`, { fontFamily: Fonts.medium, color: COLORS.text}]}
            >
                {props.subtitle}
            </Text>
        </View>
    )
}

export default ActiveHistoryDetailTile