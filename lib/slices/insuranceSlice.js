import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    saveTravellerLoader: false,
    insuranceFormList: {},
    saveTraveller: {},
    insurancePaymentSummary: {},
    insuranceUserReviewDetails:{}
}

const insuranceSlice = createSlice({
    name: 'insurance',
    initialState,
    reducers: {
        loaderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        insuranceFormListSuccess(state, action) {
            return {
                ...state,
                loading: false,
                insuranceFormList: action.payload
            }
        },
        insuranceFormListFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        saveTravellerSuccess(state, action) {
            return {
                ...state,
                loading: false,
                saveTraveller: action.payload

            }
        },
        saveTravellerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        insurancePaymentSummarySuccess(state, action) {
            return {
                ...state,
                loading: false,
                insurancePaymentSummary: action.payload
            }
        },
        insuranceReviewDetailsSuccess(state,action) {
            return{
                ...state,
                loading:false,
                insuranceUserReviewDetails:action.payload
            }
        },
        setSaveTravellerLoader(state, action) {
            return {
                ...state,
                saveTravellerLoader: action.payload
            }
        
        }
    }
})

const { reducer, actions } = insuranceSlice;

export const { insuranceFormListSuccess, loaderRequest, insuranceFormListFail, saveTravellerFail, saveTravellerSuccess, insurancePaymentSummarySuccess,insuranceReviewDetailsSuccess, setSaveTravellerLoader } = actions;

export default reducer;