import { Platform } from 'react-native';
import axios from 'axios';
import { BaseUrl } from '../assets/BaseUrl/index';
import Toast from 'react-native-toast-message';
import { setToken, setUserData, UserLogin } from '../redux/Slices';
import messaging from '@react-native-firebase/messaging';

const LoginIntegration = async (email: string, password: string, fcmToken: string, dispatch: any) => {
  let data = JSON.stringify({
    email: email,
    password: password,
    FCMToken: fcmToken
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  // console.log('fcmtoken',data);
  // return
  return dispatch(UserLogin(config));
};

const Signup = async (name: string, email: string, password: string, fcmToken: string, dispatch: any) => {
  let data = JSON.stringify({
    name: name,
    email: email,
    password: password,
    FCMToken: fcmToken,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/signup`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      dispatch(setUserData(response?.data?.data))
      dispatch(setToken(response?.data?.accessToken))
      ShowToast('success', response?.data?.msg)
    } else {
      ShowToast('error', response?.data?.msg)
    }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.msg)
    throw error;
  }
};

const fetchDetails = async (url: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/getUrl?url=${encodeURIComponent(url)}`,
    headers: {}
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      return response?.data?.data;
    } else {
      ShowToast('error', response?.data?.message || 'Failed to fetch details');
    }
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const AddToWishlist = async (userId: string, productLink: string, title: string, availability: string, price: string, image: string, description: string, navigation: any) => {
  let data = JSON.stringify({
    "userId": userId,
    "productLink": productLink,
    "title": title,
    "availability": availability,
    "price": price,
    "image": image,
    "description": description,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}product/addProduct`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data.msg);
      navigation.goBack();
      // return response?.data
    } else {
      ShowToast('error', response?.data.msg);
    }
  } catch (error) {
    ShowToast('error', error?.response?.data.msg);
    throw error;
  }
}

const logoutUser = async (userId: string) => {
  try {
    await axios.post(`${BaseUrl}user/logout`, { userId });
  } catch (error) {
    // Silently fail — user is logging out anyway
  }
};

const updateFcmTokenOnServer = async (userId: string, fcmToken: string) => {
  try {
    // Reuse updateUser approach — directly update FCM token
    await axios.post(`${BaseUrl}user/updateUser`, {
      userId,
      FCMToken: fcmToken,
    });
  } catch (error) {
    // Silently fail
  }
};

const getFcmToken = async () => {
  try {
    // On iOS, register for remote messages before requesting token
    if (Platform.OS === 'ios') {
      const isRegistered = messaging().isDeviceRegisteredForRemoteMessages;
      if (!isRegistered) {
        await messaging().registerDeviceForRemoteMessages();
      }
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      return fcmToken;
    } else {
      return null;
    }
  } catch (error) {
    // Simulators don't support APNS — return null gracefully
    return null;
  }
};

const removeFromWishList = async (productId: string, navigation: any, isGoBack: boolean) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}product/deleteProduct?productId=${productId}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.msg);
      isGoBack && navigation.goBack();
    } else {
      ShowToast('error', response?.data?.msg)
    }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.msg)
    throw error;
  }
}
const getNotificationsByUserId = async (userId: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}product/getNotification?userId=${userId}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
const getAllProducts = async (userId: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}product/getAllProducts?userId=${userId}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.msg)
    throw error;
  }
}
const ShowToast = (type: string, text: string) => {
  return Toast.show({
    type: type,
    text1: text,
  });
};

const updateUserSettings = async (userId: string, settings: any) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/updateSettings`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ userId, ...settings }),
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      return response?.data;
    } else {
      ShowToast('error', response?.data?.msg);
    }
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to update settings');
    throw error;
  }
};

const exportUrls = async (userId: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}product/exportUrls?userId=${userId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to export URLs');
    throw error;
  }
};

const importUrls = async (userId: string, urls: string[]) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}product/importUrls`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ userId, urls }),
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.msg);
    } else {
      ShowToast('error', response?.data?.msg);
    }
    return response?.data;
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to import URLs');
    throw error;
  }
};

const clearWatchlist = async (userId: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}product/clearWatchlist?userId=${userId}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.msg);
    } else {
      ShowToast('error', response?.data?.msg);
    }
    return response?.data;
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to clear watchlist');
    throw error;
  }
};

const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/changePassword`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ userId, oldPassword, newPassword }),
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.msg);
    } else {
      ShowToast('error', response?.data?.msg);
    }
    return response?.data;
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to change password');
    throw error;
  }
};

const forgotPassword = async (email: string) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/forgetPassword`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ email }),
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.msg);
    } else {
      ShowToast('error', response?.data?.msg);
    }
    return response?.data;
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to send OTP');
    throw error;
  }
};

const verifyOTP = async (email: string, OTP: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/verifyOTP?email=${encodeURIComponent(email)}&OTP=${OTP}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.msg);
    } else {
      ShowToast('error', response?.data?.msg);
    }
    return response?.data;
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to verify OTP');
    throw error;
  }
};

const resetPassword = async (userId: string, newPassword: string) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/resetPassword`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ userId, newPassword }),
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.msg);
    } else {
      ShowToast('error', response?.data?.msg);
    }
    return response?.data;
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to reset password');
    throw error;
  }
};

const updateUserProfile = async (userId: string, name?: string, imageUri?: string, dispatch?: any) => {
  const formData = new FormData();
  formData.append('userId', userId);
  if (name) {
    formData.append('name', name);
  }
  if (imageUri) {
    const filename = imageUri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';
    formData.append('profileImage', {
      uri: imageUri,
      name: filename,
      type: type,
    } as any);
  }

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}user/updateUser`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.msg);
      if (dispatch && response?.data?.data) {
        dispatch(setUserData(response?.data?.data));
      }
    } else {
      ShowToast('error', response?.data?.msg);
    }
    return response?.data;
  } catch (error: any) {
    ShowToast('error', error?.response?.data?.msg || 'Failed to update profile');
    throw error;
  }
};

export { LoginIntegration, Signup, fetchDetails, getNotificationsByUserId, AddToWishlist, getFcmToken, logoutUser, updateFcmTokenOnServer, removeFromWishList, getAllProducts, ShowToast, updateUserSettings, exportUrls, importUrls, clearWatchlist, changePassword, forgotPassword, verifyOTP, resetPassword, updateUserProfile };
