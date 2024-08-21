import React, { useCallback, useEffect, useState } from 'react'
import FlightInput from '@/app/home/components/FlightInput';
import FlightDateInput from '@/app/home/components/FlightDateInput'
import { Checkbox, } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { debounce } from '@/lib/utils';
import { format, parse } from "date-fns";
import { getDestinationAutoSearchApi } from "@/app/home/api";
// TODO import api once flight module is ready
// import { getFlightSearchApi } from '../../flight/apiServices';
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PassengerAndCabin from '@/app/home/components/PassengerAndCabin';
import Popover from '@mui/material/Popover';
import { setFlightSearch } from '@/lib/slices/exploreSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import { getFlightSearchApi } from '@/app/flights/api';



const OneWay = ({ flightReqBody, lang }) => {
  const dispatch = useAppDispatch()
  const { flightSearch } = useAppSelector(state => state.exploreState);
  const { translation } = useAppSelector(state => state.sharedState)
  const [error, setError] = useState({});
  const [destinationList, setDestinationList] = useState([]);
  const [destinationList1, setDestinationList1] = useState([]);
  const location = typeof window !== "undefined" ? window.location : null;
  const cabinList = useAppSelector((data) => data?.exploreState?.data?.cabinClass)
  const defaultCabin = cabinList?.filter((data) => data.isDefault === true)
  const [anchorElDate, setAnchorElDate] = useState(null);
  const [anchorElPassenger, setAnchorElPassenger] = useState(null);
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

  useEffect(() => {
    if (location?.pathname?.includes('/search')) {
      if (Object.keys(flightReqBody)?.length) {
        dispatch(setFlightSearch(flightReqBody))
      }
    }
  }, [])

  useEffect(() => {
    dispatch(setFlightSearch({
      ...flightSearch,
      allowedCabins: defaultCabin
    }));
  }, [])
  const handlePassengerClick = (event) => {
    setAnchorElPassenger(event.currentTarget);
  };


  const handleDateClick = (event) => {
    setAnchorElDate(event.currentTarget);
    setDatePopoverOpen(true); // Open the calendar popover
  };

  const handleDateAccept = (newValue) => {
    onSearchDateFieldChange("departureDate", format(newValue, "yyyy-MM-dd"), 0);
    setAnchorElDate(null); // Close the anchor element (date input)
    setDatePopoverOpen(false); // Close the calendar popover
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
    setDatePopoverOpen(false); // Close the calendar popover
  };

  const handleClosePassenger = () => {
    setAnchorElPassenger(null);
  };

  const openDatePopover = Boolean(anchorElDate);
  const idDatePopover = openDatePopover ? 'date-popover' : undefined;

  const openPassengerPopover = Boolean(anchorElPassenger);
  const idPassengerPopover = openPassengerPopover ? 'passenger-popover' : undefined;

  const handlePromoCodeChange = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to check if the input contains only alphanumeric characters
    const isValid = /^[a-zA-Z0-9]*$/.test(inputValue);

    if (isValid || inputValue === '') {
      dispatch(setFlightSearch({
        ...flightSearch,
        promoCode: inputValue
      }));
      setError({
        ...error,
        promoCode: ""

      })
    } else {
      setError({
        ...error,
        promoCode: "Please Enter Only alphanumeric characters"
      })
    }
  };
  const pagecheck = location?.pathname === "/flights/search"
  const onFieldChange = (field, value, index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch.searchList.map((search, i) =>
        index === i ? { ...search, [field]: value } : search
      )
    }));
  };
  const onFieldSearchListChange = (field, value, index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch.searchList.map((search, i) =>
        index === i ? { ...search, [field]: value } : search
      )
    }))
  };
  const onSearchDateFieldChange = (field, value, index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch.searchList.map((search, i) =>
        index === i ? { ...search, [field]: value } : search
      )
    }))
  };

  const debouncedHandleSearch = useCallback(
    debounce((key, value, index) => {
      if (key === "departureLabel") {
        getDestinationAutoSearchApi(value, setDestinationList);
      } else {
        getDestinationAutoSearchApi(value, setDestinationList1);
      }
    }, 300), []);
  const handleNameAndCode = (key, destination, index) => {
    if (key === 'departure') {
      dispatch(setFlightSearch({
        ...flightSearch,
        searchList: flightSearch?.searchList.map((search, i) =>
          index === i ? { ...search, departure: destination.airportCode, departureLabel: destination.uniqueCombination } : search
        )
      }))
    } else if (key === 'arrival') {
      dispatch(setFlightSearch({
        ...flightSearch,
        searchList: flightSearch?.searchList.map((search, i) =>
          index === i ? { ...search, arrival: destination.airportCode, arrivalLabel: destination.uniqueCombination } : search
        )
      }))
    }
  }
  const handleSubmit = () => {
    let validationError = {
      departureLabel: flightSearch?.searchList?.[0]?.departureLabel ? "" : "Please Enter Departure",
      arrivalLabel: flightSearch?.searchList?.[0]?.arrivalLabel ? "" : "Please Enter Arrival",
    }
    if (flightSearch?.searchList?.[0]?.departureLabel === flightSearch?.searchList?.[0]?.arrivalLabel) {
      validationError = {
        ...validationError,
        arrivalLabel: 'From & To should not be the same'
      }
    }

    if (Object.values(validationError).every(value => value === "")) {
      let payload = flightSearch
      payload = {
        ...payload,
        searchList: flightSearch?.searchList?.map((search) => ({ ...search, departureAnchorEl: null, returnAnchorEl: null })),
      }
      if (typeof window !== 'undefined') {
        if (location?.pathname.includes("/search")) {
          localStorage.setItem("searchData", JSON.stringify(payload));
          // TODO call the api once flight module is ready
          dispatch(getFlightSearchApi(payload));
          

        } else {
          localStorage.setItem("searchData", JSON.stringify(payload));
          if (lang === 'ar') {
            window.location.href = `/flights/search`;
          } else {
            window.location.href = `/flights/search`;
          }
        }
      }
    } else {
      setError(validationError)
    }
  };

  const handleSearchValidation = (key, value) => {
    if (value.trim() === '') {
      setError('Fields should not be blank');
    } else {
      setError('');
    }

    onFieldSearchListChange(key, value, 0);

    if (key === 'departureLabel') {
      debouncedHandleSearch("departureLabel", value, 0);
    } else if (key === 'arrivalLabel') {
      debouncedHandleSearch("arrivalLabel", value, 0);
    }
  };

  // ...

  const handleSearch = (key, value) => {
    handleSearchValidation(key, value);
  };


  const handleSwap = () => {
    const newarrival = flightSearch?.searchList?.map((search) => ({
      ...search,
      departure: search.arrival,
      departureLabel: search.arrivalLabel,
      arrival: search.departure,
      arrivalLabel: search.departureLabel
    }))
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: newarrival
    }))
  }
  return (
    <>
      <div className='relative grid gap-4 duration-300 ease-in-out md:grid-cols-2 mt-7'>
        {flightSearch?.searchList?.map((search, index) => (
          <>
            <div className="relative flex flex-col gap-3" key={index}>
              <FlightInput
                label={translation?.from}
                image={"/icons/airport-plane.svg"}
                onFieldChange={(value) => {
                  handleSearch("departureLabel", value, index)
                  debouncedHandleSearch("departureLabel", value, index)
                  setError({
                    ...error,
                    departureLabel: ""
                  })
                }}
                value={search.departureLabel}
              />
              {error && <h4 className="text-xs text-red-500">{error.departureLabel}</h4>}
              {search.departureLabel && destinationList.length ? (
                <div className="absolute z-20 flex flex-col w-full h-40 gap-3 overflow-y-auto bg-white rounded-md shadow-md top-20 ">
                  {destinationList.map((destination, index) => (
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50"
                      onClick={() => {
                        handleNameAndCode('departure', destination, 0)
                        setDestinationList([]);
                      }}
                      key={index}
                    >
                      <div className="flex items-start justify-start gap-2">
                        <FlightTakeoffIcon style={{ color: "orange" }} />
                        <div className="flex flex-col gap-1">
                          <p>{destination.uniqueCombination}</p>
                        </div>
                      </div>
                      <p className="text-font-gray">{destination.airportCode}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className={`${pagecheck ? "absolute cursor-pointer  2xl:left-[487px] xl:left-[397px]  lg:left-[307px] lg:top-[15px] md:left-[331px] md:top-[15px] sm:left-[275px] sm:top-[62px] top-[62px] left-[46%] z-40 " : "absolute cursor-pointer 2xl:left-[458px] xl:left-[373px]  lg:left-[289px] lg:top-[15px] md:left-[333px] md:top-[15px] sm:left-[275px] sm:top-[62px] top-[62px] left-[46%] z-40"}`}
              onClick={() => handleSwap()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="relative"
              >
                <circle cx="20" cy="20" r="20" fill="#066651" />
              </svg>
              <Image width={20} height={20} className="absolute  top-[9px] left-[9px]" src={"/icons/Layer_1.svg"} alt="" />
            </div>
            <div className="relative flex flex-col gap-3">
              <FlightInput
                label={translation?.to}
                id={"arrival"}
                defaultValue={"Dubai"}
                image={"/misc/To.svg"}
                ulta
                onFieldChange={(value) => {
                  handleSearch("arrivalLabel", value, index)
                  debouncedHandleSearch("arrivalLabel", value, index)
                  setError({
                    ...error,
                    arrivalLabel: ""

                  })
                }}
                value={search.arrivalLabel}
              />
              {error && <h4 className="text-red-500">{error.arrivalLabel}</h4>}
              {search.arrivalLabel && destinationList1.length ? (
                <div className="absolute z-20 flex flex-col w-full h-40 gap-3 overflow-y-auto bg-white rounded-md shadow-md top-20 ">
                  {destinationList1.map((destination, index) => (
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50"
                      onClick={() => {
                        onFieldChange("arrivalLabel", destination.airportCode, 0);
                        handleNameAndCode('arrival', destination, 0)
                        setDestinationList1([]);
                      }}
                      key={index}
                    >
                      <div className="flex items-start justify-start gap-2">
                        <FlightLandIcon style={{ color: "orange" }} />
                        <div className="flex flex-col gap-1">
                          <p>{destination.airportName}</p>
                        </div>
                      </div>
                      <p className="text-font-gray">{destination.airportCode}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className='grid grid-cols-1 gap-5'>
              <div onClick={handleDateClick}>
                {/* Content that, when clicked, will open the Popover */}
                <FlightDateInput
                  label={translation?.departure_date}
                  value={
                    search.departureDate
                      ? format(
                        new Date(search.departureDate),
                        "dd MMM yyyy"
                      )
                      : null
                  }
                  openCalendar={() => { }} />
              </div>

              <Popover
                id={idDatePopover}
                open={datePopoverOpen}
                anchorEl={anchorElDate}
                onClose={handleCloseDate}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div
                  onClick={(event) => {
                    // Prevent the click event from propagating to the parent div
                    event.stopPropagation();
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateCalendar
                      onChange={(newValue) => {
                        onSearchDateFieldChange("departureDate", format(newValue, "yyyy-MM-dd"), 0);
                        setAnchorElDate(null); // Close the anchor element (date input)
                        setDatePopoverOpen(false); // Close the calendar popover
                      }}
                      onAccept={handleDateAccept}
                      value={parse(search.departureDate, "yyyy-MM-dd", new Date())}
                      minDate={new Date()}
                    />
                  </LocalizationProvider>
                </div>
              </Popover>
            </div>
            <div className='grid grid-cols-1 gap-5'>
              <div
                className="h-14 relative px-2.5  py-[15px] bg-white rounded-[5px] border border-zinc-100 justify-start items-center gap-2.5 inline-flex"
                onClick={handlePassengerClick}
              >
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex">
                  <div className="justify-start items-center gap-2.5 inline-flex">
                    <div className="relative w-5 h-5">
                      <div className="w-[6.67px] h-[6.67px] left-[6.67px] top-[1.67px] absolute rounded-full border border-yellow-400"></div>
                      <div className="w-[11.67px] h-[6.67px] left-[4.17px] top-[10.83px] absolute rounded-full border border-yellow-400"></div>
                    </div>
                    <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="text-xs font-normal text-gray-500 cursor-pointer md:text-sm">
                        {translation?.passenger_and_cabin}
                      </div>
                      <div className="text-xs font-medium text-black cursor-pointer md:text-sm ">
                        {flightSearch?.adults} {translation?.adults}{flightSearch?.child ? `, ${flightSearch?.child} ${translation?.child}` : ""}{flightSearch?.infants ? `, ${flightSearch.infants} ${translation?.infants}` : ""}  {" "}
                        / {flightSearch?.allowedCabins?.map((cabin) => cabin.name)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Popover
                id={idPassengerPopover}
                open={openPassengerPopover}
                anchorEl={anchorElPassenger}
                onClose={handleClosePassenger}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <PassengerAndCabin
                  onClose={handleClosePassenger}
                  cabinList={cabinList}
                />
              </Popover>
            </div >

          </>
        ))}
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <div class=" h-14 px-2.5 py-[15px] bg-white rounded-[5px] border border-zinc-100 justify-start items-center gap-2.5 inline-flex w-full">
              <div class="grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex">
                <div class="justify-start items-center gap-2.5 inline-flex">
                  <div class="w-5 h-5 px-px py-[2.71px] justify-center items-center flex">
                    <Image width={50} height={50} src={"/icons/TicketDiscount.svg"} alt="" />
                  </div>
                  <div>
                    <div class="flex-col justify-start items-start gap-1.5 inline-flex">
                      <div class="text-gray-500 text-xs md:text-sm font-normal ">
                        {translation?.promo_code}
                      </div>


                      <div class="text-black text-xs md:text-sm font-medium ">
                        <input
                          class="text-black text-[8px] md:text-sm font-medium font-inter focus:outline-none"
                          placeholder={translation?.enter_promo_code}
                          onChange={handlePromoCodeChange}
                          value={flightSearch?.promoCode}
                        />
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
            {error.promoCode && (
              <p className="text-xs font-medium text-red-500">
                {error.promoCode}
              </p>
            )}
          </div>
          <div className="flex items-center gap-5 px-2.5 py-[5px]">
            <label className="text-xs font-normal text-gray-500 md:text-sm ">
              {translation?.direct_flight}
            </label>
            <Checkbox
              checked={flightSearch.isDirectFlight}
              onChange={() => dispatch(setFlightSearch({
                ...flightSearch,
                isDirectFlight: !flightSearch.isDirectFlight

              }))}
              style={{ color: "orange" }}
            />{" "}
          </div>
        </div>

        <button className=" h-14 px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center gap-1 inline-flex relative z-[100]" onClick={() => handleSubmit()}>
          <div className="text-sm font-medium text-center text-white capitalize" >{location?.pathname === "/flights/search" ? translation?.modify_search : translation?.search_flights}</div>
        </button>
      </div >
    </>

  )
}

export default OneWay