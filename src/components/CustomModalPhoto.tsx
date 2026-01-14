import React from 'react'
import { Modal, View, TouchableOpacity, Image } from 'react-native'
import tw from 'twrnc'
import COLORS from '../constants/color'

type Props = {
    visible: boolean;
    onClose: () => void;
    imageUrl: string;
}

const CustomModalPhoto = ({ visible, onClose, imageUrl }: Props) => (
    <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: COLORS.overlay }]}>
            <TouchableOpacity
                activeOpacity={1}
                style={tw`absolute top-0 left-0 right-0 bottom-0`}
                onPress={onClose}
            />
            <View style={tw`w-full px-5`}>
                <Image
                    source={{ uri: imageUrl }}
                    style={[tw`w-full rounded-3xl aspect-square`]}
                    resizeMode="cover"
                />
            </View>
        </View>
    </Modal>
)

export default CustomModalPhoto