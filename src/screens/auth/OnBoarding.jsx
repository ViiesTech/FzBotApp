/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import { View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AppImages } from '../../assets/images/index';
import { responsiveHeight, responsiveWidth } from '../../utils/index';
import AppText from '../../components/AppTextComps/AppText';
import { AppColors } from '../../utils/index';
import AppButton from '../../components/AppButton';
import LineBreak from '../../components/LineBreak';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnBoarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const nav = useNavigation();

  const slides = [
    {
      key: 1,
      title: 'Track the items you love. Stay ahead, never miss out.',
      detail:
        'Simply paste the product link, and we’ll do the heavy lifting. Your watchlist keeps everything organized in one place.',
      bg: AppImages.onboarding1,
    },
    {
      key: 2,
      title: 'Be the first to know. Real-time stock updates.',
      detail:
        'No more refreshing product pages. We’ll notify you instantly when an item is back in stock or when the price changes.',
      bg: AppImages.onboarding2,
    },
    {
      key: 3,
      title: 'Save time. Shop at the right moment.',
      detail: 'Manage all your tracked items from a single, simple dashboard. Stay informed, stay ready, and grab the deal before it’s gone.',
      bg: AppImages.onboarding3,
    },
  ];

  const renderDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(4),
      }}
    >
      {slides.map((_, index) => (
        <View
          key={index}
          style={{
            width: index === currentIndex ? responsiveWidth(7) : 8,
            height: 8,
            borderRadius: 100,
            backgroundColor:
              index === currentIndex
                ? AppColors.themeColor
                : AppColors.LIGHTGRAY,
            marginHorizontal: responsiveWidth(0.7),
          }}
        />
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
        justifyContent: 'center',
      }}
    >
      <View style={{ alignItems: 'flex-end' }}>
        <AppButton
          title="Skip"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.BTNCOLOURS}
          handlePress={currentIndex === 2 ? handleDone : handleNext}
          textFontWeight={false}
          btnWidth={18}
          borderRadius={10}
        />
      </View>
      <LineBreak space={4} />
      <View>
        <Image source={item.bg} style={{ width: responsiveWidth(90) }} />
      </View>
      <LineBreak space={4} />
      <AppText
        title={item.title}
        textColor={AppColors.themeColor}
        textSize={3.3}
        textFontWeight
        textAlignment={'center'}
        textTransform={'capitalize'}
      />
      <LineBreak space={3} />
      <AppText
        title={item.detail}
        textColor={AppColors.GRAY}
        textSize={2}
        lineHeight={3}
        textAlignment={'center'}
      />
      <View>{renderDots()}</View>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      sliderRef.current?.goToSlide(currentIndex + 1, true);
    }
  };

  const handleDone = () => {
    nav.navigate('Login');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: AppColors.WHITE,
      }}
    >
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderItem}
        onSlideChange={index => setCurrentIndex(index)}
        showNextButton={false}
        showSkipButton={false}
        showDoneButton={false}
        dotStyle={{ display: 'none' }}
        activeDotStyle={{ display: 'none' }}
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
