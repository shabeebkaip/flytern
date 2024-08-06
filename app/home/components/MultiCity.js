import React, { useCallback, useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import { Checkbox, } from "@mui/material";
import { debounce } from "@/lib/utils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { format, parse } from "date-fns";
import PassengerAndCabin from "./PassengerAndCabin";
import { setFlightSearch } from "@/lib/slices/exploreSlice";
import FlightInput from "./FlightInput";
import FlightDateInput from "./FlightDateInput";
import { getDestinationAutoSearchApi } from "../api";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";



const MultiCity = ({ flightReqBody }) => {
  const dispatch = useAppDispatch();
  const { flightSearch } = useAppSelector(state => state.exploreState);
  const { translation } = useAppSelector(state => state.sharedState);
  // const navigate = useNavigate();
  // const location = useLocation();
  const divRef = useRef(null);
  const divRefTwo = useRef(null)
  const [error, setError] = useState([]);
  const [promoError, setPromoError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  const [destinationList, setDestinationList] = useState([]);
  const [destinationList1, setDestinationList1] = useState([]);
  const [handletravellerOpen, setHandletravellerOpen] = useState(false);
  const [directFlights, setDirectFlight] = useState(false);
  const [dateindex, setdateindex] = useState([0])
  const isLastIndex = flightSearch?.searchList.length - 1;
  const lastElement = flightSearch?.searchList[isLastIndex]
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [anchorElPassenger, setAnchorElPassenger] = useState(null);
  const cabinList = useAppSelector((data) => data?.exploreState?.data?.cabinClass);
  const defaultCabin = cabinList?.filter((data) => data.isDefault === true);
  const handlePassengerClick = (event) => {
    setAnchorElPassenger(event.currentTarget);
  };


  const handleClosePassenger = () => {
    setAnchorElPassenger(null);
  };
  const openPassengerPopover = Boolean(anchorElPassenger);
  const idPassengerPopover = openPassengerPopover ? 'passenger-popover' : undefined;
  const handleAddCity = () => {
    const lastCity = flightSearch.searchList[flightSearch.searchList.length - 1];
    const newDepartureDate = new Date(lastCity.departureDate);
    newDepartureDate.setDate(newDepartureDate.getDate() + 1);

    // Ensure that the new city's departure date is after or equal to the departure date of the first city
    const minDepartureDate = new Date(flightSearch.searchList[0].departureDate);
    if (newDepartureDate < minDepartureDate) {
      newDepartureDate.setDate(minDepartureDate.getDate());
    }

    const formattedDepartureDate = format(newDepartureDate, "yyyy-MM-dd");
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: [
        ...flightSearch.searchList,
        {
          departure: lastCity.arrival,
          arrival: "",
          arrivalLabel: "",
          departureLabel: lastCity.arrivalLabel,
          departureDate: formattedDepartureDate,
          returnDate: null,
          fromOpen: false,
          toOpen: false,
          id: flightSearch.searchList.length,
        },
      ],
    }));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Clicked outside the div, close it
        setHandletravellerOpen(false);
      }
      if (divRefTwo.current && !divRefTwo.current.contains(event.target)) {
        // Clicked outside the div, close it
      }
    };
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef, divRefTwo]);

  useEffect(() => {
    if (location?.pathname.includes('/search')) {
      if (Object.keys(flightReqBody).length) {
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
  const handlePromoCodeChange = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to check if the input contains only alphanumeric characters
    const isValid = /^[a-zA-Z0-9]*$/.test(inputValue);

    if (isValid || inputValue === '') {
      // Update the state only if the input is valid or empty
      dispatch(setFlightSearch({
        ...flightSearch,
        promoCode: inputValue
      }));
      setPromoError(''); // Clear any previous error message
    } else {
      setPromoError('Please Enter Only alphanumeric characters');
    }
  };
  const pagecheck = location?.pathname === "/flights/search"
  const onFieldChange = (field, value, index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch.searchList.map((search, i) =>
        index === i ? { ...search, [field]: value } : search
      )
    }))
  };
  const onFieldSearchListChange = (field, value, index, openDestination) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch.searchList.map((search, i) =>
        index === i
          ? { ...search, [field]: value, [openDestination]: true }
          : { ...search, [openDestination]: false }
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
    }, 300),
    [] // Dependencies array
  );
  const handleNameAndCode = (key, destination, index) => {
    if (key === "departure") {
      dispatch(setFlightSearch({
        ...flightSearch,
        searchList: flightSearch.searchList.map((search, i) =>
          index === i
            ? {
              ...search,
              departure: destination.airportCode,
              departureLabel: destination.uniqueCombination,
            }
            : search
        )
      }))
    } else if (key === "arrival") {
      dispatch(setFlightSearch({
        ...flightSearch,
        searchList: flightSearch.searchList.map((search, i) =>
          index === i
            ? {
              ...search,
              arrival: destination.airportCode,
              arrivalLabel: destination.uniqueCombination,
            }
            : search
        )
      }))
    }
  };
  const onSearchDateFieldChange = (field, value, index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch.searchList.map((search, i) =>
        dateindex === i ? { ...search, [field]: value } : search
      )
    }))
    handleClose();
  };

  const handleClick = (event, index) => {
    setdateindex(index);

    let minDate = null;
    let maxDate = null;

    if (index === 0) {
      // For the first city, set min date to today
      minDate = new Date();
      maxDate = new Date(flightSearch.searchList[index + 1]?.departureDate);

    } else {
      minDate = new Date(flightSearch.searchList[index - 1]?.departureDate);
      maxDate = new Date(flightSearch.searchList[index + 1]?.departureDate);
    }
    if (index === flightSearch.searchList.length - 1) {
      // If the last city is selected, set max date to null
      maxDate = null;
    }


    const anchorEl = event.currentTarget;
    setAnchorEl({
      anchorEl,
      minDate,
      maxDate,
    });
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = () => {
    let validationError = flightSearch?.searchList?.map(search => ({
      departureLabel: search.departureLabel ? '' : 'Please Enter Departure',
      arrivalLabel: search.arrivalLabel ? '' : 'Please Enter Arrival',
    }))
    checkValidationErrors(validationError, setError);
    if (error.length) return;
    let payload = flightSearch;
    payload = {
      ...payload,
      searchList: payload?.searchList.map((search) => ({ ...search, departureAnchorEl: null, returnAnchorEl: null })),
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem("searchData", JSON.stringify(payload));
      window.location.href = "/flights/search";
    }
  };

  const checkValidationErrors = (validationData, setData) => {
    const errorsExist = validationData.map(item => Object.values(item)).flat().filter(item => item !== '').length;
    setData(errorsExist ? validationData : []);
  };
  const handleSwap = (index) => {
    const newarrival = flightSearch.searchList.map((search, i) => (
      index === i ? {
        ...search,
        departure: search.arrival,
        departureLabel: search.arrivalLabel,
        arrival: search.departure,
        arrivalLabel: search.departureLabel
      } : search))
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: newarrival
    }))
  }
  const handleRemove = () => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch.searchList.slice(0, -1)
    }))
  };

  const handleSearchValidation = (key, value, index, open) => {
    onFieldSearchListChange(key, value, index, open);
    if (key === 'departureLabel') {
      debouncedHandleSearch("departureLabel", value, 0);
    } else if (key === 'arrivalLabel') {
      debouncedHandleSearch("arrivalLabel", value, 0);
    }
  };
  const handleSearch = (key, value, index, open) => {
    handleSearchValidation(key, value, index, open);
  };
  return (
    <div className="gap-5 duration-300 ease-in-out flexflex-col mt-7">
      {flightSearch?.searchList &&
        flightSearch?.searchList.map((search, index) => (
          <div className="relative grid gap-6 mb-8 md:grid-cols-2" key={index}>
            <div className="relative flex flex-col gap-3">
              <FlightInput
                label={translation?.from}
                value={search.departureLabel}
                onFieldChange={(value) => {
                  handleSearch("departureLabel", value, index, "fromOpen");
                  debouncedHandleSearch("departureLabel", value, index);
                }}
                image={"/icons/airport-plane.svg"}
              />
              {destinationList.length && search.fromOpen ? (
                <div className="absolute z-20 flex flex-col w-full h-40 gap-3 overflow-y-auto bg-white rounded-md shadow-md top-20 ">
                  {destinationList.map((destination, filterIndex) => (
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50"
                      onClick={() => {
                        onFieldSearchListChange(
                          "departure",
                          destination.airportCode,
                          index,
                          "fromOpen"
                        );
                        handleNameAndCode("departure", destination, index);

                        setDestinationList([]);
                      }}
                      key={filterIndex}
                    >
                      <div className="flex items-start justify-start gap-2">
                        <FlightTakeoffIcon style={{ color: "orange" }} />
                        <div className="flex flex-col gap-1">
                          <p>{destination.uniqueCombination}</p>
                        </div>
                      </div>
                      <p className="text-font-gray">
                        {destination.airportCode}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div
              className={`${pagecheck ? "absolute cursor-pointer 2xl:left-[502px] xl:left-[411px]  lg:left-[322px] lg:top-[15px] md:left-[347px] md:top-[15px] sm:left-[265px] sm:top-[62px] top-[62px] left-[40%] " : "absolute cursor-pointer 2xl:left-[458px] xl:left-[373px]  lg:left-[289px] lg:top-[15px] md:left-[333px] md:top-[15px] sm:left-[275px] sm:top-[62px] top-[62px] left-[46%]"}`}
              onClick={() => handleSwap(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="relative z-50"
              >
                <circle cx="20" cy="20" r="20" fill="#066651" />
              </svg>
              <Image width={20} height={20} className="absolute  top-[9px] left-[9px] z-50" src={"/icons/Layer_1.svg"} alt="" />
            </div>
            <div className="relative flex flex-col gap-3">
              <FlightInput
                label={selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.to : "To"}
                onFieldChange={(value) => {
                  handleSearch("arrivalLabel", value, index, "toOpen");
                  debouncedHandleSearch("arrivalLabel", value, index);
                }}
                value={search.arrivalLabel}
                id={"arrival"}
                image={"/misc/To.svg"}
                ulta
              />
              {destinationList1.length && search.toOpen ? (
                <div className="absolute z-20 flex flex-col w-full h-40 gap-3 overflow-y-auto bg-white rounded-md shadow-md top-20 ">
                  {destinationList1.map((destination, filterindex) => (
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50"
                      onClick={() => {
                        onFieldChange(
                          "arrivalLabel",
                          destination.airportCode,
                          index,
                          "toOpen"
                        );
                        handleNameAndCode("arrival", destination, index);
                        setDestinationList1([]);
                      }}
                      key={filterindex}
                    >
                      <div className="flex items-start justify-start gap-2">
                        <FlightLandIcon style={{ color: "orange" }} />
                        <div className="flex flex-col gap-1">
                          <p>{destination.uniqueCombination}</p>
                        </div>
                      </div>
                      <p className="text-font-gray">
                        {destination.airportCode}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div>
              <FlightDateInput
                label={
                  selectedLanguageAndCountry?.language?.code === "ar"
                    ? arabic_translation.travel_date
                    : "Travel Date"
                }
                value={
                  search.departureDate
                    ? format(new Date(search.departureDate), "dd MMM yyyy")
                    : null
                }
                openCalendar={(e) => handleClick(e, index)}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl ? anchorEl.anchorEl : null}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                {anchorEl && (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateCalendar
                      onChange={(newValue) => {
                        onSearchDateFieldChange(
                          "departureDate",
                          format(newValue, "yyyy-MM-dd"),
                          index
                        );
                      }}
                      value={parse(search.departureDate, "yyyy-MM-dd", new Date())}
                      minDate={anchorEl.minDate}
                      maxDate={anchorEl.maxDate} />
                  </LocalizationProvider>
                )}
              </Popover>
            </div>
            {isLastIndex === index && (
              <div
                className="flex items-center justify-start gap-5 cursor-pointer"

              >
                {
                  flightSearch?.searchList.length < 5 &&
                  <div className="flex items-center gap-2 flex-start" onClick={() => lastElement.departure && lastElement.arrival && lastElement.departureDate ? handleAddCity() : null}>
                    <Image src="/misc/plus.svg" alt="" width={50} height={50} />
                    <p class={`text-center ${lastElement.departure && lastElement.arrival && lastElement.departureDate ? 'text-orange-400' : 'text-font-gray'} text-xs md:text-sm font-medium  capitalize`}>
                      {selectedLanguageAndCountry?.language?.code === "ar"
                        ? arabic_translation.add_another_city
                        : "Add another City"}
                    </p>
                  </div>
                }

                {
                  flightSearch?.searchList.length > 1 && (
                    <div onClick={() => handleRemove()}>
                      <p class={`text-center text-red-500 text-[8px] md:text-sm font-medium  capitalize`}>
                        Remove City
                      </p>
                    </div>)
                }


              </div>
            )}
          </div>
        ))}
      <div className="relative grid grid-cols-2 gap-5 md:grid-cols-2">
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
                <div className="text-gray-500 text-[10px] md:text-sm font-normal cursor-pointer">
                  {selectedLanguageAndCountry?.language?.code === "ar"
                    ? arabic_translation.passangers
                    : "Passengers And Cabin"}
                </div>
                <div className="text-black text-[10px] md:text-sm font-medium cursor-pointer ">
                  {flightSearch?.adults} Adults{flightSearch?.child ? `, ${flightSearch?.child} Child` : ""}{flightSearch?.infants ? `, ${flightSearch?.infants} Infant` : ""}  {" "}
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
            open={handletravellerOpen}
            onClose={handleClosePassenger}
            cabinList={cabinList}
          />
        </Popover>

        <div>
          <div class=" h-14 px-2.5 py-[15px] bg-white rounded-[5px] border border-zinc-100 justify-start items-center gap-2.5 inline-flex w-full">
            <div class="grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex">
              <div class="justify-start items-center gap-2.5 inline-flex">
                <div class="w-5 h-5 px-px py-[2.71px] justify-center items-center flex">
                  <Image src="/icons/TicketDiscount.svg" alt="" height={100} width={100} />
                </div>
                <div>
                  <div class="flex-col justify-start items-start gap-1.5 inline-flex">
                    <div class="text-gray-500 text-xs md:text-sm font-normal ">
                      {selectedLanguageAndCountry?.language?.code === "ar"
                        ? arabic_translation.promo_code
                        : "Promo Code"}
                    </div>


                    <div class="text-black text-xs md:text-sm font-medium ">
                      <input
                        class="text-black text-[8px] md:text-sm font-medium font-inter focus:outline-none"
                        placeholder="Enter Promo Code"
                        onChange={handlePromoCodeChange}
                      />

                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
          {promoError && (
            <p className="text-red-500 text-[8px] md:text-sm font-medium">
              {promoError}
            </p>
          )}
        </div>

      </div>
      <div className="grid grid-cols-2 gap-5 mt-[1.5rem]">
        <div className="flex items-center justify-start gap-3">
          <Checkbox
            className="flex justify-end p-0"
            style={{ color: "orange", padding: 0 }}
            defaultChecked={false}
            onClick={() => setDirectFlight(!directFlights)}
          />
          <label class="text-center text-zinc-900 text-xs md:text-sm font-normal ">
            {selectedLanguageAndCountry?.language?.code === "ar"
              ? arabic_translation.direct_flight
              : "Direct Flight"}
          </label>
        </div>
        <button
          className=" h-14 px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center gap-1 inline-flex"
          onClick={() => handleSubmit()}
        >
          <span className="text-sm font-medium text-center text-white capitalize ">
            {selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.search_flights : location?.pathname === "/flights/search" ? 'Modify Search' : 'Search Flights'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MultiCity;
