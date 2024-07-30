import React, { useState, useEffect } from "react";
import TitleCard from "@/app/shared/components/TitleCard";
import { ProfileIconSvg } from "@/app/shared/components/SVG";
import { checkApiStatus, encrypt, encryptUrl } from "@/lib/utils";
import { Autocomplete, CircularProgress, Radio } from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";
import { postHotelTravellerApi } from "@/app/hotels/api";
import { CustomTextField } from "@/app/shared/components/CustomTextField";
import { useSnackbar } from "notistack";
import { hotelButtonLoaderOff, hotelButtonLoaderOn, setPreTravellerData } from "@/lib/slices/hotelSlice";

const HotelUserDetails = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { preTraveller, contactDc, saveTravellerData, buttonLoader, profile, objectID, id } = props;
  const [availablePassengers, setAvailablePassengers] = useState(preTraveller?.adultTraveller ?? []);
  const [tabIndex, setTabIndex] = useState(0);
  const [adultErrors, setAdultErrors] = useState([]);
  const [childErrors, setChildErrors] = useState([]);
  const { translation } = useSelector((state) => state.sharedState);
  const submitTvellersDetails = () => {
    dispatch(hotelButtonLoaderOn());
    let payload = {};
    let allAdultTravellers = preTraveller?.rooms.map(room => room.adultTravellers).flat() ?? [];
    let allChildTravellers = preTraveller?.rooms.map(room => room.childTravellers).flat() ?? [];

    let adultValidationError = allAdultTravellers.map(item => ({
      title: item.title ? "" : 'Title is required',
      gender: item.gender ? "" : "Gender is required",
      firstName: item.firstName ? "" : "First Name is required",
      lastName: item.lastName ? "" : "Last Name is required",
    }));

    let childValidationError = allChildTravellers.map(item => ({
      title: item.title ? "" : 'Title is required',
      gender: item.gender ? "" : "Gender is required",
      firstName: item.firstName ? "" : "First Name is required",
      lastName: item.lastName ? "" : "Last Name is required",
    }));

    const hasAdultErrors = checkValidationErrors(adultValidationError, setAdultErrors);
    const hasChildErrors = checkValidationErrors(childValidationError, setChildErrors);

    if (hasAdultErrors || hasChildErrors) {
      dispatch(hotelButtonLoaderOff());
      enqueueSnackbar('Please fill all required fields', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      return;
    }

    allAdultTravellers = allAdultTravellers.map(item => ({
      ...item,
      HotelOptionid: saveTravellerData?.roomOptionid,
    }));

    let contactObj = {
      MobileCntry: contactDc?.countryCode,
      MobileNumber: contactDc?.mobileNumber,
      Email: contactDc?.email,
    };

    payload = {
      _Travellerinfo: [...allAdultTravellers, ...allChildTravellers],
      objectID: objectID,
      hotelID: id,
      bookingCode: saveTravellerData?.bookingCode,
      _CntDc: contactObj
    };

    postHotelTravellerApi(payload)
      .then((response) => {
        if (checkApiStatus(response)) {
          enqueueSnackbar('User Details Added Successfully', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          const encryptedBookingRef = encrypt(response.data.data.bookingRef);
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.href = `/payment-method/?ref=${encryptedBookingRef}`;
            }
          }, 1000);
        } else {
          const errorMessage = response.data?.message || 'Please Fill All Fields';
          enqueueSnackbar(errorMessage, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        enqueueSnackbar('Please Fill All Fields', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      })
      .finally(() => {
        dispatch(hotelButtonLoaderOff());
      });
  };

  const adultTravellerOnchange = (field, value, itemIndex) => {
    dispatch(setPreTravellerData({
      ...preTraveller,
      rooms: preTraveller.rooms.map((item, index) => {
        if (index === tabIndex) {
          return {
            ...item,
            adultTravellers: item.adultTravellers.map((item, index) => {
              if (index === itemIndex) {
                if (field === 'title') {
                  return {
                    ...item,
                    [field]: value,
                    gender: ["Mrs", "Ms"].includes(value) ? "Female" : "Male"
                  };
                } else {
                  return {
                    ...item,
                    [field]: value
                  };
                }
              } else {
                return item;
              }
            })
          };
        } else {
          return item;
        }
      })
    }));
  };

  const childTravellerOnchange = (field, value, itemIndex) => {
    dispatch(setPreTravellerData({
      ...preTraveller,
      rooms: preTraveller.rooms.map((item, index) => {
        if (index === tabIndex) {
          return {
            ...item,
            childTravellers: item.childTravellers.map((item, index) => {
              if (index === itemIndex) {
                return {
                  ...item,
                  [field]: value
                };
              } else {
                return item;
              }
            })
          };
        } else {
          return item;
        }
      })
    }));
  };

  const handleAppendAdultTraveller = (value, selectedIndex) => {
    dispatch(setPreTravellerData({
      ...preTraveller,
      rooms: preTraveller.rooms.map((item, index) => {
        if (index === tabIndex) {
          return {
            ...item,
            adultTravellers: item.adultTravellers.map((item, index) => {
              if (index === selectedIndex) {
                return {
                  title: value.title,
                  firstName: value.firstName,
                  lastName: value.lastName,
                  gender: value.gender,
                  id: value.id,
                };
              } else {
                return item;
              }
            })
          };
        } else {
          return item;
        }
      })
    }));
    const updatedAvailablePassengers = availablePassengers.filter(p => p.id !== value.id);
    setAvailablePassengers(updatedAvailablePassengers);
  };

  const checkValidationErrors = (validationData, setData) => {
    const errorsExist = validationData.some(item => Object.values(item).some(val => val !== ''));
    setData(validationData);
    return errorsExist;
  };

  const removeErrorFields = (key, index, setError) => {
    setError(prevState => prevState.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [key]: ''
        };
      } else {
        return item;
      }
    }));
  };

  const filteredTitleList = preTraveller?.titleList?.filter((item) => item.code != 0).map(item => item.code) ?? [];
  const filteredGenderList = preTraveller?.genderList?.filter((item) => item.code != 0).map(item => item.code) ?? [];

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
      target="user-details"
    >
      <div className="mt-8" >
        <div className="flex flex-col gap-3 mt-5 sm:flex-row sm:gap-12 sm:items-center">
          {
            preTraveller && preTraveller?.rooms?.map((item, index) => (
              <div key={index}>
                <div className='flex gap-5'>
                  <Radio
                    style={{ color: 'orange', padding: 0 }}
                    checked={tabIndex === index}
                    onChange={() => { setTabIndex(index); }}
                  />
                  <h3 className='text-xs font-normal text-black sm:text-base'>{translation?.room} {index + 1}</h3>
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex flex-col gap-4">
          {
            preTraveller?.rooms?.length ? preTraveller?.rooms[tabIndex]?.adultTravellers.map((item, index) => {
              return (
                <div key={index}>
                  <h4 className="p-2 mt-8 mb-4 text-green-800">{translation?.adult} {index + 1}</h4>
                  <div className="flex flex-col grid-cols-2 gap-4 p-2 transition-all duration-300 rounded-md sm:grid sm:gap-8">
                    {
                      preTraveller?.titleList?.length ?
                        <Autocomplete
                          disablePortal
                          id={`combo-box-title-${index}`}
                          options={filteredTitleList}
                          getOptionLabel={(option) => option}
                          value={item.title}
                          onChange={(event, value) => { adultTravellerOnchange('title', value, index); removeErrorFields('gender', index, setAdultErrors); }}
                          onFocus={() => removeErrorFields('title', index, setAdultErrors)}
                          clearIcon={null}
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              label={translation?.prefix}
                              error={Boolean(adultErrors[index]?.title)}
                              helperText={adultErrors[index]?.title || ''}
                            />
                          )}
                          className=""
                        /> : null
                    }
                    {
                      preTraveller?.genderList?.length ?
                        <Autocomplete
                          disablePortal
                          id={`combo-box-gender-${index}`}
                          options={filteredGenderList}
                          getOptionLabel={(option) => option}
                          value={item.gender}
                          clearIcon={null}
                          onChange={(event, value) => adultTravellerOnchange('gender', value, index)}
                          onFocus={() => removeErrorFields('gender', index, setAdultErrors)}
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              label={translation?.gender}
                              error={Boolean(adultErrors[index]?.gender)}
                              helperText={adultErrors[index]?.gender || ''}
                            />
                          )}
                          className=""
                        /> : null
                    }
                    <CustomTextField
                      type="text"
                      placeholder={translation?.first_name}
                      value={item.firstName}
                      className="w-full"
                      label={translation?.first_name}
                      onChange={(e) => adultTravellerOnchange("firstName", e.target.value, index)}
                      onFocus={() => removeErrorFields('firstName', index, setAdultErrors)}
                      error={Boolean(adultErrors[index]?.firstName)}
                      helperText={adultErrors[index]?.firstName || ''}
                      autoComplete="off"
                    />
                    <CustomTextField
                      type="text"
                      placeholder={translation?.last_name}
                      value={item.lastName}
                      className="w-full"
                      label={translation?.last_name}
                      onChange={(e) => adultTravellerOnchange("lastName", e.target.value, index)}
                      onFocus={() => removeErrorFields('lastName', index, setAdultErrors)}
                      error={Boolean(adultErrors[index]?.lastName)}
                      helperText={adultErrors[index]?.lastName || ''}
                      autoComplete="off"
                    />
                  </div>
                </div>
              );
            }) : null
          }
          {
            preTraveller?.rooms?.length ? preTraveller?.rooms[tabIndex]?.childTravellers.map((item, index) => {
              return (
                <div key={index}>
                  <h4 className="p-2 mt-8 mb-4 text-green-800">{translation?.child} {index + 1}</h4>
                  <div className="grid grid-cols-2 gap-2 p-2 transition-all duration-300 rounded-md sm:gap-8 ">
                    {
                      preTraveller?.titleList?.length ?
                        <Autocomplete
                          disablePortal
                          id={`combo-box-child-title-${index}`}
                          options={filteredTitleList}
                          getOptionLabel={(option) => option}
                          value={item.title}
                          onChange={(event, value) => childTravellerOnchange('title', value, index)}
                          onFocus={() => removeErrorFields('title', index, setChildErrors)}
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              label={translation?.select_prefix}
                              error={Boolean(childErrors[index]?.title)}
                              helperText={childErrors[index]?.title || ''}
                            />
                          )}
                          className="bg-stone-50"
                        /> : null
                    }
                    {
                      preTraveller?.genderList?.length ?
                        <Autocomplete
                          disablePortal
                          id={`combo-box-child-gender-${index}`}
                          options={filteredGenderList}
                          getOptionLabel={(option) => option}
                          value={item.gender}
                          onChange={(event, value) => childTravellerOnchange('gender', value, index)}
                          onFocus={() => removeErrorFields('gender', index, setChildErrors)}
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              label={translation?.select_gender}
                              error={Boolean(childErrors[index]?.gender)}
                              helperText={childErrors[index]?.gender || ''}
                            />
                          )}
                          className="bg-stone-50"
                        /> : null
                    }
                    <CustomTextField
                      type="text"
                      placeholder={translation?.first_name}
                      value={item.firstName}
                      className="bg-stone-50"
                      label={translation?.first_name}
                      onChange={(e) => childTravellerOnchange("firstName", e.target.value, index)}
                      onFocus={() => removeErrorFields('firstName', index, setChildErrors)}
                      error={`Boolean(childErrors[index]?.firstName)`}
                      helperText={childErrors[index]?.firstName || ''}
                      autoComplete="off"
                    />
                    <CustomTextField
                      type="text"
                      placeholder={translation?.last_name}
                      value={item.lastName}
                      className="bg-stone-50"
                      label={translation?.last_name}
                      onChange={(e) => childTravellerOnchange("lastName", e.target.value, index)}
                      onFocus={() => removeErrorFields('lastName', index, setChildErrors)}
                      error={Boolean(childErrors[index]?.lastName)}
                      helperText={childErrors[index]?.lastName || ''}
                      autoComplete="off"
                    />
                  </div>
                </div>
              );
            }) : null
          }
        </div>
        <button
          className="mt-8 h-12 w-72 text-center text-white text-base font-medium px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center flex"
          onClick={submitTvellersDetails}
        >
          {
            buttonLoader ?
              <CircularProgress size={20} sx={{ color: 'white' }} /> :
              translation?.continue
          }
        </button>
      </div>
    </TitleCard>
  );
};

function mapStateToProps(state) {
  return {
    preTraveller: state.hotelState.preTraveller,
    hotelDetails: state.hotelState.hotelDetails,
    profile: state.sharedState.profile,
    contactDc: state?.sharedState?.contactDc,
    saveTravellerData: state.hotelState.saveTravellerData,
    buttonLoader: state.hotelState.buttonLoader,
  };
}

export default connect(mapStateToProps, null)(HotelUserDetails);