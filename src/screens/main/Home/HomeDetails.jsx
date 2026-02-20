/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import LazyImage from '../../../components/LazyImage';
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
  const productData = route?.params?.data || {};
  const { availability = '', description = '', image = '', price = '', productLink = '', title = 'Product', userId = '', _id = '', lastCheckedAt = '' } = productData;

  const [isLoading, setIsLoading] = useState(false);

  // Format time ago
  const getTimeAgo = (dateStr) => {
    if (!dateStr) return 'Never';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: responsiveHeight(4) }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: responsiveWidth(4),
            gap: responsiveHeight(2),
          }}
        >
          <LazyImage
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
              backgroundColor: (!availability || !availability.toLowerCase().includes('out'))
                ? AppColors.lightGreen
                : AppColors.RED_COLOR,
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
              title={(!availability || availability === 'In Stock' || !availability.toLowerCase().includes('out')) ? 'In Stock' : 'Out of Stock'}
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
          title={`last checked: ${getTimeAgo(lastCheckedAt)}`}
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
              paddingHorizontal: responsiveWidth(4),
              paddingTop: responsiveHeight(3),
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeDetails;
