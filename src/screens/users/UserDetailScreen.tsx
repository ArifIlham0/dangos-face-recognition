import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import LinearGradient from 'react-native-linear-gradient'
import { RouteProp } from '@react-navigation/native'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import { UserDetail } from '../../types/user'
import { useFormatDate } from '../../utils/date'
import { Dimension } from '../../utils/dimension'
import useUserStore from '../../stores/userStore'
import { PersonIcon } from '../../../assets/icons'
import { CustomModalPhoto } from '../../components'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { defaultProfileUrl } from '../../constants/data'
import ActiveHistoryDetailTile from '../../components/activeHistory/ActiveHistoryDetailTile'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'UserDetail'>;
    route: RouteProp<RootStackParamList, 'UserDetail'>;
}

const UserDetailScreen = (props: Props) => {
    const { id } = props.route.params || {};

    const { translate, showLoading, hideLoading } = useGlobalStore();
    const { fetchUser } = useUserStore();
    const formatDate = useFormatDate({ isTime: false });

    const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);

    const fetchInitData = useCallback(async () => {
        if (!id) return;
        
        try {
            showLoading();
            const response = await fetchUser(id);
            if (response.status === 200) {
                setUserDetail(response.data || null);
            }
        } finally {
            hideLoading();
        }
    }, [fetchUser, id, showLoading, hideLoading]);

    useEffect(() => {
        fetchInitData();
    }, [fetchInitData]);

    const profileImageUrl = userDetail?.user_face?.image || defaultProfileUrl;
    const fullName = `${userDetail?.user?.first_name || ''} ${userDetail?.user?.last_name || ''}`.trim() || '-';
    const email = userDetail?.user?.email || '-';
    const job = userDetail?.user?.job || translate('noJob');
    const isActive = userDetail?.user?.is_active;
    const accountStatus = isActive ? translate('active') : translate('inactive');
    const memberSince = userDetail?.user?.date_joined ? formatDate(userDetail.user.date_joined) : '-';

    return (
        <View style={[tw`flex-1`, { backgroundColor: COLORS.background }]}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={[
                    tw`absolute top-0 left-0 right-0`,
                    { height: (Dimension.statusBarHeight || 0) + 180 },
                ]}
            />

            <View
                style={[
                    tw`absolute w-[280px] h-[280px] right-[-100px] rounded-full bg-white opacity-10`,
                    { top: (Dimension.statusBarHeight || 0) - 80 },
                ]}
            />

            <View style={[tw`flex-1`, { paddingTop: (Dimension.statusBarHeight || 0) + 20 }]}>
                <View style={tw`flex-row items-center justify-between px-5 mb-5`}>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={tw`w-10 h-10 rounded-full items-center justify-center`}
                    >
                        <FontAwesome6
                            size={20}
                            iconStyle='solid'
                            name="chevron-left"
                            color={COLORS.white}
                        />
                    </TouchableOpacity>

                    <Text
                        style={[tw`text-lg`, { fontFamily: Fonts.semiBold, color: COLORS.white }]}
                    >
                        {translate('userDetail')}
                    </Text>

                    <View style={tw`w-10`} />
                </View>

                <ScrollView
                    bounces={true}
                    style={tw`flex-1`}
                    contentContainerStyle={tw`px-5 pb-5`}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={[
                            tw`bg-white rounded-3xl p-5 shadow-lg mb-4`,
                            { shadowColor: COLORS.black },
                        ]}
                    >
                        <View style={tw`items-center`}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setIsImageModalVisible(true)}
                            >
                                <Image
                                    resizeMode="cover"
                                    source={{ uri: profileImageUrl }}
                                    style={[tw`w-[120px] h-[120px] rounded-full`]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={[
                            tw`bg-white rounded-3xl p-5 shadow-lg mb-4`,
                            { shadowColor: COLORS.black },
                        ]}
                    >
                        <View style={tw`flex-row items-center mb-4`}>
                            <View
                                style={[
                                    tw`w-12 h-12 rounded-full items-center justify-center mr-3`,
                                    { backgroundColor: COLORS.cream },
                                ]}
                            >
                                <PersonIcon
                                    width={20}
                                    height={20}
                                    fill={COLORS.primary}
                                />
                            </View>
                            <Text
                                style={[tw`text-base`, { fontFamily: Fonts.semiBold, color: COLORS.text}]}
                            >
                                {translate('personalInformation')}
                            </Text>
                        </View>
                        <View style={[tw`border-b`, { borderColor: COLORS.border }]} />
                        <View style={tw`h-4`}/>
                        <ActiveHistoryDetailTile
                            title={translate('fullName')}
                            subtitle={fullName}
                        />
                        <View style={tw`h-4`}/>
                        <ActiveHistoryDetailTile
                            title={translate('email')}
                            subtitle={email}
                        />
                        <View style={tw`h-4`}/>
                        <ActiveHistoryDetailTile
                            title={translate('job')}
                            subtitle={job}
                        />
                        <View style={tw`h-4`}/>
                        <ActiveHistoryDetailTile
                            title={translate('accountStatus')}
                            subtitle={accountStatus}
                        />
                        <View style={tw`h-4`}/>
                        <ActiveHistoryDetailTile
                            title={translate('memberSince')}
                            subtitle={memberSince}
                        />
                        <View style={tw`h-4`}/>
                    </View>
                </ScrollView>
            </View>
            <CustomModalPhoto
                visible={isImageModalVisible}
                onClose={() => setIsImageModalVisible(false)}
                imageUrl={profileImageUrl}
            />
        </View>
    )
}

export default UserDetailScreen