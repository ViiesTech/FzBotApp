/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useRef} from 'react';
import {
  Image,
  View,
  ActivityIndicator,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import {AppColors} from '../utils';

interface LazyImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  loaderSize?: 'small' | 'large';
  loaderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const LazyImage: React.FC<LazyImageProps> = ({
  source,
  style,
  resizeMode,
  loaderSize = 'small',
  loaderColor = AppColors.themeColor,
  containerStyle,
}) => {
  // Determine if this is a network image (needs lazy loading) or local asset
  const isNetworkImage =
    source && typeof source === 'object' && 'uri' in source && !!source.uri;

  const [loaded, setLoaded] = useState(!isNetworkImage);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);

  // Extract borderRadius and dimensions from image style so the overlay matches
  const flatStyle = StyleSheet.flatten(style) || {};
  const {
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    width,
    height,
  } = flatStyle;

  const overlayStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  };

  // Use onLoadEnd — fires on BOTH success and failure on all platforms.
  // This is the most reliable callback on Android where onLoad can be skipped for cached images.
  const handleLoadEnd = useCallback(() => {
    if (mountedRef.current) {
      setLoaded(true);
    }
  }, []);

  const handleError = useCallback(() => {
    if (mountedRef.current) {
      setLoaded(true);
      setError(true);
    }
  }, []);

  return (
    <View
      style={[
        {overflow: 'hidden', width, height, borderRadius},
        containerStyle,
      ]}>
      <Image
        source={source}
        style={style}
        resizeMode={resizeMode}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
      {!loaded && (
        <View style={overlayStyle}>
          <ActivityIndicator size={loaderSize} color={loaderColor} />
        </View>
      )}
      {error && loaded && (
        <View style={overlayStyle}>
          <ActivityIndicator size={loaderSize} color={'#CCCCCC'} />
        </View>
      )}
    </View>
  );
};

export default LazyImage;
