/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import AppText from '../../../components/AppTextComps/AppText';
import AppTextInput from '../../../components/AppTextInput';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../../../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeDetails = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <AppHeader onBackPress={true} heading={'Product Details'} />
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          gap: responsiveHeight(2),
          flex: 1,
        }}
      >
        <Image
          source={AppImages.product2}
          style={{
            width: responsiveWidth(92),
            height: responsiveHeight(25),
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={'Product Name: '}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          >
            <AppText
              title={'iPhone 14 Pro'}
              textColor={AppColors.GRAY}
              textSize={2}
            />
          </AppText>

          <View
            style={{
              backgroundColor: AppColors.lightGreen,
              paddingHorizontal: responsiveWidth(2.5),
              paddingVertical: responsiveHeight(0.5),
              borderRadius: 5,
            }}
          >
            <AppText
              title={'In Stock'}
              textColor={AppColors.WHITE}
              textSize={1.5}
              textFontWeight
            />
          </View>
        </View>
        <AppText
          title={'Product URL: '}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        >
          <AppText
            title={'https/loremipsumsimplydummy.com'}
            textColor={AppColors.LIGHT_BLUE}
            textSize={1.6}
          />
        </AppText>
        <AppText
          title={'Price: '}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        >
          <AppText title={'$ 890.00'} textColor={AppColors.GRAY} textSize={1.6}>
            {' '}
            <AppText
              title={'($920.00)'}
              textColor={AppColors.GRAY}
              textSize={1.6}
              textDecorationLine={'line-through'}
            />
          </AppText>
        </AppText>

        <AppText
          title={'last checked: 5 mins ago'}
          textColor={AppColors.GRAY}
          textSize={1.6}
        />

        <AppTextInput
          inputPlaceHolder={'High Priority (Always notify instantly)'}
          containerBg={AppColors.WHITE}
          borderWidth={1}
          inputContainerPaddingHorizontal={4}
          borderColor={AppColors.LIGHTGRAY}
          inputWidth={70}
          logo={
            <FontAwesome
              size={responsiveFontSize(1.7)}
              name={'bell'}
              color={AppColors.themeColor}
            />
          }
          rightIcon={
            <TouchableOpacity>
              <Entypo
                size={responsiveFontSize(3)}
                name={'chevron-small-down'}
                color={AppColors.themeColor}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: responsiveWidth(4) }}>
        <AppButton
          title="Remove To Wishlist"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          //   handlePress={}
          textFontWeight={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeDetails;
