import { checkApiStatus } from "@/lib/utils"
import { savePaymentMethodSuccess, setPaymentWaitLoader } from "@/lib/slices/paymentSlice";
import { globalPostService } from "@/lib/globalApiServices";



export const savePaymentMethodApi = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setPaymentWaitLoader(true))
      const data = await globalPostService("/api/Payments/SaveGateway", payload)
        .then((response) => {
          if (checkApiStatus(response)) {
            if (typeof window !== 'undefined') {
              window.location.assign(response.data.data.gatewayUrl);
              return response.data.data;
            }
          }

        });
      dispatch(savePaymentMethodSuccess(data));
    } catch (error) {
    }
  };
}