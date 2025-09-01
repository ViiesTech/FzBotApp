/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import { AppColors, responsiveHeight, responsiveWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppTextComps/AppText';
import FieldCode from '../../components/CodeField';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmailVerification = () => {
  const nav = useNavigation();

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
          <AuthHeader
            heading="Email verification,"
            subHeading="Please type OTP code that we give you"
          />

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View>
              <FieldCode />
            </View>
            <LineBreak space={1} />
            <TouchableOpacity onPress={() => {}}>
              <AppText
                title={'Resend on 02:39'}
                textColor={AppColors.themeColor}
                textSize={1.8}
                textAlignment={'right'}
                textFontWeight
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
            <AppButton
              title="Verify Email"
              textColor={AppColors.WHITE}
              btnBackgroundColor={AppColors.themeColor}
              handlePress={() => nav.navigate('NewPassword')}
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
