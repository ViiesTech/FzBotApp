/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import {
  AddToWishlist,
  fetchDetails,
  ShowToast,
} from '../../../GlobalFunctions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';
import { FetchProductLoader } from '../../../components/AppTextComps/HomeLoader';
import LazyImage from '../../../components/LazyImage';

const AddProduct = ({ navigation }) => {
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [wishListLoading, setWishListLoading] = useState(false);
  const { userData } = useSelector(state => state?.user);
  const [data, setData] = useState();
  const fetchDetailsHandler = async () => {
    if (!value) {
      return ShowToast('error', 'Url Is Required.');
    }
    setIsLoading(true);
    setData(undefined);
    try {
      const response = await fetchDetails(value);
      if (response) {
        setData(response);
      } else {
        ShowToast('error', 'Could not fetch product details. The website may be blocking automated access.');
      }
    } catch (error) {
      ShowToast('error', 'Failed to fetch details. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const AddToWishlistHandler = async () => {
    if (!value) {
      return ShowToast('error', 'Product Url Is Required');
    } else if (data?.length < 1) {
      return ShowToast('error', 'Product Data Is Empty');
    } else {
      const { title, availability, price, image, description } = data;
      setWishListLoading(true);
      try {
        await AddToWishlist(
          userData?._id,
          value,
          title,
          availability,
          price,
          image,
          description,
          navigation,
        );
        setWishListLoading(false);
      } catch (error) {
        setWishListLoading(false);
        console.log('error', error);
      }
    }
  };
  return (
    <Container paddingBottom={2}>
      <AppHeader onBackPress={true} heading={'Add Product'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View>
          <AppTextInput
            inputPlaceHolder={'Search...'}
            onChangeText={text => setValue(text)}
            inputHeight={5}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
            containerBg={AppColors.WHITE}
            borderWidth={1}
            value={value}
            inputContainerPaddingHorizontal={2}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={57}
            paddingVertical={-1}
            rightIcon={
              <View>
                <AppButton
                  title={isLoading ? 'Fetching...' : 'Fetch Details'}
                  textColor={AppColors.WHITE}
                  btnBackgroundColor={AppColors.BTNCOLOURS}
                  handlePress={fetchDetailsHandler}
                  disabled={isLoading}
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

        <View style={{ gap: responsiveHeight(2) }}>
          {isLoading ? (
            // 🔹 Skeleton Placeholder while loading
            <FetchProductLoader />
          ) : (
            // 🔹 Actual product details or placeholders
            <>
              {data?.image ? (
                <LazyImage
                  source={{ uri: data?.image }}
                  // resizeMode='stretch'
                  style={{
                    height: responsiveHeight(25),
                    width: responsiveWidth(90),
                    borderWidth: 1.5,
                    borderColor: '#DFDFDF',
                    borderRadius: responsiveHeight(2),
                  }}
                />
              ) : (
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
                  {/* <MaterialIcons
            size={responsiveFontSize(6)}
            name={'cloud-upload'}
            color={AppColors.GRAY}
          /> */}
                  <AppText
                    title={'Product Image ———'}
                    textColor={AppColors.GRAY}
                    textSize={2}
                  />
                </TouchableOpacity>
              )}
              <View style={{ gap: responsiveHeight(1) }}>
                <AppText
                  title="Product Title"
                  textSize={2}
                  textColor="#50555C"
                />
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: '#DFDFDF',
                    padding: responsiveHeight(2),
                    borderRadius: responsiveHeight(1.5),
                  }}
                >
                  <AppText
                    title={data?.title ? data?.title : 'Product Title —'}
                    textColor="#50555C"
                    textSize={1.7}
                  />
                </View>
              </View>
              <View style={{ gap: responsiveHeight(1) }}>
                <AppText
                  title="Product Price"
                  textSize={2}
                  textColor="#50555C"
                />
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: '#DFDFDF',
                    padding: responsiveHeight(2),
                    borderRadius: responsiveHeight(1.5),
                  }}
                >
                  <AppText
                    title={data?.price ? data?.price : 'Product Price —'}
                    textColor="#50555C"
                    textSize={1.7}
                  />
                </View>
              </View>
              <View style={{ gap: responsiveHeight(1) }}>
                <AppText
                  title="Product Description"
                  textSize={2}
                  textColor="#50555C"
                />
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: '#DFDFDF',
                    padding: responsiveHeight(2),
                    borderRadius: responsiveHeight(1.5),
                  }}
                >
                  <AppText
                    title={
                      data?.description
                        ? data?.description
                        : 'Product Description —'
                    }
                    textColor="#50555C"
                    textSize={1.7}
                  />
                </View>
              </View>
              <View style={{ gap: responsiveHeight(1) }}>
                <AppText
                  title="Product Availability"
                  textSize={2}
                  textColor="#50555C"
                />
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: '#DFDFDF',
                    padding: responsiveHeight(2),
                    borderRadius: responsiveHeight(1.5),
                  }}
                >
                  <AppText
                    title={data?.availability ? data?.availability : 'Stock —'}
                    textColor="#50555C"
                    textSize={1.7}
                  />
                </View>
              </View>
            </>
          )}
        </View>

        <LineBreak space={4} />
        <AppButton
          title={
            wishListLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Add To Wishlist'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          handlePress={AddToWishlistHandler}
          disabled={wishListLoading || !data}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default AddProduct;
