import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: {},
  choosePaymentMethod: {},
  selectedPrice: {},
  paymentStatus: {},
  paymentLoader: false,
  paymentWaitLoader: false

}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    paymentLoaderOn(state, action) {
      return {
        ...state,
        paymentLoader: true
      }
    },
    paymentLoaderOff(state,action){
      return{
        ...state,
        paymentLoader:false
      }
    },
    setPaymentWaitLoader(state, action) {
      return {
        ...state,
        paymentWaitLoader: action.payload
      }
    },
    paymentMethodSuccess(state, action) {
      return {
        ...state,
        paymentMethod: action.payload
      }
    },
    savePaymentMethodSuccess(state, action) {
      return {
        ...state,
        choosePaymentMethod: action.payload
      }
    },
    saveSelectedPaymentDetails(state, action) {
      return {
        ...state,
        selectedPrice: action.payload
      }
    },
    paymentStatusSuccess(state, action) {
      return {
        ...state,
        paymentStatus: action.payload
      }
    }
  }
})

const { reducer, actions } = paymentSlice;

export const { paymentMethodSuccess, savePaymentMethodSuccess, saveSelectedPaymentDetails, paymentStatusSuccess,paymentLoaderOff,paymentLoaderOn, setPaymentWaitLoader } = actions;

export default reducer;

