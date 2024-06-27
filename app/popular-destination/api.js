import { globalGetService } from "@/lib/globalApiServices"
import { loadingOff, loadingOn, popularDestinationSuccess } from "@/lib/slices/genaralSlice"

export const popularDestinationApi = (pageId) => {
    return async (dispatch) => {
      try {
        dispatch(loadingOn())
        const data = await globalGetService(`/api/Explores/GetViewAllpopularDestinations?pageid=${pageId}`)
          .then((response) => {
            dispatch(loadingOff())
            return response.data.data
          })
        dispatch(popularDestinationSuccess(data))
      } catch (error) {
      }
    }
  }