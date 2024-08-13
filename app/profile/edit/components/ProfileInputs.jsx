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
  const { profile } = useSelector((state) => state.profileState);
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState({});
  const [previewImages, setPreviewImages] = useState({ File: null });
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isMobileEditable, setIsMobileEditable] = useState(false);
  const [editedMobileNumber, setEditedMobileNumber] = useState(
    profile.phoneNumber
  );
  const [countryCode, SetCountryCode] = useState(
    profile.countriesList.map((item) => item.code)
  );
  const [editedEmail, setEditedEmail] = useState(profile.email);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    profile.phoneCountryCode
  );
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  // New state for validation
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationalityCode: "",
    passportNumber: "",
    passportExpiry: "",
    passportIssuerCountryCode: "",
    email: "",
    phoneNumber: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      setEditProfile({
        ...profile,
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth : "",
        passportExpiry: profile.passportExpiry ? profile.passportExpiry : "",
      });
    } else {
      dispatch(getProfileDetailApi);
    }
  }, [profile, dispatch]);

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
    //   case "firstName":
      case "lastName":
        if (!value.trim()) error = `${field} is required`;
        break;
      case "dateOfBirth":
        if (!value) error = "Date of Birth is required";
        break;
      case "passportNumber":
        if (!value.trim()) error = "Passport Number is required";
        break;
      case "passportExpiry":
        if (!value) error = "Passport Expiry is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "phoneNumber":
        if (!value.trim()) error = "Mobile Number is required";
        break;
      case "nationalityCode":
        if (!value) error = "Nationality is required";
        break;
      case "passportIssuerCountryCode":
        if (!value) error = "Passport Issuer Country is required";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };


  

  const onFieldChange = (field, value) => {
    if (field === "countrySelect" || field === "passportSelect") {
      setEditProfile({
        ...editProfile,
        [field]: value,
        [`${
          field === "countrySelect"
            ? "nationalityCode"
            : "passportIssuerCountryCode"
        }`]: value?.countryISOCode || "",
      });
    } else {
      setEditProfile({
        ...editProfile,
        [field]: value,
      });
    }
  };

  const onChange = (field, value) => {
    setEditProfile({
      ...editProfile,
      [field]: value,
    });
  };

  const onMobileSubmit = () => {
    if (Object.values(errors).some((err) => err)) {
      enqueueSnackbar("Please enter the data in fields before submitting", {
        variant: "warning",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }

    const payload = {
      mobile: editedMobileNumber,
      countryCode: selectedCountryCode,
    };

    updateMobileApi(payload).then((response) => {
      if (checkApiStatus(response)) {
        enqueueSnackbar("Mobile Number Updated Successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setIsMobileEditable(false);
        setIsOtpModalOpen(true);
      } else if (response.data.statusCode === 100) {
        const updatedUserId = response.data.data.userID;
        setUserId(updatedUserId);
        enqueueSnackbar("OTP Verification Required", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setIsEmailEditable(false);
        setIsOtpModalOpen(true);
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
    if (Object.values(errors).some((err) => err)) {
      enqueueSnackbar("Please enter the email before submitting", {
        variant: "warning",
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
        enqueueSnackbar("OTP Verified Successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }, 500);
      } else {
        enqueueSnackbar("Wrong OTP", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    });
  };

  const updateErrorField = (key) => {
    setErrors({ ...errors, [key]: '' })
}

const handleFieldChange = (field) => (e) => {
    const value = e.target.value;
    onFieldChange(field, value); // Update the field value
    updateErrorField(field); // Update the error state
};


  const onSubmit = () => {
    
    debugger;

    let validate = {
        firstName : editProfile.firstName ? '' : "First Name is required",
        lastName : editProfile.lastName ? '' : "Last Name is required",
        passportNumber: editProfile.passportNumber ? '' : "Passport Number is required",
        passportExpiry: editProfile.passportExpiry ? '' : "Passport Expiry is required",
        email: editProfile.email? '' : "email is required",
        phoneNumber: editProfile.phoneNumber? '' : "PhoneNumber is required",
        nationalityCode : editProfile.nationalityCode ? '' : "Nationality Code is missing",
        passportIssuerCountryCode : editProfile.passportIssuerCountryCode? '' : "PassportIssuerCountryCode is Missing",
        dateOfBirth: editProfile.dateOfBirth? '' : "Date Of Birth is required"
    }
    if (Object.values(errors).some((err) => err)) {
      enqueueSnackbar("Please enter the data in fields before submitting", {
        variant: "warning",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }

    if (Object.values(validate).every((value) => value === "")) {
      let payload = new FormData();
      payload.append("FirstName", editProfile.firstName);
      payload.append("LastName", editProfile.lastName);
      payload.append("dateOfBirth", editProfile.dateOfBirth);
      payload.append("Gender", "Male");
      editProfile.countrySelect &&
        payload.append("Nationality", editProfile.countrySelect.countryISOCode);
      editProfile.passportSelect &&
        payload.append(
          "IssueCountry",
          editProfile.passportSelect.countryISOCode
        );
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
        } else {
          enqueueSnackbar("Something went wrong", {
            variant: "error",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      });
    } else {
      setErrors(validate);
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
    <div className="flex flex-col grid-cols-2 gap-5 sm:grid">
        <CustomTextField
            label={translation?.first_name}
            value={editProfile.firstName}
            className="bg-stone-50"
            onChange={handleFieldChange('firstName')}
            autoComplete="off"
            error={!!errors.firstName}
            helperText={errors.firstName}
        />
        <CustomTextField
            label={translation?.last_name}
            value={editProfile.lastName}
            onChange={handleFieldChange('lastName')}
            className="bg-stone-50"
            autoComplete="off"
            error={!!errors.lastName}
            helperText={errors.lastName}
        />

        {editProfile.genderList && editProfile.genderList.length ? (
            <Autocomplete
                disablePortal
                id="combo-box-gender"
                options={editProfile.genderList}
                getOptionLabel={(option) => option.name}
                autoComplete="off"
                renderInput={(params) => (
                    <CustomTextField
                        {...params}
                        label={translation?.select_gender}
                        autoComplete="off"
                        error={!!errors.gender}
                        helperText={errors.gender}
                    />
                )}
                onChange={(event, value) => handleFieldChange("gender")(event, value?.code)}
                className="bg-stone-50"
                value={editProfile.genderList.find(
                    (option) => option.code === editProfile.gender
                )}
            />
        ) : null}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CustomDatePicker
                label={translation?.dob}
                value={parse(editProfile.dateOfBirth, "dd-MM-yyyy", new Date())}
                className="bg-stone-50"
                onChange={(e) => handleFieldChange("dateOfBirth")(e)}
                disableFuture
                renderInput={(params) => (
                    <CustomTextField {...params} className="bg-stone-50" />
                )}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
            />
        </LocalizationProvider>
        {editProfile.countriesList && editProfile.countriesList.length ? (
            <Autocomplete
                disablePortal
                id="combo-box-nationality"
                options={editProfile.countriesList}
                getOptionLabel={(option) => option.countryName}
                value={editProfile.countriesList.find(
                    (option) => option.countryISOCode === editProfile.nationalityCode
                )}
                autoComplete="off"
                renderInput={(params) => (
                    <CustomTextField
                        {...params}
                        label={translation?.select_nationality}
                        autoComplete="off"
                        error={!!errors.nationalityCode}
                        helperText={errors.nationalityCode}
                    />
                )}
                onChange={(event, value) => handleFieldChange("countrySelect")(event, value?.countryISOCode)}
                className="bg-stone-50"
            />
        ) : null}
        <CustomTextField
            label={translation?.passport_number}
            value={editProfile.passportNumber}
            className="bg-stone-50"
            onChange={handleFieldChange("passportNumber")}
            autoComplete="off"
            error={!!errors.passportNumber}
            helperText={errors.passportNumber}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CustomDatePicker
                label={translation?.passport_expire}
                value={parse(editProfile.passportExpiry, "dd-MM-yyyy", new Date())}
                inputFormat=""
                className="bg-stone-50"
                disablePast
                onChange={(e) => handleFieldChange("passportExpiry")(e)}
                error={!!errors.passportExpiry}
                helperText={errors.passportExpiry}
            />
        </LocalizationProvider>
        {editProfile.countriesList && editProfile.countriesList.length ? (
            <Autocomplete
                disablePortal
                id="combo-box-passport-issuer"
                options={editProfile.countriesList}
                getOptionLabel={(option) => option.countryName}
                value={editProfile.countriesList.find(
                    (option) => option.countryISOCode === editProfile.passportIssuerCountryCode
                )}
                autoComplete="off"
                onChange={(event, value) => handleFieldChange("passportSelect")(event, value?.countryISOCode)}
                renderInput={(params) => (
                    <CustomTextField
                        {...params}
                        label={translation?.passport_issuer_country}
                        autoComplete="off"
                        error={!!errors.passportIssuerCountryCode}
                        helperText={errors.passportIssuerCountryCode}
                    />
                )}
                className="bg-stone-50"
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
                    error={!!errors.email}
                    helperText={errors.email}
                />
            ) : (
                <CustomTextField
                    label={translation?.email}
                    className="w-full bg-stone-50"
                    value={editedEmail}
                    disabled={!isEmailEditable}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    autoComplete="off"
                    error={!!errors.email}
                    helperText={errors.email}
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

            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-10">
  <Autocomplete
    disablePortal
    id="combo-box-country-code"
    options={countryCode}
    getOptionLabel={(option) => option}
    value={selectedCountryCode}
    disabled={!isMobileEditable}
    onChange={(event, value) => handleFieldChange("countryCode")(event, value)}
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
        className="w-40 h-12 mt-3 text-base font-medium text-white rounded-md sm:w-64 bg-emerald-800"
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
