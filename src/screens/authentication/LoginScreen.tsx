import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/route';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}

const LoginScreen = (props: Props) => {
    return (
        <View>
            <Text>LoginScreen</Text>
        </View>
    )
}

export default LoginScreen