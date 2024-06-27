import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    profile: {
      countriesList:[]
    },
    coPax: [],
    editProfile: {},
    bookings:{}
  },
  reducers: {
    loaderRequest(state, action) {
      return {
        ...state,
        loading: true
      }
    },
    profileSuccess(state, action) {
      return {
        ...state,
        loading: false,
        profile: action.payload,
        editProfile: action.payload
      }
    },
    profileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },
    coPaxSuccess(state, action) {
      return {
        ...state,
        loading: false,
        coPax: action.payload
      }
    },
    coPaxFail(state, action) {
      return {
          ...state,
        loading: false,
        error: action.payload
      }
    },
    myBookingsSuccess(state,action){
      return {
        ...state,
        loading:false,
        bookings:action.payload
      }
    }
  }
})
const { reducer, actions } = profileSlice;

export const { loaderRequest, profileSuccess,myBookingsSuccess, profileFail, coPaxSuccess, coPaxFail } = actions;

export default reducer;
