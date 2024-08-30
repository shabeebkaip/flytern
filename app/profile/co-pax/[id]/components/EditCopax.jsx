import React, { useState } from "react";
import { Autocomplete } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSnackbar } from "notistack";
import { parse, format } from 'date-fns';
import { deleteCopaxApi, updateCoPaxApi } from "../api";
import { checkApiStatus } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { CustomDatePicker, CustomTextField } from "@/app/shared/components/CustomTextField";

const EditCopax = ({ coPax }) => {
  const [data, setData] = useState({ ...coPax });
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();


  const validate = () => {
    let tempErrors = {};
    if (!data.title) tempErrors.title = "Title is required";
    if (!data.firstName) tempErrors.firstName = "First name is required";
    if (!data.lastName) {
      tempErrors.lastName = "Last name is required";
    } else if (data.lastName.length < 3) {
      tempErrors.lastName = "Last name must be at least 3 letters";
    }
    if (!data.dateofBirth) tempErrors.dateofBirth = "Date of Birth is required";
    if (!data.passportNumber) tempErrors.passportNumber = "Passport number is required";
    if (!data.nationalityCode) tempErrors.nationalityCode = "Nationality is required";
    if (!data.passportIssuedCountryCode) tempErrors.passportIssuedCountryCode = "Passport issued country is required";
    if (!data.passportExp) tempErrors.passportExp = "Passport expiry date is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const editCopax = () => {
    if (!validate()) return;

    let payload = Object.assign(data);
    payload = {
      ...payload,
      gender:
        payload.gender && payload.gender.code
          ? payload.gender.code
          : payload.gender,
      nationalityCode:
        payload.nationalityCode && payload.nationalityCode.countryISOCode
          ? payload.nationalityCode.countryISOCode
          : payload.nationalityCode,
      passportIssuedCountryCode:
        payload.passportIssuedCountryCode &&
          payload.passportIssuedCountryCode.countryISOCode
          ? payload.passportIssuedCountryCode.countryISOCode
          : payload.passportIssuedCountryCode,
    };

    updateCoPaxApi(payload).then((response) => {
      if (checkApiStatus(response)) {
        enqueueSnackbar("Co-Pax Updated Successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        if (typeof window !== 'undefined') {
          window.location.href = "/profile/co-pax"
        }
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    });
  };

  const deleteCopax = () => {
    const data = deleteCopaxApi(coPax.id);
    if (data) {
      enqueueSnackbar("Copax deleted successfully", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = "/profile/co-pax";
      }
    }, 1000);
  };
 
  const genderList = coPax?.genderList || [];
  const countriesList = coPax?.countriesList || [];
  const { translation } = useAppSelector((state) => state.sharedState)

  return (
    <div className="flex flex-col gap-4 pb-10 mt-8">
      <div className="flex flex-col grid-cols-2 gap-2 lg:gap-4 sm:grid">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Mr", "Mrs", "Ms", "Miss"]}
          getOptionLabel={(option) => option}
          onChange={(event, value) => 
            setData({ ...data, title: value })
          }
          value={data.title}
          autoComplete='off'
          renderInput={(params) =>
            <CustomTextField
              {...params}
              label={translation?.title}
              autoComplete='off'
              error={!!errors.title}
              helperText={errors.title}
             
            />}
          className='bg-stone-50'
        />
        <CustomTextField
          value={data.firstName}
          className="bg-stone-50"
          label={translation?.first_name}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            setData((prevData) => ({ ...prevData, firstName: event.target.value }));
            setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
          }}
          autoComplete='off'
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <CustomTextField
          value={data.lastName}
          className="bg-stone-50"
          label={translation?.last_name}
          InputLabelProps={{ shrink: true }}
          onChange={(event) =>{

            setData({ ...data, lastName: event.target.value });
            setErrors({ ...errors, lastName: '' });}
          }
          autoComplete='off'
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        {genderList && genderList.length && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={genderList}
            value={genderList.find((option) => option.code === data.gender)}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) =>{
              setData({ ...data, gender: value.code });
              setErrors({ ...errors, gender: '' });}
            }
            autoComplete='off'
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={translation?.select_gender}
                InputLabelProps={{ shrink: true }}
                value={genderList.find((option) => option.code === data.gender)}
                autoComplete='off'
                error={!!errors.gender}
                helperText={errors.gender}
              />
            )}
            className="bg-stone-50"
          />
        )}

        <LocalizationProvider dateAdapter={AdapterDateFns}>
        
          <CustomDatePicker
            value={parse(data.dateofBirth, "dd-MM-yyyy", new Date())}
            label={translation?.dob}
            InputLabelProps={{ shrink: true }}
            className="bg-stone-50"
            maxDate={new Date()}  
            onChange={(e) =>{  
              setData({ ...data, dateofBirth: format(e, "dd-MM-yyyy") });
              setErrors({ ...errors, dateOfBirth: '' });}
            }
            renderInput={(params) => (
              <CustomTextField
                {...params}
                className="bg-stone-50"
                error={!!errors.dateofBirth}
                helperText={errors.dateofBirth}
              />
            )}
          />
        </LocalizationProvider>
        {countriesList && countriesList.length && (
          <Autocomplete
            disablePortal
            id="nationality-autocomplete"
            options={countriesList}
            value={countriesList.find(
              (option) => option.countryISOCode === data.nationalityCode
            )}
            onChange={(event, value) =>{

              setData({ ...data, nationalityCode: value.countryISOCode });
              setErrors({ ...errors, nationalityCode: '' })}
            }
            autoComplete='off'
            getOptionLabel={(option) => option.countryName}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={translation?.select_nationality}
                InputLabelProps={{ shrink: true }}
                autoComplete='off'
                error={!!errors.nationalityCode}
                helperText={errors.nationalityCode}
              />
            )}
            className="bg-stone-50"
          />
        )}

        <CustomTextField
          label={translation?.passport_number}
          value={data.passportNumber}
          InputLabelProps={{ shrink: true }}
          className=" bg-stone-50"
          onChange={(event) =>{

            setData({ ...data, passportNumber: event.target.value }),
            setErrors({ ...errors, passportNumber: '' })}
          }
          autoComplete='off'
          error={!!errors.passportNumber}
          helperText={errors.passportNumber}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* Passport Expiry Date Picker - Only allows future dates */}
          <CustomDatePicker
            label={translation?.passport_expire}
            InputLabelProps={{ shrink: true }}
            value={parse(data.passportExp, "dd-MM-yyyy", new Date())}
            className="bg-stone-50"
            minDate={new Date()}  // Restrict to future dates
            onChange={(e) =>{

              setData({ ...data, passportExp: format(e, "dd-MM-yyyy") });
              setErrors({ ...errors, passportExp: '' });}
            }
            renderInput={(params) => (
              <CustomTextField
                {...params}
                className="bg-stone-50"
                error={!!errors.passportExp}
                helperText={errors.passportExp}
              />
            )}
          />
        </LocalizationProvider>
        {countriesList && countriesList.length && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countriesList}
            getOptionLabel={(option) => option.countryName}
            value={countriesList.find(
              (option) =>
                option.countryISOCode === data.passportIssuedCountryCode
            )}
            onChange={(event, value) =>{

              setData({
                ...data,
                passportIssuedCountryCode: value.countryISOCode,
              }),
              setErrors({ ...errors, passportIssuedCountryCode: '' });
            }
            }
            autoComplete='off'
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={translation?.passport_issuer_country}
                autoComplete='off'
                error={!!errors.passportIssuedCountryCode}
                helperText={errors.passportIssuedCountryCode}
              />
            )}
            className=" bg-stone-50"
            InputLabelProps={{ shrink: true }}
          />
        )}
      </div>
      <div className="flex grid-cols-2 gap-10">
        <button
          className="h-12 mt-3 text-base font-medium text-white rounded-md sm:w-64 bg-emerald-800 w-[100px]"
          onClick={editCopax}
        >
          {translation?.save}
        </button>
        <button
          className="h-12 mt-3 text-base font-medium text-white bg-red-800 rounded-md sm:w-64 w-[100px]"
          onClick={deleteCopax}
        >
          {translation?.delete}
        </button>
      </div>
    </div>
  );
};

export default EditCopax;
