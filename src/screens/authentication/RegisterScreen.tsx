import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/route';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
}

const RegisterScreen = (props: Props) => {
    return (
        <View>
            <Text>RegisterScreen</Text>
        </View>
    )
}

export default RegisterScreen