import { globalGetService, globalPostService } from "@/lib/globalApiServices";
import { loaderRequest, myBookingsSuccess } from "@/lib/slices/profileSlice";
import { checkApiStatus } from "@/lib/utils";


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

  export const getGuestBookingsApi = async (payload, navigate) => {
    try {
      const response = await globalPostService(`/api/Payments/ViewBooking`, payload)
      const responseStatus = await checkApiStatus(response)
      if (responseStatus) {
        navigate(`/payment-summary?ref=${response.data.data.bookingRef}`)
      }
    }
    catch (error) {
      return error
    }
  }