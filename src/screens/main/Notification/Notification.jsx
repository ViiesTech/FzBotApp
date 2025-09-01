/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, Image } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import AppText from '../../../components/AppTextComps/AppText';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';

const data = [
  {
    id: 1,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
    shown: true,
  },
  {
    id: 2,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
    shown: true,
  },
  {
    id: 3,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
    shown: true,
  },
  {
    id: 4,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
  },
  {
    id: 5,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
  },
  {
    id: 6,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
  },
  {
    id: 7,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
  },
  {
    id: 8,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
  },
  {
    id: 9,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
  },
  {
    id: 10,
    image: AppImages.product2,
    title: 'iPhone 14 Pro Back in Stock!',
    subTitle: 'Lorem ipsum simply dummy.',
    time: '11.32 PM',
  },
];

const Notification = () => {
  return (
    <Container>
      <AppHeader heading={'Notifications'} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
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
                source={item.image}
                style={{ width: 50, height: 50, borderRadius: 100 }}
              />
              <View style={{ gap: responsiveHeight(0.5) }}>
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.7}
                  textFontWeight
                />
                <AppText
                  title={item.subTitle}
                  textColor={AppColors.GRAY}
                  textSize={1.6}
                />
              </View>
            </View>

            <View style={{ gap: responsiveHeight(2.3) }}>
              <AppText
                title={item.time}
                textColor={AppColors.GRAY}
                textSize={1.5}
              />
              <View
                style={{
                  width: responsiveHeight(0.7),
                  height: responsiveHeight(0.7),
                  alignSelf: 'flex-end',
                  borderRadius: 100,
                  backgroundColor: item.shown
                    ? AppColors.lightGreen
                    : AppColors.WHITE,
                }}
              />
            </View>
          </View>
        )}
      />
    </Container>
  );
};

export default Notification;
