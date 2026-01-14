import { View, Text, TouchableOpacity, ScrollView, Image, RefreshControl, DeviceEventEmitter } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import LinearGradient from 'react-native-linear-gradient'
import DeviceInfo from 'react-native-device-info';
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import { UserDetail } from '../../types/user'
import { useFormatDate } from '../../utils/date'
import useUserStore from '../../stores/userStore'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { useAlertStore } from '../../stores/alertStore'
import { defaultProfileUrl } from '../../constants/data'
import { ActiveHistoryData } from '../../types/activeHistory'
import { CameraIcon, ClockIcon } from '../../../assets/icons'
import useActiveHistoryStore from '../../stores/activeHistoryStore'
import useAuthenticationStore from '../../stores/authenticationStore'
import { Dimension, useDimensionInsets } from '../../utils/dimension'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  borderWidth?: number;
}

const HomeScreen = (props: Props) => {
  const { borderWidth = 6 } = props

  const { translate, showLoading, hideLoading } = useGlobalStore();
  const { showAlert, hideAlert } = useAlertStore();
  const { logout } = useAuthenticationStore();
  const { fetchUser, fetchUsers } = useUserStore();
  const { createActiveHistory, fetchActiveHistories } = useActiveHistoryStore();
  const { insets } = useDimensionInsets();
  const formatDate = useFormatDate();

  const [user, setUser] = useState<UserDetail>({user: {}, user_face: {}});
  const [activeHistories, setActiveHistories] = useState<ActiveHistoryData[]> ([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchInitData = useCallback(async (isRefresh = false) => {
    try {
      showLoading();
      const response = await fetchUser();

      if (response.status === 200) {
        setUser(response.data || {user: {}, user_face: {}});
      } else if (response.status === 404) {
        props.navigation.replace('FrontCamera', { flow: 'home' });
      }

      const responseUsers = await fetchUsers({ page: 1, page_size: 15 });

      if (responseUsers.status === 200) {
        setTotalUsers(responseUsers.total_data || 0);
      }

      if (!isRefresh) {
        await createActiveHistory({
          operating_system: DeviceInfo.getSystemName(),
          model: DeviceInfo.getModel(),
        });
      }
      const responseActiveHistories = await fetchActiveHistories({ page: 1, page_size: 12 });

      if (responseActiveHistories.status === 200) {
        setActiveHistories(responseActiveHistories.data || []);
      }
      
    } finally {
      hideLoading();
    }
  }, [fetchUser, fetchUsers, props.navigation, showLoading, hideLoading, createActiveHistory, fetchActiveHistories]);

  useEffect(() => {
    fetchInitData();
  }, [fetchInitData]);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('refreshHomeScreen', () => {
        fetchInitData(true);
    });
    return () => subscription.remove();
}, [fetchInitData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchInitData(true);
    setRefreshing(false);
  }, [fetchInitData]);

  const handleLogout = async () => {
    showAlert(
      translate('youSureLogout'),
      async () => {
        hideAlert()
        showLoading();
        await logout();
        props.navigation.replace('LoginFace')
        hideLoading();
      },
      true
    );
  }

  return (
    <ScrollView
      bounces={true}
      contentContainerStyle={[tw`w-full`, { paddingBottom: insets.bottom }]}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={tw`h-60`}
      />
      <View style={tw`relative`}>
        <View
          pointerEvents="none"
          style={[
            tw`w-full h-full absolute -top-[9px] left-0 right-0 -mt-20 rounded-t-3xl opacity-30`,
            { backgroundColor: COLORS.white },
          ]}
        />
        <View
          style={[tw`w-full h-full px-3 -mt-20 rounded-t-3xl`, { backgroundColor: COLORS.white }]}
        >
          <View style={tw`h-3`} />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate("EditUser")}
            style={[tw`w-full h-40 items-center justify-end rounded-3xl`, { backgroundColor: COLORS.cream }]}
          >
            <Text style={[tw`text-[20px]`, { fontFamily: Fonts.semiBold, color: COLORS.text }]}>
              {translate("welcomeBack")}
            </Text>
            <View style={tw`h-1`} />
            <Text style={[tw`text-[20px]`, { fontFamily: Fonts.medium, color: COLORS.darkBlue }]}>
              {`${user.user?.first_name} ${user.user?.last_name}` || "-"}
            </Text>
            <View style={tw`h-4`} />
          </TouchableOpacity>
          <View style={tw`h-4`} />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate('Users')}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.lightBlue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={tw`flex-row items-center justify-between rounded`}
            >
              <View style={tw`flex-row items-center mt-4 mb-4`}>
                <Image
                  source={require("../../../assets/images/worker.png")}
                  style={tw`w-15 h-15 border border-white rounded-full ml-3 p-1`}
                />
                <View style={tw`w-4`} />
                <View>
                  <Text style={[tw`text-[15px] text-white`, { fontFamily: Fonts.semiBold }]}>
                    {translate("totalUsers")}
                  </Text>
                  <View style={tw`h-1`} />
                  <Text style={[tw`text-[28px] text-white`, { fontFamily: Fonts.bold }]}>
                    {totalUsers ? (
                      `${totalUsers - 1}`
                    ) : (
                      "0"
                    )}
                  </Text>
                </View>
              </View>
              <View style={[tw`py-1 px-2 rounded mr-3`, { backgroundColor: COLORS.secondary }]}>
                <Text style={[tw`text-[10px] text-white`, { fontFamily: Fonts.medium }]}>
                  {translate("view")}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <View style={tw`h-2`} />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate("FrontCamera", { flow: 'update' })}
            style={[tw`border p-1 rounded-md border-2`, { borderColor: COLORS.secondary }]}
          >
            <View style={[
                tw`flex-row items-center justify-center px-2 py-4 rounded-md`,
                { backgroundColor: COLORS.secondary },
              ]}
            >
              <CameraIcon />
              <View style={tw`w-4`} />
              <Text style={[tw`text-[18px] text-white`, { fontFamily: Fonts.semiBold }]}>
                {translate("updateFace")}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={tw`h-3`} />
          <Text style={[tw`text-[18px] text-black`, { fontFamily: Fonts.semiBold }]}>
            {translate("loginHistory")}
          </Text>
          <View style={tw`h-4`} />
          <View style={tw`flex-row flex-wrap`}>
            {activeHistories.length === 0 ? (
              <View style={tw`w-full items-center pt-5`}>
                <Text style={[tw`text-[14px]`, { fontFamily: Fonts.regular, color: COLORS.grey }]}>
                  {translate("thereIsNoYet", { value: translate("loginHistory") })}
                </Text>
              </View>
            ) : (
              activeHistories.map((item, index) => (
                <View key={index} style={tw`w-full`}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("ActiveHistoryDetail", { id: item.id || 0 })}
                    style={tw`bg-white rounded-md shadow-md px-3 py-2 mb-3`}
                  >
                    <Text style={[tw`text-[16px]`, { fontFamily: Fonts.semiBold, color: COLORS.text }]}>
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { weekday: 'long' }) : "-"}
                    </Text>
                    <View style={tw`h-1`} />
                    <View style={tw`flex-row items-center`}>
                      <ClockIcon />
                      <View style={tw`w-2`} />
                      <Text style={[tw`text-[12px] text-gray-500`, { fontFamily: Fonts.regular }]}>
                        {formatDate(item.created_at || "")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
          <View style={[
            tw`w-39 h-39 self-center rounded-full absolute -top-17 border border-white bg-white opacity-30`,
            { borderWidth: borderWidth },
          ]}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate("EditUser")}
            style={[tw` self-center rounded-full absolute -top-15 border border-white`, { borderWidth: borderWidth }]}
          >
            <Image
              resizeMode='cover'
              source={{ uri: user.user_face?.image || defaultProfileUrl }}
              style={[tw`w-35 h-35 rounded-full`]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleLogout}
        style={[
          tw`absolute justify-start right-5`,
          { paddingTop: Dimension.statusBarHeight },
        ]}
      >
        <FontAwesome6
          size={18}
          iconStyle='solid'
          color={COLORS.white}
          name="arrow-right-from-bracket"
        />
      </TouchableOpacity>
    </ScrollView>
  )
}

export default HomeScreen