import { globalFileUploadService, globalGetService, globalPostService } from "@/lib/globalApiServices"
import { checkApiStatus } from "@/lib/utils"


export const userSignUpApi = (data) => {
  return new Promise((resolve, reject) => {
    globalFileUploadService('/api/Users/Register', data)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}





