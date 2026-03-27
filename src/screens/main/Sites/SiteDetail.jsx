/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import AppTextInput from '../../../components/AppTextInput';
import LazyImage from '../../../components/LazyImage';
import AppHeader from '../../../components/AppHeader';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getSiteProducts, recrawlSite} from '../../../GlobalFunctions';
import {useNavigation} from '@react-navigation/native';

const SiteDetail = ({route}) => {
  const nav = useNavigation();
  const {site} = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [recrawling, setRecrawling] = useState(false);
  const [statusFilter, setStatusFilter] = useState('active');

  const fetchProducts = useCallback(
    async (p = 1, append = false) => {
      if (p === 1 && !append) setIsLoading(true);
      try {
        const response = await getSiteProducts(
          site._id,
          p,
          50,
          searchQuery,
          statusFilter,
        );
        if (response?.success) {
          const newProducts = response.data || [];
          if (append) {
            setProducts(prev => [...prev, ...newProducts]);
          } else {
            setProducts(newProducts);
          }
          setHasMore(
            response.pagination
              ? p < response.pagination.pages
              : newProducts.length === 50,
          );
        }
      } catch (error) {}
      setIsLoading(false);
      setLoadingMore(false);
    },
    [site._id, searchQuery, statusFilter],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchProducts(1, false);
    setRefreshing(false);
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore || isLoading) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, true);
  }, [hasMore, loadingMore, isLoading, page, fetchProducts]);

  const handleRecrawl = async () => {
    setRecrawling(true);
    try {
      await recrawlSite(site._id);
    } catch (error) {}
    setRecrawling(false);
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(1, false);
  }, [fetchProducts]);

  const getAvailabilityColor = availability => {
    if (!availability) return AppColors.GRAY;
    const lower = availability.toLowerCase();
    if (lower.includes('out') || lower.includes('sold'))
      return AppColors.RED_COLOR;
    if (lower.includes('in stock')) return AppColors.lightGreen;
    return AppColors.GRAY;
  };

  const getAvailabilityText = availability => {
    if (!availability) return 'Unknown';
    const lower = availability.toLowerCase();
    if (lower.includes('out') || lower.includes('sold')) return 'Out of Stock';
    if (lower.includes('in stock') || lower === 'in stock') return 'In Stock';
    return availability;
  };

  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: AppColors.LIGHTGRAY,
        borderRadius: 10,
        width: responsiveWidth(44),
        overflow: 'hidden',
      }}
      onPress={() => nav.navigate('ProductDetail', {product: item})}
      activeOpacity={0.7}>
      <LazyImage
        source={{uri: item.image}}
        style={{
          width: responsiveWidth(44),
          height: responsiveHeight(12),
        }}
        resizeMode="cover"
      />
      <View style={{padding: responsiveWidth(2.5), gap: responsiveHeight(0.5)}}>
        <AppText
          title={item.title || 'Untitled'}
          textColor={AppColors.BLACK}
          textSize={1.4}
          textFontWeight
          numberOfLines={2}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <AppText
            title={item.price || 'N/A'}
            textColor={AppColors.themeColor}
            textSize={1.5}
            textFontWeight
          />
          <View
            style={{
              backgroundColor: getAvailabilityColor(item.availability),
              paddingHorizontal: responsiveWidth(2),
              paddingVertical: 2,
              borderRadius: 4,
            }}>
            <AppText
              title={getAvailabilityText(item.availability)}
              textColor={AppColors.WHITE}
              textSize={1}
              textFontWeight
            />
          </View>
        </View>

        {/* Price history indicator */}
        {item.priceHistory && item.priceHistory.length > 1 && (
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
            <MaterialCommunityIcons
              size={responsiveFontSize(1.2)}
              name={'chart-line'}
              color={AppColors.GRAY}
            />
            <AppText
              title={`${item.priceHistory.length} price changes`}
              textColor={AppColors.GRAY}
              textSize={1}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
      {/* Site info bar */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: AppColors.LIGHTESTGRAY,
          padding: responsiveWidth(3),
          borderRadius: 10,
          marginBottom: responsiveHeight(1.5),
        }}>
        <View style={{flex: 1}}>
          <AppText
            title={`${products.length}${hasMore ? '+' : ''} products`}
            textColor={AppColors.BLACK}
            textSize={1.4}
            textFontWeight
          />
          <AppText
            title={site.domain}
            textColor={AppColors.GRAY}
            textSize={1.2}
          />
        </View>
        <TouchableOpacity
          onPress={handleRecrawl}
          disabled={recrawling}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: AppColors.themeColor,
            paddingHorizontal: responsiveWidth(3),
            paddingVertical: responsiveHeight(0.8),
            borderRadius: 8,
          }}>
          {recrawling ? (
            <ActivityIndicator size="small" color={AppColors.WHITE} />
          ) : (
            <>
              <Ionicons
                size={responsiveFontSize(1.4)}
                name={'refresh'}
                color={AppColors.WHITE}
              />
              <AppText
                title={'Recrawl'}
                textColor={AppColors.WHITE}
                textSize={1.2}
                textFontWeight
              />
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Status filter */}
      <View
        style={{
          flexDirection: 'row',
          gap: responsiveWidth(2),
          marginBottom: responsiveHeight(1.5),
        }}>
        {['active', 'removed', 'all'].map(st => (
          <TouchableOpacity
            key={st}
            onPress={() => setStatusFilter(st)}
            style={{
              paddingHorizontal: responsiveWidth(3.5),
              paddingVertical: responsiveHeight(0.6),
              borderRadius: 20,
              backgroundColor:
                statusFilter === st
                  ? AppColors.themeColor
                  : AppColors.LIGHTESTGRAY,
            }}>
            <AppText
              title={st.charAt(0).toUpperCase() + st.slice(1)}
              textColor={
                statusFilter === st ? AppColors.WHITE : AppColors.GRAY
              }
              textSize={1.3}
              textFontWeight={statusFilter === st}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader onBackPress heading={site.name} />

      <View style={{paddingHorizontal: responsiveWidth(4)}}>
        <AppTextInput
          inputPlaceHolder={'Search products...'}
          containerBg={AppColors.WHITE}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          inputWidth={80}
          fontSize={1.5}
          value={searchQuery}
          onChangeText={setSearchQuery}
          rightIcon={
            <TouchableOpacity>
              <Feather
                size={responsiveFontSize(2)}
                name={'search'}
                color={AppColors.GRAY}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <LineBreak space={1.5} />

      <View style={{flex: 1, paddingHorizontal: responsiveWidth(4)}}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={AppColors.themeColor} />
          </View>
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={item => item._id}
            ListHeaderComponent={ListHeader}
            ItemSeparatorComponent={() => <LineBreak space={1} />}
            columnWrapperStyle={{gap: responsiveWidth(3)}}
            contentContainerStyle={{paddingBottom: responsiveHeight(10)}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loadingMore ? (
                <View style={{paddingVertical: responsiveHeight(2)}}>
                  <ActivityIndicator
                    size="small"
                    color={AppColors.themeColor}
                  />
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: responsiveHeight(10),
                }}>
                <Ionicons
                  size={responsiveFontSize(4)}
                  name={'cube-outline'}
                  color={AppColors.LIGHTGRAY}
                />
                <LineBreak space={1} />
                <AppText
                  title={
                    site.status === 'active'
                      ? 'Products are being discovered...'
                      : 'No products found'
                  }
                  textColor={AppColors.GRAY}
                  textSize={1.5}
                />
                <AppText
                  title={'Pull down to refresh'}
                  textColor={AppColors.DARKGRAY}
                  textSize={1.3}
                />
              </View>
            }
            renderItem={renderProduct}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SiteDetail;
