/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppImages } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';

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

const Home = () => {
    const nav = useNavigation();
  return (
    <Container>
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={'Hi, Samantha'}
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

        <View>
          <AppTextInput
            inputPlaceHolder={'Search...'}
            containerBg={AppColors.WHITE}
            borderWidth={1}
            inputContainerPaddingHorizontal={2}
            borderColor={AppColors.LIGHTGRAY}
            inputWidth={80}
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

        <LineBreak space={2} />

        <AppText
          title={'Watchlist'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={2} />

        <FlatList
          data={data}
          numColumns={2}
          ItemSeparatorComponent={<LineBreak space={1} />}
          columnWrapperStyle={{ gap: responsiveHeight(1) }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: AppColors.LIGHTGRAY,
                paddingHorizontal: responsiveWidth(2),
                paddingVertical: responsiveHeight(1),
                borderRadius: 8,
                gap: responsiveHeight(1),
              }}
              onPress={() => nav.navigate('HomeDetails')}
            >
              <Image
                source={item.productImg}
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
                  title={item.name}
                  textColor={AppColors.BLACK}
                  textSize={1.6}
                  textFontWeight
                />

                <View
                  style={{
                    backgroundColor: AppColors.lightGreen,
                    paddingHorizontal: responsiveWidth(2.5),
                    paddingVertical: responsiveHeight(0.5),
                    borderRadius: 5,
                  }}
                >
                  <AppText
                    title={item.tag}
                    textColor={AppColors.WHITE}
                    textSize={1.1}
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
                  title={`last checked: ${item.time}`}
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
                  <TouchableOpacity>
                    <Ionicons
                      size={responsiveFontSize(1.7)}
                      name={'trash-sharp'}
                      color={AppColors.themeColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
};

export default Home;
