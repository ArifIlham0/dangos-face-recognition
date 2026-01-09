import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import COLORS from '../constants/color';
import useGlobalStore from '../stores/globalStore';

const CustomLoadingIndicator = () => {
    const { isLoading } = useGlobalStore();

    if (!isLoading) {
        return null;
    }

    return (
        <View style={[tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-2`, {backgroundColor: COLORS.overlay}]}>
            <View style={tw`bg-white items-center justify-center w-100px h-80px rounded-10px`}>
                <ActivityIndicator size={40} color={COLORS.primary}/>
            </View>
        </View>
    )
}

export default CustomLoadingIndicator