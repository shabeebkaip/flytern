import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { EditIconSvg, HeartIconSvg } from '@/app/shared/components/SVG'
import { arabic_translation } from '@/lib/constants'
import RegularForm from './RegularForm'
import CovidForm from './CovidForm'

const InsuranceDetails = () => {
    const { insuranceFormList: { _lstPolicyPeriod, _lstPolicyType } = {} } = useSelector(state => state.insuranceState);
    const [editMode, setEditMode] = useState(false);
    const { saveTraveller } = useSelector(state => state.insuranceState);
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    const getPolicyPeriodName = (policyperiod) => {
        const relationship = _lstPolicyPeriod.find(item => item.periodCode === policyperiod);
        return relationship ? relationship.information : policyperiod;
    };
    const getPolicyTypeName = (policytype) => {
        const relationship = _lstPolicyType.find(item => item.typeCode === policytype);
        return relationship ? relationship.information : policytype;
    };
    const handleEditClick = () => {
        setEditMode(true);
    };
    const handleCancelEdit = () => {
        setEditMode(false);
    };
    if (editMode) {
        if (saveTraveller.id === "1") {
            return <CovidForm onCancelEdit={handleCancelEdit} mode="edit" />;
        } else {
            return <RegularForm onCancelEdit={handleCancelEdit} mode="edit" />;
        }
    }
    return (
        <div className=' bg-white rounded-lg overflow-hidden flex justify-between items-baseline sm:items-center md:h-[70px] p-5'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center '>
                <div className='flex items-center'>
                    <HeartIconSvg color={'#066651'} />
                    <h4 className='text-base font-medium text-black md:text-lg '>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.insurance_summary : 'Insurance Summary'}</h4>
                </div>
                <div className='flex  items-center gap-4 sm::gap-7 text-stone-500  text-[8px] sm:text-xs md:text-sm font-medium'>
                    <h6>{getPolicyTypeName(saveTraveller.policytype)}</h6>
                    <ul className='text-stone-500 text-[8px] sm:text-xs md:text-sm font-medium  flex list-disc gap-4 sm:gap-8 pl-3'>
                        <li>{getPolicyPeriodName(saveTraveller.policyperiod)}</li>
                        <li>{saveTraveller.policyDate}</li>
                    </ul>
                </div>

            </div>
            <div className='flex items-center gap-1' onClick={handleEditClick}>
                <EditIconSvg color='#519CEC' />
                <h3 className='text-blue-400 text-[10px] sm:text-xs md:text-sm font-bold '>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.edit : 'Edit'}</h3>
            </div>

        </div>
    )
}

export default InsuranceDetails