import { globalPostService } from "@/lib/globalApiServices"

export const userVerifyOtpApi = (data) => {
    return new Promise((resolve, reject) => {
      globalPostService('/api/Users/VerifyOTP', data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  export const resendOTPApi = (data) => {
    debugger
    return new Promise((resolve, reject) => {
      globalPostService(`/api/Users/ResendOTP`, data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }