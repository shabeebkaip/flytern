import {
    globalGetService,
    globalPostService,
  } from "@/lib/globalApiServices";

  import {
    hotelLoadingOff,
    hotelLoadingOn,
    setHotelDetails,
    setHotels,
    setPreTravellerData
  } from "@/lib/slices/hotelSlice";

  import { checkApiStatus } from "@/lib/utils"

export const getHotelsApi = (data) => {
    return async (dispatch) => {
      try {
        dispatch(hotelLoadingOn());
        const response = await globalPostService(`/api/Hotels/GetHotels`, data)
          .then(response => {
            dispatch(hotelLoadingOff());
            if (checkApiStatus(response)) {
              return response.data.data
            }
          })
        dispatch(setHotels(response))
      } catch (error) {
        return error
      }
    }
  }
  

  export const getFilterHotelsApi = (payload, previousState) => {
    return async (dispatch) => {
      try {
        // dispatch(hotelLoadingOn());
        const data = await globalPostService(`/api/Hotels/FilterHotels`, payload)
          .then(response => {
            // dispatch(hotelLoadingOff());
            if (checkApiStatus(response)) {
              return response.data.data
            }
          })
        let _data
        if (payload.pageId > previousState.currentPage) {
          _data = {
            ...previousState,
            _lst: data?._lst ? [...previousState._lst, ...data._lst] : [],
            currentPage: payload.pageId,
            totalHotels: data?.totalHotels
  
  
  
          };
        } else {
          _data = {
            ...previousState,
            _lst: data?._lst ? data?._lst : [],
            totalPages: data?.totalPages,
            totalHotels: data?.totalHotels
          };
        }
        dispatch(setHotels(_data));
  
      } catch (error) {
        return error
      }
    }
  }
  
  export const getHotelDetailsApi = (objectID, id) => {
    return async (dispatch) => {
      dispatch(hotelLoadingOn())
      try {
        const response = await globalGetService(`/api/Hotels/Detail`, { objectid: objectID, hotelid: id })
          .then(response => {
            dispatch(hotelLoadingOff())
            if (checkApiStatus(response)) {
              return response.data.data
            }
          })
        dispatch(setHotelDetails(response))
      } catch (error) {
        dispatch(hotelLoadingOff())
      }
    }
  }
  
  export const getPreTravellerApi = (objectID, id) => {
    return async (dispatch) => {
      try {
        // dispatch(hotelLoadingOn())
        const response = await globalGetService(`/api/Hotels/PreTraveller`, { objectid: objectID, hotelid: id })
          .then(response => {
            if (checkApiStatus(response)) {
              return response.data.data
            }
          })
        let data = response
        data = {
          ...data,
          rooms: data.rooms.map((room) => ({
            ...room,
            adultTravellers: Array(room.adults).fill({
              Roomid: room.roomID,
              title: null,
              gender: null,
              firstName: '',
              lastName: '',
              TravellerType: 'Adult',
            }),
            childTravellers: Array(room.childs).fill({
              title: '',
              gender: '',
              firstName: '',
              lastName: '',
            }),
          }))
        }
        // dispatch(hotelLoadingOff())
        dispatch(setPreTravellerData(data))
      } catch (error) {
    
      }
    }
  }
  
  export const postHotelTravellerApi = (data) => {
    return new Promise((resolve, reject) => {
      globalPostService(`/api/Hotels/SaveTraveller`, data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }