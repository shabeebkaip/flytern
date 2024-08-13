import { globalGetService, globalPostService } from "@/lib/globalApiServices"
import { initialInfoSucces, loadingOff, loadingOn } from "@/lib/slices/genaralSlice";
import { getCountrySuccess, loaderRequest, setLanguageAndCountry, setNotifications, sharedProfileSuccess, switchLanguageSucces, } from '@/lib/slices/sharedSlice';
import { checkApiStatus } from "@/lib/utils";
import axios from "axios";

// SSR APIS
export const fetchExploresApi = async (token) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/Explores/GetExplores`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (checkApiStatus(response)) {
      return response.data.data
    }
  } catch (error) {
    return error
  }
}

export const getFetchLanguagesApi = async (token) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/Supports/FetchAppSettings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    let data = {
      language: response?.data?.data?.languages?.find((item) => item?.default),
      country: response?.data?.data?.countries?.find((item) => item?.isDefault === 1)
    }
    return data
  }
  catch (error) {
  }
}

export const fetchProfileDetailApi = async (token) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/Users/GetUserProfile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (checkApiStatus(response)) {
      return response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchInitialInfoApi = async (token) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/Supports/GetInitalInfo`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (checkApiStatus(response)) {
      return response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchCountryApi = async (token) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/Users/PreRegister`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (checkApiStatus(response)) {
      return response.data.data.country
    }
  } catch (error) {
    console.log(error)
  }
}


// Client APIS
export const getProfileDetailApi = async (dispatch) => {
  try {
    dispatch(loaderRequest());
    const data = await globalGetService('/api/Users/GetUserProfile')
      .then((response) => {
        return response.data.data;
      });

    dispatch(sharedProfileSuccess(data));
  } catch (error) {
    // dispatch(sharedProfileFail(error.response.data.message))
  }
};


export const saveDeviceLanguage = async (payload) => {
  try {
    const response = await globalPostService(`api/Supports/SaveDeviceLang`, payload)
    return response
  } catch (error) {
    return error
  }
}


export const getlanguageSwitchApi = async (dispatch) => {
  try {
    dispatch(loaderRequest());
    const data = await globalGetService('/api/Supports/GetInitalInfo')
      .then((response) => {
        return response.data.data
      });
    dispatch(switchLanguageSucces(data))
  } catch (error) {
    //  dispatch(switchLanguageFail(error.response.data.data))
  }
}

export const getSocialApi = async () => {

  try {
    const data = await globalGetService(`/api/Supports/Info?type=SOCIAL`)
    if (checkApiStatus(data)) {
      return data.data.data
    }
  }
  catch (error) {
    return error
  };

};

export const getCountryApi = async (dispatch) => {
  try {
    dispatch(loaderRequest());
    const data = await globalGetService('/api/Users/PreRegister')
      .then((response) => {
        return response.data.data.country
      });
    dispatch(getCountrySuccess(data))
  } catch (error) {
    //  dispatch(switchLanguageFail(error.response.data.data))
  }
}

export const getNotificationApi = async (dispatch) => {
  try {

    const data = await globalGetService('/api/Explores/GetNotifications')
      .then((response) => {
        return response.data.data.notification
      });
    dispatch(setNotifications(data))
  } catch (error) {
    //  dispatch(switchLanguageFail(error.response.data.data))
  }
}

export const getFetchLanguageApi = async (dispatch) => {
  try {
    const response = await globalGetService(`/api/Supports/FetchAppSettings`)
      .then((response) => {
        return response.data.data
      });
    let data = {
      language: response?.languages?.find((item) => item?.default === true),
      country: response?.countries?.find((item) => item.isDefault === 1)
    }
    dispatch(setLanguageAndCountry(data))
  }
  catch (error) {
  }
}


export const getIntialInfoApi = async (dispatch) => {
  try {
    dispatch(loadingOn())
    const data = await globalGetService(`/api/Supports/GetInitalInfo`)
      .then((response) => {
        dispatch(loadingOff())
        return response.data.data
      })
    dispatch(initialInfoSucces(data))
  } catch (error) {
  }
}