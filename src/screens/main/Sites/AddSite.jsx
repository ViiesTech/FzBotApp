/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ActivityIndicator, Keyboard} from 'react-native';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import AppHeader from '../../../components/AppHeader';
import Container from '../../../components/Container';
import {addSite, ShowToast} from '../../../GlobalFunctions';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const AddSite = () => {
  const nav = useNavigation();
  const [url, setUrl] = useState('');
  const [siteName, setSiteName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {_id} = useSelector(state => state?.user?.userData);

  const handleAddSite = async () => {
    Keyboard.dismiss();
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      ShowToast('error', 'Please enter a URL');
      return;
    }

    // Basic URL validation
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      ShowToast('error', 'URL must start with http:// or https://');
      return;
    }

    setIsLoading(true);
    try {
      const response = await addSite(_id, trimmedUrl, siteName.trim() || undefined);
      if (response?.success) {
        nav.goBack();
      }
    } catch (error) {
      // error handled in GlobalFunctions
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <AppHeader onBackPress heading={'Add Site'} />

      <View style={{paddingHorizontal: responsiveWidth(4)}}>
        <LineBreak space={1} />

        <AppText
          title={'Website URL'}
          textColor={AppColors.BLACK}
          textSize={1.6}
          textFontWeight
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'https://www.example.com/products'}
          containerBg={AppColors.WHITE}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          inputWidth={80}
          fontSize={1.5}
          value={url}
          onChangeText={setUrl}
          keyboardType={'url'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />

        <LineBreak space={2} />

        <AppText
          title={'Site Name (optional)'}
          textColor={AppColors.BLACK}
          textSize={1.6}
          textFontWeight
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'e.g. eBay Militaria Helmets'}
          containerBg={AppColors.WHITE}
          borderWidth={1}
          borderColor={AppColors.LIGHTGRAY}
          inputWidth={80}
          fontSize={1.5}
          value={siteName}
          onChangeText={setSiteName}
        />

        <LineBreak space={1.5} />

        <View
          style={{
            backgroundColor: AppColors.LIGHTESTGRAY,
            padding: responsiveWidth(4),
            borderRadius: 10,
          }}>
          <AppText
            title={'💡 Tips'}
            textColor={AppColors.BLACK}
            textSize={1.5}
            textFontWeight
          />
          <LineBreak space={0.5} />
          <AppText
            title={
              '• Paste a product listing page URL (e.g. category page)\n• Our AI will automatically discover all products\n• Products will be monitored for price changes, stock updates, and new arrivals'
            }
            textColor={AppColors.GRAY}
            textSize={1.3}
          />
        </View>

        <LineBreak space={3} />

        {isLoading ? (
          <View style={{alignItems: 'center', paddingVertical: responsiveHeight(2)}}>
            <ActivityIndicator size={'large'} color={AppColors.themeColor} />
            <LineBreak space={1} />
            <AppText
              title={'Adding site & discovering products...'}
              textColor={AppColors.GRAY}
              textSize={1.4}
            />
          </View>
        ) : (
          <AppButton
            title="Add & Start Monitoring"
            btnBackgroundColor={AppColors.BTNCOLOURS}
            handlePress={handleAddSite}
            textSize={1.8}
            borderRadius={10}
          />
        )}
      </View>
    </Container>
  );
};

export default AddSite;
