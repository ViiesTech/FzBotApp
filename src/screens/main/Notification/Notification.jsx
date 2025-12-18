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

const Notification = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { _id } = useSelector(state => state.user.userData);
  const [isLoading, setIsLoading] = useState(false);
  const isFocus = useIsFocused();
  console.log('data', data);
  const getNotificationsHandler = async () => {
    try {
      setIsLoading(true);
      const response = await getNotificationsByUserId(_id);
      setIsLoading(false);
      setData(response.notifications);
      console.log('respones', response);
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
    }
  };

  useEffect(() => {
    getNotificationsHandler();
  }, [isFocus]);
  return (
    <Container>
      <AppHeader heading={'Notifications'} />
      {isLoading ? (
        <FlatList
          contentContainerStyle={{ padding: responsiveHeight(2) }}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          renderItem={({ item, index }) => {
            return <NotificationLoader />;
          }}
        />
      ) : (
        <FlatList
          data={[...data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HomeDetails', {
                  data: {
                    ...item,
                    availability: item.isNewItem ? 'New Item' : 'In Stock',
                    productLink: item?.link,
                  },
                })
              }
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: AppColors.LIGHTGRAY,
                marginHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(2),
              }}
            >
              <View
                style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />
                <View style={{ gap: responsiveHeight(0.5), flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <AppText
                      textwidth={55}
                      numberOfLines={2}
                      title={item?.title}
                      textColor={AppColors.GRAY}
                      textSize={1.6}
                    />
                    <AppText
                      textAlignment="center"
                      numberOfLines={1}
                      title={moment(item?.createdAt).fromNow()}
                      textColor={'#ADB3BC'}
                      textSize={1.5}
                      textFontWeight
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexGrow: 1,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveHeight(1),
                      }}
                    >
                      <AppText
                        textAlignment="center"
                        numberOfLines={1}
                        title="Created At:"
                        textColor={'#ADB3BC'}
                        textSize={1.5}
                        textFontWeight
                      />
                      <AppText
                        textAlignment="center"
                        numberOfLines={1}
                        title={moment(item?.createdAt)?.format('hh.mm A')}
                        textColor={'#ADB3BC'}
                        textSize={1.5}
                        textFontWeight
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: item?.isNewItem
                          ? '#214B49'
                          : '#41B70B',
                        padding: responsiveHeight(0.5),
                        paddingHorizontal: responsiveHeight(1),
                        borderRadius: responsiveHeight(0.5),
                      }}
                    >
                      <AppText
                        textFontWeight="bold"
                        textColor={AppColors.WHITE}
                        title={item?.isNewItem ? 'New Item' : 'In Stock'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </Container>
  );
};

export default Notification;
