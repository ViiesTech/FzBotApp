/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import AppTextInput from '../../components/AppTextInput';
import LineBreak from '../../components/LineBreak';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../components/AppTextComps/AppText';
import AppButton from '../../components/AppButton';
import SVGXml from '../../components/SVGXML.tsx';
import { useNavigation } from '@react-navigation/native';
import { AppIcons } from '../../assets/icons/index.tsx';
import {
  getFcmToken,
  LoginIntegration,
  ShowToast,
} from '../../GlobalFunctions/index.tsx';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isShow, setIsShow] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state?.user);
  const [fcmToken, setFcmToken] = useState();
  const getFcmTokenHandler = async () => {
    const response = await getFcmToken();
    setFcmToken(response);
  };
  useEffect(() => {
    getFcmTokenHandler();
  }, []);
  const loginHandler = async () => {
    if (!email) {
      return ShowToast('error', 'Email Is Required');
    } else if (!password) {
      return ShowToast('error', 'Password Is Required');
    } else {
      await LoginIntegration(email, password, fcmToken || 'simulator-no-token', dispatch);
    }
  };
  return (
    <Container>
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
        }}
      >
        <AuthHeader
          heading="Welcome back,"
          subHeading="Let’s get you back to FZ Bot."
        />

        <LineBreak space={15} />

        <AppTextInput
          inputPlaceHolder={'Email'}
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
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder={'Password'}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!isShow}
          autoCapitalize="none"
          autoCorrect={false}
          inputHeight={5}
          rightIcon={
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              <Ionicons
                name={isShow ? 'eye' : 'eye-off'}
                size={responsiveFontSize(2.5)}
                color={
                  isPasswordFocused ? AppColors.themeColor : AppColors.LIGHTGRAY
                }
              />
            </TouchableOpacity>
          }
          logo={
            <Foundation
              name={'lock'}
              size={responsiveFontSize(2.5)}
              color={
                isPasswordFocused ? AppColors.themeColor : AppColors.LIGHTGRAY
              }
            />
          }
          isFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <LineBreak space={2} />

        <TouchableOpacity onPress={() => nav.navigate('ForgotPassword')}>
          <AppText
            title={'Forgot Password?'}
            textColor={AppColors.themeColor}
            textSize={1.8}
            textFontWeight
            textAlignment={'right'}
          />
        </TouchableOpacity>

        <LineBreak space={15} />

        <AppButton
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Login'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          handlePress={loginHandler}
          textFontWeight={false}
        />

        <LineBreak space={2} />

        <LineBreak space={3} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <AppText
            title={"Don't have an account?"}
            textColor={AppColors.GRAY}
            textSize={2}
          />
          <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
            <AppText
              title={'Join Now'}
              textColor={AppColors.themeColor}
              textSize={2}
              textFontWeight
            />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Login;
