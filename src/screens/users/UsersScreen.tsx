import { View, Text, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import LinearGradient from 'react-native-linear-gradient'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { UserCard } from '../../components'
import { Fonts } from '../../constants/font'
import { FilterIcon } from '../../../assets/icons'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { useDimensionInsets } from '../../utils/dimension'
import FilterModal from '../../components/users/FilterModal'
import ListUsersEmpty from '../../components/users/ListUsersEmpty'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Users'>;
}

type User = {
    id: string;
    name: string;
    role: string;
    imageUrl?: string;
}

const UsersScreen = (props: Props) => {
    const { translate } = useGlobalStore();
    const { insets } = useDimensionInsets();

    const [searchQuery, setSearchQuery] = useState('')
    const [filterModalVisible, setFilterModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('all')

    const [users] = useState<User[]>([
        { id: '1', name: 'John Doe', role: 'Administrator', imageUrl: 'https://www.arifilham.my.id/assets/profile_photo-Cn271RVL.jpg' },
        { id: '2', name: 'Jane Smith', role: 'Manager', imageUrl: 'https://www.arifilham.my.id/assets/profile_photo-Cn271RVL.jpg' },
        { id: '3', name: 'Mike Johnson', role: 'Employee', imageUrl: 'https://www.arifilham.my.id/assets/profile_photo-Cn271RVL.jpg' },
        { id: '4', name: 'Sarah Williams', role: 'Employee', imageUrl: 'https://www.arifilham.my.id/assets/profile_photo-Cn271RVL.jpg' },
        { id: '5', name: 'David Brown', role: 'Manager', imageUrl: 'https://www.arifilham.my.id/assets/profile_photo-Cn271RVL.jpg' },
        { id: '6', name: 'Emily Davis', role: 'Employee' },
        { id: '7', name: 'Chris Wilson', role: 'Administrator', imageUrl: 'https://www.arifilham.my.id/assets/profile_photo-Cn271RVL.jpg' },
        { id: '8', name: 'Lisa Anderson', role: 'Employee', imageUrl: 'https://www.arifilham.my.id/assets/profile_photo-Cn271RVL.jpg' },
    ])

    const filterOptions = [
        { label: translate('all'), value: 'all' },
        { label: 'Administrator', value: 'Administrator' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Employee', value: 'Employee' },
    ]

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = selectedFilter === 'all' || user.role === selectedFilter
        return matchesSearch && matchesFilter
    })

    const clearQuery = () => {
        setSearchQuery('')
        Keyboard.dismiss()
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            style={tw`flex-1`}
        >
            <View style={tw`flex-1`}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={tw`h-25`}
                />
                <View
                    pointerEvents="none"
                    style={[
                        tw`w-full h-full absolute mt-17 top-0 left-0 right-0 rounded-t-3xl opacity-30`,
                        { backgroundColor: COLORS.white },
                    ]}
                />
                <View style={[tw`flex-1 rounded-t-3xl -mt-6 overflow-hidden px-4 pt-4`, { backgroundColor: COLORS.background }]}>
                    <View style={tw`flex-row items-center justify-between rounded-t-3xl`}>
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                            style={tw`w-8 h-8 rounded-full bg-white items-center justify-center shadow-md`}
                        >
                            <FontAwesome6
                                size={20}
                                iconStyle='solid'
                                color={COLORS.black}
                                name="angle-left"
                            />
                        </TouchableOpacity>
                        <Text style={[tw`flex-1 text-center text-[19px]`, { fontFamily: Fonts.medium, color: COLORS.text }]}>
                            {translate('users')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setFilterModalVisible(true)}
                            style={[
                                tw`w-8 h-8 rounded-full items-center justify-center shadow-md`,
                                { backgroundColor: selectedFilter === 'all' ? COLORS.white : COLORS.lightBlue }
                            ]}
                        >
                            <FilterIcon color={selectedFilter === 'all' ? COLORS.black : COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`h-4`} />
                    <View style={tw`flex-row items-center`}>
                        <View style={[
                                tw`flex-1 flex-row items-center rounded px-2 py-3 shadow-md border`,
                                { backgroundColor: COLORS.white, borderColor: COLORS.border },
                            ]}
                        >
                            <FontAwesome6
                                size={18}
                                iconStyle='solid'
                                color={COLORS.secondary}
                                name="magnifying-glass"
                            />
                            <TextInput
                                value={searchQuery}
                                placeholder={translate('searchValue', { value: translate('users') })}
                                onChangeText={setSearchQuery}
                                placeholderTextColor={COLORS.grey}
                                cursorColor={COLORS.primary}
                                style={[tw`flex-1 mx-3 text-[13px]`, { fontFamily: Fonts.regular, color: COLORS.text }]}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={clearQuery}>
                                    <FontAwesome6
                                        size={18}
                                        iconStyle='solid'
                                        color={COLORS.secondary}
                                        name="xmark"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
                <FlatList
                    bounces={true}
                    data={filteredUsers}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={tw``}
                    style={[tw`flex-6`, { backgroundColor: COLORS.background }]}
                    renderItem={({ item }) => (
                        <UserCard
                            name={item.name}
                            role={item.role}
                            imageUrl={item.imageUrl}
                            onPress={() => console.log('View user:', item)}
                        />
                    )}
                    ListEmptyComponent={
                        <ListUsersEmpty />
                    }
                />
                <FilterModal
                    visible={filterModalVisible}
                    onClose={() => setFilterModalVisible(false)}
                    options={filterOptions}
                    selected={selectedFilter}
                    onSelect={setSelectedFilter}
                    onReset={() => setSelectedFilter('all')}
                    bottomInset={insets.bottom}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default UsersScreen