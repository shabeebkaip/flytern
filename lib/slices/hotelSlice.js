import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: {},
  hotelDetails: {},
  hotelLoading: false,
  buttonLoader: false,
  preTraveller: {},
  hotelLoader: false,
  saveTravellerData: {
    _Travellerinfo:[],
    objectID: "",
    hotelID: "",

  }
}

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    hotelLoadingOn(state, action) {
      return {
        ...state,
        hotelLoader: true
      }
    },
    hotelLoadingOff(state, action) {
      return {
        ...state,
        hotelLoader: false
      }
    },
    hotelButtonLoaderOn(state, action) {
      return {
        ...state,
        buttonLoader: true
      }
    },
    hotelButtonLoaderOff(state, action) {
      return {
        ...state,
        buttonLoader: false
      }
    },
    setHotels(state, action) {
        return {
          ...state,
          hotels: action.payload
        }

    },
    setHotelDetails(state, action) {
      return {
        ...state,
        hotelDetails: action.payload
      } 
    },
    setSaveTravellerData(state, action) {
      return {
        ...state,
        saveTravellerData: action.payload
      }
    },
    setPreTravellerData(state, action) {
      return {
        ...state,
        preTraveller: action.payload
      }
    }
  },
})
const { actions, reducer } = hotelSlice;
export const { setHotels , setHotelDetails, hotelLoadingOn, hotelLoadingOff, setSaveTravellerData, setPreTravellerData, hotelButtonLoaderOn, hotelButtonLoaderOff } = actions;
export default reducer;
