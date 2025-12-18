/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
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
import { removeFromWishList } from '../../../GlobalFunctions';

const HomeDetails = ({ navigation, route }) => {
  const { availability, description, image, price, productLink, title, userId, _id } =
    route?.params?.data;
  console.log('link', productLink);

  const [isLoading, setIsLoading] = useState(false);

  const removeWishlistHandler = async () => {
    setIsLoading(true);
    try {
      await removeFromWishList(_id, navigation, true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.WHITE,
        paddingBottom: responsiveHeight(2),
      }}
    >
      <AppHeader onBackPress={true} heading={'Product Details'} />
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          gap: responsiveHeight(2),
          flex: 1,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: responsiveWidth(92),
            height: responsiveHeight(25),
            borderWidth: 1.5,
            borderColor: '#DFDFDF',
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'center',
          }}
        >
          <AppText
            title={'Product Title: '}
            textColor={AppColors.BLACK}
            textSize={2}
            textwidth={67}
            textFontWeight
          >
            <AppText title={title} textColor={AppColors.GRAY} textSize={2} />
          </AppText>

          <View
            style={{
              backgroundColor: AppColors.lightGreen,
              paddingHorizontal: responsiveWidth(2.5),
              paddingVertical: responsiveHeight(0.5),
              height: responsiveHeight(3.5),
              justifyContent: 'center',
              marginTop: responsiveHeight(0.5),
              alignItems: 'center',
              borderRadius: 5,
            }}
          >
            <AppText
              title={availability}
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
            onPress={() => Linking.openURL(productLink)}
            title={productLink}
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
          <AppText title={price} textColor={AppColors.GRAY} textSize={1.6} />
          {/* {' '}
            <AppText
              title={'($920.00)'}
              textColor={AppColors.GRAY}
              textSize={1.6}
              textDecorationLine={'line-through'}
            />
          </AppText> */}
        </AppText>

        <AppText
          title={'last checked: 5 mins ago'}
          textColor={AppColors.GRAY}
          textSize={1.6}
        />

        {/* <AppTextInput
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
        /> */}
      </View>
      {availability !== 'New Item' && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <AppButton
            title={
              isLoading ? (
                <ActivityIndicator size={'large'} color={AppColors.WHITE} />
              ) : (
                'Remove From Wishlist'
              )
            }
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.themeColor}
            handlePress={removeWishlistHandler}
            textFontWeight={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeDetails;
