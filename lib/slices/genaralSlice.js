import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    recomended: {},
    travelStories: {},
    popularDestination: {},
    Insurance: {},
    Terms: {},
    aboutus: {},
    privacypolicy: {},
    initailInfo: {},
    countryAndLanguage: {}
}


const genaralSlice = createSlice({
    name: 'genarel',
    initialState,
    reducers: {
        loadingOn(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        loadingOff(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        recomendedSuccess(state, action) {
            return {
                ...state,
                recomended: action.payload
            }
        },
        travelStoriesSuccess(state, action) {
            return {
                ...state,
                travelStories: action.payload
            }
        },
        popularDestinationSuccess(state, action) {
            return {
                ...state,
                popularDestination: action.payload
            }
        },
        Insurancesuccess(state, action) {
            return {
                ...state,
                Insurance: action.payload
            }
        },
        Termssuccess(state, action) {
            return {
                ...state,
                Terms: action.payload
            }
        },
        Aboutsuccess(state, action) {
            return {
                ...state,
                aboutus: action.payload
            }
        },
        Privacysuccess(state, action) {
            return {
                ...state,
                privacypolicy: action.payload
            }
        },
        initialInfoSucces(state, action) {
            return {
                ...state,
                initailInfo: action.payload
            }
        },
        countryAndLanguageSuccess(state, action) {
            return {
                ...state,
                countryAndLanguage: action.payload
            }
        }
    }
})


const { reducer, actions } = genaralSlice;

export const { loadingOn, loadingOff, recomendedSuccess, travelStoriesSuccess, popularDestinationSuccess, Termssuccess, Aboutsuccess, Privacysuccess, initialInfoSucces,countryAndLanguageSuccess } = actions;

export default reducer;