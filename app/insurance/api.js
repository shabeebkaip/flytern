import { globalGetService, globalPostService } from "@/lib/globalApiServices"
import { insuranceFormListFail, insuranceFormListSuccess, loaderRequest, saveTravellerFail, saveTravellerSuccess } from "@/lib/slices/insuranceSlice"


export const getInsuranceFormListApi = () => {
    return async (dispatch) => {
        try {
            dispatch(loaderRequest())
            const data = await globalGetService('api/Insurances/PreInsurance')
                .then(response => {
                    return response.data.data
                })
            dispatch(insuranceFormListSuccess(data))
        } catch (error) {
            dispatch(insuranceFormListFail(error.response.data.message))
        }
    }
}




export const addInsuranceApi = (data) => {
    return new Promise((resolve,reject) => {
        globalPostService(`/api/Insurances/GetPriceInfo?covidtype=${data.covidtype}&policyplan=${data.policyplan}&policy_type=${data.policy_type}&policyperiod=${data.policyperiod}`,data)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })
}

export const addInsuranceUserDetailsApi = (data) => {

    return new Promise((resolve,reject) => {
        globalPostService(`api/Insurances/SaveTraveller`,data)
        .then(response => {
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}

