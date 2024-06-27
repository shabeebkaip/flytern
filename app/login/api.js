import { globalPostService } from "@/lib/globalApiServices"

export const userLoginApi = (data) => {
    return new Promise((resolve, reject) => {
      globalPostService('/api/Users/Login', data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }