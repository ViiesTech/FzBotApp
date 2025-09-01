/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TextInput } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/index';
import { AppColors } from '../utils/index';

type props = {
  logo?: any;
  inputPlaceHolder?: any;
  inputBgColour?: any;
  inputWidth?: number;
  containerBg?: any;
  rightIcon?: any;
  secureTextEntry?: any;
  placeholderTextColor?: any;
  inputHeight?: any;
  textAlignVertical?: any;
  placeholderTextfontWeight?: any;
  multiline?: any;
  value?: any;
  onChangeText?: any;
  onFocus?: any;
  borderWidth?: any;
  borderColor?: any;
  onBlur?: any;
  isFocused?: any;
  fontSize?: any;
  inputTextAlignVertical?: any;
  inputTextAlign?: any;
  lineHeight?: any;
  borderRadius?: any;
  inputContainerPaddingHorizontal?: any;
  elevation?: any;
  paddingVertical?: any;
};
const AppTextInput = ({
  logo,
  secureTextEntry,
  inputPlaceHolder,
  inputWidth = 68,
  containerBg,
  rightIcon,
  placeholderTextColor,
  inputHeight,
  textAlignVertical,
  placeholderTextfontWeight,
  multiline,
  value,
  onChangeText,
  onFocus,
  onBlur,
  borderWidth,
  borderColor,
  isFocused,
  fontSize,
  inputTextAlignVertical,
  inputTextAlign,
  lineHeight,
  borderRadius,
  inputContainerPaddingHorizontal,
  elevation,
  paddingVertical,
}: props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: containerBg
          ? containerBg
          : isFocused
            ? AppColors.WHITE
            : AppColors.inputBg,
        paddingHorizontal: inputContainerPaddingHorizontal
          ? responsiveWidth(inputContainerPaddingHorizontal)
          : 20,
        paddingVertical: paddingVertical ? paddingVertical : 5,
        borderRadius: borderRadius ? borderRadius : 10,
        alignItems: 'center',
        gap: 10,
        borderWidth: isFocused ? 1 : borderWidth || 1,
        borderColor: isFocused
          ? AppColors.themeColor
          : borderColor || AppColors.WHITE,
          elevation: elevation,
      }}>
      {logo}

      <TextInput
        placeholder={inputPlaceHolder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : isFocused ? AppColors.themeColor : AppColors.GRAY
        }
        style={{
          fontSize: responsiveFontSize(fontSize),
          lineHeight: responsiveHeight(lineHeight),
          width: responsiveWidth(inputWidth),
          color: isFocused ? AppColors.themeColor : AppColors.BLACK,
          height: inputHeight ? responsiveHeight(inputHeight) : null,
          fontWeight: placeholderTextfontWeight
            ? placeholderTextfontWeight
            : null,
          textAlignVertical: inputTextAlignVertical,
          textAlign: inputTextAlign,
        }}
        secureTextEntry={secureTextEntry}
        textAlignVertical={textAlignVertical}
        multiline={multiline}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {rightIcon}
    </View>
  );
};

export default AppTextInput;
