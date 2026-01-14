import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    RefreshControl,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import LinearGradient from 'react-native-linear-gradient'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { UserCard } from '../../components'
import { Fonts } from '../../constants/font'
import { UserDetail } from '../../types/user'
import { FilterOption } from '../../types/filter'
import useUserStore from '../../stores/userStore'
import { FilterIcon } from '../../../assets/icons'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { defaultProfileUrl } from '../../constants/data'
import { useDimensionInsets } from '../../utils/dimension'
import FilterModal from '../../components/users/FilterModal'
import ListUsersEmpty from '../../components/users/ListUsersEmpty'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Users'>;
}

const UsersScreen = (props: Props) => {
    const { insets } = useDimensionInsets();
    
    const { translate, showLoading, hideLoading } = useGlobalStore();
    const { fetchUsers, fetchUserJobs } = useUserStore();

    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('')
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [users, setUsers] = useState<UserDetail[]>([])
    const [userJobs, setUserJobs] = useState<string[]>([])
    const isFetchingRef = useRef(false);
    const isFirstRender = useRef(true);


    const fetchUserJobsData = useCallback(async () => {
        const responseUserJobs = await fetchUserJobs({ page: 1, page_size: 15 });
        if (responseUserJobs.status === 200) {
            setUserJobs(responseUserJobs.data || []);
        }
    }, [fetchUserJobs]);

    const fetchUsersData = useCallback(async ({pageNumber = 1, append = false, shouldFetchJobs = false}) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        if (!append) showLoading();

        try {
            const response = await fetchUsers({
                page: pageNumber,
                page_size: 15,
                is_excluded: true,
                query: searchQuery,
                job: selectedFilter || "",
            });

            if (response.status === 200) {
                const newUsers = response.data || [];
                setUsers(prev => append ? [...prev, ...newUsers] : newUsers);
                setHasMore(newUsers.length === 15);
                setPage(pageNumber);
            }

            if (shouldFetchJobs) {
                await fetchUserJobsData();
            }

        } finally {
            isFetchingRef.current = false;
            hideLoading();
        }
    }, [fetchUsers, searchQuery, selectedFilter, showLoading, hideLoading, fetchUserJobsData]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetchUsersData({ pageNumber: 1, shouldFetchJobs: true });
            return;
        }

        const timeout = setTimeout(() => {
            setPage(1);
            setHasMore(true);
            fetchUsersData({ pageNumber: 1, shouldFetchJobs: false });
        }, 300);

        return () => clearTimeout(timeout); 
    }, [searchQuery, selectedFilter, fetchUsersData]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchUsersData({ pageNumber: 1, append: false, shouldFetchJobs: true });
        setRefreshing(false);
      }, [fetchUsersData]);

    const filterOptions: FilterOption[] = [
        { label: translate("all"), value: "" },
        ...userJobs.map((job) => ({
            label: job,
            value: job,
        })),
    ];

    const onEndReached = useCallback(() => {
        if (!hasMore || isFetchingRef.current) return;

        fetchUsersData({
            pageNumber: page + 1,
            append: true,
            shouldFetchJobs: false,
        });
    }, [hasMore, page, fetchUsersData]);

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
                                { backgroundColor: selectedFilter === "" ? COLORS.white : COLORS.lightBlue }
                            ]}
                        >
                            <FilterIcon color={selectedFilter === "" ? COLORS.black : COLORS.white} />
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
                    data={users}
                    bounces={true}
                    onEndReachedThreshold={0.2}
                    onEndReached={onEndReached}
                    contentContainerStyle={tw`pb-4`}
                    keyExtractor={(item) => item.id?.toString() || ""}
                    style={[tw`flex-6`, { backgroundColor: COLORS.background }]}
                    renderItem={({ item }) => (
                        <UserCard
                            role={item.user?.job || translate('noJob')}
                            onPress={() => props.navigation.navigate("UserDetail", { id: item.id || 0 })}
                            imageUrl={item.user_face?.image || defaultProfileUrl}
                            name={`${item.user?.first_name} ${item.user?.last_name}`}
                        />
                    )}
                    ListEmptyComponent={
                        <ListUsersEmpty />
                    }
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                            colors={[COLORS.primary]}
                            tintColor={COLORS.primary}
                        />
                    }
                />
                <FilterModal
                    options={filterOptions}
                    selected={selectedFilter}
                    bottomInset={insets.bottom}
                    visible={filterModalVisible}
                    onSelect={setSelectedFilter}
                    onReset={() => setSelectedFilter('')}
                    onClose={() => setFilterModalVisible(false)}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default UsersScreen