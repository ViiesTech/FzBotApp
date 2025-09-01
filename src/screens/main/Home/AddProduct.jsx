/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const AddProduct = () => {
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Add Product'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View>
          <AppTextInput
            inputPlaceHolder={'Search...'}
            containerBg={AppColors.WHITE}
            borderWidth={1}
            inputContainerPaddingHorizontal={2}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={57}
            paddingVertical={-1}
            rightIcon={
              <View>
                <AppButton
                  title="Fetch Details"
                  textColor={AppColors.WHITE}
                  btnBackgroundColor={AppColors.BTNCOLOURS}
                  handlePress={() => {}}
                  textFontWeight={true}
                  btnWidth={30}
                  btnPadding={15}
                  textSize={1.7}
                  borderRadius={10}
                />
              </View>
            }
          />
        </View>
        <LineBreak space={2} />

        <AppText
          title={'Watchlist'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />
        <LineBreak space={2} />

        <TouchableOpacity
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(20),
            backgroundColor: AppColors.LIGHTGRAY,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <MaterialIcons
            size={responsiveFontSize(6)}
            name={'cloud-upload'}
            color={AppColors.GRAY}
          />
          <AppText
            title={'Upload Product Image'}
            textColor={AppColors.GRAY}
            textSize={1.7}
          />
        </TouchableOpacity>

        <LineBreak space={2} />

        <View style={{ gap: responsiveHeight(2) }}>
          <AppTextInput
            inputPlaceHolder={'Product Title Here'}
            containerBg={AppColors.WHITE}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputContainerPaddingHorizontal={2}
          />
          <AppTextInput
            inputPlaceHolder={'Product Price Here'}
            containerBg={AppColors.WHITE}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputContainerPaddingHorizontal={2}
          />
          <AppTextInput
            inputPlaceHolder={'In Stock'}
            containerBg={AppColors.WHITE}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputContainerPaddingHorizontal={2}
            inputWidth={78}
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
          <AppTextInput
            inputPlaceHolder={'High Priority (Always notify instantly)'}
            containerBg={AppColors.WHITE}
            borderWidth={1}
            borderColor={AppColors.LIGHTGRAY}
            inputContainerPaddingHorizontal={2}
            inputWidth={78}
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
        <LineBreak space={4} />
        <AppButton
          title="Add To Wishlist"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          //   handlePress={}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default AddProduct;
