/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import { AppColors, responsiveHeight, responsiveWidth } from '../../utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppButton from '../../components/AppButton';
import FieldCode from '../../components/CodeField';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../../components/AppTextComps/BackIcon';
import { verifyOTP, ShowToast } from '../../GlobalFunctions';

const EmailVerification = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { email, userId } = route.params || {};
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      return ShowToast('error', 'Please enter the 4-digit OTP');
    }
    setIsLoading(true);
    try {
      const res = await verifyOTP(email, otp);
      if (res?.success) {
        nav.navigate('NewPassword', { email, userId });
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
            heading="Email verification,"
            subHeading={`Please type OTP code sent to ${email || 'your email'}`}
          />

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View>
              <FieldCode onCodeChange={code => setOtp(code)} />
            </View>
          </View>

          <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
            <AppButton
              title={
                isLoading ? (
                  <ActivityIndicator size={'large'} color={AppColors.WHITE} />
                ) : (
                  'Verify Email'
                )
              }
              textColor={AppColors.WHITE}
              btnBackgroundColor={AppColors.themeColor}
              handlePress={handleVerify}
              textFontWeight={false}
            />
          </View>
          <LineBreak space={2} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EmailVerification;
