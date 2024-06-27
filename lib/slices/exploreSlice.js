import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const exploresSlice = createSlice({
  name: 'explores',
  initialState: {
    loading: false,
    selectedCard: 'flight',
    data: {},
    hotelQuickSearch: [],
    flightSearch: {
      adults: 1,
      allowedCabins: [],
      child: 0,
      infants: 0,
      isDirectFlight: false,
      mode: "ROUNDTRIP",
      promoCode: "",
      searchList: [
        {
          arrival: 'DXB',
          arrivalLabel: 'Dubai, Dubai, United Arab Emirates (DXB)',
          departure: 'KWI',
          departureLabel: 'Kuwait, Kuwait, Kuwait (KWI)',
          departureDate: format(new Date(), "yyyy-MM-dd"),
          departureAnchorEl: null,
          openDeparture: false,
          openReturn: false,
          returnDate: format(
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            "yyyy-MM-dd"
          ),
          returnAnchorEl: null,

        }

      ],


    }
  },
  reducers: {
    exploresRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    exploresSuccess(state, action) {
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    },
    exploresFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
    setHotelQuickSearch(state, action) {
      return {
        ...state,
        hotelQuickSearch: action.payload,
      }
    },
    setFlightSearch(state, action) {

      return {
        ...state,
        flightSearch: action.payload,
      }
    },
    setLoader(state, action) {
      return {
        ...state,
        loading: action.payload,
      }
    }
  }
})

const { reducer, actions } = exploresSlice;

export const { exploresRequest, exploresSuccess, exploresFail, setHotelQuickSearch, setFlightSearch, setLoader } = actions;

export default reducer;