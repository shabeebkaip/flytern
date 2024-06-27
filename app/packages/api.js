
import {
  globalGetService,
  globalPostService,
} from "@/lib/globalApiServices";
import {
  getPackageCountryListSuccess,
  loaderRequest,
  packageDetailsFail,
  packageDetailsSuccess,
  packageListFail,
  packageListSuccess,
  packageLoaderOff,
  packageLoaderOn,
} from "@/lib/slices/packagesSlice";

export const getPackagesApi = (params, prevState) => {
  return async (dispatch) => {
    try {
      dispatch(packageLoaderOn());
      const data = await globalGetService("/api/Packages", params)
        .then(
          (response) => {
            return response.data.data;
          }
        );
      const { pageid } = params
      let _data

      if (pageid && pageid > prevState?.currentPage) {
        _data = {
          ...prevState,
          packages: data?.packages ? [...prevState.packages, ...data.packages] : [],
          totalPages: data?.totalPages
        };
      } else if (pageid && pageid <= prevState?.currentPage) {
        _data = {
          ...prevState,
          packages: data?.packages ? data?.packages : [],
          totalPages: data?.totalPages
        };
      } else if (!pageid) {
        _data = data;
      }
      dispatch(packageListSuccess(_data));
      dispatch(packageLoaderOff());
    } catch (error) {
      dispatch(packageListFail(error));
      dispatch(packageLoaderOff());
    }
  };
};

export const getPackageDetailsApi = (id) => {
  return async (dispatch) => {
    try {
      dispatch(packageLoaderOn());
      const data = await globalGetService(`api/Packages/Detail/${id}`)
        .then((response) => {
          dispatch(packageLoaderOff());
          return response.data.data;
        });
      dispatch(packageDetailsSuccess(data));
    } catch (error) {
      dispatch(packageDetailsFail(error.response.data.message));
    }
  };
};

export const getpackageCountryListApi = () => {
  return async (dispatch) => {
    try {
      dispatch(packageLoaderOn());
      const data = await globalGetService("/api/Packages/PreTraveller").then(
        (response) => {
          dispatch(packageLoaderOff());
          return response.data.data.mobileCountryList;
        }
      );
      dispatch(getPackageCountryListSuccess(data));
    } catch (error) {
    }
  };
};

export const addpackageUserApi = async (payload) => {
  try {
    const data = await globalPostService(
      "/api/Packages/SaveTraveller",
      payload
    );
    return data;
  } catch (error) {
  }
};
