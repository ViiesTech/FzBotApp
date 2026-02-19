/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../../components/AuthHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import Foundation from 'react-native-vector-icons/Foundation';
import AppText from '../../components/AppTextComps/AppText';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';
import { getFcmToken, ShowToast, Signup } from '../../GlobalFunctions';
import { useDispatch } from 'react-redux';
import BackIcon from '../../components/AppTextComps/BackIcon';

const SignUp = () => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState();

  const [form, setForm] = useState({
    userName: '',
    email: null,
    password: null,
  });
  const getFcmTokenHandler = async () => {
    const response = await getFcmToken();
    setFcmToken(response);
  };
  useEffect(() => {
    getFcmTokenHandler();
  }, []);
  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  const handleRegisteration = async () => {
    const { userName, email, password } = form;
    if (!userName) {
      return ShowToast('error', 'User Name is required.');
    } else if (!email) {
      return ShowToast('error', 'Email is required.');
    } else if (!password) {
      return ShowToast('error', 'Password is required');
    } else {
      setIsLoading(true);
      try {
        await Signup(userName, email, password, fcmToken || 'simulator-no-token', dispatch);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
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
        <BackIcon onBackPress={() => nav.goBack()} />

        <LineBreak space={2} />

        <AuthHeader
          heading="Create an account,"
          subHeading="Enter your full details below to get started."
        />

        <LineBreak space={7} />

        <AppTextInput
          onChangeText={value => handleInputChange('userName', value)}
          inputPlaceHolder={'Name'}
          logo={
            <Ionicons
              name={'person'}
              size={responsiveFontSize(2.5)}
              color={isNameFocused ? AppColors.themeColor : AppColors.LIGHTGRAY}
            />
          }
          inputHeight={5}
          isFocused={isNameFocused}
          onFocus={() => setIsNameFocused(true)}
          onBlur={() => setIsNameFocused(false)}
        />

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder={'Email address'}
          onChangeText={value => handleInputChange('email', value)}
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
          onChangeText={value => handleInputChange('password', value)}
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

        <AppButton
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Join Now'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          handlePress={handleRegisteration}
          textFontWeight={false}
        />

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
            title={'Already have an account?'}
            textColor={AppColors.GRAY}
            textSize={2}
          />
          <TouchableOpacity onPress={() => nav.navigate('Login')}>
            <AppText
              title={'Sign In'}
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

export default SignUp;
