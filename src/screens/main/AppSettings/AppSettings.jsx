/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
  TextInput,
  Share,
  Clipboard,
} from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/AppTextComps/AppText';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/Slices';
import {
  updateUserSettings,
  ShowToast,
  exportUrls,
  importUrls,
  clearWatchlist,
} from '../../../GlobalFunctions';

const FREQ_OPTIONS = [
  { label: 'Every 1 Hour', value: 60 },
  { label: 'Every 6 Hours', value: 360 },
  { label: 'Every 12 Hours', value: 720 },
  { label: 'Every 24 Hours', value: 1440 },
];

// Info descriptions for each setting
const INFO_MAP = {
  instantAlerts: {
    title: 'Instant Alerts',
    description:
      'When enabled, you will receive a push notification immediately whenever a product in your watchlist changes — for example, when it comes back in stock, goes out of stock, or its price changes.\n\nTurn this off if you prefer to check manually or only use the Daily Digest.',
  },
  dailyDigest: {
    title: 'Daily Digest',
    description:
      'When enabled, you will receive a single summary notification every day at 9:00 AM with all the changes that happened in the last 24 hours.\n\nThis is great if you don\'t want to be interrupted throughout the day but still want to stay informed. Works alongside or instead of Instant Alerts.',
  },
  priorityAlertsOnly: {
    title: 'Priority Alerts Only',
    description:
      'When enabled, push notifications are only sent for the most important event: a product coming BACK IN STOCK.\n\nYou will NOT receive push alerts for:\n• Products going out of stock\n• Price changes\n\nNote: All changes are still recorded and visible in your Notifications tab — this only filters the push alerts.',
  },
  checkFrequency: {
    title: 'Check Frequency',
    description:
      'Controls how often FZBot re-scans your tracked products for changes.\n\n• Every 1 Hour — Most frequent, catches changes fast\n• Every 6 Hours — Good balance of speed and efficiency\n• Every 12 Hours — Twice a day checks\n• Every 24 Hours — Once a day, lightest on resources\n\nLower frequencies mean faster detection but slightly more server usage.',
  },
  clearWatchlist: {
    title: 'Clear Watchlist',
    description:
      'Removes ALL products from your watchlist permanently. This cannot be undone.\n\nUse Export URLs first if you want to save your list before clearing.',
  },
  exportUrls: {
    title: 'Export URLs',
    description:
      'Exports all product URLs from your watchlist as a shareable text list.\n\nYou can:\n• Share via Messages, Email, AirDrop, etc.\n• Copy to clipboard for pasting elsewhere\n• Save as a backup before clearing your watchlist\n\nOnly the URLs are exported, not the product details.',
  },
  importUrls: {
    title: 'Import URLs',
    description:
      'Bulk-add products to your watchlist by pasting URLs.\n\nPaste one URL per line, and FZBot will:\n• Validate each URL\n• Skip any duplicates already in your watchlist\n• Queue new URLs for AI scanning\n\nProducts will show as "Pending scan..." until the next check cycle picks them up.',
  },
};

