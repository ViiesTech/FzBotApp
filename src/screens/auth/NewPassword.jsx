/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../../components/AppTextComps/BackIcon';
import { resetPassword, ShowToast } from '../../GlobalFunctions';

const NewPassword = () => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};

  const handleResetPassword = async () => {
    if (!newPass) {
      return ShowToast('error', 'New password is required');
    }
    if (newPass.length < 6) {
      return ShowToast('error', 'Password must be at least 6 characters');
    }
    if (newPass !== confirmPass) {
      return ShowToast('error', 'Passwords do not match');
    }
    setIsLoading(true);
    try {
      const res = await resetPassword(userId, newPass);
      if (res?.success) {
        nav.navigate('Login');
      }
    } catch (e) {
      // error handled in global function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
        <View
          style={{
            paddingHorizontal: responsiveWidth(4),
            paddingVertical: responsiveHeight(2),
            flex: 1,
          }}
        >
          <BackIcon onBackPress={() => nav.goBack()} />

          <LineBreak space={2} />

          <AuthHeader
            heading="New password,"
            subHeading="Now, you can create new password and confirm it below"
          />

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <AppTextInput
              inputPlaceHolder={'New Password'}
              secureTextEntry={!isShow}
              value={newPass}
              onChangeText={text => setNewPass(text)}
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

            <LineBreak space={2} />

            <AppTextInput
              inputPlaceHolder={'Confirm Password'}
              secureTextEntry={!isConfirmPasswordShow}
              value={confirmPass}
              onChangeText={text => setConfirmPass(text)}
              inputHeight={5}
              rightIcon={
                <TouchableOpacity
                  onPress={() =>
                    setIsConfirmPasswordShow(!isConfirmPasswordShow)
                  }
                >
                  <Ionicons
                    name={isConfirmPasswordShow ? 'eye' : 'eye-off'}
                    size={responsiveFontSize(2.5)}
                    color={
                      isConfirmPasswordFocused
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
                    isConfirmPasswordFocused
                      ? AppColors.themeColor
                      : AppColors.LIGHTGRAY
                  }
                />
              }
              isFocused={isConfirmPasswordFocused}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
            />
          </View>

          <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
            <AppButton
              title={
                isLoading ? (
                  <ActivityIndicator size={'large'} color={AppColors.WHITE} />
                ) : (
                  'Confirm New Password'
                )
              }
              textColor={AppColors.WHITE}
              btnBackgroundColor={AppColors.themeColor}
              handlePress={handleResetPassword}
              textFontWeight={false}
            />
          </View>
          <LineBreak space={2} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;
