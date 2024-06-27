import React, { useState } from "react";
import TitleCard from "../../../shared/components/TitleCard";
import { ProfileIconSvg } from "@/app/shared/components/SVG";
import { CircularProgress } from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";
import { postTravellersDetailsApi } from "@/app/flights/api";
import { addSaveTravellerSuccess } from "@/lib/slices/flightSlice";
import { useSnackbar } from 'notistack';
import { regexConstants } from "@/lib/regex";
import AddTraveller from "@/app/flights/details/components/AddTraveller";


const FlightUserDetails = (props) => {
  const [frequentFlyerNoError, setFrequentFlyerNoError] = useState('');
  const [adultErrors, setAdultErrors] = useState([]);
  const [childErrors, setChildErrors] = useState([]);
  const [infantErrors, setInfantErrors] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { preTraveller, flightDetails, contactDc, saveTraveller, buttonLoader, coPax } = props;
  const travellersDetails = {
    _Travellerinfo: [],
    _CntDc: {},
  };
  const submitTvellersDetails = () => {
    // adult validation errors
    let adultValidationErrors = saveTraveller.adultTraveller.map(item => ({
      Title: item.title ? '' : 'Title is required',
      FirstName: item.firstName && item.firstName?.length >= 3 ? '' : 'Valid First Name is required',
      LastName: item.lastName && item.lastName?.length >= 3 ? '' : 'Valid Last Name is required',
      Gender: item.gender ? '' : 'Gender is required',
      DateOfBirth: item.dateOfBirth ? '' : 'Date of Birth is required',
      PassportNumber: item.passportNumber ? regexConstants.alphanumericRegex.test(item.passportNumber) ? '' : 'Please enter a valid Passport Number' : 'Passport Number is required',
      NationalityCode: item.nationalityCode ? '' : "Nationality is required",
      PassportIssuedCountryCode: item.passportIssuedCountryCode ? '' : 'Passport Issued Country is required',
      PassportExpiryDate: item.passportExpiryDate ? '' : 'Passport Expiry Date is required',

    }))
    checkValidationErrors(adultValidationErrors, setAdultErrors);
    // child validation errors
    let childValidationErrors = saveTraveller.childTraveller.map(item => ({
      Title: item.title ? '' : 'Title is required',
      FirstName: item.firstName && item.firstName?.length >= 3 ? '' : 'Valid First Name is required',
      LastName: item.lastName && item.lastName?.length >= 3 ? '' : 'Valid Last Name is required',
      Gender: item.gender ? '' : 'Gender is required',
      DateOfBirth: item.dateOfBirth ? '' : 'Date of Birth is required',
      PassportNumber: item.passportNumber ? regexConstants.alphanumericRegex.test(item.passportNumber) ? '' : 'Please enter a valid Passport Number' : 'Passport Number is required',
      NationalityCode: item.nationalityCode ? '' : "Nationality is required",
      PassportIssuedCountryCode: item.passportIssuedCountryCode ? '' : 'Passport Issued Country is required',
      PassportExpiryDate: item.passportExpiryDate ? '' : 'Passport Expiry Date is required',
    }))
    if (childValidationErrors.map(item => Object.values(item)).flat().filter(item => item !== '').length) {
      setChildErrors(childValidationErrors)
    } else {
      setChildErrors([])
    }

    // New validation errors for infants
    let infantValidationErrors = saveTraveller.infantTraveller.map(item => ({
      Title: item.title ? '' : 'Title is required',
      FirstName: item.firstName && item.firstName?.length >= 3 ? '' : 'Valid First Name is required',
      LastName: item.lastName && item.lastName?.length >= 3 ? '' : 'Valid Last Name is required',
      Gender: item.gender ? '' : 'Gender is required',
      DateOfBirth: item.dateOfBirth ? '' : 'Date of Birth is required',
      PassportNumber: item.passportNumber ? regexConstants.alphanumericRegex.test(item.passportNumber) ? '' : 'Please enter a valid Passport Number' : 'Passport Number is required',
      NationalityCode: item.nationalityCode ? '' : "Nationality is required",
      PassportIssuedCountryCode: item.passportIssuedCountryCode ? '' : 'Passport Issued Country is required',
      PassportExpiryDate: item.passportExpiryDate ? '' : 'Passport Expiry Date is required',
    }))
    if (infantValidationErrors.map(item => Object.values(item)).flat().filter(item => item !== '').length) {
      setInfantErrors(infantValidationErrors)
    } else {
      setInfantErrors([])
    }
    let adultValidationCheck = adultValidationErrors.map(item => Object.values(item)).flat().filter(item => item !== '').length;
    let childValidationCheck = childValidationErrors.map(item => Object.values(item)).flat().filter(item => item !== '').length;
    let infantValidationCheck = infantValidationErrors.map(item => Object.values(item)).flat().filter(item => item !== '').length;
    if (adultValidationCheck || childValidationCheck || infantValidationCheck) {
      return;
    } else {
      let _preTravellers = [...saveTraveller.adultTraveller, ...saveTraveller.childTraveller, ...saveTraveller.infantTraveller].map(
        (item, index) => {
          let _item = {
            FrequentFlyerNo: item?.frequentFlyerNo,
            No: (index + 1).toString(),
            TravellerType: item?.travellerType,
            Title: item?.title,
            FirstName: item?.firstName,
            LastName: item?.lastName,
            Gender: item?.gender,
            DateOfBirth: item?.dateOfBirth,
            PassportNumber: item?.passportNumber,
            NationalityCode: item?.nationalityCode,
            PassportIssuedCountryCode: item?.passportIssuedCountryCode,
            PassportExpiryDate: item?.passportExpiryDate,

          };
          return _item;
        }
      );

      let _travellersDetails = { ...travellersDetails };
      _travellersDetails._Travellerinfo = _preTravellers;
      _travellersDetails.CabinID = flightDetails.selectedCabinId;
      _travellersDetails.DetailID = flightDetails.detailId;
      _travellersDetails.ObjectID = flightDetails.objectId;
      _travellersDetails._CntDc = {
        mobileCntry: contactDc?.countryCode,
        Email: contactDc?.email,
        mobileNumber: contactDc?.mobileNumber,
      };

      if (_preTravellers.length) {
        dispatch(postTravellersDetailsApi(_travellersDetails, enqueueSnackbar));
      } else {
        enqueueSnackbar('Fields should not be blank', {
          variant: 'error',
          autoHideDuration: 2000,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    }


  };

  const handleTravellerOnChange = (key, value, index, type) => {
    if (key === 'firstName' || key === 'lastName') {
      const alphabeticWithSpaceRegex = /^[A-Za-z ]+$/;

      if (value !== '' && !alphabeticWithSpaceRegex.test(value)) {
        return;
      }

      value = value.toUpperCase();
    }
    if (key === 'passportNumber') {
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;

      if (value !== '' && !alphanumericRegex.test(value)) {
        return;
      }

      value = value.toUpperCase();
    }

    if (key === 'frequentFlyerNo') {
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      if (!alphanumericRegex.test(value)) {
        setFrequentFlyerNoError('Frequent Flyer Number must be alphanumeric');
      } else {
        setFrequentFlyerNoError('');
      }
    }
    dispatch(addSaveTravellerSuccess({
      ...saveTraveller,
      [type]: saveTraveller?.[type]?.map((item, i) => {
        if (i === index) {
          if (key === "dateOfBirth") {
            return {
              ...item,
              [key]: value,
              isDateOfBirthOpen: false
            }
          } else if (key === "passportExpiryDate") {
            return {
              ...item,
              [key]: value,
              isPassportExpiryDateOpen: false
            }
          }
          else if (key === "title") {
            return {
              ...item,
              [key]: value,
              gender: ["Mr"].includes(value) ? "Male" : "Female"
            }
          } else {
            return {
              ...item,
              [key]: value
            }

          }
        } else {
          return item
        }
      })
    }
    ))
  }
  const checkValidationErrors = (validationData, setData) => {
    const errorsExist = validationData.map(item => Object.values(item)).flat().filter(item => item !== '').length;
    setData(errorsExist ? validationData : []);
  };

  const removeErrorFields = (key, index, setError) => {
    setError(prevState => prevState.map((item, i) => {
      if (i === index) {
        if (key === "Title") {
          return {
            ...item,
            [key]: '',
            Gender: ''
          }
        } else {
          return {
            ...item,
            [key]: ''
          }
        }
      } else {
        return item
      }
    }))
  }
  const appendTraveller = (value, index, type) => {
    dispatch(addSaveTravellerSuccess({
      ...saveTraveller,
      [type]: saveTraveller?.[type]?.map((item, i) => {
        if (i === index) {
          return {
            title: value.title,
            gender: value.gender,
            firstName: value.firstName,
            lastName: value.lastName,
            dateOfBirth: value.dateofBirth,
            id: value.id,
            nationalityCode: value.nationalityCode,
            passportNumber: value.passportNumber,
            passportExpiryDate: value.passportExp,
            passportIssuedCountryCode: value.passportIssuedCountryCode,

          }
        } else {
          return item
        }
      })
    }))
  }


  const filteredTitleList = preTraveller?.titleList?.filter((item) => item.code != 0).map(item => item.code)
  const filteredGenderList = preTraveller?.genderList?.filter((item) => item.code != 0).map(item => item.code)
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <TitleCard
      topMargin="mt-0"
      title={
        <>
          <div className="flex items-center gap-2 ">
            <ProfileIconSvg width={"24"} color={"#066651"} />
            <h4 className="text-lg font-medium text-black ">
              {translation?.user_details}
            </h4>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-5 mt-8 ">
        {
          saveTraveller?.adultTraveller?.length ?
            saveTraveller?.adultTraveller?.map((item, index) => (
              <AddTraveller
                coPax={coPax}
                index={index}
                appendTraveller={appendTraveller}
                preTraveller={preTraveller}
                removeErrorFields={removeErrorFields}
                errors={adultErrors}
                setErrors={setAdultErrors}
                filteredTitleList={filteredTitleList}
                item={item}
                handleTravellerOnChange={handleTravellerOnChange}
                filteredGenderList={filteredGenderList}
                frequentFlyerNoError={frequentFlyerNoError}
                type="adultTraveller"
                title={translation?.adult}
                dobMinDate={preTraveller?.adultMinDOB}
                dobMaxDate={preTraveller?.adultMaxDOB}
                key={index}
              />
            )) : null
        }
        {
          saveTraveller?.childTraveller?.length ?
            saveTraveller?.childTraveller?.map((item, index) => (
              <AddTraveller
                coPax={coPax}
                index={index}
                appendTraveller={appendTraveller}
                preTraveller={preTraveller}
                removeErrorFields={removeErrorFields}
                errors={childErrors}
                setErrors={setChildErrors}
                filteredTitleList={filteredTitleList}
                item={item}
                handleTravellerOnChange={handleTravellerOnChange}
                filteredGenderList={filteredGenderList}
                frequentFlyerNoError={frequentFlyerNoError}
                type="childTraveller"
                title={translation?.child}
                dobMinDate={preTraveller?.childMinDOB}
                dobMaxDate={preTraveller?.childMaxDOB}
                key={index}

              />
            )) : null
        }
        {
          saveTraveller?.infantTraveller?.length ?
            saveTraveller?.infantTraveller?.map((item, index) => (
              <AddTraveller
                coPax={coPax}
                index={index}
                appendTraveller={appendTraveller}
                preTraveller={preTraveller}
                removeErrorFields={removeErrorFields}
                errors={infantErrors}
                setErrors={setInfantErrors}
                filteredTitleList={filteredTitleList}
                item={item}
                handleTravellerOnChange={handleTravellerOnChange}
                filteredGenderList={filteredGenderList}
                frequentFlyerNoError={frequentFlyerNoError}
                type="infantTraveller"
                title={translation?.infant}
                dobMinDate={preTraveller?.infantMinDOB}
                dobMaxDate={preTraveller?.infantMaxDOB}
                key={index}

              />
            )) : null
        }
      </div>
      <button
        className=" mt-8 h-12 w-40 text-center text-white text-base font-medium px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center"
        onClick={submitTvellersDetails}
      > {
          buttonLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> :
            translation?.continue
        }

      </button>
    </TitleCard>
  );
};


function mapStateToProps(state) {
  return {
    preTraveller: state.flightState.preTraveller,
    flightDetails: state.flightState.flightDetails,
    profile: state.sharedState.profile,
    contactDc: state?.sharedState?.contactDc,
    saveTraveller: state?.flightState?.saveTraveller,
    buttonLoader: state?.flightState?.buttonLoader,
    coPax: state?.profileState?.coPax,
  };
}

export default connect(mapStateToProps, null)(FlightUserDetails);
