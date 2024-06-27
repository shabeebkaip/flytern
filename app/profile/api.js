import { globalFileUploadPutService, globalGetService, globalPostService, globalFileUploadService, globalPatchService } from '@/lib/globalApiServices';
import { profileFail, loaderRequest, profileSuccess, coPaxSuccess, coPaxFail, myBookingsSuccess } from '@/lib/slices/profileSlice';
import { checkApiStatus } from '@/lib/utils';
export const getProfileDetailApi = async (dispatch) => {
  try {
    dispatch(loaderRequest());
    const data = await globalGetService('/api/Users/GetUserProfile')
      .then((response) => {
        return response.data.data;
      });

    dispatch(profileSuccess(data));
  } catch (error) {
    dispatch(profileFail(error.response.data.message))
  }
};


export const getCoPaxApi = async (dispatch) => {
  try {
    dispatch(loaderRequest());
    const data = await globalGetService('api/CoPaxs/GetUserCoPaxs')
      .then((response) => {
        return response.data.data;
      });
    dispatch(coPaxSuccess(data));
  } catch (error) {
    dispatch(coPaxFail(error.response.data.message))
  }
}





export const addTestimonialApi = (data) => {
  return new Promise((resolve, reject) => {
    globalFileUploadService('/api/TravelStories/CreateTestimonials', data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const getMyTravelStoriesApi = (setData, setLoader) => {
  setLoader(true);
  return globalGetService('/api/TravelStories/GetTravelStories')
    .then((response) => {
      setData(response.data.data);
      setLoader(false);
    })
    .catch((error) => {
      return error;
    });
}









