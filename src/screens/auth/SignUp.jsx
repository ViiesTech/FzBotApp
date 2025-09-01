/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import Foundation from 'react-native-vector-icons/Foundation';
import AppText from '../../components/AppTextComps/AppText';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';

const SignUp = () => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const nav = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
        }}
      >
        <AuthHeader
          heading="Create an account,"
          subHeading="Enter your full details below to get started."
        />

        <LineBreak space={7} />

        <AppTextInput
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
          logo={
            <MaterialIcons
              name={'email'}
              size={responsiveFontSize(2.5)}
              color={isEmailFocused ? AppColors.themeColor : AppColors.LIGHTGRAY}
            />
          }
          inputHeight={5}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder={'Mobile Number'}
          logo={
            <Octicons
              name={'number'}
              size={responsiveFontSize(2.5)}
              color={
                isPhoneNumberFocused ? AppColors.themeColor : AppColors.LIGHTGRAY
              }
            />
          }
          inputHeight={5}
          isFocused={isPhoneNumberFocused}
          onFocus={() => setIsPhoneNumberFocused(true)}
          onBlur={() => setIsPhoneNumberFocused(false)}
        />

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder={'Password'}
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

        <View>
          <AppText textColor={AppColors.GRAY} textSize={1.8}>
            By signing up you agree to our{' '}
            <AppText
              textColor={AppColors.themeColor}
              textFontWeight
              textSize={1.8}
            >
              Term of use and privacy
            </AppText>{' '}
            <AppText textColor={AppColors.GRAY} textSize={1.8}>
              notice
            </AppText>
          </AppText>
        </View>

        <LineBreak space={2} />

        <AppButton
          title="Join Now"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
        //   handlePress={}
          textFontWeight={false}
        />

        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: responsiveWidth(5),
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: responsiveWidth(38),
              height: responsiveHeight(0.2),
              backgroundColor: AppColors.LIGHTGRAY,
            }}
          />
          <AppText
            title={'or'}
            textColor={AppColors.GRAY}
            textSize={1.8}
            textFontWeight
          />
          <View
            style={{
              width: responsiveWidth(38),
              height: responsiveHeight(0.2),
              backgroundColor: AppColors.LIGHTGRAY,
            }}
          />
        </View>
        <LineBreak space={2} />

        <AppButton
          title="Join with Google"
          textColor={AppColors.BLACK}
          borderWidth={2}
          borderColor={AppColors.themeColor}
          btnBackgroundColor={AppColors.WHITE}
          handlePress={() => {}}
          leftIcon={
            <View style={{ paddingHorizontal: responsiveWidth(4) }}>
              <SVGXml icon={AppIcons.google} width={20} height={20} />
            </View>
          }
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
