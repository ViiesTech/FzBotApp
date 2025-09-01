import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/auth/Splash';
import OnBoarding from './../screens/auth/OnBoarding';
import Login from './../screens/auth/Login';
import SignUp from './../screens/auth/SignUp';
import ForgotPassword from './../screens/auth/ForgotPassword';
import EmailVerification from './../screens/auth/EmailVerification';
import NewPassword from './../screens/auth/NewPassword';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default Auth;
