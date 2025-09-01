/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import BackIcon from './AppTextComps/BackIcon';
import AppText from './AppTextComps/AppText';
import { AppColors } from '../utils/index';
import { responsiveHeight, responsiveWidth } from '../utils/index';
import { useNavigation } from '@react-navigation/native';

type props = {
  // title?: string,
  onBackPress?: any;
  heading?: any;
  rightIcon?: any;
  middleIcon?: any;
  backIconColor?: any;
};

const AppHeader = ({ onBackPress, heading, rightIcon, middleIcon, backIconColor }: props) => {
  const nav = useNavigation();
  const backHandler = () => {
    nav.goBack();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
      }}
    >
      {/* Left icon */}
     {onBackPress && <View style={{ width: responsiveWidth(7), alignItems: 'flex-start' }}>
        {onBackPress && <BackIcon onBackPress={backHandler} iconColor={backIconColor} />}
      </View>}

      {/* Center text */}
      <View>
        {middleIcon ? (
          middleIcon
        ) : (
          <AppText
            title={heading}
            textColor={backIconColor ? backIconColor : AppColors.BLACK}
            textFontWeight
            textSize={2.4}
          />
        )}
      </View>

      {/* Right icon */}
      <View style={{ width: responsiveWidth(10), alignItems: 'flex-end' }}>
        {rightIcon}
      </View>
    </View>
  );
};

export default AppHeader;
