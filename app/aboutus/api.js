import { globalGetService } from "@/lib/globalApiServices";
import { checkApiStatus } from "@/lib/utils";

export const getAboutApi = async () => {
    try {
      const data = await globalGetService(`/api/Supports/Info?type=ABOUTUS`)
      if (checkApiStatus(data)) {
        return data.data.data
      }
    }
    catch (error) {
      console.log(error)
      return error
    };

  };