import { globalPostService } from "@/lib/globalApiServices"

export const addCoPaxApi = (data) => {
    return new Promise((resolve, reject) => {
      globalPostService(`/api/CoPaxs/CreateUserCopax`, data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }