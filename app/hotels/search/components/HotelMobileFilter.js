import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { Checkbox,  InputAdornment,  Rating, Skeleton, Slider, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CustomTextField } from '../../../shared/components/CustomTextField'
import { useSelector } from 'react-redux'
import CancelIcon from '@mui/icons-material/Cancel';
import Image from 'next/image'
import { ClearIcon } from '@mui/x-date-pickers'


function valuetext(value) {
    return `${value}°C`;
}

const HotelMobileFilter = (props) => {
    const { searchData, setSearchData, filterHotels, hotelsList, objectID } = props;
    const { hotels: { priceDcs, ratingDcs, locationDcs, _lst } } = useSelector(state => state.hotelState)
    const { translation } = useSelector((state) => state.sharedState)
    const priceUnit = _lst?.length ? _lst[0].priceUnit : null
    const [priceOpen, setPriceOpen] = useState(true);
    const [hotel, setHotel] = useState("")
    const [facilities, setFacilities] = useState(true);
    const [starRating, setStarrating] = useState(true);
    const [value, setValue] = useState([0, 400])
    const [sliced, setSliced] = useState(10)
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const { hotelLoader } = useSelector(state => state.hotelState)

    const togglePriceAccordion = () => {
        setPriceOpen(!priceOpen);
    };
    const toggleFacilitiesAccordion = () => {
        setFacilities(!facilities);
    };
    const toggleStarRating = () => {
        setStarrating(!starRating);
    };

    const handlePriceChange = (event, newValue) => {
        let _searchData = { ...searchData };
        setValue(newValue)
        _searchData.priceMinMaxDc = newValue.join();
        setSearchData(_searchData);
        filterHotels(_searchData);
    };
    const handleHotelSearch = (value) => {
        let _searchData = { ...searchData };
        setHotel(value)
        _searchData.SearchByNameDc = value
        filterHotels(_searchData);

    }
    const onChange = (event) => {
        let _searchData = { ...searchData };
        if (searchData[event.target.name] === event.target.value) {
            _searchData[event.target.name] = null;
        } else {
            _searchData[event.target.name] = event.target.value;
        }
        setSearchData(_searchData);
        filterHotels(_searchData,);
        setPopoverOpen(false); 

    };
    const handleClear = () => {
        let _searchData = { ...searchData };
        _searchData.priceMinMaxDc = null;
        _searchData.locationDcs = null;
        _searchData.ratingDcs = null;
        setSearchData(_searchData);
        setHotel("")
        filterHotels(_searchData);
        setPopoverOpen(false); 

    }
    const handleClearSarch = () => {
        let _searchData = { ...searchData };
        _searchData.SearchByNameDc = ""; 
        setSearchData(_searchData); 
        setHotel(""); 
        filterHotels(_searchData); 
    }
    let objectValueArr = Object.values(searchData).map((item) => item !== null)
    let check = objectValueArr.includes(true)

  return (
    <div className=''>
    <Popover placement="bottom-end">
        <PopoverHandler>
            <div className="flex items-center justify-between w-24 h-12 px-3 bg-white rounded-md sm:w-36">
                <p className='text-sm sm:text-base'>Filter</p>
                <Image className='w-4 h-4 sm:h-6 sm:w-6' src='/filter.png' alt="" width={100} height={100} />
            </div>
        </PopoverHandler>
        <PopoverContent className="flex flex-col w-72">
            <div className="">
            <div className='mt-2 '>
            <div className='w-full mb-4'>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    placeholder={translation.search_by}
                                    onChange={(e) => handleHotelSearch(e.target.value)}
                                    value={hotel}
                                    className='bg-white rounded-lg'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {hotel && (
                                                    <div onClick={handleClearSarch} edge="end">
                                                        <ClearIcon />
                                                    </div>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

            {
                hotelLoader ?
                    <Skeleton
                        sx={{ bgcolor: 'grey.300' }}
                        variant="rectangular"
                        className="w-3/4 h-full bg-stone-50"

                    /> :
                    hotelsList || objectID ?
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-base font-bold text-black font-">
                                {translation?.filter_by}
                            </h4>
                            {
                                check ?
                                    <div className="flex gap-1 cursor-pointer" onClick={() => { handleClear() }}>
                                        <h4 className="text-base font-semibold text-orange-500 font-">
                                            {translation?.clear}
                                        </h4>
                                        <CancelIcon className="text-orange-500" />
                                    </div> : null
                            }

                        </div> : null
            }
            {
                hotelLoader ?
                    <Skeleton
                        sx={{ bgcolor: 'grey.300' }}
                        variant="rectangular"
                        className="w-full h-full mt-4 bg-stone-50"
                        height={"100vh"}

                    /> :
                    hotelsList || objectID ?
                        <div className='container flex flex-col items-center gap-10 px-4 py-5 mx-auto mt-5 overflow-hidden bg-white rounded-lg'>

                            <div className="container flex flex-col w-full gap-3 px-2 mx-auto group">
                                <button
                                    onClick={togglePriceAccordion}
                                    className="flex items-center justify-between w-full bg-white"
                                >
                                    <span className="text-sm font-medium text-black ">{translation?.price}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 transform ${priceOpen ? 'rotate-0' : '-rotate-180'} transition-transform duration-300`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {priceOpen && (
                                    <div className="flex flex-col items-center bg-white">
                                        <div className="flex justify-between w-full ">
                                            <h3 className="text-sm font-medium text-black"> <span className="text-xs">{priceUnit} </span>{priceDcs?.length > 0 &&
                                                priceDcs[0].min}</h3>
                                            <h3 className="text-sm font-medium text-black"><span className="text-xs">{priceUnit} </span> {priceDcs?.length > 0 &&
                                                priceDcs[0].max}</h3>
                                        </div>
                                        <div className="w-full custom-slider">
                                            <Slider
                                                getAriaLabel={() => "Temperature range"}
                                                value={value}
                                                onChange={handlePriceChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                min={
                                                    priceDcs?.length > 0 &&
                                                    priceDcs[0].min
                                                }
                                                max={
                                                    priceDcs?.length > 0 &&
                                                    priceDcs[0]?.max
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="container w-full px-2 mx-auto group">
                                <button
                                    onClick={toggleStarRating}
                                    className="flex items-center justify-between w-full bg-white"
                                >
                                    <span className="text-sm font-medium text-black ">{translation?.rating}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 transform ${starRating ? 'rotate-0' : '-rotate-180'} transition-transform duration-300`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {starRating && (
                                    <div className="flex justify-center bg-white">
                                        <div className="w-full p-0">
                                            {ratingDcs && ratingDcs.map((item, index) => (
                                                <div className='flex items-center justify-between w-full h-16 gap-5 p-0 text-sm font-normal border-b' key={index}>
                                                    <Rating name="read-only" value={item.value} readOnly />
                                                    <Checkbox
                                                        className='flex justify-end p-0'
                                                        style={{ color: 'orange', padding: 0 }}
                                                        defaultChecked={false}
                                                        checked={item.value === searchData.ratingDcs ? true : false}
                                                        name="ratingDcs"
                                                        onChange={onChange}
                                                        value={item.value}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="container w-full px-2 mx-auto group">
                                <button
                                    onClick={toggleFacilitiesAccordion}
                                    className="flex items-center justify-between w-full bg-white"
                                >
                                    <span className="text-sm font-medium text-black ">{translation?.location}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 transform ${facilities ? 'rotate-0' : '-rotate-180'} transition-transform duration-300`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {facilities && (
                                    <div className="flex justify-center bg-white">
                                        <div className="w-full p-0">
                                            {
                                                locationDcs && locationDcs.slice(0, sliced).map((item, index) => (
                                                    <div className='flex items-center justify-between w-full h-16 gap-5 p-0 text-sm font-normal border-b' key={index}>
                                                        {item.name}
                                                        <Checkbox
                                                            className='flex justify-end p-0'
                                                            style={{ color: 'orange', padding: 0 }}
                                                            defaultChecked={false}
                                                            checked={item.value === searchData.locationDcs ? true : false}
                                                            name="locationDcs"
                                                            onChange={onChange}
                                                            value={item.value}
                                                        />
                                                    </div>
                                                ))
                                            }
                                            {
                                                locationDcs?.length && locationDcs?.length > 10 && locationDcs?.length > sliced ?
                                                    <p className='mt-3 text-sm text-right text-orange-400 cursor-pointer font-inter' onClick={() => setSliced(prevState => prevState + 10)}  >Show more</p>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div> : null
            }

        </div>
            </div>
        </PopoverContent>
    </Popover>
</div>
  )
} 

export default HotelMobileFilter