import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import LinearGradient from 'react-native-linear-gradient'
import { RouteProp } from '@react-navigation/native'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import { useFormatDate } from '../../utils/date'
import { ClockIcon } from '../../../assets/icons'
import { Dimension } from '../../utils/dimension'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { ActiveHistoryData } from '../../types/activeHistory'
import useActiveHistoryStore from '../../stores/activeHistoryStore'
import ActiveHistoryDetailTile from '../../components/activeHistory/ActiveHistoryDetailTile'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ActiveHistoryDetail'>;
    route: RouteProp<RootStackParamList, 'ActiveHistoryDetail'>;
}

const ActiveHistoryDetailScreen = (props: Props) => {
    const { translate, showLoading, hideLoading } = useGlobalStore();
    const { fetchActiveHistory } = useActiveHistoryStore();
    const formatDate = useFormatDate();

    const [activeHistory, setActiveHistory] = useState<ActiveHistoryData | null>({});

    const { id } = props.route.params;

    const fetchInitData = useCallback(async () => {
        try {
            showLoading();
            const response = await fetchActiveHistory(id);
            if (response.status === 200) {
                setActiveHistory(response.data || {});
            }
        } finally {
            hideLoading();
        }
    }, [fetchActiveHistory, id, showLoading, hideLoading]);

    useEffect(() => {
        fetchInitData();
    }, [fetchInitData]);

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
                        {translate('loginHistoryDetail')}
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
                            tw`bg-white rounded-3xl p-5 shadow-lg`,
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
                                <ClockIcon
                                    width={20}
                                    height={20}
                                    fill={COLORS.primary}
                                />
                            </View>
                            <Text
                                style={[tw`text-base`, { fontFamily: Fonts.semiBold, color: COLORS.text}]}
                            >
                                {translate('deviceInformation')}
                            </Text>
                        </View>
                        <View style={[tw`border-b`, { borderColor: COLORS.border }]} />
                        <View style={tw`h-4`}/>
                        <ActiveHistoryDetailTile
                            title={translate('operatingSystem')}
                            subtitle={activeHistory?.operating_system || '-'}
                        />
                        <View style={tw`h-4`}/>
                        <ActiveHistoryDetailTile
                            title={translate('deviceModel')}
                            subtitle={activeHistory?.model || '-'}
                        />
                        <View style={tw`h-4`}/>
                        <ActiveHistoryDetailTile
                            title={translate('loginTime')}
                            subtitle={activeHistory?.created_at ? formatDate(activeHistory.created_at) : '-'}
                        />
                        <View style={tw`h-4`}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default ActiveHistoryDetailScreen