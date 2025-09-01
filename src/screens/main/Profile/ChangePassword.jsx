/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../components/AppHeader';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/AppTextComps/AppText';

const ChangePassword = () => {
  const [isShow, setIsShow] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <ScrollView style={{ flex: 1 }}>
        <AppHeader onBackPress={true} heading={'Change Password'} />
        <View style={{ paddingHorizontal: responsiveWidth(4), gap: responsiveHeight(2) }}>
          <View>
            <AppText
              title={'Enter old password'}
              textColor={AppColors.GRAY}
              textSize={1.7}
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
          <View>
            <AppText
              title={'New password'}
              textColor={AppColors.GRAY}
              textSize={1.7}
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
          <View>
            <AppText
              title={'Confirm New password'}
              textColor={AppColors.GRAY}
              textSize={1.7}
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
          title="Change Password"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          //   handlePress={}
          textFontWeight={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
