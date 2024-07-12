import React from 'react'
import ImageComponent from '@/app/shared/components/ImageComponent';
import { Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';


const HotelCard = ({ hotel, objectID }) => {
    // const navigate = useNavigate()
    const { translation } = useSelector((state) => state.sharedState)
    const limitDescription = (description) => {
        const words = description.split(' ');
        const truncatedDescription = words.slice(0, 30).join(' ');
        return truncatedDescription + (words.length > 30 ? '...' : '');
    };
    const getTripAdvisorTextColor = (rating) => {
        switch (true) {
            case rating > 4:
                return 'text-[#57e32c]';
            case rating > 3:
                return 'text-[#b7dd29]';
            case rating > 2:
                return 'text-[#ffe234]';
            case rating > 1:
                return 'text-[#ffa534]';
            case rating <= 1:
                return 'text-[#ff4545]';    
            default:
                return '';
        }
    }
    const getTripAdvisorTextCondition = (rating) => {
        switch (true) {
            case rating > 4:
                return 'Excellent';
            case rating > 3:
                return 'Very Good';
            case rating > 2:
                return 'Good';
            case rating > 1:
                return 'Pleasant';
            case rating <= 1:
                return 'Poor';
            default:
                return '';
        }
    }

    const textColorClass = getTripAdvisorTextColor(hotel?.tripAdvisorRating);
    const textCondition = getTripAdvisorTextCondition(hotel?.tripAdvisorRating)
    return (
        <div className="container flex flex-col md:grid h-full md:items-center justify-between w-full grid-cols-12 gap-4 px-4 py-5 mx-auto bg-white rounded-md md:gap-7">
            <div className="col-span-12 sm:col-span-4">
                <ImageComponent
                    imageUrl={hotel.imageUrl}
                    defaultImageUrl='/hotel/hotel.jpg'
                />
            </div>

            <div className="h-full col-span-12 md:col-span-5 ">
                <div className='flex flex-col h-full gap-1'>
                    <h3 className='font-medium text-black md:text-xl sm:text-base'>{hotel.hotelName}</h3>
                    <div class="text-black text-[9px] sm:text-[11px] md:text-sm font-medium flex  justify-start  gap-1  ">
                        <Rating name="read-only" value={hotel.rating} readOnly precision={0.5} size='small' />
                    </div>
                    <ul className='flex gap-7'>
                        {hotel?.information && hotel.information.map((info, index) => (
                            <li className='list-none sm:text-base text-[11px]' key={index}>{info}</li>
                        ))}
                    </ul>
                    <div className='flex items-center justify-start gap-2 '>
                        <Image width={24} height={24} src={'/location.png'} alt="" className='w-6' />
                        <p className='text-[9px] sm:text-[11px] md:text-sm font-normal'>{hotel.location}</p>

                    </div>
                    <p className='text-[9px] sm:text-[11px] md:text-sm font-normal text-neutral-400 hidden md:block'>{limitDescription(hotel.description)}</p>

                </div>

            </div>
            <div className="flex items-end justify-between w-full h-full col-span-12 gap-6 md:flex-col md:col-span-3 ">
                <div className='w-full '>
                    <h4 className=' md:text-end text-[14px] md:text-xl font-semibold text-tag-color-two '><span className='text-[13px] md:text-sm font-medium'>{hotel.priceUnit} </span>{parseFloat(hotel.fromPrice).toFixed(3)}</h4>
                    <div class="text-black text-[9px] sm:text-[11px] md:text-sm font-medium hidden md:flex items-center justify-end gap-1  ">
                        {hotel?.tripAdvisorRating > 1 ?
                            <Image width={24} height={24} src={'/tripadvisor.png'} alt="trip-advisor" className='w-6' />
                            : null
                        }
                        <p className={`text-sm font-inter font-semibold ${textColorClass}`}>
                            {hotel?.tripAdvisorRating} {" "}
                            {
                                hotel?.tripAdvisorRating > 1 ?
                                    <span className='font-normal text-black'>({textCondition})</span> : null
                            }
                        </p>

                    </div>
                </div>
                <div className='justify-end w-full md:flex '>
                    <div onClick={() => { if (typeof window !== "undefined") {window.location.href = `/hotels/details?objId=${objectID}&ind=${hotel.hotelId}` }}}>
                    <button className='flex items-center justify-center px-5 py-2 text-xs text-white rounded-md md:w-32 md:p-0 md:h-10 bg-dark-green'  >{translation?.select}</button>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default HotelCard