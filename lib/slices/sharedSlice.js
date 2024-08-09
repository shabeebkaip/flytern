import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: 'shared',
  initialState: {
    loading: false,
    profile: {},
    languages: [],
    countries: [],
    mobileCountryList: [],
    notifications: [],
    selectedLanguageAndCountry: {},
    translation: {},
    contactDc: {
      email: '',
      mobileNumber: '',
      mobileCntry: ''

    },
    social: {},
    country: {},
    showUserDetails: false
  },
  reducers: {
    loaderRequest(state,) {
      return {
        ...state,
        loading: true
      }
    },
    loaderOn(state, ) {
      return {
        ...state,
        loading: true
      }
    },
    loaderOff(state) {
      return {
        ...state,
        loading: false
      }
    },
    sharedProfileSuccess(state, action) {
      return {
        ...state,
        loading: false,
        profile: action.payload,
      }
    },
    sharedProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },
    switchLanguageSucces(state, action) {
      return {
        ...state,
        loading: false,
        languages: action?.payload?.languages,
        countries: action?.payload?.countries,
        mobileCountryList: action?.payload?.mobileCountryList

      }
    },
    switchLanguageFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action?.payload
      }
    },
    socialsuccess(state, action) {
      return {
        ...state,
        social: action?.payload
      }
    },
    setContactDetails(state, action) {
      return {
        ...state,
        contactDc: action?.payload
      }
    },
    getCountrySuccess(state, action) {
      return {
        ...state,
        country: action?.payload
      }
    },
    setShowUserDetails(state, action) {
      return {
        ...state,
        showUserDetails: action?.payload
      }
    },
    setNotifications(state, action) {
      return {
        ...state,
        notifications: action.payload
      }
    },
    setLanguageAndCountry(state, action) {
      return {
        ...state,
        selectedLanguageAndCountry: action.payload
      }
    },
    setTranslation(state, action) {
      return {
        ...state,
        translation: action.payload
      }
    }
  }
})
const { reducer, actions } = sharedSlice;

export const { loaderRequest, sharedProfileSuccess, sharedProfileFail, switchLanguageSucces, switchLanguageFail, loaderOn, loaderOff, setContactDetails, socialsuccess, getCountrySuccess, setShowUserDetails, setNotifications, setLanguageAndCountry, setTranslation } = actions;

export default reducer;
