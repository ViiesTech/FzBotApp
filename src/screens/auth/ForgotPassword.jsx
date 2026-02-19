/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View } from 'react-native';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import AuthHeader from '../../components/AuthHeader';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../../components/AppTextComps/BackIcon';
import { forgotPassword, ShowToast } from '../../GlobalFunctions';

const ForgotPassword = () => {
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      return ShowToast('error', 'Email is required');
    }
    setIsLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res?.success) {
        nav.navigate('EmailVerification', {
          email: email,
          userId: res?.data?.userId,
        });
      }
    } catch (e) {
      // error handled in global function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <SafeAreaView style={{ flexGrow: 1, backgroundColor: AppColors.WHITE }}>
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
            heading="Forgot password,"
            subHeading="Please type your email below and we will give you a OTP code"
          />

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <AppTextInput
              inputPlaceHolder={'Email'}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
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
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <AppButton
              title={
                isLoading ? (
                  <ActivityIndicator size={'large'} color={AppColors.WHITE} />
                ) : (
                  'Send Code'
                )
              }
              textColor={AppColors.WHITE}
              btnBackgroundColor={AppColors.themeColor}
              handlePress={handleSendCode}
              textFontWeight={false}
            />
          </View>
          <LineBreak space={2} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
