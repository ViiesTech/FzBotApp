/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import Feather from 'react-native-vector-icons/Feather';
import AppTextInput from '../../../components/AppTextInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LineBreak from '../../../components/LineBreak';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import AppButton from '../../../components/AppButton';

const EditProfile = () => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <ScrollView style={{ flex: 1 }}>
        <AppHeader onBackPress={true} heading={'Edit Profile'} />
        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <ImageBackground
            source={AppImages.product2}
            imageStyle={{ borderRadius: 100 }}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              position: 'relative',
            }}
          >
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.themeColor,
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Feather name="edit" size={18} color={AppColors.WHITE} />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <LineBreak space={5} />

          <View style={{ gap: responsiveHeight(2) }}>
            <AppTextInput
              inputPlaceHolder={'Name'}
              logo={
                <Ionicons
                  name={'person'}
                  size={responsiveFontSize(2.5)}
                  color={
                    isNameFocused ? AppColors.themeColor : AppColors.LIGHTGRAY
                  }
                />
              }
              inputHeight={5}
              isFocused={isNameFocused}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
            />

            <AppTextInput
              inputPlaceHolder={'Email address'}
              logo={
                <MaterialIcons
                  name={'email'}
                  size={responsiveFontSize(2.5)}
                  color={
                    isEmailFocused ? AppColors.themeColor : AppColors.LIGHTGRAY
                  }
                />
              }
              inputHeight={5}
              isFocused={isEmailFocused}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />

            <AppTextInput
              inputPlaceHolder={'Mobile Number'}
              logo={
                <Octicons
                  name={'number'}
                  size={responsiveFontSize(2.5)}
                  color={
                    isPhoneNumberFocused
                      ? AppColors.themeColor
                      : AppColors.LIGHTGRAY
                  }
                />
              }
              inputHeight={5}
              isFocused={isPhoneNumberFocused}
              onFocus={() => setIsPhoneNumberFocused(true)}
              onBlur={() => setIsPhoneNumberFocused(false)}
            />

            <AppTextInput
              inputPlaceHolder={'Password'}
              inputHeight={5}
              rightIcon={
                <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                  <Ionicons
                    name={isShow ? 'eye' : 'eye-off'}
                    size={responsiveFontSize(2.5)}
                    color={
                      isPasswordFocused
                        ? AppColors.themeColor
                        : AppColors.LIGHTGRAY
                    }
                  />
                </TouchableOpacity>
              }
              logo={
                <Foundation
                  name={'lock'}
                  size={responsiveFontSize(2.5)}
                  color={
                    isPasswordFocused
                      ? AppColors.themeColor
                      : AppColors.LIGHTGRAY
                  }
                />
              }
              isFocused={isPasswordFocused}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppButton
          title="Save Changes"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          //   handlePress={}
          textFontWeight={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
