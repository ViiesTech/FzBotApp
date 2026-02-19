/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppColors,
  responsiveFontSize,
  responsiveWidth,
} from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import Feather from 'react-native-vector-icons/Feather';
import LazyImage from '../../../components/LazyImage';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateUserProfile, ShowToast } from '../../../GlobalFunctions';
import { BaseUrl } from '../../../assets/BaseUrl';

const EditProfile = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state?.user);

  const [name, setName] = useState(userData?.name || '');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Build the display image URI
  const getImageSource = () => {
    if (selectedImage) {
      return { uri: selectedImage };
    }
    if (userData?.profileImage) {
      // profileImage is stored as 'uploads/user/filename.jpg'
      const baseWithoutApi = BaseUrl.replace('/api/', '/');
      return { uri: `${baseWithoutApi}${userData.profileImage}` };
    }
    return AppImages.userDummy;
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          ShowToast('error', response.errorMessage || 'Image picker error');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setSelectedImage(response.assets[0].uri);
        }
      },
    );
  };

  const handleSave = async () => {
    if (!name.trim()) {
      return ShowToast('error', 'Name is required');
    }
    setIsLoading(true);
    try {
      const res = await updateUserProfile(
        userData?._id,
        name.trim(),
        selectedImage || undefined,
        dispatch,
      );
      if (res?.success) {
        nav.goBack();
      }
    } catch (e) {
      // error handled in global function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <ScrollView style={{ flex: 1 }}>
        <AppHeader onBackPress={true} heading={'Edit Profile'} />
        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <View style={{ alignSelf: 'center', position: 'relative' }}>
            <LazyImage
              source={getImageSource()}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: AppColors.themeColor,
                width: 30,
                height: 30,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="edit" size={18} color={AppColors.WHITE} />
            </TouchableOpacity>
          </View>

          <LineBreak space={5} />

          <AppTextInput
            inputPlaceHolder={'Name'}
            value={name}
            onChangeText={text => setName(text)}
            logo={
              <Ionicons
                name={'person'}
                size={responsiveFontSize(2.5)}
                color={
                  isNameFocused ? AppColors.themeColor : AppColors.LIGHTGRAY
                }
              />
            }
            inputHeight={5}
            isFocused={isNameFocused}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppButton
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Save Changes'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.themeColor}
          handlePress={handleSave}
          textFontWeight={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
