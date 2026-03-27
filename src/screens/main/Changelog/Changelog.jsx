/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
  Linking,
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
import LazyImage from '../../../components/LazyImage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {getSiteChangelog, markChangesRead} from '../../../GlobalFunctions';
import {useSelector} from 'react-redux';

const changeTypes = [
  {value: '', label: 'All'},
  {value: 'new_product', label: 'New'},
  {value: 'removed_product', label: 'Removed'},
  {value: 'price_change', label: 'Price'},
  {value: 'stock_change', label: 'Stock'},
  {value: 'back_in_stock', label: 'Back in Stock'},
];

const getChangeIcon = type => {
  switch (type) {
    case 'new_product':
      return '🆕';
    case 'removed_product':
      return '🗑️';
    case 'price_change':
      return '💰';
    case 'stock_change':
      return '📦';
    case 'back_in_stock':
      return '✅';
    default:
      return '🔔';
  }
};

const getChangeTypeColor = type => {
  switch (type) {
    case 'new_product':
      return {bg: '#E8F5E9', text: '#2E7D32'};
    case 'removed_product':
      return {bg: '#FFEBEE', text: '#C62828'};
    case 'price_change':
      return {bg: '#FFF3E0', text: '#E65100'};
    case 'stock_change':
      return {bg: '#E3F2FD', text: '#1565C0'};
    case 'back_in_stock':
      return {bg: '#E8F5E9', text: '#1B5E20'};
    default:
      return {bg: '#F5F5F5', text: '#616161'};
  }
};

const getChangeLabel = type => {
  switch (type) {
    case 'new_product':
      return 'New Product';
    case 'removed_product':
      return 'Removed';
    case 'price_change':
      return 'Price Change';
    case 'stock_change':
      return 'Stock Change';
    case 'back_in_stock':
      return 'Back in Stock';
    default:
      return type;
  }
};

