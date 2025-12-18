/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import SettingsMenu from '../../../components/SettingsMenu';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppText from '../../../components/AppTextComps/AppText';

const data1 = [
  {
    id: 1,
    title: 'Notification Preferences',
  },
  {
    id: 2,
    title: 'Instant Alerts',
    right: (
      <TouchableOpacity>
        <FontAwesome5 name="toggle-on" size={25} color={AppColors.themeColor} />
      </TouchableOpacity>
    ),
  },
  {
    id: 3,
    title: 'Daily Digest',
    right: (
      <TouchableOpacity>
        <FontAwesome5 name="toggle-off" size={25} color={AppColors.GRAY} />,
      </TouchableOpacity>
    ),
  },
  {
    id: 4,
    title: 'Priority Alerts Only',
    right: (
      <TouchableOpacity>
        <FontAwesome5 name="toggle-off" size={25} color={AppColors.GRAY} />,
      </TouchableOpacity>
    ),
  },
];

const freqData = [
  { id: 1, title: 'Every 15 Mins' },
  { id: 2, title: 'Every 30 Mins' },
  { id: 3, title: 'Every 1 Hour' },
  { id: 4, title: 'Every 6 Hours' },
  { id: 5, title: 'Every 12 Hours' },
];

const data2 = [
  {
    id: 1,
    title: 'Data Management',
  },
  {
    id: 2,
    title: 'Clear Watchlist',
    right: (
      <TouchableOpacity>
        <MaterialIcons name="delete" size={25} color={AppColors.themeColor} />
      </TouchableOpacity>
    ),
  },
  {
    id: 3,
    title: 'Export URLs',
    right: (
      <TouchableOpacity>
        <AntDesign name="export" size={25} color={AppColors.themeColor} />,
      </TouchableOpacity>
    ),
  },
  {
    id: 4,
    title: 'Import URLs',
    right: (
      <TouchableOpacity>
        <Feather name="download" size={25} color={AppColors.themeColor} />,
      </TouchableOpacity>
    ),
  },
];

const AppSettings = () => {
  return (
    <Container>
      <AppHeader heading={'Settings'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <FlatList
          data={data1}
          renderItem={({ item }) => (
            <SettingsMenu
              title={item.title}
              id={item.id}
              rightIcon={item.right}
            />
          )}
        />

        <LineBreak space={2.5} />

        <AppText
          title={'Check Frequency'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={1.5} />

        <FlatList
          data={freqData}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor:
                  item.id == 1 ? AppColors.themeColor : AppColors.WHITE,
                paddingHorizontal: responsiveWidth(2),
                paddingVertical: responsiveHeight(0.7),
                borderWidth: item.id == 1 ? 0 : 1,
                borderColor: AppColors.themeColor,
                borderRadius: 5,
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              }}
            >
              <Fontisto
                name={item.id == 1 ? 'radio-btn-active' : 'radio-btn-passive'}
                size={10}
                color={item.id == 1 ? AppColors.WHITE : AppColors.themeColor}
              />
              <AppText
                title={item.title}
                textColor={
                  item.id == 1 ? AppColors.WHITE : AppColors.themeColor
                }
                textSize={1.5}
              />
            </TouchableOpacity>
          )}
        />

        <LineBreak space={2.5} />

        <FlatList
          data={data2}
          renderItem={({ item }) => (
            <SettingsMenu
              title={item.title}
              id={item.id}
              rightIcon={item.right}
            />
          )}
        />
      </View>
    </Container>
  );
};

export default AppSettings;
