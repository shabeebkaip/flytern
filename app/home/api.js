
import { checkApiStatus } from "@/lib/utils";
import { globalGetService } from "@/lib/globalApiServices"
import { exploresFail, exploresRequest, exploresSuccess, setHotelQuickSearch } from "@/lib/slices/exploreSlice"

export const getExploresApi = () => {
  return async (dispatch) => {
    try {
      const response = await globalGetService('/api/Explores/GetExplores');
      if (checkApiStatus(response)) {
        dispatch(exploresSuccess(response.data.data))
      } else {
        dispatch(exploresFail(response.data.message))
      }
    } catch (error) {
      return error
    }

  }
}

export const getDestinationAutoSearchApi = (search, setSearchResult, setDestinationLoader) => {
  if (search.length) {
    globalGetService('/api/Flights/GetDestination', { search })
      .then(response => {
        if (checkApiStatus(response)) {
          setSearchResult(response.data.data)
        } else {
          setSearchResult([])
        }
      })
  } else {
    setSearchResult([])
  }
}

export const getHotelDestinationAutoSearchApi = (search, setSearchResult, setDestinationLoader) => {
  setDestinationLoader(true)
  if (search.length < 3) return setSearchResult([])
  globalGetService('/api/Hotels/GetDestination', { search })
    .then(response => {
      setDestinationLoader(false)
      if (checkApiStatus(response)) {
        setSearchResult(response.data.data)
      } else {
        setSearchResult([])
      }
    })
}

export const getHotelQuickSearchApi = async (dispatch) => {
  try {
    const data = await globalGetService('/api/Hotels/GetQuickSearch')
      .then((response) => {
        if (checkApiStatus(response)) {
          return response.data.data;
        }
      });
    dispatch(setHotelQuickSearch(data))
  }
  catch (error) {
    return error
  }
}   