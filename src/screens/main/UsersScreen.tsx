import { View, Text } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../../types/route';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Users">;
}

const UsersScreen = (props: Props) => {
    return (
        <View>
            <Text>UsersScreen</Text>
        </View>
    )
}

export default UsersScreen