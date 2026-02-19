/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import LazyImage from '../../../components/LazyImage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppImages } from '../../../assets/images';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getAllProducts, removeFromWishList } from '../../../GlobalFunctions';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { HomeLoader } from '../../../components/AppTextComps/HomeLoader';

const data = [
  {
    id: 1,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
  {
    id: 2,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
  {
    id: 3,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
  {
    id: 4,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
  {
    id: 5,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
  {
    id: 6,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
  {
    id: 7,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
  {
    id: 8,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
  {
    id: 9,
    productImg: AppImages.product2,
    name: 'iPhone 14 Pro',
    price: '$ 890.00',
    tag: 'In Stock',
    time: '5 mins ago',
  },
];

const Home = ({ navigation }) => {
  const nav = useNavigation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const { _id, name, FCMToken } = useSelector(state => state?.user?.userData);
  const { userData } = useSelector(state => state?.user);
  const isFocus = useIsFocused();
  const [skeletonCount, setSkeletonCount] = useState(6);
  const getAllProductsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProducts(_id);
      setData(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const removeWishlistHandler = async id => {
    setDelLoading(true);
    try {
      const response = await removeFromWishList(id, navigation, false);
      if (response?.success) {
        getAllProductsHandler();
      }
      setDelLoading(false);
    } catch (error) {
      setDelLoading(false);
    }
  };
  useEffect(() => {
    getAllProductsHandler();
  }, [isFocus]);

  // Filter products by search query
  const filteredData = searchQuery.trim()
    ? data.filter(item => {
        const q = searchQuery.toLowerCase();
        return (
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.price && item.price.toLowerCase().includes(q)) ||
          (item.availability && item.availability.toLowerCase().includes(q))
        );
      })
    : data;

  // Get badge color based on availability (only In Stock = green, Out of Stock = red)
  const getAvailabilityColor = (availability) => {
    if (!availability) return AppColors.lightGreen;
    const lower = availability.toLowerCase();
    if (lower.includes('out') || lower.includes('sold')) return AppColors.RED_COLOR;
    return AppColors.lightGreen;
  };

  // Normalize availability display text
  const getAvailabilityText = (availability) => {
    if (!availability) return 'In Stock';
    const lower = availability.toLowerCase();
    if (lower === 'in stock' || lower === 'out of stock') return availability;
    if (lower.includes('out') || lower.includes('sold')) return 'Out of Stock';
    return 'In Stock';
  };

  // Format time ago
  const getTimeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const WatchlistHeader = () => (
    <>
      <AppText
        title={'Watchlist'}
        textColor={AppColors.BLACK}
        textSize={2}
        textFontWeight
      />
      <LineBreak space={2} />
    </>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: AppColors.LIGHTGRAY,
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(1),
        borderRadius: 8,
        width: responsiveWidth(45),
        gap: responsiveHeight(1),
      }}
      onPress={() => nav.navigate('HomeDetails', { data: item })}
    >
      <LazyImage
        source={{ uri: item.image }}
        style={{
          width: responsiveWidth(40),
          height: responsiveHeight(10),
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <AppText
          textwidth={20}
          numberOfLines={1}
          title={item.title}
          textColor={AppColors.BLACK}
          textSize={1.6}
          textFontWeight
        />

        <View
          style={{
            backgroundColor: getAvailabilityColor(item.availability),
            paddingHorizontal: responsiveWidth(2.5),
            paddingVertical: responsiveHeight(0.5),
            borderRadius: 5,
          }}
        >
          <AppText
            title={getAvailabilityText(item.availability)}
            textColor={AppColors.WHITE}
            textSize={1.2}
            textFontWeight
          />
        </View>
      </View>

      <AppText
        title={item.price}
        textColor={AppColors.GRAY}
        textSize={1.8}
        textFontWeight
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <AppText
          title={`last checked: ${item.lastCheckedAt ? getTimeAgo(item.lastCheckedAt) : 'Never'}`}
          textColor={AppColors.GRAY}
          textSize={1.2}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: 6,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity>
            <FontAwesome
              size={responsiveFontSize(1.7)}
              name={'bell'}
              color={AppColors.themeColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeWishlistHandler(item?._id)}
          >
            <Ionicons
              size={responsiveFontSize(1.7)}
              name={'trash-sharp'}
              color={AppColors.themeColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <View style={{ flex: 1, paddingHorizontal: responsiveWidth(4) }}>
        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={`Hi, ${name}`}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
          <AppButton
            title="Add Product"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.BTNCOLOURS}
            handlePress={() => nav.navigate('AddProduct')}
            textFontWeight={true}
            btnWidth={26}
            btnPadding={10}
            textSize={1.5}
            borderRadius={10}
          />
        </View>

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder={'Search...'}
          containerBg={AppColors.WHITE}
          borderWidth={1}
          inputContainerPaddingHorizontal={2}
          borderColor={AppColors.LIGHTGRAY}
          inputWidth={80}
          fontSize={1.6}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
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

        <LineBreak space={2} />

        {isLoading ? (
          <FlatList
            data={Array(skeletonCount).fill({})}
            numColumns={2}
            ListHeaderComponent={WatchlistHeader}
            ItemSeparatorComponent={<LineBreak space={1} />}
            columnWrapperStyle={{ gap: responsiveHeight(1) }}
            contentContainerStyle={{ paddingBottom: responsiveHeight(10) }}
            showsVerticalScrollIndicator={false}
            renderItem={() => <HomeLoader />}
          />
        ) : delLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            numColumns={2}
            ListHeaderComponent={WatchlistHeader}
            ItemSeparatorComponent={<LineBreak space={1} />}
            columnWrapperStyle={{ gap: responsiveHeight(1) }}
            contentContainerStyle={{ paddingBottom: responsiveHeight(10) }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={{ alignItems: 'center', paddingVertical: responsiveHeight(10) }}>
                <AppText
                  title={searchQuery ? 'No products match your search' : 'No products in your watchlist'}
                  textColor={AppColors.GRAY}
                  textSize={1.6}
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

export default Home;
