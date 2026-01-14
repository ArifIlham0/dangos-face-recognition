import { Platform } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { CustomAlert, CustomLoadingIndicator } from './components';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  LoginFaceScreen,
  FrontCameraScreen,
  SplashScreen,
  UsersScreen,
  EditUserScreen,
} from './screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right', 
            animationDuration: Platform.OS === 'ios' ? undefined : 100,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="LoginFace" component={LoginFaceScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Users" component={UsersScreen} />
          <Stack.Screen name="EditUser" component={EditUserScreen} />
          <Stack.Screen 
            name="FrontCamera" 
            component={FrontCameraScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <CustomLoadingIndicator />
      <CustomAlert />
    </>
  );
};

export default AppNavigator;
