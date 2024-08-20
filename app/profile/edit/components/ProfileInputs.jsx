import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parse } from "date-fns";
import { Autocomplete } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { getProfileDetailApi } from "../../api";
import { checkApiStatus } from "@/lib/utils";
import {
  updateEmailApi,
  updateMobileApi,
  updateOtpApi,
  updateProfileApi,
} from "../api";
import {
  CustomDatePicker,
  CustomTextField,
} from "@/app/shared/components/CustomTextField";
import Image from "next/image";
import OtpModal from "@/app/shared/components/OtpModal";

const ProfileInputs = () => {

    const { profile } = useSelector(state => state.profileState);
    const dispatch = useDispatch();
    const [editProfile, setEditProfile] = useState({});
    const [previewImages, setPreviewImages] = useState({ File: null });
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isMobileEditable, setIsMobileEditable] = useState(false);
    const [editedMobileNumber, setEditedMobileNumber] = useState(profile.phoneNumber);
    const [countryCode, SetCountryCode] = useState(profile.countriesList.map(item => item.code))
    const [editedEmail, setEditedEmail] = useState(profile.email);
    const [selectedCountryCode, setSelectedCountryCode] = useState(profile.phoneCountryCode);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // State variable for controlling the OTP modal
    const [userId, setUserId] = useState(null);
    const [errors, setErrors] = useState({});


    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (Object.keys(profile).length !== 0) {
            setEditProfile({
                ...profile,
                dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth : null,
                passportExpiry: profile.passportExpiry ? profile.passportExpiry : null
            });
        } else {
            dispatch(getProfileDetailApi);
        }
    }, [profile, dispatch]);

    const onFieldChange = (field, value) => {
        if (field === 'countrySelect' || field === 'passportSelect') {
            setEditProfile({
                ...editProfile,
                [field]: value,
                [`${field === 'countrySelect' ? 'nationalityCode' : 'passportIssuerCountryCode'}`]: value.countryISOCode
            });
        } else {
            setEditProfile({
                ...editProfile,
                [field]: value
            });
        }
    };
    


    const onMobileSubmit = () => {
        if (!editedMobileNumber.trim() || !selectedCountryCode) {
            enqueueSnackbar('Mobile number and country code are required', {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: { vertical: 'top', horizontal: 'right' }
            });
            return;
        }
        const payload = {
            mobile: editedMobileNumber,
            countryCode: selectedCountryCode
        };

        updateMobileApi(payload)
            .then(response => {
                if (checkApiStatus(response)) {
                    enqueueSnackbar('Mobile Number Updated Successfully', {
                        variant: 'success',
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    });
                    setIsMobileEditable(false);
                    setIsOtpModalOpen(true); // Open the OTP modal here
                } else if (response.data.statusCode === 100) {
                    const updatedUserId = response.data.data.userID;
                    setUserId(updatedUserId);
                    enqueueSnackbar('OTP Verification Required', {
                        variant: 'success',
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    });
                    setIsEmailEditable(false);
                    setIsOtpModalOpen(true); // Open the OTP modal here

                } else {
                    enqueueSnackbar('This phone number and country code are currently in use; please select a different one.', {
                        variant: 'error',
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    });
                }
            });
    };


    const onEmailSubmit = () => {
        if (!editedEmail.trim()) {
          
            enqueueSnackbar('Email is required', {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: { vertical: 'top', horizontal: 'right' }
            });
            return;
        }
        updateEmailApi({ email: editedEmail })
            .then(response => {
                if (checkApiStatus(response)) {
                    enqueueSnackbar('Email Updated Successfully', {
                        variant: 'success',
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    });
                    setIsEmailEditable(false);
                } else if (response.data.statusCode === 100) {
                    const updatedUserId = response.data.data.userID;
                    setUserId(updatedUserId);
                    enqueueSnackbar('OTP Verification Required', {
                        variant: 'success',
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    });
                    setIsOtpModalOpen(true)
                    setIsEmailEditable(false);
                } else {
                    enqueueSnackbar('This email is already in use; please choose a different one.', {
                        variant: 'error',
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    });
                }
            });

    };

    updateMobileApi(payload).then((response) => {
      if (checkApiStatus(response)) {
        enqueueSnackbar("Mobile Number Updated Successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setIsMobileEditable(false);
        setIsOtpModalOpen(true); // Open the OTP modal here
      } else if (response.data.statusCode === 100) {
        const updatedUserId = response.data.data.userID;
        setUserId(updatedUserId);
        enqueueSnackbar("OTP Verification Required", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setIsEmailEditable(false);
        setIsOtpModalOpen(true); // Open the OTP modal here
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    });
  };

  const onEmailSubmit = () => {
    if (!editedEmail.trim()) {
      enqueueSnackbar("Email is required", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }
    updateEmailApi({ email: editedEmail }).then((response) => {
      if (checkApiStatus(response)) {
        enqueueSnackbar("Email Updated Successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setIsEmailEditable(false);
      } else if (response.data.statusCode === 100) {
        const updatedUserId = response.data.data.userID;
        setUserId(updatedUserId);
        enqueueSnackbar("OTP Verification Required", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setIsOtpModalOpen(true);
        setIsEmailEditable(false);
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    });
  };

  const onOtpVerification = (params) => {
    updateOtpApi(params).then((response) => {
      if (checkApiStatus(response)) {
        enqueueSnackbar("otp Verification Successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setTimeout(function () {
          if (typeof window !== "undefined") {
            window.location.reload(); // Refresh the page
          }
        }, 500);
      } else {
        enqueueSnackbar("Wrong Otp", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    });
  };
  const onSubmit = () => {
    const validationErrors = {
      firstName: editProfile.firstName ? "" : "First name is required",
      lastName:
        editProfile.lastName?.length >= 3
          ? ""
          : "Last name must be at least 3 letters",
      dateOfBirth: editProfile.dateOfBirth ? "" : "Date of birth is required",
      phoneNumber: editedMobileNumber ? "" : "Phone number is required",
      passportNumber: editProfile.passportNumber
        ? ""
        : "Passport number is required",
      passportExpiry: editProfile.passportExpiry
        ? ""
        : "Passport expiry date is required",
      nationalityCode: editProfile.nationalityCode
        ? ""
        : "Nationality is required",
      passportIssuerCountryCode: editProfile.passportIssuerCountryCode
        ? ""
        : "Passport issuer country is required",
    };

    if (Object.values(validationErrors).every((value) => value === "")) {
      let payload = new FormData();
      payload.append("FirstName", editProfile.firstName);
      payload.append("LastName", editProfile.lastName);
      payload.append("dateOfBirth", editProfile.dateOfBirth);
      payload.append("Gender", "Male");
      payload.append("Nationality", editProfile.nationalityCode);
      payload.append("IssueCountry", editProfile.passportIssuerCountryCode);

      // editProfile.countrySelect && payload.append('Nationality', editProfile.countrySelect.countryISOCode);
      // editProfile.passportSelect && payload.append('IssueCountry', editProfile.passportSelect.countryISOCode);
      payload.append("phoneNumber", editProfile.phoneNumber);
      payload.append("PassportNumber", editProfile.passportNumber);
      payload.append("ExpiryDate", editProfile.passportExpiry);
      payload.append(
        "File",
        editProfile.File ? editProfile.File[0] : editProfile.imgUrl
      );

      updateProfileApi(payload).then((response) => {
        if (checkApiStatus(response)) {
          enqueueSnackbar("Profile Updated Successfully", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          window.location.href = "/profile";
        } else {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const genderList = editProfile && editProfile.genderList;
  const { translation } = useSelector((state) => state.sharedState);
  return (
    <>
      <div className="relative ">
        {editProfile.imgUrl ? (
          <>
            {previewImages.File ? (
              <Image
                className="w-[104px] h-[104px]"
                src={previewImages.File}
                alt=""
                width={100}
                height={100}
              />
            ) : (
              <Image
                className="w-[104px] h-[104px]"
                src={editProfile.imgUrl}
                alt=""
                width={100}
                height={100}
              />
            )}
            <Image
              className="absolute bottom-0 w-6 h-6 left-20"
              src="/misc/camera.png"
              alt=""
              width={100}
              height={100}
            />
          </>
        ) : (
          <Image
            className="w-[104px] h-[104px]"
            src="/misc/profile.png"
            alt=""
            width={100}
            height={100}
          />
        )}

        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => onFieldChange("File", e.target.files)}
        />
      </div>
      <div className="flex flex-col gap-4 pb-10 mt-8">
        <div className="flex flex-col grid-cols-2 gap-2 lg:gap-4 sm:grid">
          <CustomTextField
            label={translation?.first_name}
            value={editProfile.firstName}
            className="bg-stone-50"
            onChange={(e) => onFieldChange("firstName", e.target.value)}
            autoComplete="off"
            error={!!errors.firstName}
            helperText={errors.firstName}
            onFocus={() => setErrors({ ...errors, firstName: "" })}
          />
          <CustomTextField
            label={translation?.last_name}
            value={editProfile.lastName}
            onChange={(e) => onFieldChange("lastName", e.target.value)}
            className="bg-stone-50"
            autoComplete="off"
            error={!!errors.lastName}
            helperText={errors.lastName}
            onFocus={() => setErrors({ ...errors, lastName: "" })}
          />

          {editProfile.genderList && editProfile.genderList.length ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={editProfile.genderList}
              getOptionLabel={(option) => option.name}
              autoComplete="off"
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label={translation?.select_gender}
                  value={editProfile.gender}
                  autoComplete="off"
                  error={!!errors.gender}
                  helperText={errors.gender}
                  onFocus={() => setErrors({ ...errors, gender: "" })}
                />
              )}
              onChange={(data, value) => onFieldChange("gender", value.code)}
              className="bg-stone-50"
              value={genderList.find(
                (option) => option.code === editProfile.gender
              )}
            />
          ) : null}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CustomDatePicker
              label={translation?.dob}
              value={parse(editProfile.dateOfBirth, "dd-MM-yyyy", new Date())}
              className="bg-stone-50 "
              onChange={(e) =>
                onFieldChange("dateOfBirth", format(e, "dd-MM-yyyy"))
              }
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              onFocus={() => setErrors({ ...errors, dateOfBirth: "" })}
              disableFuture
              renderInput={(params) => (
                <CustomTextField {...params} className="bg-stone-50" />
              )}
            />
          </LocalizationProvider>
          {editProfile.countriesList && editProfile.countriesList.length ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={editProfile.countriesList}
              getOptionLabel={(option) => option.countryName}
              value={editProfile.countriesList.find(
                (option) =>
                  option.countryISOCode === editProfile.nationalityCode
              )}
              autoComplete="off"
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label={translation?.select_nationality}
                  autoComplete="off"
                />
              )}
              onChange={(data, value) => onFieldChange("countrySelect", value)}
              className=" bg-stone-50"
              error={!!errors.nationalityCode}
              helperText={errors.nationalityCode}
              onFocus={() => setErrors({ ...errors, nationalityCode: "" })}
            />
          ) : null}
          <CustomTextField
            label={translation?.passport_number}
            value={editProfile.passportNumber}
            className=" bg-stone-50"
            onChange={(e) => onFieldChange("passportNumber", e.target.value)}
            autoComplete="off"
            error={!!errors.passportNumber}
            helperText={errors.passportNumber}
            onFocus={() => setErrors({ ...errors, passportNumber: "" })}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CustomDatePicker
              label={translation?.passport_expire}
              value={parse(
                editProfile.passportExpiry,
                "dd-MM-yyyy",
                new Date()
              )}
              inputFormat=""
              className=" bg-stone-50"
              disablePast
              onChange={(e) =>
                onFieldChange("passportExpiry", format(e, "dd-MM-yyyy"))
              }
              error={!!errors.passportExpiry}
              helperText={errors.passportExpiry}
              onFocus={() => setErrors({ ...errors, passportExpiry: "" })}
            />
          </LocalizationProvider>
          {editProfile.countriesList && editProfile.countriesList.length ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={editProfile.countriesList}
              getOptionLabel={(option) => option.countryName}
              value={editProfile.countriesList.find(
                (option) =>
                  option.countryISOCode ===
                  editProfile.passportIssuerCountryCode
              )}
              autoComplete="off"
              onChange={(data, value) => onFieldChange("passportSelect", value)}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label={translation?.passport_issuer_country}
                  autoComplete="off"
                />
              )}
              className=" bg-stone-50"
              error={!!errors.passportIssuerCountryCode}
              helperText={errors.passportIssuerCountryCode}
              onFocus={() =>
                setErrors({ ...errors, passportIssuerCountryCode: "" })
              }
            />
          ) : null}

          <div>
            <div className="flex items-start justify-end">
              {!isEmailEditable && (
                <EditIcon
                  style={{ color: "green" }}
                  onClick={() => setIsEmailEditable(true)}
                />
              )}
              {isEmailEditable ? (
                <>
                  <CloseIcon
                    style={{ color: "red" }}
                    onClick={() => setIsEmailEditable(false)}
                  />
                  <DoneIcon
                    style={{ color: "green" }}
                    onClick={onEmailSubmit}
                  />
                </>
              ) : null}
            </div>
            {isEmailEditable ? (
              <CustomTextField
                label={translation?.email}
                className="w-full bg-stone-50"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                autoComplete="off"
              />
            ) : (
              <CustomTextField
                label={translation?.email}
                className="w-full bg-stone-50"
                value={editedEmail}
                disabled={!isEmailEditable}
                onChange={(e) => setEditedEmail(e.target.value)}
                autoComplete="off"
              />
            )}
          </div>

          <div>
            <div className="flex items-start justify-end">
              {!isMobileEditable && (
                <EditIcon
                  style={{ color: "green" }}
                  onClick={() => setIsMobileEditable(true)}
                />
              )}
              {isMobileEditable ? (
                <>
                  <CloseIcon
                    style={{ color: "red" }}
                    onClick={() => setIsMobileEditable(false)}
                  />
                  <DoneIcon
                    style={{ color: "green" }}
                    onClick={onMobileSubmit}
                  />
                </>
              ) : null}
            </div>

            <button className='h-12 mt-3 text-base font-medium text-white rounded-md sm:w-64 bg-emerald-800 w-60' onClick={onSubmit}>{translation?.add}</button>
            <OtpModal isOtpModalOpen={isOtpModalOpen} handleClose={() => setIsOtpModalOpen(false)}
                verifyOtpFn={(data) => onOtpVerification({ otp: data, userID: userId })}
            />
            {/* <OtpModal isOtpModalOpen={isOtpModalOpen} /> */}



        </>
    );


            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-10">
              <Autocomplete
                disablePortal
                id="combo-box-country-code"
                options={countryCode}
                getOptionLabel={(option) => option}
                value={selectedCountryCode}
                disabled={!isMobileEditable}
                onChange={(event, value) =>
                  handleFieldChange("countryCode")(event, value)
                }
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label={translation?.country_code}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                )}
                className="w-full sm:col-span-1 lg:col-span-4 bg-stone-50"
              />
              <CustomTextField
                label={translation?.mobile}
                className="w-full sm:col-span-1 lg:col-span-6 bg-stone-50"
                value={editedMobileNumber}
                disabled={!isMobileEditable}
                onChange={(e) => setEditedMobileNumber(e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="h-12 mt-3 text-base font-medium text-white rounded-md sm:w-64 bg-emerald-800"
        onClick={onSubmit}
      >
        {translation?.add}
      </button>
      <OtpModal
        isOtpModalOpen={isOtpModalOpen}
        handleClose={() => setIsOtpModalOpen(false)}
        verifyOtpFn={(data) => onOtpVerification({ otp: data, userID: userId })}
      />
      {/* <OtpModal isOtpModalOpen={isOtpModalOpen} /> */}
    </>
  );
};

export default ProfileInputs;
