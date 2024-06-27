import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { Radio, Skeleton } from '@mui/material'
import { useSelector } from 'react-redux'
import HotelMobileFilter from './HotelMobileFilter'
import Image from 'next/image'

const SortSection = (props) => {
    const { searchData, setSearchData, filterHotels, setSort, sort, hotelLoader ,hotelsList} = props;
    const { hotels: { sortingDcs } } = useSelector(state => state.hotelState)
    const [open, setOpen] = useState(false)
    const matchingsortingDc = sortingDcs?.find(sortingDc => sortingDc.value === sort);

    const handleRadioChange = (event) => {
        setSort(event.target.value);
        setSearchData({ ...searchData, sortingDc: event.target.value });
        filterHotels({ ...searchData, sortingDc: event.target.value })
        setTimeout(() => {
            setOpen(false)
        }, 500);
    };
    useEffect(() => {
        // Set the initial sort value based on 0 index when sortingDcs is available
        if (sortingDcs && sortingDcs.length > 0) {
            setSort(sortingDcs[0].value);
        }
    }, [sortingDcs]);

    useEffect(() => {
        // Update the sortingDc in the searchData when sort changes
        setSearchData((prevSearchData) => ({ ...prevSearchData, sortingDc: sort }));
    }, [sort]);

    // useEffect(() => {
    //     // Filter flights when searchData changes
    //     filterHotels(searchData);
    // }, []);

    const { translation } = useSelector((state) => state.sharedState)
    return (
        <div className='grid gap-5'>
            <div className='flex flex-col justify-end gap-2 md:flex-row md:items-center'>
                <div>
                    {
                        hotelLoader ?
                            <Skeleton
                                sx={{ bgcolor: 'grey' }}
                                variant="rectangular"
                                className="w-full bg-stone-50"
                            /> :
                            <div className='flex justify-between gap-5 mt-4 md:justify-start md:mt-0'>
                                <div className='lg:hidden'>
                                    <HotelMobileFilter
                                        setSearchData={setSearchData}
                                        searchData={searchData}
                                        filterHotels={filterHotels}
                                        hotelLoader={hotelLoader}
                                        hotelsList={hotelsList}
                                    />
                                </div>
                                <div className=''>
                                    <Popover placement="bottom-end" open={open} handler={setOpen}>
                                        <PopoverHandler>
                                            <div className='flex items-center justify-between w-full h-12 px-3  bg-white rounded-md'>
                                                <div className='flex items-center w-full gap-2 py-2'>
                                                    <Image className='w-6 h-6' src='/sort.png' alt="" width={100} height={100} />
                                                    <h3>{translation?.sort_by} {matchingsortingDc?.name}</h3>

                                                </div>
                                                <div>
                                                    <Image
                                                        className="w-8 h-8 "
                                                        src="/dropdown.png"
                                                        alt=""
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                            </div>

                                        </PopoverHandler>
                                        <PopoverContent className="flex flex-col w-72">
                                            <div className="flex items-center h-12 gap-4 mb-4 border-blue-gray-50">
                                                <h3 className='text-base font-medium text-black'>{translation?.sort_by}</h3>
                                            </div>
                                            <div className="flex justify-center w-full bg-white">
                                                <div className="w-full p-0">
                                                    {
                                                        sortingDcs && sortingDcs.map((item, index) => {
                                                            return (
                                                                <div className='flex items-center justify-between w-full h-16 gap-5 p-0 text-sm font-normal border-b' key={index}>
                                                                    {item.name}
                                                                    <Radio
                                                                        className='flex justify-end p-0'
                                                                        style={{ color: 'orange', padding: 0 }}
                                                                        defaultChecked={false}
                                                                        value={item.value}
                                                                        checked={sort === item.value}
                                                                        onChange={(e) => { handleRadioChange(e); }} />
                                                                </div>
                                                            )
                                                        })
                                                    }


                                                </div>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SortSection