const AppSettings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state?.user);
  const userId = userData?._id;

  const [instantAlerts, setInstantAlerts] = useState(userData?.instantAlerts !== false);
  const [dailyDigest, setDailyDigest] = useState(userData?.dailyDigest || false);
  const [priorityOnly, setPriorityOnly] = useState(userData?.priorityAlertsOnly || false);
  const [selectedFreq, setSelectedFreq] = useState(userData?.checkFrequency || 60);
  const [saving, setSaving] = useState(false);
  const [clearingWatchlist, setClearingWatchlist] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);

  // Info modal state
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoContent, setInfoContent] = useState({ title: '', description: '' });

  // Import modal state
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [importText, setImportText] = useState('');

  const showInfo = (key) => {
    setInfoContent(INFO_MAP[key]);
    setInfoModalVisible(true);
  };

  const saveSettings = useCallback(async (updates) => {
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
  }, [userId, dispatch]);

  const toggleInstantAlerts = () => {
    const newVal = !instantAlerts;
    setInstantAlerts(newVal);
    saveSettings({ instantAlerts: newVal });
  };

  const toggleDailyDigest = () => {
    const newVal = !dailyDigest;
    setDailyDigest(newVal);
    saveSettings({ dailyDigest: newVal });
  };

  const togglePriorityOnly = () => {
    const newVal = !priorityOnly;
    setPriorityOnly(newVal);
    saveSettings({ priorityAlertsOnly: newVal });
  };

  const selectFrequency = (value) => {
    setSelectedFreq(value);
    saveSettings({ checkFrequency: value });
  };

  const handleClearWatchlist = () => {
    Alert.alert(
      'Clear Watchlist',
      'Are you sure you want to remove ALL products from your watchlist? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            setClearingWatchlist(true);
            try {
              await clearWatchlist(userId);
            } catch (e) {
              console.log('Clear watchlist error:', e);
            }
            setClearingWatchlist(false);
          },
        },
      ],
    );
  };

  const handleExportUrls = async () => {
    setExporting(true);
    try {
      const response = await exportUrls(userId);
      if (response?.success && response?.data) {
        const urls = response.data;
        if (urls.length === 0) {
          ShowToast('info', 'No products in your watchlist to export');
          setExporting(false);
          return;
        }
        const urlText = urls.join('\n');
        try {
          await Share.share({
            message: urlText,
            title: 'FZBot Watchlist URLs',
          });
        } catch (shareErr) {
          // User cancelled share — copy to clipboard as fallback
          Clipboard.setString(urlText);
          ShowToast('success', `${urls.length} URL(s) copied to clipboard!`);
        }
      }
    } catch (e) {
      console.log('Export error:', e);
    }
    setExporting(false);
  };

  const handleImportUrls = async () => {
    const lines = importText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    if (lines.length === 0) {
      ShowToast('error', 'Please paste at least one URL');
      return;
    }

    setImporting(true);
    try {
      await importUrls(userId, lines);
      setImportModalVisible(false);
      setImportText('');
    } catch (e) {
      console.log('Import error:', e);
    }
    setImporting(false);
  };

  // ─── Components ─────────────────────────────────────────────

  const InfoButton = ({ infoKey }) => (
    <TouchableOpacity
      onPress={() => showInfo(infoKey)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={{ marginLeft: 6 }}
    >
      <Ionicons name="information-circle-outline" size={18} color={AppColors.GRAY} />
    </TouchableOpacity>
  );

  const ToggleRow = ({ title, value, onToggle, infoKey }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: AppColors.LIGHTGRAY,
        paddingVertical: responsiveHeight(1.5),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <AppText title={title} textColor={AppColors.BLACK} textSize={1.8} />
        <InfoButton infoKey={infoKey} />
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

  const MenuRow = ({ title, icon, onPress, loading, infoKey }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: AppColors.LIGHTGRAY,
        paddingVertical: responsiveHeight(1.5),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <AppText title={title} textColor={AppColors.BLACK} textSize={1.8} />
        <InfoButton infoKey={infoKey} />
      </View>
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
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: responsiveWidth(4), paddingBottom: responsiveHeight(4) }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Notification Preferences ─────────────────── */}
        <AppText
          title={'Notification Preferences'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <ToggleRow title="Instant Alerts" value={instantAlerts} onToggle={toggleInstantAlerts} infoKey="instantAlerts" />
        <ToggleRow title="Daily Digest" value={dailyDigest} onToggle={toggleDailyDigest} infoKey="dailyDigest" />
        <ToggleRow title="Priority Alerts Only" value={priorityOnly} onToggle={togglePriorityOnly} infoKey="priorityAlertsOnly" />

        <LineBreak space={2.5} />

        {/* ─── Check Frequency ─────────────────────────── */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AppText
            title={'Check Frequency'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
          <InfoButton infoKey="checkFrequency" />
        </View>

        <LineBreak space={1.5} />

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {FREQ_OPTIONS.map((opt) => {
            const isSelected = selectedFreq === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                onPress={() => selectFrequency(opt.value)}
                style={{
                  backgroundColor: isSelected ? AppColors.themeColor : AppColors.WHITE,
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveHeight(0.7),
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: AppColors.themeColor,
                  borderRadius: 5,
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}
              >
                <Fontisto
                  name={isSelected ? 'radio-btn-active' : 'radio-btn-passive'}
                  size={10}
                  color={isSelected ? AppColors.WHITE : AppColors.themeColor}
                />
                <AppText
                  title={opt.label}
                  textColor={isSelected ? AppColors.WHITE : AppColors.themeColor}
                  textSize={1.5}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {saving && (
          <View style={{ marginTop: responsiveHeight(1), flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <ActivityIndicator size="small" color={AppColors.themeColor} />
            <AppText title="Saving..." textColor={AppColors.GRAY} textSize={1.3} />
          </View>
        )}

        <LineBreak space={2.5} />

        {/* ─── Data Management ─────────────────────────── */}
        <AppText
          title={'Data Management'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <MenuRow
          title="Clear Watchlist"
          onPress={handleClearWatchlist}
          loading={clearingWatchlist}
          icon={<MaterialIcons name="delete" size={25} color={AppColors.themeColor} />}
          infoKey="clearWatchlist"
        />
        <MenuRow
          title="Export URLs"
          onPress={handleExportUrls}
          loading={exporting}
          icon={<AntDesign name="export" size={25} color={AppColors.themeColor} />}
          infoKey="exportUrls"
        />
        <MenuRow
          title="Import URLs"
          onPress={() => setImportModalVisible(true)}
          loading={false}
          icon={<Feather name="download" size={25} color={AppColors.themeColor} />}
          infoKey="importUrls"
        />
      </ScrollView>

      {/* ─── Info Modal ────────────────────────────────── */}
      <Modal
        visible={infoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setInfoModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: responsiveWidth(6),
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: AppColors.WHITE,
              borderRadius: 16,
              padding: responsiveWidth(5),
              width: '100%',
              maxHeight: '70%',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: responsiveHeight(1.5) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="information-circle" size={24} color={AppColors.themeColor} />
                <AppText title={infoContent.title} textColor={AppColors.BLACK} textSize={2.2} textFontWeight />
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
                style={{ lineHeight: 22 }}
              />
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* ─── Import URLs Modal ─────────────────────────── */}
      <Modal
        visible={importModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setImportModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setImportModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: AppColors.WHITE,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: responsiveWidth(5),
              maxHeight: '70%',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: responsiveHeight(1.5) }}>
              <AppText title="Import URLs" textColor={AppColors.BLACK} textSize={2.2} textFontWeight />
              <TouchableOpacity onPress={() => setImportModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color={AppColors.GRAY} />
              </TouchableOpacity>
            </View>

            <AppText
              title="Paste one URL per line. Duplicates will be skipped."
              textColor={AppColors.GRAY}
              textSize={1.4}
            />

            <LineBreak space={1} />

            <TextInput
              multiline
              numberOfLines={8}
              placeholder={'https://example.com/product-1\nhttps://example.com/product-2\nhttps://example.com/product-3'}
              placeholderTextColor={AppColors.LIGHTGRAY}
              value={importText}
              onChangeText={setImportText}
              style={{
                borderWidth: 1,
                borderColor: AppColors.LIGHTGRAY,
                borderRadius: 10,
                padding: responsiveWidth(3),
                fontSize: 14,
                color: AppColors.BLACK,
                textAlignVertical: 'top',
                minHeight: responsiveHeight(18),
                fontFamily: 'monospace',
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <LineBreak space={1.5} />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setImportModalVisible(false);
                  setImportText('');
                }}
                style={{
                  flex: 1,
                  paddingVertical: responsiveHeight(1.5),
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: AppColors.themeColor,
                  alignItems: 'center',
                }}
              >
                <AppText title="Cancel" textColor={AppColors.themeColor} textSize={1.7} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleImportUrls}
                disabled={importing}
                style={{
                  flex: 1,
                  paddingVertical: responsiveHeight(1.5),
                  borderRadius: 10,
                  backgroundColor: AppColors.themeColor,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {importing ? (
                  <ActivityIndicator size="small" color={AppColors.WHITE} />
                ) : (
                  <Feather name="download" size={18} color={AppColors.WHITE} />
                )}
                <AppText
                  title={importing ? 'Importing...' : `Import ${importText.split('\n').filter(l => l.trim()).length} URL(s)`}
                  textColor={AppColors.WHITE}
                  textSize={1.7}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

export default AppSettings;
