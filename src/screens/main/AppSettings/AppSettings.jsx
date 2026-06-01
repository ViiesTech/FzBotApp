/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import {AppColors, responsiveHeight, responsiveWidth} from '../../../utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/AppTextComps/AppText';
import {useSelector, useDispatch} from 'react-redux';
import {clearToken, setUserData} from '../../../redux/Slices';
import {updateUserSettings, logoutUser} from '../../../GlobalFunctions';

const FREQ_OPTIONS = [
  {label: 'Every 1 Hour', value: 60},
  {label: 'Every 6 Hours', value: 360},
  {label: 'Every 12 Hours', value: 720},
  {label: 'Every 24 Hours', value: 1440},
];

const INFO_MAP = {
  instantAlerts: {
    title: 'Instant Alerts',
    description:
      'When enabled, you will receive a push notification only when a monitored site discovers a new product URL.',
  },
  checkFrequency: {
    title: 'Check Frequency',
    description:
      'Controls how often FZBot re-scans your monitored sites for newly added products.\n\nEvery 1 Hour is fastest. Every 24 Hours uses the least server work.',
  },
};

const AppSettings = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state?.user);
  const userId = userData?._id;

  const [instantAlerts, setInstantAlerts] = useState(userData?.instantAlerts !== false);
  const [selectedFreq, setSelectedFreq] = useState(userData?.checkFrequency || 60);
  const [saving, setSaving] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoContent, setInfoContent] = useState({title: '', description: ''});

  const showInfo = key => {
    if (!INFO_MAP[key]) return;
    setInfoContent(INFO_MAP[key]);
    setInfoModalVisible(true);
  };

  const saveSettings = useCallback(
    async updates => {
      setSaving(true);
      try {
        const response = await updateUserSettings(userId, updates);
        if (response?.success && response?.data) {
          dispatch(setUserData(response.data));
        }
      } catch (e) {
        console.log('Settings save error:', e);
      }
      setSaving(false);
    },
    [userId, dispatch],
  );

  const toggleInstantAlerts = () => {
    const newVal = !instantAlerts;
    setInstantAlerts(newVal);
    saveSettings({instantAlerts: newVal});
  };

  const selectFrequency = value => {
    setSelectedFreq(value);
    saveSettings({checkFrequency: value});
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await logoutUser(userId);
          dispatch(clearToken());
        },
      },
    ]);
  };

  const InfoButton = ({infoKey}) => (
    <TouchableOpacity
      onPress={() => showInfo(infoKey)}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={{marginLeft: 6}}>
      <Ionicons
        name="information-circle-outline"
        size={18}
        color={AppColors.GRAY}
      />
    </TouchableOpacity>
  );

  const ToggleRow = ({title, value, onToggle, infoKey}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: AppColors.LIGHTGRAY,
        paddingVertical: responsiveHeight(1.5),
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <AppText title={title} textColor={AppColors.BLACK} textSize={1.8} />
        {infoKey ? <InfoButton infoKey={infoKey} /> : null}
      </View>
      <TouchableOpacity onPress={onToggle}>
        <FontAwesome5
          name={value ? 'toggle-on' : 'toggle-off'}
          size={25}
          color={value ? AppColors.themeColor : AppColors.GRAY}
        />
      </TouchableOpacity>
    </View>
  );

  const MenuRow = ({title, icon, onPress, loading}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: AppColors.LIGHTGRAY,
        paddingVertical: responsiveHeight(1.5),
      }}>
      <AppText title={title} textColor={AppColors.BLACK} textSize={1.8} />
      <TouchableOpacity onPress={onPress}>
        {loading ? (
          <ActivityIndicator size="small" color={AppColors.themeColor} />
        ) : (
          icon
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <Container>
      <AppHeader heading={'Settings'} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: responsiveWidth(4),
          paddingBottom: responsiveHeight(4),
        }}
        showsVerticalScrollIndicator={false}>
        <AppText
          title={'Notifications'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <ToggleRow
          title="New Product Push Alerts"
          value={instantAlerts}
          onToggle={toggleInstantAlerts}
          infoKey="instantAlerts"
        />

        <LineBreak space={2.5} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppText
            title={'Check Frequency'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
          <InfoButton infoKey="checkFrequency" />
        </View>

        <LineBreak space={1.5} />

        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
          {FREQ_OPTIONS.map(opt => {
            const isSelected = selectedFreq === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                onPress={() => selectFrequency(opt.value)}
                style={{
                  backgroundColor: isSelected
                    ? AppColors.themeColor
                    : AppColors.WHITE,
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveHeight(0.7),
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: AppColors.themeColor,
                  borderRadius: 5,
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <Fontisto
                  name={isSelected ? 'radio-btn-active' : 'radio-btn-passive'}
                  size={10}
                  color={isSelected ? AppColors.WHITE : AppColors.themeColor}
                />
                <AppText
                  title={opt.label}
                  textColor={
                    isSelected ? AppColors.WHITE : AppColors.themeColor
                  }
                  textSize={1.5}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {saving && (
          <View
            style={{
              marginTop: responsiveHeight(1),
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}>
            <ActivityIndicator size="small" color={AppColors.themeColor} />
            <AppText title="Saving..." textColor={AppColors.GRAY} textSize={1.3} />
          </View>
        )}

        <LineBreak space={2.5} />

        <AppText
          title={'Account'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <MenuRow
          title="Log Out"
          onPress={handleLogout}
          loading={false}
          icon={
            <MaterialIcons
              name="logout"
              size={25}
              color={AppColors.RED_COLOR}
            />
          }
        />
      </ScrollView>

      <Modal
        visible={infoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setInfoModalVisible(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setInfoModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: responsiveWidth(6),
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: AppColors.WHITE,
              borderRadius: 16,
              padding: responsiveWidth(5),
              width: '100%',
              maxHeight: '70%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: responsiveHeight(1.5),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Ionicons
                  name="information-circle"
                  size={24}
                  color={AppColors.themeColor}
                />
                <AppText
                  title={infoContent.title}
                  textColor={AppColors.BLACK}
                  textSize={2.2}
                  textFontWeight
                />
              </View>
              <TouchableOpacity onPress={() => setInfoModalVisible(false)}>
                <Ionicons name="close-circle" size={24} color={AppColors.GRAY} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <AppText
                title={infoContent.description}
                textColor={AppColors.GRAY}
                textSize={1.6}
                style={{lineHeight: 22}}
              />
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

export default AppSettings;
