/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import AppText from './AppTextComps/AppText';
import { AppColors, responsiveWidth } from '../utils/index';

type props = {
  title?: any;
  handlePress?: () => void;
  textColor?: any;
  textFontWeight?: boolean;
  textSize?: any;
  btnWidth?: any;
  btnBackgroundColor?: any;
  btnPadding?: any;
  borderWidth?: any;
  borderColor?: any;
  borderRadius?: any;
  leftIcon?: any;
  activeOpacity?:any;
};
const AppButton = ({
  title,
  handlePress,
  leftIcon,
  borderRadius,
  borderWidth,
  borderColor,
  btnPadding,
  btnBackgroundColor,
  btnWidth,
  textColor = AppColors.WHITE,
  textFontWeight = true,
  textSize = 2.2,
  activeOpacity,
}: props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={activeOpacity}
      style={{
        backgroundColor: btnBackgroundColor
          ? btnBackgroundColor
          : AppColors.ThemeBlue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: btnPadding ? btnPadding : 14,
        borderRadius: borderRadius ? borderRadius : 10,
        width: btnWidth ? responsiveWidth(btnWidth) : 'auto',
        borderWidth: borderWidth || 0,
        borderColor: borderColor ? borderColor : null,
        flexDirection: 'row',
      }}>
      {leftIcon}
      <AppText
        textColor={textColor}
        textSize={textSize}
        title={title}
        textFontWeight={textFontWeight}
      />
    </TouchableOpacity>
  );
};

export default AppButton;
