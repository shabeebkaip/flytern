import { globalGetService, globalPostService } from "@/lib/globalApiServices";
import { loaderRequest, myBookingsSuccess } from "@/lib/slices/profileSlice";
import { checkApiStatus, encryptId } from "@/lib/utils";


export const getMyBookingsApi = (pageId, serviceType) => {
    return async (dispatch) => {
      try {
        dispatch(loaderRequest());
        const data = await globalGetService(`/api/Bookings/GetMyBooking?pageid=${pageId}&servicetype=${serviceType}`)
          .then((response) => {
            return response.data.data
          });
        dispatch(myBookingsSuccess(data))
      } catch (error) {
      }
    }
  }

  export const getGuestBookingsApi = async (payload) => {
    try {
      const response = await globalPostService(`/api/Payments/ViewBooking`, payload)
      const responseStatus = await checkApiStatus(response)
      if (responseStatus) {
        const encripted = encryptId(response.data.data.bookingRef)
        window.location.href=`/payment-summary?ref=${encripted}`
      }
    }
    catch (error) {
      return error
    }
  }