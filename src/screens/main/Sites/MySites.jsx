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
import AppButton from '../../../components/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getSites, deleteSite} from '../../../GlobalFunctions';
import {useSelector} from 'react-redux';

const MySites = () => {
  const nav = useNavigation();
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [delLoading, setDelLoading] = useState(null);
  const {_id, name} = useSelector(state => state?.user?.userData);
  const token = useSelector(state => state?.user?.token);
  const isFocus = useIsFocused();

  const fetchSites = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await getSites(token);
      setSites(response?.data || []);
    } catch (error) {
      // handled in GlobalFunctions
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const onRefresh = useCallback(async () => {
    if (!token) return;
    setRefreshing(true);
    try {
      const response = await getSites(token);
      setSites(response?.data || []);
    } catch (error) {}
    setRefreshing(false);
  }, [token]);

  const handleDelete = async siteId => {
    setDelLoading(siteId);
    try {
      const response = await deleteSite(token, siteId);
      if (response?.success) {
        setSites(prev => prev.filter(s => s._id !== siteId));
      }
    } catch (error) {}
    setDelLoading(null);
  };

  useEffect(() => {
    fetchSites();
  }, [isFocus, fetchSites]);

  // Auto-refresh every 15s while any site is crawling
  useEffect(() => {
    const hasCrawling = sites.some(s => s.status === 'crawling');
    if (!hasCrawling) return;
    const interval = setInterval(() => fetchSites(), 15000);
    return () => clearInterval(interval);
  }, [sites, fetchSites]);

  const getStatusColor = status => {
    if (status === 'active') return AppColors.lightGreen;
    if (status === 'error') return AppColors.RED_COLOR;
    if (status === 'crawling') return AppColors.themeColor;
    return AppColors.GRAY;
  };

  const getStatusText = status => {
    if (status === 'active') return 'Active';
    if (status === 'error') return 'Error';
    if (status === 'paused') return 'Paused';
    if (status === 'crawling') return 'Crawling...';
    return status;
  };

  const getTimeAgo = dateStr => {
    if (!dateStr) return 'Never';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const renderSite = ({item}) => (
    <TouchableOpacity
      style={{
        backgroundColor: AppColors.WHITE,
        borderWidth: 1,
        borderColor: AppColors.LIGHTGRAY,
        borderRadius: 12,
        padding: responsiveWidth(4),
        gap: responsiveHeight(1),
      }}
      onPress={() => nav.navigate('SiteDetail', {site: item})}
      activeOpacity={0.7}>
      {/* Header row: domain + status */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, marginRight: responsiveWidth(2)}}>
          <AppText
            title={item.name}
            textColor={AppColors.BLACK}
            textSize={1.7}
            textFontWeight
            numberOfLines={1}
          />
          <AppText
            title={item.domain}
            textColor={AppColors.GRAY}
            textSize={1.3}
            numberOfLines={1}
          />
        </View>
        <View
          style={{
            backgroundColor: getStatusColor(item.status),
            paddingHorizontal: responsiveWidth(2.5),
            paddingVertical: responsiveHeight(0.4),
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}>
          {item.status === 'crawling' && (
            <ActivityIndicator size="small" color={AppColors.WHITE} />
          )}
          <AppText
            title={getStatusText(item.status)}
            textColor={AppColors.WHITE}
            textSize={1.1}
            textFontWeight
          />
        </View>
      </View>

      {/* Stats row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Ionicons
            size={responsiveFontSize(1.4)}
            name={'cube-outline'}
            color={AppColors.GRAY}
          />
          <AppText
            title={`${item.productCount || 0} products`}
            textColor={AppColors.GRAY}
            textSize={1.3}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Feather
            size={responsiveFontSize(1.3)}
            name={'clock'}
            color={AppColors.GRAY}
          />
          <AppText
            title={`Last crawl: ${getTimeAgo(item.lastCrawledAt)}`}
            textColor={AppColors.GRAY}
            textSize={1.2}
          />
        </View>
      </View>

      {/* Error message if exists */}
      {item.status === 'error' && item.lastError ? (
        <AppText
          title={item.lastError}
          textColor={AppColors.RED_COLOR}
          textSize={1.1}
          numberOfLines={2}
        />
      ) : null}

      {/* Actions row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: responsiveWidth(3),
        }}>
        <TouchableOpacity
          onPress={() => Linking.openURL(item.url)}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Feather
            size={responsiveFontSize(1.6)}
            name={'external-link'}
            color={AppColors.themeColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          disabled={delLoading === item._id}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          {delLoading === item._id ? (
            <ActivityIndicator size="small" color={AppColors.RED_COLOR} />
          ) : (
            <Ionicons
              size={responsiveFontSize(1.6)}
              name={'trash-outline'}
              color={AppColors.RED_COLOR}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <View style={{flex: 1, paddingHorizontal: responsiveWidth(4)}}>
        <LineBreak space={2} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <AppText
            title={`Hi, ${name}`}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
          <AppButton
            title="Add Site"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.BTNCOLOURS}
            handlePress={() => nav.navigate('AddSite')}
            textFontWeight={true}
            btnWidth={26}
            btnPadding={10}
            textSize={1.5}
            borderRadius={10}
          />
        </View>

        <LineBreak space={2} />

        {isLoading && sites.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={AppColors.themeColor} />
          </View>
        ) : (
          <FlatList
            data={sites}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <LineBreak space={1.2} />}
            contentContainerStyle={{paddingBottom: responsiveHeight(10)}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: responsiveHeight(15),
                }}>
                <MaterialCommunityIcons
                  size={responsiveFontSize(5)}
                  name={'web'}
                  color={AppColors.LIGHTGRAY}
                />
                <LineBreak space={1.5} />
                <AppText
                  title={'No sites monitored yet'}
                  textColor={AppColors.GRAY}
                  textSize={1.8}
                  textFontWeight
                />
                <LineBreak space={0.5} />
                <AppText
                  title={'Tap "Add Site" to start tracking a website'}
                  textColor={AppColors.DARKGRAY}
                  textSize={1.4}
                />
              </View>
            }
            renderItem={renderSite}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MySites;
