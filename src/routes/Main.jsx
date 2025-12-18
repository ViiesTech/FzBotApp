/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppColors, responsiveHeight } from '../utils';
import Home from '../screens/main/Home/Home';
import Icon from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import LineBreak from '../components/LineBreak';
import AddProduct from './../screens/main/Home/AddProduct';
import HomeDetails from './../screens/main/Home/HomeDetails';
import Notification from './../screens/main/Notification/Notification';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppSettings from './../screens/main/AppSettings/AppSettings';
import Profile from './../screens/main/Profile/Profile';
import ChangePassword from './../screens/main/Profile/ChangePassword';
import EditProfile from './../screens/main/Profile/EditProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={MyTabs} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="HomeDetails" component={HomeDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: AppColors.ThemeBlue,
        tabBarInactiveTintColor: AppColors.WHITE,
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarStyle: {
          height: responsiveHeight(7.5),
          backgroundColor: AppColors.themeColor,
          paddingTop: responsiveHeight(1),
        },
      }}
    >
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                <Icon size={22} name={'home'} color={AppColors.WHITE} />
                <LineBreak space={0.8} />
                <View
                  style={{
                    width: responsiveHeight(0.7),
                    height: responsiveHeight(0.7),
                    borderRadius: 100,
                    backgroundColor: AppColors.WHITE,
                  }}
                />
              </View>
            ) : (
              <Icon size={22} name={'home'} color={AppColors.GRAY} />
            ),
        }}
      />
      <Tab.Screen
        name={'Notification'}
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                <FontAwesome size={22} name={'bell'} color={AppColors.WHITE} />
                <LineBreak space={0.5} />
                <View
                  style={{
                    width: responsiveHeight(0.7),
                    height: responsiveHeight(0.7),
                    borderRadius: 100,
                    backgroundColor: AppColors.WHITE,
                  }}
                />
              </View>
            ) : (
              <FontAwesome size={22} name={'bell'} color={AppColors.GRAY} />
            ),
        }}
      />
      <Tab.Screen
        name={'AppSettings'}
        component={AppSettings}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                <Fontisto
                  size={22}
                  name={'player-settings'}
                  color={AppColors.WHITE}
                />
                <LineBreak space={0.5} />
                <View
                  style={{
                    width: responsiveHeight(0.7),
                    height: responsiveHeight(0.7),
                    borderRadius: 100,
                    backgroundColor: AppColors.WHITE,
                  }}
                />
              </View>
            ) : (
              <Fontisto
                size={22}
                name={'player-settings'}
                color={AppColors.GRAY}
              />
            ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                <FontAwesome size={25} name={'user'} color={AppColors.WHITE} />
                <LineBreak space={0.5} />
                <View
                  style={{
                    width: responsiveHeight(0.7),
                    height: responsiveHeight(0.7),
                    borderRadius: 100,
                    backgroundColor: AppColors.WHITE,
                  }}
                />
              </View>
            ) : (
              <FontAwesome size={25} name={'user'} color={AppColors.GRAY} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Main;
