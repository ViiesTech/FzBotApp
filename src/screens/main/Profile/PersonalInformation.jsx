/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppTextComps/AppText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const InfoRow = ({ icon, label, value }) => (
  <View style={{ marginBottom: responsiveHeight(2.5) }}>
    <AppText
      title={label}
      textColor={AppColors.GRAY}
      textSize={1.5}
    />
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.inputBg,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        gap: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
      }}
    >
      {icon}
      <AppText
        title={value || '—'}
        textColor={AppColors.BLACK}
        textSize={1.8}
      />
    </View>
  </View>
);

const PersonalInformation = () => {
  const { userData } = useSelector(state => state?.user);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <ScrollView style={{ flex: 1 }}>
        <AppHeader onBackPress={true} heading={'Personal Information'} />
        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <InfoRow
            icon={
              <Ionicons
                name={'person'}
                size={responsiveFontSize(2.5)}
                color={AppColors.LIGHTGRAY}
              />
            }
            label="Name"
            value={userData?.name}
          />
          <InfoRow
            icon={
              <MaterialIcons
                name={'email'}
                size={responsiveFontSize(2.5)}
                color={AppColors.LIGHTGRAY}
              />
            }
            label="Email"
            value={userData?.email}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
