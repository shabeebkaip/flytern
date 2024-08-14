import { Autocomplete, Radio } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { insurancePaymentSummarySuccess, saveTravellerSuccess } from '@/lib/slices/insuranceSlice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { format, parse } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import InsuranceDetails from './InsuranceDetails';
import { checkApiStatus } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';
import { CustomDatePicker, CustomTextField } from '@/app/shared/components/CustomTextField';
import { addInsuranceApi } from '../api';

const CovidForm = ({ setMainData, mode }) => {
    const { insuranceFormList: { _lstPolicyPeriod, _lstPolicyType, _lstPolicyOption, maxPolicyDate, _lstPolicyRelationship } = {} } = useAppSelector(state => state.insuranceState);
    const [apiCallSuccess, setApiCallSuccess] = useState(false);
    const dispatch = useDispatch();
    const { saveTraveller } = useAppSelector(state => state.insuranceState);
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState({
        covidtype: 'Y',
        policyplan: '',
        policy_type: '',
        policyperiod: '',
        policyDate: format(new Date(), 'dd-MM-yyyy')  // This field is included in the data object
    });

    useEffect(() => {
        if (mode === "edit") {
            setData(saveTraveller)
        }
    }, [])

    const addInsurance = () => {
        const policyRelationshipValues = data.policy_type === 1
            ? [{ code: "000", value: 1 }]  // For individual policy type, set a specific relationship value
            : _lstPolicyRelationship.map(item => ({
                code: item.code,
                value: data[item.code] || null
            }));

        const newData = {
            ...data,
            policyRelationshipValues,
            policyperiod: data?.policyperiod?.periodCode,
            policyplan: String(data?.policyplan),
            policy_type: String(data?.policy_type),
            id: "1"
        };
        dispatch(saveTravellerSuccess(newData))
        addInsuranceApi(newData)
            .then(response => {
                if (checkApiStatus(response)) {
                    setApiCallSuccess(true);
                    enqueueSnackbar('Insurance Updated Successfully', {
                        variant: 'success',
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    });
                    dispatch(insurancePaymentSummarySuccess(response.data.data))
                } else {
                    enqueueSnackbar('Something went wrong', {
                        variant: 'error',
                        autoHideDuration: 2000,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    });
                }
            });
    };

    useEffect(() => {
        if (!data.policy_type && _lstPolicyType && _lstPolicyType.length > 0) {
            setData(prevData => ({
                ...prevData,
                policy_type: _lstPolicyType[0].typeCode
            }));
        }

        if (!data.policyplan && _lstPolicyOption && _lstPolicyOption.length > 0) {
            setData(prevData => ({
                ...prevData,
                policyplan: _lstPolicyOption[0].optionCode
            }));
        }

        if (!data.policyperiod && _lstPolicyPeriod && _lstPolicyPeriod.length > 0) {
            setData(prevData => ({
                ...prevData,
                policyperiod: _lstPolicyPeriod && _lstPolicyPeriod.length > 0 ? _lstPolicyPeriod[0] : ''
            }));
        }
        if (data.policy_type === 2) {
            setData(prevData => ({
                ...prevData,
                '000': 1,
                '001': 1,
            }));
        }

    }, [data.policy_type, data.policyplan, data.policyperiod, _lstPolicyType, _lstPolicyOption, _lstPolicyPeriod]);

    const onFieldChange = (key, value) => {
        const newData = { ...data, [key]: value };
        setData(newData);
    };

    const handlePolicyPeriodChange = (event, newValue) => {

        onFieldChange('policyperiod', newValue);
    };
    const handleDateChange = (date) => {
        onFieldChange('policyDate', format(date, 'dd-MM-yyyy'));
    };

    const { translation } = useAppSelector((state) => state.sharedState)

    return (
        <>
            {apiCallSuccess ? (
                <InsuranceDetails />
            ) : (
                <div className='flex flex-col p-5 overflow-hidden bg-white rounded-lg gap-14'>
                    <div className='container flex flex-col gap-6 px-5 mx-auto'>
                        <h3 className='text-base font-medium text-black '>
                            {translation?.policy_type}
                        </h3>
                        <div className='flex flex-col gap-4 sm:flex-row sm:gap-12 sm:items-center'>
                            {
                                _lstPolicyType && _lstPolicyType.map((item, index) => (
                                    <div className='flex gap-5' key={index}>
                                        <Radio
                                            style={{ color: 'orange', padding: 0 }}
                                            onChange={() => onFieldChange('policy_type', item.typeCode)}
                                            checked={item.typeCode === data.policy_type}
                                        />
                                        <h3 className='text-base font-normal text-black'>{item.information}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {data.policy_type === 2 && (
                        <div className='container flex flex-col gap-6 px-5 mx-auto'>
                            <h3 className='text-base font-medium text-black '>Family Members</h3>
                            <div className='flex flex-col gap-4 sm:flex-row sm:gap-12 sm:items-center'>
                                <div className='grid w-full grid-cols-2 gap-5'>
                                    {
                                        _lstPolicyRelationship && _lstPolicyRelationship.map((item, index) => (
                                            <Autocomplete
                                                disablePortal
                                                key={index}
                                                id={`combo-box`}
                                                options={item.code === '000' || item.code === '001'
                                                    ? [
                                                        { value: 0, label: '0' },
                                                        { value: 1, label: '1' },
                                                    ]
                                                    : [{ value: null, label: 'Not selected' }, ...Array.from({ length: 99 }, (_, index) => ({ value: index + 1, label: (index + 1).toString() }))]
                                                }
                                                getOptionLabel={option => option.label}
                                                onChange={(event, value) => onFieldChange(item.code, value ? value.value : null)}
                                                value={
                                                    data[item.code] === 0 || data[item.code]
                                                        ? { value: data[item.code], label: data[item.code].toString() }
                                                        : null
                                                }
                                                renderInput={params => (
                                                    <CustomTextField
                                                        {...params}
                                                        label={item.information}
                                                    />
                                                )}
                                                className='w-full bg-stone-50'
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='container flex flex-col gap-6 px-5 mx-auto'>
                        <h3 className='text-base font-medium text-black '>
                            {translation?.policy_plan}
                        </h3>
                        <div className='flex flex-col gap-4 sm:flex-row sm:gap-12 sm:items-center'>
                            {_lstPolicyOption && _lstPolicyOption.map((item, index) => (
                                <div className='flex gap-5 sm:gap-12' key={index}>
                                    <Radio
                                        style={{ color: 'orange', padding: 0 }}
                                        onChange={() => onFieldChange('policyplan', item.optionCode)}
                                        checked={item.optionCode === data.policyplan}
                                    />
                                    <h3 className='text-base font-normal text-black'>{item.information}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='container flex flex-col gap-6 px-5 mx-auto'>
                        <h3 className='text-base font-medium text-black'>
                            {translation?.policy_date}
                        </h3>
                        <div className='grid gap-4 sm:grid-cols-2 sm:gap-8'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <CustomDatePicker
                                    label={translation?.policy_date}
                                    value={parse(data.policyDate, 'dd-MM-yyyy', new Date())}
                                    minDate={new Date()}
                                    maxDate={maxPolicyDate}
                                    disablePast={true}
                                    className='bg-stone-50'
                                    onChange={handleDateChange}
                                    renderInput={(params) => <CustomTextField {...params} className='bg-stone-50' />}
                                />

                            </LocalizationProvider>
                            {
                                _lstPolicyPeriod?.length ?
                                    <Autocomplete
                                        disablePortal
                                        id={`combo-box`}
                                        options={_lstPolicyPeriod}
                                        getOptionLabel={option => option.information}
                                        onChange={handlePolicyPeriodChange}
                                        value={data.policyperiod}
                                        renderInput={params => (
                                            <CustomTextField
                                                {...params}
                                                label={translation?.policy_period}
                                            />
                                        )}
                                        className='bg-stone-50'
                                    /> : null
                            }

                        </div>
                        <div className='grid sm:grid-cols-2'>
                            <button className='text-white bg-green-800 sm:gap-8 w-[97%] h-10 rounded-md' onClick={addInsurance}>{translation?.submit}</button>
                            <div className='w-full'></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CovidForm;
