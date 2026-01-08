import { Text, ScrollView } from 'react-native'
import React from 'react'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import useGlobalStore from '../../stores/globalStore'

const ListUsersEmpty = () => {
    const { translate } = useGlobalStore();

    return (
        <ScrollView
            bounces={true}
            style={tw`pt-40`}
            contentContainerStyle={tw`items-center justify-center`}
        >
            <FontAwesome6
                size={64}
                iconStyle='solid'
                color={COLORS.grey}
                name="users"
            />
            <Text style={[tw`text-[16px] mt-4`, { fontFamily: Fonts.medium, color: COLORS.grey }]}>
                {translate('noUsersFound')}
            </Text>
        </ScrollView>
    )
}

export default ListUsersEmpty