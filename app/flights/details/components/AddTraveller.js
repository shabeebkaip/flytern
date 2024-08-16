import { Autocomplete } from '@mui/material';
import React from 'react'
import { CustomDatePicker, CustomTextField } from '@/app/shared/components/CustomTextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse } from 'date-fns';
import { useAppSelector } from '@/lib/hooks';

const AddTraveller = (props) => {
  const { coPax, index, appendTraveller, preTraveller, removeErrorFields, errors, setErrors, filteredTitleList, item, handleTravellerOnChange, filteredGenderList, frequentFlyerNoError, type, title, dobMinDate, dobMaxDate } = props
  const { translation } = useAppSelector(state => state.sharedState)



  return (
    <div>
      <h4 className="mb-8 font-semibold text-green-800"> {title} {index + 1}</h4>
      <div className="grid grid-cols-1 gap-5 mb-4 md:grid-cols-2 ">
        {
          coPax?.length ?
            <Autocomplete
              disablePortal
              id={`combo-box`}
              options={coPax}
              getOptionLabel={(option) => ` ${option.firstName} ${option.lastName}`}
              onChange={(event, value) => {
                appendTraveller(value, index, type);
                removeErrorFields("SelectPassanger", index, setErrors);
                removeErrorFields('Gender', index, setErrors);
              }}
              onClear={() => {
                appendTraveller(null, index, type);
              }}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label={translation.select_passenger}
                  InputLabelProps={{ shrink: true }}
                  // error={errors?.[index]?.Title ? true : false}
                  // helperText={errors?.[index]?.Title}
                />
              )}
              className=""
            /> : null
        }
      </div>
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2" >

        {
          preTraveller?.titleList?.length ?
            <Autocomplete
              disablePortal
              id={`combo-box`}
              options={filteredTitleList}
              placeholder={translation?.prefix}
              getOptionLabel={(option) => option}
              value={item?.title}
              onChange={(event, value) => { handleTravellerOnChange('title', value, index, type) }}
              onFocus={() => removeErrorFields("Title", index, setErrors)}
              clearIcon={null}
              autoComplete="off"
              error={errors?.[index]?.Title ? true : false}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label={translation?.prefix}
                  InputLabelProps={{ shrink: true }}
                  error={errors?.[index]?.Title ? true : false}
                  helperText={errors?.[index]?.Title}
                  autoComplete="off"
                />
              )}
              className=""
            /> : null
        }
        {
          preTraveller?.genderList?.length ?
            <Autocomplete
              disablePortal
              id={`combo-box`}
              options={filteredGenderList}
              getOptionLabel={(option) => option}
              value={item?.gender}
              autoComplete="off"
              onChange={(event, value) => { handleTravellerOnChange("gender", value, index, type) }}
              onFocus={() => removeErrorFields('Gender', index, setErrors)}
              clearIcon={null}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label={translation?.gender}
                  InputLabelProps={{ shrink: true }}
                  error={errors?.[index]?.Gender ? true : false}
                  helperText={errors?.[index]?.Gender}
                  autoComplete="off"
                />
              )}
              className=""
            /> : null
        }
        <CustomTextField
          type="text"
          placeholder={translation?.first_name}
          value={item?.firstName}
          className=""
          label={translation?.first_name}
          onChange={(e) => { handleTravellerOnChange('firstName', e.target.value, index, type) }}
          onFocus={() => removeErrorFields('FirstName', index, setErrors)}
          error={errors?.[index]?.FirstName ? true : false}
          helperText={errors?.[index]?.FirstName}
          InputLabelProps={{ shrink: true }}
          autoComplete="off"
        />
        <CustomTextField
          type="text"
          placeholder={translation?.last_name}
          value={item?.lastName}
          className=""
          label={translation?.last_name}
          onChange={(e) => { handleTravellerOnChange('lastName', e.target.value, index, type) }}
          onFocus={() => removeErrorFields('LastName', index, setErrors)}
          InputLabelProps={{ shrink: true }}
          error={errors?.[index]?.LastName ? true : false}
          helperText={errors?.[index]?.LastName}
          autoComplete="off"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CustomDatePicker
            label={translation?.dob}
            slotProps={{
              textField: {
                variant: 'outlined',
                error: errors?.[index]?.DateOfBirth ? true : false,
                helperText: errors?.[index]?.DateOfBirth,
                InputLabelProps: { shrink: true },
                onFocus: () => removeErrorFields('DateOfBirth', index, setErrors)

              },
            }}
            value={item?.dateOfBirth ? parse(item.dateOfBirth, 'dd-MM-yyyy', new Date()) : null}
            minDate={dobMinDate ? parse(dobMinDate, 'dd-MM-yyyy', new Date()) : new Date()}
            maxDate={dobMaxDate ? parse(dobMaxDate, 'dd-MM-yyyy', new Date()) : new Date()}
            className=' text-emerald-400'
            onChange={(e) => {
              const formattedDate = e ? format(e, 'dd-MM-yyyy') : null;
              handleTravellerOnChange('dateOfBirth', formattedDate, index, type);
            }}
            onFocus={() => removeErrorFields('DateOfBirth', index, setErrors)}
            InputLabelProps={{ shrink: true }}
            disableTextEditor={true}
            error={errors?.[index]?.DateOfBirth ? true : false}
            helperText={errors?.[index]?.DateOfBirth}
            renderInput={(params) => <CustomTextField
              {...params}
              className=''
              InputLabelProps={{ shrink: true }}
              error={errors?.[index]?.DateOfBirth ? true : false}
              helperText={errors?.[index]?.DateOfBirth}
            />}
            format="dd-MM-yyyy"
          />
        </LocalizationProvider>
        {
          preTraveller?.countriesList?.length ?
            <Autocomplete
              disablePortal
              id={`combo-box`}
              options={preTraveller?.countriesList}
              getOptionLabel={(option) => option.countryName}
              value={preTraveller?.countriesList.find(country => country?.countryISOCode === item?.nationalityCode) || null}
              onChange={(event, value) => { handleTravellerOnChange('nationalityCode', value?.countryISOCode, index, type) }}
              autoComplete="off"
              clearIcon={null}
              onFocus={() => removeErrorFields('NationalityCode', index, setErrors)}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label={translation?.nationality}
                  InputLabelProps={{ shrink: true }}
                  error={errors?.[index]?.NationalityCode ? true : false}
                  helperText={errors?.[index]?.NationalityCode}
                  autoComplete="off"
                  value={item?.nationalityCode || ''}
                />
              )}
              className=""
            /> : null
        }
        <div className="w-full">
          <CustomTextField
            type="text"
            placeholder={translation?.passport_number}
            value={item?.passportNumber}
            className="w-full "
            label={translation?.passport_number}
            onChange={(e) => e.target.value.length <= 15 ? handleTravellerOnChange('passportNumber', e.target.value, index, type) : e.preventDefault}
            onFocus={() => removeErrorFields('PassportNumber', index, setErrors)}
            InputLabelProps={{ shrink: true }}
            error={errors?.[index]?.PassportNumber ? true : false}
            helperText={errors?.[index]?.PassportNumber}
            autoComplete="off"
          />
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CustomDatePicker
            label={translation?.passport_expiry_date}
            value={item?.passportExpiryDate ? parse(item.passportExpiryDate, 'dd-MM-yyyy', new Date()) : null}
            minDate={preTraveller?.infantMaxDOB ? parse(preTraveller?.infantMaxDOB, 'dd-MM-yyyy', new Date()) : new Date()}
            className='relative bottom-0'
            slotProps={{
              textField: {
                variant: 'outlined',
                error: errors?.[index]?.PassportExpiryDate ? true : false,
                helperText: errors?.[index]?.PassportExpiryDate,
                InputLabelProps: { shrink: true },
                onFocus: () => removeErrorFields('PassportExpiryDate', index, setErrors)
              },
            }}
            onChange={(e) => { handleTravellerOnChange('passportExpiryDate', format(e, 'dd-MM-yyyy'), index, type) }}
            onFocus={() => removeErrorFields('PassportExpiryDate', index, setErrors)}
            error={errors?.[index]?.PassportExpiryDate ? true : false}
            helperText={errors?.[index]?.PassportExpiryDate}
            disableTextEditor
            renderInput={(params) => (
              <CustomTextField
                {...params}
                InputLabelProps={{ shrink: true }}
                className=""
                error={errors?.[index]?.PassportExpiryDate ? true : false}
                helperText={errors?.[index]?.PassportExpiryDate}
              />
            )}
            format="dd-MM-yyyy"
          />
        </LocalizationProvider>

        {
          preTraveller?.countriesList?.length ?
            <Autocomplete
              disablePortal
              id={`combo-box`}
              options={preTraveller?.countriesList}
              getOptionLabel={(option) => option.countryName}
              value={preTraveller?.countriesList.find(country => country?.countryISOCode === item?.passportIssuedCountryCode) || null}
              onChange={(event, value) => { handleTravellerOnChange('passportIssuedCountryCode', value?.countryISOCode, index, type) }}
              autoComplete="off"
              clearIcon={null}
              onFocus={() => removeErrorFields('PassportIssuedCountryCode', index, setErrors)}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label={translation?.passport_issued_country}
                  InputLabelProps={{ shrink: true }}
                  className=""
                  error={errors?.[index]?.PassportIssuedCountryCode ? true : false}
                  helperText={errors?.[index]?.PassportIssuedCountryCode}
                  autoComplete="off"
                />

              )}
            // className="bg-stone-50"
            /> : null
        }
        <div className="w-full">
          <CustomTextField
            type="text"
            placeholder={translation?.frequent_flyer_number_optional}
            value={item?.frequentFlyerNo}
            className="w-full "
            label={translation?.frequent_flyer_number}
            onChange={(e) => { handleTravellerOnChange('frequentFlyerNo', e.target.value, index, type) }}
            InputLabelProps={{ shrink: true }}
            autoComplete="off"
          />
          {
            frequentFlyerNoError && (
              <p className="text-red-500 text-[8px] md:text-[11px] font-medium">{frequentFlyerNoError}</p>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default AddTraveller