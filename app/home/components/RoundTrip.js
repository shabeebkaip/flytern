import React, { useState, useEffect, useCallback } from "react";
import FlightInput from "@/app/home/components/FlightInput";
import FlightDateInput from "@/app/home/components/FlightDateInput";
import { format, parse } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { getDestinationAutoSearchApi } from "@/app/home/api";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { debounce } from "@/lib/utils";
import { Checkbox, Popover, } from "@mui/material";
// import { getFlightSearchApi } from "../../flight/apiServices";
import { setFlightRequest } from "@/lib/slices/flightSlice";
import moment from "moment";
import PassengerAndCabin from "./PassengerAndCabin";
import { setFlightSearch } from "@/lib/slices/exploreSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";



const RoundTrip = ({ flightReqBody, lang }) => {
  const { flightSearch } = useAppSelector((state) => state.exploreState);
  const { translation } = useAppSelector((state) => state.sharedState);
  const [destinationList, setDestinationList] = useState([]);
  const [destinationList1, setDestinationList1] = useState([]);
  const [error, setError] = useState({});
  const [errorPromo, setErrorPromo] = useState("");
  const dispatch = useAppDispatch();
  const location = typeof window !== "undefined" ? window.location : null;
  const [anchorElPassenger, setAnchorElPassenger] = useState(null);
  const cabinList = useAppSelector((data) => data?.exploreState?.data?.cabinClass);
  const defaultCabin = cabinList?.filter((data) => data?.isDefault === true);



  const handlePassengerClick = (event) => {
    setAnchorElPassenger(event.currentTarget);
  };


  const handleClosePassenger = () => {
    setAnchorElPassenger(null);
  };
  const openPassengerPopover = Boolean(anchorElPassenger);
  const idPassengerPopover = openPassengerPopover ? 'passenger-popover' : undefined;
  useEffect(() => {
    if (location?.pathname.includes("/search")) {
      if (Object.keys(flightReqBody)?.length) {
        dispatch(setFlightSearch(flightReqBody));
      }
    }
  }, [flightReqBody, location?.pathname]);
  useEffect(() => {
    dispatch(setFlightSearch({
      ...flightSearch,
      allowedCabins: defaultCabin
    }));
  }, []);
  const pagecheck = location?.pathname === "/flights/search"
  const handleFromOpen = (index, id) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch?.searchList.map((search, i) => (index === i ? { ...search, departureAnchorEl: document.getElementById(id), openDeparture: true } : search))
    }))
  };
  const handleToOpen = (index, id) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch?.searchList.map((search, i) => (index === i ? { ...search, returnAnchorEl: document.getElementById(id), openReturn: true } : search))
    }))
  }
  const handleCloseDepartureDatePicker = (index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch?.searchList.map((search, i) => (index === i ? { ...search, departureAnchorEl: null, openDeparture: false } : search))
    }))
  }
  const handleCloseReturnDatePicker = (index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch?.searchList.map((search, i) => (index === i ? { ...search, returnAnchorEl: null, openReturn: false } : search))
    }))
  }



  const onFieldChange = (field, value, index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch?.searchList?.map((search, i) =>
        index === i ? { ...search, [field]: value } : search
      )
    }));
  };


  const onFieldSearchListChange = async (field, value, index) => {
    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: flightSearch?.searchList?.map((search, i) =>
        index === i ? { ...search, [field]: value } : search
      )
    }))
  };
  const handleNameAndCode = (key, destination, index) => {
    if (key === "departure") {
      dispatch(setFlightSearch({
        ...flightSearch,
        searchList: flightSearch?.searchList.map((search, i) =>
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
        searchList: flightSearch?.searchList.map((search, i) =>
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
  const handlePromoCodeChange = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to check if the input contains only alphanumeric characters
    const isValid = /^[a-zA-Z0-9]*$/.test(inputValue);

    if (isValid || inputValue === '') {
      // Update the state only if the input is valid or empty
      setErrorPromo(''); // Clear any previous error message
      dispatch(setFlightSearch({
        ...flightSearch,
        promoCode: inputValue
      }));
    } else {
      setErrorPromo('Please Enter Only alphanumeric characters');
    }
  };
  const onSearchDateFieldChange = (field, value, index) => {
    let returnDate = moment(value).add(1, 'days').format('YYYY-MM-DD');

    const updatedSearchList = flightSearch?.searchList.map((search, i) => {
      if (index === i) {
        if (field === "departureDate") {
          return { ...search, [field]: value, returnDate };
        } else if (field === "returnDate") {
          return { ...search, openReturn: false, openDeparture: false, [field]: value };
        } else {
          return { ...search, [field]: value };
        }
      } else {
        return search;
      }
    });

    dispatch(setFlightSearch({
      ...flightSearch,
      searchList: updatedSearchList
    }));
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
  const handleSubmit = () => {
    let validationError = {
      departureLabel: flightSearch?.searchList[0]?.departureLabel ? "" : 'Please Enter Departure',
      arrivalLabel: flightSearch?.searchList[0]?.arrivalLabel ? "" : 'Please Enter Arrival',
    }
    if (flightSearch?.searchList[0]?.departureLabel === flightSearch?.searchList[0]?.arrivalLabel) {
      validationError = {
        ...validationError,
        arrivalLabel: 'From & To should not be the same'
      }
    }
    if (Object.values(validationError).every(value => value === "")) {
      let payload = flightSearch
      payload = {
        ...payload,
        searchList: flightSearch?.searchList.map((search) => ({ ...search, departureAnchorEl: null, returnAnchorEl: null })),
      }
      if (typeof window !== 'undefined') {
        if (location?.pathname.includes("/search")) {
          localStorage.setItem("searchData", JSON.stringify(payload));
          // dispatch(getFlightSearchApi(payload));
        } else {
          dispatch(setFlightRequest(payload))
          localStorage.setItem("searchData", JSON.stringify(payload));
          if (lang === 'ar') {
            window.location.href = "/ar/flights/search";
          } else {
            window.location.href = "/flights/search";
          }
        }
      }
    } else {
      setError(validationError)
    }
  };
  const handleSwap = () => {
    const newarrival = flightSearch?.searchList.map((search) => ({
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
  const handleSearch = (key, value) => {
    handleSearchValidation(key, value);
  };

  return (
    <div
      className={`grid relative gap-4 duration-300 ease-in-out md:grid-cols-2 ${location?.pathname.includes("/search") ? "mt-2" : "mt-7"
        }`}
    >
      {flightSearch?.searchList && flightSearch?.searchList?.length
        ? flightSearch?.searchList.map((search, index) => (
          <>
            <div className="relative flex flex-col gap-3">
              <FlightInput
                label={translation?.from}
                image={"/icons/airport-plane.svg"}
                onFieldChange={(value) => {
                  setError("");
                  debouncedHandleSearch("departureLabel", value, index);
                  setError({
                    ...error,
                    departureLabel: ""
                  })
                  handleSearch("departureLabel", value, index);
                }}
                value={search.departureLabel}
                id="departure"
              />
              {error && <h4 className="text-xs text-red-500">{error.departureLabel}</h4>}
              {search.departureLabel && destinationList?.length ? (
                <div className="absolute z-20 flex flex-col w-full h-40 gap-3 overflow-y-auto bg-white rounded-md shadow-md top-20 ">
                  {destinationList.map((destination, index) => (
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50"
                      onClick={() => {
                        onFieldSearchListChange(
                          "departure",
                          destination.airportCode,
                          0
                        );
                        handleNameAndCode("departure", destination, 0);

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
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative flex flex-col gap-3">
              <FlightInput
                label={translation?.to}
                defaultValue={"Dubai"}
                image={"/misc/To.svg"}
                ulta
                onFieldChange={(value) => {
                  setError("");
                  debouncedHandleSearch("arrivalLabel", value, index);
                  handleSearch("arrivalLabel", value, index);
                  setError({
                    ...error,
                    arrivalLabel: ""
                  })
                }}
                value={search.arrivalLabel}
                id={"arrival"}
              />
              {error && <h4 className="text-xs text-red-500">{error.arrivalLabel}</h4>}
              {search.arrivalLabel && destinationList1?.length ? (
                <div className="absolute z-20 flex flex-col w-full h-40 gap-3 overflow-y-auto bg-white rounded-md shadow-md top-20 ">
                  {destinationList1?.map((destination, flightIndex) => (
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50"
                      onClick={() => {
                        onFieldChange(
                          "arrivalLabel",
                          destination.airportCode,
                          0
                        );
                        handleNameAndCode("arrival", destination, 0);
                        setDestinationList1([]);
                      }}
                      key={flightIndex}
                    >
                      <div className="flex items-start justify-start gap-2">
                        <FlightLandIcon style={{ color: 'orange' }} />
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
              className={`${pagecheck ? "absolute cursor-pointer 2xl:left-[487px] xl:left-[397px]  lg:left-[307px] lg:top-[15px] md:left-[331px] md:top-[15px] sm:left-[265px] sm:top-[62px] top-[62px] left-[40%] " : "absolute cursor-pointer 2xl:left-[458px] xl:left-[373px]  lg:left-[289px] lg:top-[15px] md:left-[333px] md:top-[15px] sm:left-[275px] sm:top-[62px] top-[62px] left-[46%]"}`}
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
            <div className="grid grid-cols-2 gap-5">
              <div className="relative">
                <div className="">
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
                    openCalendar={() =>
                      handleFromOpen(index, `departureDate${index}`)
                    }
                    id={`departureDate${index}`}
                  />
                </div>
                <Popover
                  open={search.openDeparture}
                  anchorEl={search.departureAnchorEl}
                  onClose={() =>
                    handleCloseDepartureDatePicker(
                      index,
                      `departureDate${index}`
                    )
                  }
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div className="bg-white ">
                    <div className={`grid  grid-cols-1  md:grid-cols-2`}>
                      <div className="flex flex-col items-start justify-start border-r">
                        <h4 className="pl-5 font-semibold">{translation?.departure_date}</h4>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateCalendar
                            onChange={(newValue) => {
                              onSearchDateFieldChange(
                                "departureDate",
                                format(newValue, "yyyy-MM-dd"),
                                index
                              );
                            }}
                            value={parse(
                              search.departureDate,
                              "yyyy-MM-dd",
                              new Date()
                            )}
                            minDate={new Date()}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="hidden md:flex flex-col items-start justify-start ">
                        <h4 className="pl-5 font-semibold">
                          {translation?.return_date}
                        </h4>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateCalendar
                            onChange={(newValue) => {
                              onSearchDateFieldChange(
                                "returnDate",
                                format(newValue, "yyyy-MM-dd"),
                                index
                              );
                            }}
                            value={parse(
                              search.returnDate,
                              "yyyy-MM-dd",
                              new Date()
                            )}
                            minDate={
                              search.departureDate
                                ? parse(
                                  search.departureDate,
                                  "yyyy-MM-dd",
                                  new Date()
                                )
                                : new Date()
                            }
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                </Popover>
              </div>
              <div className="relative">
                <div className="">
                  <FlightDateInput
                    label={
                      translation?.return_date
                    }
                    value={
                      search.returnDate
                        ? format(new Date(search.returnDate), "dd MMM yyyy")
                        : null
                    }
                    openCalendar={() =>
                      handleToOpen(index, `returnDate${index}`)
                    }
                    id={`returnDate${index}`}
                  />
                  <Popover
                    open={search.openReturn}
                    anchorEl={search.returnAnchorEl}
                    onClose={() =>
                      handleCloseReturnDatePicker(index, `returnDate${index}`)
                    }
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <div className="bg-white ">
                      <div
                        className={`grid grid-cols-1 md:grid-cols-2 `}
                      >
                        <div className="hidden md:flex flex-col items-start justify-start border-r">
                          <h4 className="pl-5 mt-2 font-semibold">
                            {translation?.departure_date}
                          </h4>
                          <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                          >
                            <DateCalendar
                              onChange={(newValue) => {
                                onSearchDateFieldChange(
                                  "departureDate",
                                  format(newValue, "yyyy-MM-dd"),
                                  index
                                );
                              }}
                              value={parse(
                                search.departureDate,
                                "yyyy-MM-dd",
                                new Date()
                              )}
                              minDate={new Date()}
                            />
                          </LocalizationProvider>
                        </div>

                        <div className="flex flex-col items-start justify-start ">
                          <h4 className="pl-5 mt-2 font-semibold">
                            {translation?.return_date}
                          </h4>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateCalendar
                              onChange={(newValue) => {
                                onSearchDateFieldChange(
                                  "returnDate",
                                  format(newValue, "yyyy-MM-dd"),
                                  index
                                );
                              }}
                              value={parse(
                                search.returnDate,
                                "yyyy-MM-dd",
                                new Date()
                              )}
                              minDate={
                                search.departureDate
                                  ? parse(
                                    search.departureDate,
                                    "yyyy-MM-dd",
                                    new Date()
                                  )
                                  : new Date()
                              }
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </>
        ))
        : null}
      <div className="grid grid-cols-1 gap-5">
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
                  {flightSearch.adults} Adults{flightSearch.child ? `, ${flightSearch.child} Child` : ""}{flightSearch.infants ? `, ${flightSearch.infants} Infant` : ""}  {" "}
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
      <div className="grid grid-cols-2 gap-5">
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
                        placeholder="Enter Promo Code"
                        onChange={handlePromoCodeChange}
                        value={flightSearch.promoCode}
                      />

                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
          {errorPromo && (
            <p className="text-red-500 text-[8px] md:text-[11px] font-medium">
              {errorPromo}
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
      <div className="grid md:grid-cols-1">
        <button
          className=" h-14 px-6 py-1.5 bg-emerald-800 rounded-md justify-center items-center gap-1 inline-flex"
          onClick={() => handleSubmit()}
        >
          <div className="text-sm font-medium text-center text-white capitalize">
            {location?.pathname === "/flights/search" ? translation?.modify_search : translation?.search_flights}
          </div>
        </button>
      </div>
    </div >
  );
};

export default RoundTrip;

