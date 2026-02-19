/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../components/AppHeader';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/AppTextComps/AppText';
import { useSelector } from 'react-redux';
import { changePassword, ShowToast } from '../../../GlobalFunctions';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const nav = useNavigation();
  const { userData } = useSelector(state => state?.user);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isOldFocused, setIsOldFocused] = useState(false);
  const [isNewFocused, setIsNewFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword) {
      return ShowToast('error', 'Old password is required');
    }
    if (!newPassword) {
      return ShowToast('error', 'New password is required');
    }
    if (newPassword.length < 6) {
      return ShowToast('error', 'Password must be at least 6 characters');
    }
    if (newPassword !== confirmPassword) {
      return ShowToast('error', 'Passwords do not match');
    }
    setIsLoading(true);
    try {
      const res = await changePassword(userData?._id, oldPassword, newPassword);
      if (res?.success) {
        nav.goBack();
      }
    } catch (e) {
      // error handled in global function
    } finally {
      setIsLoading(false);
    }
  };

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
              inputPlaceHolder={'Old Password'}
              inputHeight={5}
              value={oldPassword}
              onChangeText={text => setOldPassword(text)}
              secureTextEntry={!showOld}
              rightIcon={
                <TouchableOpacity onPress={() => setShowOld(!showOld)}>
                  <Ionicons
                    name={showOld ? 'eye' : 'eye-off'}
                    size={responsiveFontSize(2.5)}
                    color={isOldFocused ? AppColors.themeColor : AppColors.LIGHTGRAY}
                  />
                </TouchableOpacity>
              }
              logo={
                <Foundation
                  name={'lock'}
                  size={responsiveFontSize(2.5)}
                  color={isOldFocused ? AppColors.themeColor : AppColors.LIGHTGRAY}
                />
              }
              isFocused={isOldFocused}
              onFocus={() => setIsOldFocused(true)}
              onBlur={() => setIsOldFocused(false)}
            />
          </View>
          <View>
            <AppText
              title={'New password'}
              textColor={AppColors.GRAY}
              textSize={1.7}
            />
            <AppTextInput
              inputPlaceHolder={'New Password'}
              inputHeight={5}
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
              secureTextEntry={!showNew}
              rightIcon={
                <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                  <Ionicons
                    name={showNew ? 'eye' : 'eye-off'}
                    size={responsiveFontSize(2.5)}
                    color={isNewFocused ? AppColors.themeColor : AppColors.LIGHTGRAY}
                  />
                </TouchableOpacity>
              }
              logo={
                <Foundation
                  name={'lock'}
                  size={responsiveFontSize(2.5)}
                  color={isNewFocused ? AppColors.themeColor : AppColors.LIGHTGRAY}
                />
              }
              isFocused={isNewFocused}
              onFocus={() => setIsNewFocused(true)}
              onBlur={() => setIsNewFocused(false)}
            />
          </View>
          <View>
            <AppText
              title={'Confirm New password'}
              textColor={AppColors.GRAY}
              textSize={1.7}
            />
            <AppTextInput
              inputPlaceHolder={'Confirm Password'}
              inputHeight={5}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={!showConfirm}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  <Ionicons
                    name={showConfirm ? 'eye' : 'eye-off'}
                    size={responsiveFontSize(2.5)}
                    color={isConfirmFocused ? AppColors.themeColor : AppColors.LIGHTGRAY}
                  />
                </TouchableOpacity>
              }
              logo={
                <Foundation
                  name={'lock'}
                  size={responsiveFontSize(2.5)}
                  color={isConfirmFocused ? AppColors.themeColor : AppColors.LIGHTGRAY}
                />
              }
              isFocused={isConfirmFocused}
              onFocus={() => setIsConfirmFocused(true)}
              onBlur={() => setIsConfirmFocused(false)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppButton
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Change Password'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          handlePress={handleChangePassword}
          textFontWeight={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
