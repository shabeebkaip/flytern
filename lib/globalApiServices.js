import axiosInstance from "@/lib/apiInterceptor";

export const globalGetService = (url, params) => {
  return new Promise(function (resolve, reject) {
    axiosInstance({
      method: "get",
      url: url,
      params: params,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error)
      });
  });
};

export const globalPostService = (url, data) => {
  return new Promise(function (resolve, reject) {
    axiosInstance({
      method: "POST",
      url: url,
      data: data,
    }).then((response) => {
      resolve(response);
    });
  });
};
export const globalPatchService = (url, data) => {
  return new Promise(function (resolve, reject) {
    axiosInstance({
      method: "PATCH",
      url: url,
      data: data,
    }).then((response) => {
      resolve(response);
    });
  });
};

// PUT API Call
export const globalPutService = (url, data) => {
  return new Promise(
    function (resolve, reject) {
      axiosInstance({
        method: 'PUT',
        url: url,
        data: data
      })
        .then(response => {
          resolve(response);
        })
    }
  )
}
// DELETE API Call
export const globalDeleteService = (url, data) => {
  return new Promise(
    function (resolve, reject) {
      axiosInstance({
        method: 'DELETE',
        url: url,
        data: data
      })
        .then(response => {
          resolve(response);
        })
    }
  )
}
export const globalExportService = (url, queryParams = {}) => {
  return new Promise(
    function (resolve, reject) {
      axiosInstance({
        method: 'GET',
        url: url,
        responseType: 'blob',
        params: queryParams
      })
        .then(response => {
          resolve(response);
        })
    }
  )
}

export const globalFileUploadService = (url, data, config) => {
  return new Promise(
    function (resolve, reject) {
      axiosInstance.post(url, data, config)
        .then(function (response) {
          resolve(response);
        })
    }
  )
}

export const globalFileUploadPutService = (url, data, config) => {
  return new Promise(
    function (resolve, reject) {
      axiosInstance.put(url, data, config)
        .then(function (response) {
          resolve(response);
        })
    }
  )
}
