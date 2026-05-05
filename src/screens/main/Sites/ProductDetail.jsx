/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Linking,
  ScrollView,
} from 'react-native';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import LazyImage from '../../../components/LazyImage';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppTextComps/AppText';
import AppButton from '../../../components/AppButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProductDetail = ({route}) => {
  const product = route?.params?.product || {};
  const {
    title = 'Product',
    image = '',
    price = '',
    url = '',
    firstSeenAt = '',
    lastSeenAt = '',
  } = product;

  const getTimeAgo = dateStr => {
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

  const formatDate = dateStr => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.WHITE,
        paddingBottom: responsiveHeight(2),
      }}>
      <AppHeader onBackPress={true} heading={'Product Details'} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: responsiveHeight(4)}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: responsiveWidth(4),
            gap: responsiveHeight(2),
          }}>
          {/* Product Image */}
          <LazyImage
            source={{uri: image}}
            style={{
              width: responsiveWidth(92),
              height: responsiveHeight(25),
              borderWidth: 1.5,
              borderColor: '#DFDFDF',
              borderRadius: 10,
            }}
          />

          {/* Title */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <AppText
              title={'Product Title: '}
              textColor={AppColors.BLACK}
              textSize={2}
              textwidth={67}
              textFontWeight>
              <AppText
                title={title}
                textColor={AppColors.GRAY}
                textSize={2}
              />
            </AppText>
          </View>

          {/* Product URL */}
          <AppText
            title={'Product URL: '}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight>
            <AppText
              onPress={() => Linking.openURL(url)}
              title={url}
              textColor={AppColors.LIGHT_BLUE}
              textSize={1.6}
            />
          </AppText>

          {/* Price */}
          <AppText
            title={'Price: '}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight>
            <AppText
              title={price || 'N/A'}
              textColor={AppColors.GRAY}
              textSize={1.6}
            />
          </AppText>

          {/* Timestamps */}
          <View style={{gap: responsiveHeight(0.5)}}>
            <AppText
              title={`First seen: ${formatDate(firstSeenAt)}`}
              textColor={AppColors.GRAY}
              textSize={1.4}
            />
            <AppText
              title={`Last seen: ${getTimeAgo(lastSeenAt)}`}
              textColor={AppColors.GRAY}
              textSize={1.4}
            />
          </View>

        </View>

        {/* View on Website button */}
        <View
          style={{
            paddingHorizontal: responsiveWidth(4),
            paddingTop: responsiveHeight(3),
          }}>
          <AppButton
            title={'View on Website'}
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.themeColor}
            handlePress={() => Linking.openURL(url)}
            textFontWeight={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