const Changelog = () => {
  const [changes, setChanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const {_id} = useSelector(state => state?.user?.userData);
  const isFocus = useIsFocused();

  const fetchChanges = useCallback(
    async (p = 1, append = false) => {
      if (p === 1 && !append) setIsLoading(true);
      try {
        const response = await getSiteChangelog(_id, p, 30, filterType);
        if (response?.success) {
          const newChanges = response.data || [];
          if (append) {
            setChanges(prev => [...prev, ...newChanges]);
          } else {
            setChanges(newChanges);
          }
          setHasMore(
            response.pagination
              ? p < response.pagination.pages
              : newChanges.length === 30,
          );

          // Auto-mark as read
          const unreadIds = newChanges
            .filter(c => !c.isRead)
            .map(c => c._id);
          if (unreadIds.length > 0) {
            markChangesRead(unreadIds).catch(() => {});
          }
        }
      } catch (error) {}
      setIsLoading(false);
      setLoadingMore(false);
    },
    [_id, filterType],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchChanges(1, false);
    setRefreshing(false);
  }, [fetchChanges]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore || isLoading) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchChanges(nextPage, true);
  }, [hasMore, loadingMore, isLoading, page, fetchChanges]);

  useEffect(() => {
    setPage(1);
    fetchChanges(1, false);
  }, [fetchChanges]);

  // Refetch on focus
  useEffect(() => {
    if (isFocus) {
      setPage(1);
      fetchChanges(1, false);
    }
  }, [isFocus]);

  const getTimeAgo = dateStr => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  const renderChange = ({item}) => {
    const typeColor = getChangeTypeColor(item.changeType);
    return (
      <View
        style={{
          backgroundColor: item.isRead ? AppColors.WHITE : '#FAFFFE',
          borderWidth: 1,
          borderColor: item.isRead ? AppColors.LIGHTGRAY : AppColors.themeColor + '30',
          borderRadius: 12,
          padding: responsiveWidth(3.5),
        }}>
        <View style={{flexDirection: 'row', gap: responsiveWidth(3)}}>
          {/* Icon */}
          <AppText title={getChangeIcon(item.changeType)} textSize={2} />

          {/* Content */}
          <View style={{flex: 1}}>
            <AppText
              title={item.summary}
              textColor={AppColors.BLACK}
              textSize={1.4}
              numberOfLines={2}
            />

            {/* Site name */}
            {item.siteId && typeof item.siteId === 'object' && (
              <AppText
                title={`${item.siteId.name} · ${item.siteId.domain}`}
                textColor={AppColors.GRAY}
                textSize={1.2}
              />
            )}

            {/* Old → New values */}
            {item.oldValue && item.newValue && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: AppColors.LIGHTESTGRAY,
                  padding: responsiveWidth(2),
                  borderRadius: 6,
                  marginTop: responsiveHeight(0.5),
                  gap: 4,
                }}>
                <AppText
                  title={item.oldValue}
                  textColor={AppColors.RED_COLOR}
                  textSize={1.2}
                />
                <AppText title={'→'} textColor={AppColors.GRAY} textSize={1.2} />
                <AppText
                  title={item.newValue}
                  textColor={AppColors.lightGreen}
                  textSize={1.2}
                  textFontWeight
                />
              </View>
            )}

            {/* Meta row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveWidth(2),
                marginTop: responsiveHeight(0.5),
                flexWrap: 'wrap',
              }}>
              <View
                style={{
                  backgroundColor: typeColor.bg,
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: 2,
                  borderRadius: 4,
                }}>
                <AppText
                  title={getChangeLabel(item.changeType)}
                  textColor={typeColor.text}
                  textSize={1}
                  textFontWeight
                />
              </View>
              <AppText
                title={getTimeAgo(item.detectedAt)}
                textColor={AppColors.DARKGRAY}
                textSize={1.1}
              />
              {item.productSnapshot?.url && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.productSnapshot.url)}
                  style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                  <Feather
                    size={responsiveFontSize(1.1)}
                    name={'external-link'}
                    color={AppColors.themeColor}
                  />
                  <AppText
                    title={'View'}
                    textColor={AppColors.themeColor}
                    textSize={1.1}
                  />
                </TouchableOpacity>
              )}
              {!item.isRead && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: AppColors.themeColor,
                  }}
                />
              )}
            </View>
          </View>

          {/* Product image */}
          {item.productSnapshot?.image && (
            <LazyImage
              source={{uri: item.productSnapshot.image}}
              style={{
                width: responsiveWidth(11),
                height: responsiveWidth(11),
                borderRadius: 8,
              }}
              resizeMode="cover"
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <View style={{flex: 1, paddingHorizontal: responsiveWidth(4)}}>
        <LineBreak space={2} />
        <AppText
          title={'Changelog'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
        <AppText
          title={'All detected changes across your sites'}
          textColor={AppColors.GRAY}
          textSize={1.4}
        />

        <LineBreak space={1.5} />

        {/* Filter chips */}
        <FlatList
          data={changeTypes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.value}
          contentContainerStyle={{gap: responsiveWidth(2)}}
          renderItem={({item: ct}) => (
            <TouchableOpacity
              onPress={() => {
                setFilterType(ct.value);
                setPage(1);
              }}
              style={{
                paddingHorizontal: responsiveWidth(3.5),
                paddingVertical: responsiveHeight(0.7),
                borderRadius: 20,
                backgroundColor:
                  filterType === ct.value
                    ? AppColors.themeColor
                    : AppColors.LIGHTESTGRAY,
              }}>
              <AppText
                title={ct.label}
                textColor={
                  filterType === ct.value ? AppColors.WHITE : AppColors.GRAY
                }
                textSize={1.3}
                textFontWeight={filterType === ct.value}
              />
            </TouchableOpacity>
          )}
        />

        <LineBreak space={1.5} />

        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={AppColors.themeColor} />
          </View>
        ) : (
          <FlatList
            data={changes}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <LineBreak space={1} />}
            contentContainerStyle={{paddingBottom: responsiveHeight(10)}}
            showsVerticalScrollIndicator={false}
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
                  paddingVertical: responsiveHeight(15),
                }}>
                <FontAwesome
                  size={responsiveFontSize(4)}
                  name={'bell-o'}
                  color={AppColors.LIGHTGRAY}
                />
                <LineBreak space={1.5} />
                <AppText
                  title={'No changes detected yet'}
                  textColor={AppColors.GRAY}
                  textSize={1.6}
                  textFontWeight
                />
                <LineBreak space={0.5} />
                <AppText
                  title={'Changes will appear here once your sites are crawled'}
                  textColor={AppColors.DARKGRAY}
                  textSize={1.3}
                />
              </View>
            }
            renderItem={renderChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Changelog;
