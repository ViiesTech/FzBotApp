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
import {useIsFocused} from '@react-navigation/native';
import {getSiteChangelog, markChangesRead} from '../../../GlobalFunctions';
import {useSelector} from 'react-redux';

const changeTypes = [
  {value: '', label: 'All'},
  {value: 'new_product', label: 'New'},
];

const getChangeIcon = type => {
  switch (type) {
    case 'new_product':
      return '🆕';
    default:
      return '🔔';
  }
};

const getChangeTypeColor = type => {
  switch (type) {
    case 'new_product':
      return {bg: '#E8F5E9', text: '#2E7D32'};
    default:
      return {bg: '#F5F5F5', text: '#616161'};
  }
};

const getChangeLabel = type => {
  switch (type) {
    case 'new_product':
      return 'New Product';
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
  const token = useSelector(state => state?.user?.token);
  const isFocus = useIsFocused();

  const fetchChanges = useCallback(
    async (p = 1, append = false) => {
      if (!token) return;
      if (p === 1 && !append) setIsLoading(true);
      try {
        const response = await getSiteChangelog(token, p, 30, filterType);
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
            markChangesRead(token, unreadIds).catch(() => {});
          }
        }
      } catch (error) {}
      setIsLoading(false);
      setLoadingMore(false);
    },
    [token, filterType],
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
  }, [isFocus, fetchChanges]);

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
          title={'New product additions across your sites'}
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
          style={{flexGrow: 0}}
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
                  title={'No new products yet'}
                  textColor={AppColors.GRAY}
                  textSize={1.6}
                  textFontWeight
                />
                <LineBreak space={0.5} />
                <AppText
                  title={'New additions will appear here after crawls'}
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
