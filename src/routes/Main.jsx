/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppColors, responsiveHeight } from '../utils';
import LineBreak from '../components/LineBreak';
import MySites from '../screens/main/Sites/MySites';
import AddSite from '../screens/main/Sites/AddSite';
import SiteDetail from '../screens/main/Sites/SiteDetail';
import ProductDetail from '../screens/main/Sites/ProductDetail';
import Changelog from '../screens/main/Changelog/Changelog';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppSettings from './../screens/main/AppSettings/AppSettings';
import Profile from './../screens/main/Profile/Profile';
import ChangePassword from './../screens/main/Profile/ChangePassword';
import EditProfile from './../screens/main/Profile/EditProfile';
import PersonalInformation from './../screens/main/Profile/PersonalInformation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={MyTabs} />
      <Stack.Screen name="AddSite" component={AddSite} />
      <Stack.Screen name="SiteDetail" component={SiteDetail} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
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
        name={'Sites'}
        component={MySites}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons size={22} name={'web'} color={AppColors.WHITE} />
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
              <MaterialCommunityIcons size={22} name={'web'} color={AppColors.GRAY} />
            ),
        }}
      />
      <Tab.Screen
        name={'Changelog'}
        component={Changelog}
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
