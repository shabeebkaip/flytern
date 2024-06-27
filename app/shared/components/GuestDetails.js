import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FLightAndHotelContactForm from './FLightAndHotelContactForm'
import { EditIconSvg, PhoneIconSvg } from './SVG'
import { arabic_translation } from '@/lib/constants'


const GuestDetails = () => {
    const [editMode, setEditMode] = useState(false);
    const { contactDc } = useSelector(state => state.sharedState);
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)


    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
    };

    if (editMode) {
        return <FLightAndHotelContactForm onCancelEdit={handleCancelEdit} />;
    }

    return (
        <div className=' bg-white rounded-lg overflow-hidden flex justify-between items-baseline sm:items-center md:h-[70px] p-5'>
            <div className='flex flex-col gap-5 sm:flex-row sm:items-center '>
                <div className='flex items-center gap-2'>
                    <PhoneIconSvg color={'#066651'} />
                    <h4 className='text-base font-medium text-black md:text-lg '>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.insurance_summary : 'Contact Details'}</h4>
                </div>
                <div className='flex  items-center gap-4 sm::gap-7 text-stone-500  text-[8px] sm:text-xs md:text-sm font-medium'>
                    <h6>{contactDc.email}</h6>
                </div>
                <div className='flex  items-center gap-4 sm::gap-7 text-stone-500  text-[8px] sm:text-xs md:text-sm font-medium'>
                    <h6>{contactDc.countryCode}</h6>
                    <h6>{contactDc.mobileNumber}</h6>
                </div>

            </div>
            <div className='flex items-center gap-1 cursor-pointer' onClick={handleEditClick}>
                <EditIconSvg color='#519CEC' />
                <h3 className='text-blue-400 text-[10px] sm:text-xs md:text-sm font-bold '>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.edit : 'Edit'}</h3>
            </div>

        </div>
    )
}

export default GuestDetails