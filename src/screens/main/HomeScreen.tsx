import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/route';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

const HomeScreen = (props: Props) => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen