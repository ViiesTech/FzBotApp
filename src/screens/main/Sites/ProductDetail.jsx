/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Linking,
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
import AppText from '../../../components/AppTextComps/AppText';
import AppButton from '../../../components/AppButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const ProductDetail = ({route}) => {
  const product = route?.params?.product || {};
  const {
    title = 'Product',
    image = '',
    price = '',
    availability = '',
    description = '',
    url = '',
    status = 'active',
    firstSeenAt = '',
    lastSeenAt = '',
    priceHistory = [],
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

  const isInStock = () => {
    if (!availability) return true;
    const lower = availability.toLowerCase();
    return !lower.includes('out') && !lower.includes('sold');
  };

  const getAvailabilityText = () => {
    if (!availability || availability === 'In Stock' || isInStock())
      return 'In Stock';
    return 'Out of Stock';
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

          {/* Title + Availability */}
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

            <View
              style={{
                backgroundColor: isInStock()
                  ? AppColors.lightGreen
                  : AppColors.RED_COLOR,
                paddingHorizontal: responsiveWidth(2.5),
                paddingVertical: responsiveHeight(0.5),
                height: responsiveHeight(3.5),
                justifyContent: 'center',
                marginTop: responsiveHeight(0.5),
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <AppText
                title={getAvailabilityText()}
                textColor={AppColors.WHITE}
                textSize={1.5}
                textFontWeight
              />
            </View>
          </View>

          {/* Status badge if removed */}
          {status === 'removed' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: '#FFF3CD',
                padding: responsiveWidth(3),
                borderRadius: 8,
              }}>
              <Feather
                size={responsiveFontSize(1.5)}
                name={'alert-triangle'}
                color={'#856404'}
              />
              <AppText
                title={'This product is no longer listed on the website'}
                textColor={'#856404'}
                textSize={1.4}
              />
            </View>
          )}

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

          {/* Description */}
          {description ? (
            <AppText
              title={'Description: '}
              textColor={AppColors.BLACK}
              textSize={2}
              textFontWeight>
              <AppText
                title={description}
                textColor={AppColors.GRAY}
                textSize={1.6}
              />
            </AppText>
          ) : null}

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

          {/* Price History */}
          {priceHistory && priceHistory.length > 1 && (
            <View style={{gap: responsiveHeight(1)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}>
                <MaterialCommunityIcons
                  size={responsiveFontSize(2)}
                  name={'chart-line'}
                  color={AppColors.themeColor}
                />
                <AppText
                  title={'Price History'}
                  textColor={AppColors.BLACK}
                  textSize={2}
                  textFontWeight
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: AppColors.LIGHTGRAY,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                {priceHistory
                  .slice()
                  .reverse()
                  .map((entry, index) => {
                    const prevEntry =
                      index < priceHistory.length - 1
                        ? priceHistory[priceHistory.length - 2 - index]
                        : null;
                    const isLatest = index === 0;
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: responsiveWidth(3),
                          paddingVertical: responsiveHeight(1.2),
                          backgroundColor: isLatest
                            ? AppColors.LIGHTESTGRAY
                            : AppColors.WHITE,
                          borderBottomWidth:
                            index < priceHistory.length - 1 ? 1 : 0,
                          borderBottomColor: AppColors.LIGHTGRAY,
                        }}>
                        <View style={{flex: 1}}>
                          <AppText
                            title={entry.price || 'N/A'}
                            textColor={
                              isLatest
                                ? AppColors.themeColor
                                : AppColors.BLACK
                            }
                            textSize={1.6}
                            textFontWeight={isLatest}
                          />
                          {isLatest && (
                            <AppText
                              title={'Current'}
                              textColor={AppColors.themeColor}
                              textSize={1.1}
                            />
                          )}
                        </View>
                        <AppText
                          title={formatDate(entry.recordedAt)}
                          textColor={AppColors.GRAY}
                          textSize={1.2}
                        />
                      </View>
                    );
                  })}
              </View>
            </View>
          )}
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
