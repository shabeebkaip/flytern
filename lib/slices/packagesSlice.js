import { createSlice } from "@reduxjs/toolkit";



const packageSlice = createSlice({
    name: 'packages',
    initialState: {
        loading: false,
        packageLoader: false,
        data: {},
        packageDetails: {
            packageHeaderImage: [],
            packages: [],
            packagesDtl: [],

        },
        countryList: []
    },
    reducers: {
        loaderRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        packageLoaderOn(state, action) {
            return {
                ...state,
                packageLoader: true
            }
        },
        packageLoaderOff(state, action) {
            return {
                ...state,
                packageLoader: false
            }
        },
        packageListSuccess(state, action) {
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        },
        packageListFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        packageDetailsSuccess(state, action) {
            return {
                ...state,

                packageDetails: action.payload
            }
        },
        packageDetailsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getPackageCountryListSuccess(state, action) {
            return {
                ...state,
                loading: false,
                countryList: action.payload
            }
        }
    }
})

const { reducer, actions } = packageSlice;

export const { loaderRequest, packageListSuccess, packageListFail, packageDetailsFail, packageDetailsSuccess, getPackageCountryListSuccess, packageLoaderOn, packageLoaderOff } = actions;

export default reducer;