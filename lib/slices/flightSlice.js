import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    flightLoader: true,
    buttonLoader: false,
    genericLoader: false,
    bookingRef:'',
    flightResults: {},
    flightDetails: {},
    selectedPriceOption: {},
    preTraveller: {},
    saveTraveller: {
        _Travellerinfo: [],
        objectID: '',
        detailID: '',
        cabinID: '',
        _CntDc: {
            mobileCntry: '',
            mobileNumber: '',
            email: ''
        }
    },
    flightRequest: {},
    userReviewDetails: {},
    savetravellerResponse: {},
    seatInformation:{},
    mealsInformation:{},
    extraLuggageInformation:{},
    flightMoreOptions: [],
    postSaveSeatInformation:{},
    postSaveMealsInformation:{},
    postSaveBaggageInformation:{},
    
}


const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        flightLoaderOn(state, action) {
            return {
                ...state,
                flightLoader: true
            }
        },
        flightLoaderOff(state, action) {
            return {
                ...state,
                flightLoader: false
            }
        },
        flightResultSuccess(state, action) {
            return {
                ...state,
                flightResults: action.payload
            }
        },
        flightDetailSuccess(state, action) {
            return {
                ...state,
                flightDetails: action.payload,

            }
        },
        flightPriceOptionSucess(state, action) {
            return {
                ...state,
                selectedPriceOption: action.payload

            }
        },
        preTravellerSuccess(state, action) {
            return {
                ...state,
                preTraveller: action.payload
            }
        },
        addSaveTravellerSuccess(state, action) {
            return {
                ...state,
                saveTraveller: action.payload
            }
        },
        setFlightRequest(state, action) {
            return {
                ...state,
                flightRequest: action.payload
            }
        },
        getUserReviewDetailsSuccess(state, action) {
            return {
                ...state,
                userReviewDetails: action.payload
            }
        },
        getSaveResponseSuccess(state, action) {
            return {
                ...state,
                savetravellerResponse: action.payload
            }
        },
        getSeatInformationSuccess(state,action){
            return {
                ...state,
                seatInformation:action.payload
            }
        },
        getMealsInformationSuccess(state,action){
            return {
                ...state,
                mealsInformation:action.payload
            }
        },
        getExtraLuggageInformationSuccess(state,action){
            return{
                ...state,
                extraLuggageInformation:action.payload
            }
        },
        getMoreOptionsSuccess(state,action){
            return{
                ...state,
                flightMoreOptions:action.payload
            }
        },
        setPostSaveSeatInformation(state,action){
            return{
                ...state,
                postSaveSeatInformation:action.payload
            }
        },
        setPostSaveMealsInformation(state,action){
            return{
                ...state,
                postSaveMealsInformation:action.payload
            }
        },
        setPostSaveBaggageInformation(state,action){
            return{
                ...state,
                postSaveBaggageInformation:action.payload
            }
        },
        setBookingRef(state, action){
            return {
                ...state,
                bookingRef: action.payload
            }
        },
        setButtonLoader (state, action){
            return {
                ...state,
                buttonLoader: action.payload
            }
        },
        setGenericLoader(state, action){
            return {
                ...state,
                genericLoader: action.payload
            }
        
        }
    }
})
const { reducer, actions } = flightSlice

export const { flightResultSuccess, flightDetailSuccess, flightPriceOptionSucess, preTravellerSuccess, addSaveTravellerSuccess, setFlightRequest, flightLoaderOn, flightLoaderOff, getUserReviewDetailsSuccess, getSaveResponseSuccess,getSeatInformationSuccess,getMealsInformationSuccess,getExtraLuggageInformationSuccess, getMoreOptionsSuccess, setPostSaveSeatInformation, setPostSaveMealsInformation, setPostSaveBaggageInformation, setBookingRef, setButtonLoader, setGenericLoader } = actions

export default reducer