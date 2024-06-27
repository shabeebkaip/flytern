import { globalPostService } from "@/lib/globalApiServices";

export const postSmartPaymentApi = async (payload) => {
    try {
      const response = await globalPostService(`/api/Payments/SmartPayment`, payload)
  
      return response
    } catch (error) {
      return error
    }
  };
  
  export const postSmartPaymentGatewayApi = async (payload) => {
  
    try {
      const response = await globalPostService(`/api/Payments/SaveGateway`, payload)
      return response
    }
    catch (error) {
      return error
    };
  };