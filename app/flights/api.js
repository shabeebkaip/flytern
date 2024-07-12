import { globalGetService, globalPostService } from "@/lib/globalApiServices";
import {  addSaveTravellerSuccess, flightDetailSuccess, flightLoaderOff, flightLoaderOn, flightPriceOptionSucess, flightResultSuccess, getExtraLuggageInformationSuccess, getMealsInformationSuccess, getSeatInformationSuccess, preTravellerSuccess, setBookingRef, setButtonLoader, setGenericLoader, setPostSaveBaggageInformation, setPostSaveMealsInformation, setPostSaveSeatInformation } from "@/lib/slices/flightSlice";
import { loaderOff, loaderOn } from "@/lib/slices/sharedSlice";
import { checkApiStatus, encryptUrl } from "@/lib/utils";

export const getFlightSearchApi = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(flightLoaderOn());
      const data = await globalPostService(
        "/api/Flights/SearchFlights",
        payload
      ).then((response) => {
        dispatch(flightLoaderOff());
        if (checkApiStatus(response)) {
          return response.data.data;
        }
      })
        .catch((error) => {
          dispatch(flightLoaderOff());
        });
      dispatch(flightResultSuccess(data));
    } catch (error) {
      dispatch(flightLoaderOff());
    }
  };
};

export const getMoreOptionsApi = (objectID, index, flightIndex, flightResponse) => {
  return async (dispatch) => {
    try {
      const data = await globalPostService(`/api/Flights/MoreOptionFlights`, { objectID, index })
        .then((response) => {
          if (checkApiStatus(response)) {
            return response.data.data.searchResponses
          }
        })
      let moreData = flightResponse
      moreData = {
        ...moreData,
        searchResponses: moreData.searchResponses.map((item, i) => flightIndex === i ? { ...item, moreOptions: data } : item)
      }
      dispatch(flightResultSuccess(moreData))
    } catch (error) {

    }
  }
}

export const getFlightFilterApi = (payload, previousState) => {
  debugger
  return async (dispatch) => {
    try {
      const response = await globalPostService("/api/Flights/FilterFlights", payload)
      if (checkApiStatus(response)) {
        let _data
        if (payload.pageId > previousState.currentPage) {
          _data = {
            ...previousState,
            searchResponses: previousState.currentPage > 0 ? response.data.data?.searchResponses ? [...previousState.searchResponses, ...response.data.data.searchResponses] : [] : response.data.data.searchResponses,
            currentPage: response.data?.data?.currentPage,
            totalFlights: response.data?.data?.totalFlights,
            alertMsg: response.data?.data?.alertMsg,
          };
        } else {
          _data = {
            ...previousState,
            searchResponses: response.data?.data?.searchResponses,
            totalPages: response.data?.data?.totalPages,
            currentPage: response.data?.data?.currentPage,
            totalFlights: response.data?.data?.totalFlights,
            alertMsg: response.data?.data?.alertMsg,
          };
        }
        dispatch(flightResultSuccess(_data));
      } else {
        dispatch(flightResultSuccess(previousState))
      }
    } catch (error) {
      dispatch(flightResultSuccess(previousState))
    }
  };
};


