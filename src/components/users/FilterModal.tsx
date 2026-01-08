
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import tw from 'twrnc';
import COLORS from '../../constants/color';
import { Fonts } from '../../constants/font';
import { FilterOption } from '../../types/filter';

type Props = {
    visible: boolean;
    onClose: () => void;
    options: FilterOption[];
    selected: string;
    onSelect: (value: string) => void;
    onReset: () => void;
    bottomInset?: number;
};

const FilterModal = ({ bottomInset = 0, ...props }: Props) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={props.visible}
            onRequestClose={props.onClose}
        >
            <TouchableWithoutFeedback onPress={props.onClose}>
                <View style={[tw`flex-1 justify-end`, { backgroundColor: COLORS.overlay }]}> 
                    <View style={[tw`bg-white rounded-t-3xl py-3 px-4`, { paddingBottom: bottomInset }]}> 
                        <View style={tw`flex-row items-center justify-between`}>
                            <Text style={[tw`text-[20px]`, { fontFamily: Fonts.bold, color: COLORS.text }]}>Filter</Text>
                            <TouchableOpacity
                                onPress={props.onClose}
                                style={[tw`w-8 h-8 rounded-full items-center justify-center`, { backgroundColor: COLORS.border }]}
                            >
                                <FontAwesome6 size={18} iconStyle='solid' color={COLORS.text} name="xmark" />
                            </TouchableOpacity>
                        </View>
                        <View style={tw`h-4`} />
                        {props.options.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                onPress={() => {
                                    props.onSelect(option.value);
                                    props.onClose();
                                }}
                                style={[
                                    tw`rounded-xl flex-row items-center justify-between px-2 py-3 mb-2`,
                                    props.selected === option.value
                                        ? tw`bg-[${COLORS.primary}]/10 border-2 border-[${COLORS.primary}]`
                                        : tw`bg-[${COLORS.border}] border-2 border-[${COLORS.border}]`,
                                ]}
                            >
                                <View style={tw`flex-row items-center`}>
                                    <View style={[
                                        tw`w-4 h-4 rounded-full border-2 items-center justify-center mr-3`,
                                        props.selected === option.value
                                            ? tw`border-[${COLORS.primary}] bg-[${COLORS.primary}]`
                                            : tw`border-gray-300`
                                    ]}>
                                        {props.selected === option.value && (
                                            <FontAwesome6 size={10} iconStyle='solid' color={COLORS.white} name="check" />
                                        )}
                                    </View>
                                    <Text style={[
                                        tw`text-[13px]`,
                                        { fontFamily: Fonts.medium, color: props.selected === option.value ? COLORS.primary : COLORS.text },
                                    ]}>
                                        {option.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        <View style={tw`h-4`} />
                        <TouchableOpacity
                            onPress={() => {
                                props.onReset();
                                props.onClose();
                            }}
                            style={[tw`rounded-xl px-2 py-3`, { backgroundColor: COLORS.border }]}
                        >
                            <Text style={[tw`text-[16px] text-center`, { fontFamily: Fonts.semiBold, color: COLORS.text }]}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default FilterModal;