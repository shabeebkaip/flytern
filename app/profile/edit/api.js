import { globalFileUploadPutService, globalPostService } from "@/lib/globalApiServices";

export const updateProfileApi = (data) => {
    return globalFileUploadPutService('/api/Users/UpdateUserProfile', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  
  export const updateMobileApi = (data) => {
    return globalPostService('/api/Users/ChangeMobile', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      })
  }
  
  export const updateEmailApi = (data) => {
    return globalPostService('/api/Users/ChangeEmail', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      })
  }
  
  export const updateOtpApi = (data) => {
    return globalPostService('/api/Users/VerifyOTP', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error
      })
  }