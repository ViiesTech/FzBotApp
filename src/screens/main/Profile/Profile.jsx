/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Image, View } from 'react-native';
import { AppColors, responsiveWidth } from '../../../utils';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppTextComps/AppText';
import { AppImages } from '../../../assets/images';
import LineBreak from '../../../components/LineBreak';
import AppButton from '../../../components/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SettingsMenu from '../../../components/SettingsMenu';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../../../redux/Slices';
import { BaseUrl } from '../../../assets/BaseUrl';

const data2 = [
  {
    id: 1,
    title: 'My Account',
  },
  {
    id: 2,
    title: 'Personal information',
    navTo: 'EditProfile',
    left: <Feather name="user" size={25} color={AppColors.BLACK} />,
    right: (
      <Feather name="chevron-right" size={25} color={AppColors.themeColor} />
    ),
  },
  {
    id: 3,
    title: 'Change password',
    navTo: 'ChangePassword',
    left: <Foundation name="key" size={25} color={AppColors.BLACK} />,
    right: (
      <Feather name="chevron-right" size={25} color={AppColors.themeColor} />
    ),
  },
  {
    id: 4,
    title: 'Privacy Policy',
    left: <AntDesign name="lock" size={25} color={AppColors.BLACK} />,
    right: (
      <Feather name="chevron-right" size={25} color={AppColors.themeColor} />
    ),
  },
  {
    id: 5,
    title: 'Help & Support',
    left: <Feather name="alert-circle" size={25} color={AppColors.BLACK} />,
    right: (
      <Feather name="chevron-right" size={25} color={AppColors.themeColor} />
    ),
  },
  {
    id: 6,
    title: 'Log Out',
    navTo: 'Auth',
    left: <MaterialIcons name="logout" size={25} color={AppColors.RED_COLOR} />,
  },
];

const Profile = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { name, email, image } = useSelector(state => state?.user?.userData);

  return (
    <Container>
      <AppHeader heading={'Profile'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={image ? { uri: `${BaseUrl}${image}` } : AppImages.userDummy}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <LineBreak space={1} />
          <AppText
            title={name}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
          <AppText title={email} textColor={AppColors.GRAY} textSize={2} />
          <LineBreak space={2} />
          <AppButton
            title="Edit Profile"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.themeColor}
            handlePress={() => nav.navigate('EditProfile')}
            textSize={1.8}
            btnPadding={10}
            btnWidth={30}
            textFontWeight={true}
          />
        </View>

        <LineBreak space={5} />

        <FlatList
          data={data2}
          renderItem={({ item }) => (
            <SettingsMenu
              title={item.title}
              id={item.id}
              rightIcon={item.right}
              profile={'profile'}
              leftIcon={item.left}
              cardOnPress={() => {
                if (item.id === 6) {
                  dispatch(clearToken());
                } else if (item.navTo) {
                  nav.navigate(item.navTo);
                }
              }}
            />
          )}
        />
      </View>
    </Container>
  );
};

export default Profile;
