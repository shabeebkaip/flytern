import { globalGetService, globalPostService } from "@/lib/globalApiServices"
import { checkApiStatus } from "@/lib/utils"

export const forgotPasswordApi = (data) => {
    return new Promise((resolve, reject) => {
      globalPostService(`/api/Users/ForgetPassword`, data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  export const getCountriesListApi = (setData) => {
    globalGetService('/api/Users/PreRegister')
      .then(response => {
        if (checkApiStatus(response)) {
          setData(response.data.data.country)
        }
      })
  }