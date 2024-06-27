import { globalGetService, globalPostService } from "@/lib/globalApiServices"
import { checkApiStatus } from "@/lib/utils"

export const viewCoPaxApi = (id, setData, setLoader) => {
    setLoader(true)
    globalGetService(`/api/CoPaxs/ViewUserCoPax/${id}`)
      .then(response => {
        if (checkApiStatus(response)) {
          setData({ ...response.data.data, id: parseInt(id) })
        }
        setLoader(false)
      })
      .catch(error => {
  
      })
  }

  export const deleteCopaxApi = async (id) => {
    try {
      const data = await globalPostService(`/api/CoPaxs/DeleteUserCopax/${id}`)
      const res = await checkApiStatus(data)
    } catch (error) {
      return error
    }
  
  }

  export const updateCoPaxApi = (data) => {
    return new Promise((resolve, reject) => {
      globalPostService(`/api/CoPaxs/UpdateUserCopax`, data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }