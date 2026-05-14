/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppTextComps/AppText';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';

const normalizeUrl = url => {
  const raw = (url || '').trim();
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
};

const ProductWebView = ({route}) => {
  const {url, title} = route.params || {};
  const productUrl = useMemo(() => normalizeUrl(url), [url]);

  const openExternal = async () => {
    if (!productUrl) return;
    const canOpen = await Linking.canOpenURL(productUrl);
    if (canOpen) {
      await Linking.openURL(productUrl);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader onBackPress heading={title || 'Product'} />

      {productUrl ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: responsiveWidth(4),
              marginBottom: responsiveHeight(1),
              paddingHorizontal: responsiveWidth(3),
              paddingVertical: responsiveHeight(1),
              borderWidth: 1,
              borderColor: AppColors.LIGHTGRAY,
              borderRadius: 8,
              gap: responsiveWidth(2),
            }}>
            <AppText
              title={productUrl}
              textColor={AppColors.GRAY}
              textSize={1.2}
              numberOfLines={1}
              textwidth={70}
            />
            <TouchableOpacity
              onPress={openExternal}
              style={{
                width: responsiveHeight(4),
                height: responsiveHeight(4),
                borderRadius: responsiveHeight(2),
                backgroundColor: AppColors.themeColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="open-outline"
                size={responsiveFontSize(2)}
                color={AppColors.WHITE}
              />
            </TouchableOpacity>
          </View>

          <WebView
            source={{uri: productUrl}}
            startInLoadingState
            renderLoading={() => (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: AppColors.WHITE,
                }}>
                <ActivityIndicator
                  size="large"
                  color={AppColors.themeColor}
                />
              </View>
            )}
          />
        </>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: responsiveWidth(8),
          }}>
          <Ionicons
            name="link-outline"
            size={responsiveFontSize(5)}
            color={AppColors.LIGHTGRAY}
          />
          <AppText
            title="Product link is unavailable"
            textColor={AppColors.GRAY}
            textSize={1.5}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductWebView;