export const getFlightDetailsApi = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(flightLoaderOn());
      const data = await globalPostService("/api/Flights/DetailFlights", payload).then((response) => {
        if (checkApiStatus(response)) {
          dispatch(flightLoaderOff());
          return response.data.data;
        }
      });
      dispatch(flightDetailSuccess(data));
      dispatch(getPreTravellerApi(data.detailId));
      let selectedPriceOption = data && data._lstCabinInfos && data._lstCabinInfos[0];
      dispatch(flightPriceOptionSucess(selectedPriceOption));
    } catch (error) {
    }
  };
};
export const getPreTravellerApi = (detailId) => {
 
  return async (dispatch) => {
    try {
      dispatch(loaderOn());
      let data = await globalGetService(`/api/Flights/PreTraveller?detail_id=${detailId}`)
        .then((response) => {
          if (checkApiStatus(response)) {
            return response.data.data;
          }
          dispatch(loaderOff());
        });
      dispatch(preTravellerSuccess(data));
      let saveTravellerAppend = {}
      saveTravellerAppend = {
        adultTraveller: data.adult ? Array(data.adult).fill({
          frequentFlyerNo: '',
          travellerType: 'ADULT',
          title: '',
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: null,
          isDateOfBirthOpen: false,
          passportNo: '',
          passportExpiryDate: null,
          isPassportExpiryDateOpen: false

        }) : [],
        childTraveller: data.child ? Array(data.child).fill({
          frequentFlyerNo: '',
          travellerType: 'CHILD',
          title: '',
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: null,
          isDateOfBirthOpen: false,
          passportNo: '',
          passportExpiryDate: null,
          isPassportExpiryDateOpen: false
        }) : [],
        infantTraveller: data.infant ? Array(data.infant).fill({
          frequentFlyerNo: '',
          travellerType: 'CHILD',
          title: '',
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: null,
          isDateOfBirthOpen: false,
          passportNo: '',
          passportExpiryDate: null,
          isPassportExpiryDateOpen: false
        }) : [],
      }
      dispatch(addSaveTravellerSuccess(saveTravellerAppend));
    } catch (error) {
        console.log(error)
    }
  };
};

export const postTravellersDetailsApi = (payload, enqueueSnackbar) => {
  return async (dispatch) => {
    dispatch(setGenericLoader(true))
    try {
      const saveTravellerResponse = await globalPostService("/api/Flights/SaveTraveller", payload);
      if (checkApiStatus(saveTravellerResponse)) {
        const responseData = saveTravellerResponse.data.data;
        // dispatch(getSaveResponseSuccess(responseData));
        dispatch(flightLoaderOn());
        const bookingReference = responseData.bookingRef;
        // const encryptedBookingReference = encryptUrl(responseData.bookingRef);

        if (typeof window !== "undefined") {
          window.location.href = `/payment-method/?ref=${bookingReference}`;
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        dispatch(setBookingRef(bookingReference))
        dispatch(setPostSaveSeatInformation({
          bookingRef: bookingReference,
          _listOfSelection: []
        }))
        dispatch(setPostSaveMealsInformation({
          bookingRef: bookingReference,
          _listOfSelection: []
        }))
        dispatch(setPostSaveBaggageInformation({
          bookingRef: bookingReference,
          _listOfSelection: []
        }))
        //seat
        const seatInformationResponse = await globalGetService(`/api/AddOns/GetSeats?bookingref=${bookingReference}`);
        //meals
        const mealsInformationResponse = await globalGetService(`/api/AddOns/GetMeals?bookingref=${bookingReference}`);
        //lagguage

        const extraLuggageInformationresponse = await globalGetService(`/api/AddOns/GetExtraLuaggage?bookingref=${bookingReference}`);

        if (checkApiStatus(seatInformationResponse)) {
          const seatInformation = seatInformationResponse.data.data;

          dispatch(getSeatInformationSuccess(seatInformation));
          dispatch(flightLoaderOff());
        }
        if (checkApiStatus(mealsInformationResponse)) {
          const mealsInformation = mealsInformationResponse.data.data;

          dispatch(getMealsInformationSuccess(mealsInformation));
          dispatch(flightLoaderOff());
        }
        if (checkApiStatus(extraLuggageInformationresponse)) {
          const extraLuggageInformation =
            extraLuggageInformationresponse.data.data;

          dispatch(getExtraLuggageInformationSuccess(extraLuggageInformation));
          //dispatch(flightLoaderOff());
        }

      } else if (saveTravellerResponse.data.statusCode === 406) {
        enqueueSnackbar(saveTravellerResponse.data.data, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center', }, });
      } else {
        enqueueSnackbar(saveTravellerResponse.data.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center', }, });
      }
    } catch (error) {
    }
  };
};


export const postSeatInformationApi = (payload) => {
  return new Promise((resolve, reject) => {
    globalPostService(`/api/AddOns/SaveSeat`, payload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const postMealInformationApi = (payload) => {
  return new Promise((resolve, reject) => {
    globalPostService(`/api/AddOns/SaveMeal`, payload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const postBaggageInformationApi = (payload) => {
  return new Promise((resolve, reject) => {
    globalPostService(`/api/AddOns/SaveExtraLuaggage`, payload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}