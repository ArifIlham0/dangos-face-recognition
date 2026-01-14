import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import { SlingBagIcon } from '../../../assets/icons'
import useGlobalStore from '../../stores/globalStore'

type Props = {
    name: string;
    role?: string;
    imageUrl?: string;
    onPress?: () => void;
}

const UserCard = ({ name, role, imageUrl, onPress }: Props) => {
    const { translate } = useGlobalStore();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[tw`bg-white rounded flex-row items-center shadow-md border mx-4 px-2 py-1.5 mb-3`, { borderColor: COLORS.border }]}
            activeOpacity={0.7}
        >
            <View style={[tw`w-11 h-13 rounded items-center justify-center`, { backgroundColor: COLORS.primary }]}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={tw`w-11 h-13 rounded`} />
                ) : (
                    <FontAwesome6
                        size={24}
                        iconStyle='solid'
                        color={COLORS.white}
                        name="user"
                    />
                )}
            </View>
            <View style={tw`w-3`} />
            <View style={tw`flex-1`}>
                <Text style={[tw`text-[16px]`, { fontFamily: Fonts.semiBold, color: COLORS.text }]}>
                    {name}
                </Text>
                <View style={tw`h-1`} />
                <View style={tw`flex-row items-center`}>
                    <SlingBagIcon />
                    <View style={tw`w-1.5`} />
                    <Text style={[tw`text-[12px]`, { fontFamily: Fonts.light, color: COLORS.text }]}>
                        {role ?? translate('noJob')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserCard
