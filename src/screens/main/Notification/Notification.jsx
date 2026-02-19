/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppTextComps/AppText';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import { getNotificationsByUserId } from '../../../GlobalFunctions';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { NotificationLoader } from '../../../components/AppTextComps/HomeLoader';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Notification = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { _id } = useSelector(state => state?.user?.userData || {});
  const [isLoading, setIsLoading] = useState(false);
  const isFocus = useIsFocused();

  const getNotificationsHandler = async () => {
    try {
      setIsLoading(true);
      const response = await getNotificationsByUserId(_id);
      setIsLoading(false);
      setData(response?.notifications || []);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotificationsHandler();
  }, [isFocus]);

  const getNotifIcon = (type) => {
    switch (type) {
      case 'in_stock': return { name: 'checkmark-circle', color: AppColors.lightGreen };
      case 'out_of_stock': return { name: 'close-circle', color: AppColors.RED_COLOR };
      case 'price_change': return { name: 'pricetag', color: '#F5A623' };
      default: return { name: 'notifications', color: AppColors.themeColor };
    }
  };

  const getNotifBadge = (type) => {
    switch (type) {
      case 'in_stock': return { text: 'In Stock', bg: AppColors.lightGreen };
      case 'out_of_stock': return { text: 'Out of Stock', bg: AppColors.RED_COLOR };
      case 'price_change': return { text: 'Price Change', bg: '#F5A623' };
      default: return { text: 'Update', bg: AppColors.themeColor };
    }
  };

  return (
    <Container scrollEnabled={false}>
      <AppHeader heading={'Notifications'} />
      {isLoading ? (
        <FlatList
          contentContainerStyle={{ padding: responsiveHeight(2) }}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          renderItem={() => <NotificationLoader />}
        />
      ) : data.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingTop: responsiveHeight(20) }}>
          <Ionicons name="notifications-off-outline" size={50} color={AppColors.GRAY} />
          <AppText
            title="No notifications yet"
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <AppText
            title="You'll be notified when products change"
            textColor={AppColors.LIGHTGRAY}
            textSize={1.4}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            const icon = getNotifIcon(item.type);
            const badge = getNotifBadge(item.type);
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('HomeDetails', {
                    data: {
                      ...item,
                      availability: item.type === 'out_of_stock' ? 'Out of Stock' : 'In Stock',
                      productLink: item?.link,
                    },
                  })
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: AppColors.LIGHTGRAY,
                  marginHorizontal: responsiveWidth(4),
                  paddingVertical: responsiveHeight(2),
                  gap: 12,
                }}
              >
                {item?.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50, borderRadius: 8 }}
                  />
                ) : (
                  <View style={{
                    width: 50, height: 50, borderRadius: 8,
                    backgroundColor: AppColors.LIGHTGRAY,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Ionicons name={icon.name} size={24} color={icon.color} />
                  </View>
                )}

                <View style={{ flex: 1, gap: responsiveHeight(0.5) }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AppText
                      textwidth={55}
                      numberOfLines={2}
                      title={item?.title || 'Product Update'}
                      textColor={AppColors.BLACK}
                      textSize={1.5}
                      textFontWeight
                    />
                    <AppText
                      title={moment(item?.createdAt).fromNow()}
                      textColor={'#ADB3BC'}
                      textSize={1.3}
                    />
                  </View>

                  <AppText
                    numberOfLines={2}
                    title={item?.message || ''}
                    textColor={AppColors.GRAY}
                    textSize={1.3}
                  />

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{
                      backgroundColor: badge.bg,
                      paddingHorizontal: responsiveWidth(2),
                      paddingVertical: responsiveHeight(0.3),
                      borderRadius: 4,
                    }}>
                      <AppText
                        title={badge.text}
                        textColor={AppColors.WHITE}
                        textSize={1.1}
                        textFontWeight
                      />
                    </View>
                    <AppText
                      title={moment(item?.createdAt)?.format('hh:mm A')}
                      textColor={'#ADB3BC'}
                      textSize={1.2}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Container>
  );
};

export default Notification;
