import { configureStore, combineReducers } from '@reduxjs/toolkit';
import exploreReducer from '@/lib/slices/exploreSlice';
import sharedReducer from '@/lib/slices/sharedSlice';
import generalReducer from '@/lib/slices/genaralSlice';
import packageReducer from '@/lib/slices/packagesSlice'
import flightReducer from '@/lib/slices/flightSlice';
import generalreducer from '@/lib/slices/generalSlice'
import insuranceReducer from '@/lib/slices/insuranceSlice'
import paymentReducer from '@/lib/slices/paymentSlice'
import profileReducer from '@/lib/slices/profileSlice' 
import hotelReducer from "@/lib/slices/hotelSlice";


const rootReducer = combineReducers({
  exploreState: exploreReducer,
  sharedState: sharedReducer,
  generalState: generalReducer,
  packageState: packageReducer,
  flightState: flightReducer,
  generalState: generalreducer,
  insuranceState: insuranceReducer,
  paymentState: paymentReducer,
  hotelState: hotelReducer,
  profileState: profileReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
