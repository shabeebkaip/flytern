import { globalGetService } from "@/lib/globalApiServices"
import { loadingOff, loadingOn, recomendedSuccess } from "@/lib/slices/genaralSlice"

export const getRecomendedApi = (pageId) => {
    return async (dispatch) => {
      try {
        dispatch(loadingOn())
        const data = await globalGetService(`/api/Explores/GetViewAllRecommeded?pageid=${pageId}`)
          .then((response) => {
            dispatch(loadingOff())
            return response.data.data
          })
        dispatch(recomendedSuccess(data))
      } catch (error) {
      }
    }
  }