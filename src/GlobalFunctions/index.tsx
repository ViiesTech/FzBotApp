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

const Signup = async (name: string, email: string, phone: number, password: string, fcmToken: string, dispatch: any) => {
  let data = JSON.stringify({
    name: name,
    email: email,
    phone: phone,
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
    console.log('ressponse.data', response.data)
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
    url: `${BaseUrl}user/getUrl?url=${url}`,
    headers: {
      'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZvChQHNr2cjqamI2xzvycD7LiPOYRDGTo3HQx1PwAZOjBYthJbzRCYK75MKIuvXnyb9tfo1ISd1TehGno6mnUfBxmeOL1yhhk-rlsviDUDrJBwebz2BrUl7z-_DlXH1yQqFdS4v0dxynDs_c4u0kbIRJvJ4BicPBg6Ll1W1IOiXSI7EgoKkVxeg3lQSE2kwXSbhb0BaP68OMazvTofqnCSGSvB7tRop_4rZQM_nERpz3_ESAKgHyfUbwsnInsqAm57F6TkJsLcwKYau49aNo0AwYwGrpw2JcBpKCDRr8JISrWV7jReZ3_3CDc3pLRWiW3zs2qS0Wmc5MRdUUJ1NnZsh_7pbhojRSddbriRni7sI79XJN9IwM1uHKCrm0vIUrreLr6Fytlm3QhDeU1lebnRls1ZnTk51xCndw24VU-qv1ZfOEAh7Znw5u4DfNuWCa9WVSaMp3yzBodjuOdGKwYmdzpw7s1aObM4nllGnWTeM4wDmDLgFxpusIPTSkjPdyAS2tDFA2hX9_cl3HXek3PB9usF-4e6tYF1Gci_Rw82HO7RcDGwm834DZougP62r5JfUk9XgrY-51BP-I47B3vpx2CW3BMSm5yfN3_-Fqbc97DOONYVAd-vOqjorRvIIN0DeFfnphJFuWqpEADh3joyE8R0e82WXz_cjcAc19dEqDPMHr1ctK-_E_JG3AoNw0ziziV2OvqZhDLG_g0QNtdTnB2ZiPUk7A32hrZtNPux1NJ5Or2W3WQ-KgBxATsLimDM1-OxTNdTsmaYCp-hR4Pp0X09f_QkRek1DVtP48LSYDGzT0SExFfy-1PTzzucCmC1wx3QvzwdB3fPKtWBTUhx2ERh5-osL2_udxW_FQt22loJjg17960ewJi5bxHnVKAmFcg0Hh2UO2HtraX6igsjj'
    }
  };
  try {
    const response = await axios.request(config);
    console.log('response.data', response.data)
    if (response?.data?.success) {
      return response?.data?.data;
    } else {
      ShowToast('error', response.data.message);
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

const getFcmToken = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      return fcmToken;
      // Alert.alert('FCM Token', fcmToken);
    } else {
      ShowToast('error', 'FCM permission not granted')
      console.log('FCM permission not granted');
    }
  } catch (error) {
    ShowToast('error', error);
    console.error('Error getting FCM token:', error);
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
    console.log('response', response?.data);
    return response?.data;
  } catch (error) {
    console.log('error', error.response.data.message)
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
export { LoginIntegration, Signup, fetchDetails, getNotificationsByUserId, AddToWishlist, getFcmToken, removeFromWishList, getAllProducts, ShowToast };
