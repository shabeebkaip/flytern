import { globalPostService } from "@/lib/globalApiServices";

export const postQueryApi = async (payload) => {
    try {
      const response = await globalPostService('/api/Bookings/Submitinquiry', payload)
      return response
    } catch (error) {
      return error
    }
  }
  
  
