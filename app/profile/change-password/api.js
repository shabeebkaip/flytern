import { globalPatchService } from "@/lib/globalApiServices"
import { checkApiStatus } from "@/lib/utils"

export const updatePasswordApi = async (data) => {
    try {
      const res = await globalPatchService(`/api/Users/ChangePassword`, data)
      const datas = await checkApiStatus(res)
      return datas
    } catch (error) {
      return error
    }
  
  }