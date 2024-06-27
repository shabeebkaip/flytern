import React from 'react';
import { Star } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const SelectedFilter = ({ searchData, hotels }) => {

    const hotelState = useSelector(state => state.hotelState);
    const { ratingDcs, locationDcs = [] } = hotelState?.hotels || {};


    const matchingratingDcs = ratingDcs?.find(ratingDcs => ratingDcs.value === searchData?.ratingDcs);
    const matchinglocationDcs = locationDcs?.find(locationDcs => locationDcs.value === searchData?.locationDcs);

    return (
        <div>
            {
                (searchData?.ratingDcs || searchData?.locationDcs || searchData?.priceMinMaxDc) &&
                <h4 className='text-font-gray'>Filtered By : </h4>
            }

            <div className='flex items-center gap-3 my-2'>
                {
                    searchData?.ratingDcs ?
                        <div className='flex items-center p-1 text-sm border rounded-md text-font-gray border-font-gray'>
                            <h3 className='' >Rating : {matchingratingDcs?.name}</h3>
                            <Star className='w-3 h-3' />
                        </div>
                        : null
                }
                {
                    searchData?.locationDcs ?
                        <h3 className='p-1 text-sm border rounded-md text-font-gray twz border-font-gray'>Location : {matchinglocationDcs?.name}</h3>
                        : null
                }
                {
                    searchData?.priceMinMaxDc ?
                        <h3 className='p-1 text-sm border rounded-md text-font-gray twz border-font-gray'>Price: {searchData?.priceMinMaxDc}</h3>
                        : null
                }
            </div>
        </div>
    )
}

export default SelectedFilter