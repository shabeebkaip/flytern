import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { Box, Checkbox, Skeleton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from "react-redux";
import Link from "next/link";

function valuetext(value) {
  return `${value}°C`;
}

const Filter = (props) => {
  const { setSearchData, searchData, filterFlights, flightResults, flightLoader } = props;
  const [priceOpen, setPriceOpen] = useState(true);
  const [airlineOpen, setAirlineOpen] = useState(true);
  const [departureTimeOpen, setDepartureTimeOpen] = useState(true);
  const [arrivalTimeOpen, setArrivalTimeOpen] = useState(true);
  const [stopsOpen, setStopsOpen] = useState(true);
  const [value, setValue] = useState([0, 400])

  const { translation } = useSelector((state) => state.sharedState)
  const togglePriceAccordion = () => {
    setPriceOpen(!priceOpen);
  };

  const toggleAirlineAccordion = () => {
    setAirlineOpen(!airlineOpen);
  };

  const toggleDepartureTimeAccordion = () => {
    setDepartureTimeOpen(!departureTimeOpen);
  };

  const toggleArrivalTimeAccordion = () => {
    setArrivalTimeOpen(!arrivalTimeOpen);
  };

  const toggleStopsAccordion = () => {
    setStopsOpen(!stopsOpen);
  };


  const handleChange = (event, newValue) => {
    let _searchData = { ...searchData };
    setValue(newValue)
    _searchData.priceMinMaxDc = newValue.join();
    setSearchData(_searchData);

    filterFlights(_searchData, "njjj");
  };


  const onChange = (event) => {
    let _searchData = { ...searchData };
    if (searchData[event.target.name] === event.target.value) {
      _searchData[event.target.name] = null;
    } else {
      _searchData[event.target.name] = event.target.value;
    }
    setSearchData(_searchData);
    filterFlights(_searchData);
  };
  const handleClear = () => {
    setValue([0, 400])
    const clearedData = {
      airlineDc: null,
      arrivalTimeDc: null,
      departureTimeDc: null,
      objectId: null,
      pageId: null,
      priceMinMaxDc: null,
      sortingDc: null,
      stopDc: null,
    }

    setSearchData(clearedData);
    filterFlights(clearedData);
  }
  let objectValueArr = Object.values(searchData).map((item) => item !== null)
  let check = objectValueArr.includes(true)
  return (
    <div className="hidden lg:block">
      <div className="mt-12">
        <div>
          {
            flightLoader ?
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                className="w-3/4 h-full "

              /> : <h4 className="text-2xl font-bold text-black ">
                {translation?.search_results}
              </h4>
          }
          {
            flightLoader ?
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                className="w-2/4 h-full mt-2 "

              /> : <div className="flex gap-1 cursor-pointer">
                <Link className="text-xs font-normal cursor-pointer xl:text-sm text-font-gray" href="/">
                  {translation?.home}
                </Link>
                <h6 className="text-xs font-normal xl:text-sm text-font-gray">
                  /
                </h6>
                <h6 className="text-xs font-medium text-black xl:text-sm ">
                  {translation?.search_results}
                </h6>
              </div>
          }

          <div className="grid gap-4 mt-8">
            {flightLoader ?
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                className="w-full h-full "

              /> :
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

              </div>
            }

            {
              flightLoader ?
                <Skeleton
                  sx={{ bgcolor: 'grey.300' }}
                  variant="rectangular"
                  className="w-full h-full"
                  height={"100vh"}
                /> :
                <div className="container flex flex-col items-center gap-10 px-4 py-5 mx-auto overflow-hidden bg-white rounded-lg">
                  <div className="container w-full px-2 mx-auto group">
                    <button
                      onClick={toggleStopsAccordion}
                      className="flex items-center justify-between w-full bg-white"
                    >
                      <span className="text-xs font-medium text-black xl:text-sm ">
                        {translation?.stops}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transform ${stopsOpen ? "rotate-0" : "-rotate-180"
                          } transition-transform duration-300`}
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
                    {stopsOpen && (
                      <div className="flex justify-center w-full bg-white">
                        <div className="w-full p-0">
                          {flightResults?.stopDcs?.map((stop, index) => {
                            return (
                              <div className="flex items-center justify-between w-full h-16 gap-5 p-0 text-xs font-normal border-b xl:text-sm" key={index}>
                                {stop.name} ({stop.number})
                                <Checkbox
                                  className="flex justify-end p-0"
                                  style={{ color: "orange", padding: 0 }}
                                  defaultChecked={false}
                                  checked={stop.value == searchData.stopDc}
                                  name="stopDc"
                                  onChange={onChange}
                                  value={stop.value}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="container w-full px-2 mx-auto group">
                    <button
                      onClick={toggleAirlineAccordion}
                      className="flex items-center justify-between w-full bg-white"
                    >
                      <span className="text-xs font-medium text-black xl:text-sm ">
                        {translation?.airline}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transform ${airlineOpen ? "rotate-0" : "-rotate-180"
                          } transition-transform duration-300`}
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
                    {airlineOpen && (
                      <div className="flex justify-center bg-white">
                        <div className="w-full p-0">
                          {flightResults?.airlineDcs?.map((airline, index) => {
                            return (
                              <div className="flex items-center justify-between w-full h-16 gap-5 p-0 text-xs font-normal border-b xl:text-sm" key={index}>
                                {airline.name} ({airline.value})
                                <Checkbox
                                  className="flex justify-end p-0"
                                  style={{ color: "orange", padding: 0 }}
                                  defaultChecked={false}
                                  checked={airline.value == searchData.airlineDc}
                                  name="airlineDc"
                                  onChange={onChange}
                                  value={airline.value}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="container w-full px-2 mx-auto group">
                    <button
                      onClick={toggleDepartureTimeAccordion}
                      className="flex items-center justify-between w-full bg-white"
                    >
                      <span className="text-xs font-medium text-black xl:text-sm ">
                        {translation?.departure_time}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transform ${departureTimeOpen ? "rotate-0" : "-rotate-180"
                          } transition-transform duration-300`}
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
                    {departureTimeOpen && (
                      <div className="flex justify-center w-full bg-white">
                        <div className="w-full p-0">
                          {flightResults?.departureTimeDcs?.map((departureTime, index) => {
                            return (
                              <div className="flex items-center justify-between w-full h-16 gap-5 p-0 text-xs font-normal border-b xl:text-sm" key={index}>
                                {departureTime.name}
                                <Checkbox
                                  className="flex justify-end p-0"
                                  style={{ color: "orange", padding: 0 }}
                                  defaultChecked={false}
                                  checked={
                                    departureTime.value ==
                                    searchData.departureTimeDc
                                  }
                                  name="departureTimeDc"
                                  onChange={onChange}
                                  value={departureTime.value}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="container w-full px-2 mx-auto group">
                    <button
                      onClick={toggleArrivalTimeAccordion}
                      className="flex items-center justify-between w-full bg-white"
                    >
                      <span className="text-xs font-medium text-black xl:text-sm ">
                        {translation?.arrival_time}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transform ${arrivalTimeOpen ? "rotate-0" : "-rotate-180"
                          } transition-transform duration-300`}
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
                    {arrivalTimeOpen && (
                      <div className="flex justify-center w-full bg-white">
                        <div className="w-full p-0">
                          {flightResults?.arrivalTimeDcs?.map((arrivalTime, index) => {
                            return (
                              <div className="flex items-center justify-between w-full h-16 gap-5 p-0 text-xs font-normal border-b xl:text-sm" key={index}>
                                {arrivalTime.name}
                                <Checkbox
                                  className="flex justify-end p-0"
                                  style={{ color: "orange", padding: 0 }}
                                  defaultChecked={false}
                                  checked={
                                    arrivalTime.value == searchData.arrivalTimeDc
                                  }
                                  name="arrivalTimeDc"
                                  onChange={onChange}
                                  value={arrivalTime.value}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="container flex flex-col w-full gap-3 px-2 mx-auto group">
                    <button
                      onClick={togglePriceAccordion}
                      className="flex items-center justify-between w-full bg-white"
                    >
                      <span className="text-xs font-medium text-black xl:text-sm ">
                        {translation?.price}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transform ${priceOpen ? "rotate-0" : "-rotate-180"
                          } transition-transform duration-300`}
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
                      <div className="flex flex-col items-center bg-white ">
                        <div className="flex justify-between w-full">
                          <span className="text-xs font-normal xl:text-sm text-font-gray">
                            KWD{" "}
                            {flightResults?.priceDcs?.length > 0 &&
                              flightResults?.priceDcs[0].min}
                          </span>
                          {/* <span className="pl-2 text-xs font-normal xl:text-sm text-font-gray">
                        {" "}
                        -
                      </span> */}
                          <span className="pl-2 text-xs font-normal xl:text-sm text-font-gray">
                            {" "}
                            KWD{" "}
                            {flightResults?.priceDcs?.length > 0 &&
                              flightResults?.priceDcs[0].max}
                          </span>
                        </div>
                        <div className="w-full custom-slider">
                          <Box className="w-full">

                            <Slider
                              getAriaLabel={() => "Temperature range"}
                              value={value}
                              onChange={handleChange}
                              valueLabelDisplay="auto"
                              getAriaValueText={valuetext}
                              min={
                                flightResults?.priceDcs?.length > 0 &&
                                flightResults?.priceDcs[0].min
                              }
                              max={
                                flightResults?.priceDcs?.length > 0 &&
                                flightResults?.priceDcs[0].max
                              }
                            />
                          </Box>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
