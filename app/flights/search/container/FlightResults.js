"use client"
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getFlightSearchApi, getFlightFilterApi } from "@/app/flights/api";
import { getGlobalCookie, getLocalStorageInfo } from "@/lib/utils";
import { Skeleton } from "@mui/material";
import { flightResultSuccess } from "@/lib/slices/flightSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Filter from "@/app/flights/search/components/Filter";
import StoreProvider from "@/app/StoreProvider";
import OneWay from "@/app/home/components/OneWay";
import RoundTrip from "@/app/home/components/RoundTrip";
import MultiCity from "@/app/home/components/MultiCity";
import FlightSummary from "@/app/flights/search/components/FlightSummary";
import ModifySearch from "@/app/shared/components/ModifySearch";
import SelectedFilter from "@/app/flights/search/components/SelectedFilter";
import SortSection from "@/app/flights/search/components/SortSection";
import LinearLoader from "@/app/shared/components/LinearLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import FlightCard from "@/app/flights/search/components/FlightCard";
import FlightCardMobile from "@/app/flights/search/components/FlightCardMobile";
import AlertMessage from "@/app/shared/components/AlertMessage";
import CalenderTab from "../components/CalenderTab";
const FlightResultsChild = (props) => {
  const isTabletAndMobile = useMediaQuery({ maxWidth: "1024px" });
  const dispatch = useAppDispatch();
  const { lang } = props;
  const { flightResults, flightLoader } = useAppSelector(state => state.flightState);
  const { searchResponses } = flightResults;

  const objectId = useAppSelector(state => state.flightState?.flightResults?.objectID);

  const translation = useAppSelector(state => state.sharedState?.translation);
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [sortItem, setSortItem] = useState();
  const [page, setPage] = useState(null)
  const request = getLocalStorageInfo("searchData");
  const initialSearchData = {
    pageId: null,
    objectId: null,
    priceMinMaxDc: null,
    arrivalTimeDc: null,
    departureTimeDc: null,
    airlineDc: null,
    stopDc: request?.isDirectFlight ? 1 : null,
    sortingDc: null,
  };
  const [searchData, setSearchData] = useState(initialSearchData);



  useEffect(() => {
    if (!page) {
      setPage(flightResults?.currentPage)
    }

  }, [flightResults, page])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    dispatch(getFlightSearchApi(request));
  }, []);

  useEffect(() => {
    if (flightLoader) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [flightLoader]);
  useEffect(() => {
    dispatch(flightResultSuccess({}))
  }, [])
  const filterFlights = (_searchData) => {

    objectId && dispatch(
      getFlightFilterApi(
        {
          ..._searchData,
          priceMinMaxDc: _searchData.priceMinMaxDc,
          pageId: 1,
          objectId: objectId,
        },
        flightResults
      )
    );
  };


  const handleNext = (_searchData) => {
    var pa = flightResults?.currentPage + 1

    setPage(pa)
    let objectId =
      searchResponses && searchResponses.length
        ? searchResponses?.[0]?.objectId : null

    if (flightResults?.currentPage < flightResults?.totalPages) {
      dispatch(
        getFlightFilterApi(
          {
            ..._searchData,
            priceMinMaxDc: "",
            pageId: pa,
            objectId: objectId,
          },
          flightResults
        ))
    }

  }
  const [selectedDate, setSelectedDate] = useState(null);
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);


  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} container mx-auto px-4`}>
      <div className="grid grid-cols-10 gap-6 ">
        <div className="hidden col-span-3 mb-12 lg:block ">
          <Filter
            setSearchData={setSearchData}
            searchData={searchData}
            filterFlights={filterFlights}
            flightResults={flightResults}
            flightLoader={flightLoader}
          />
        </div>
        <div className="flex flex-col col-span-10 gap-5 mt-12 mb-4 lg:col-span-7">
          <div className="flex items-center justify-between">
            <FlightSummary
              request={request}
              flightLoader={flightLoader}
              flightResults={flightResults}
            />
            {/* {
              searchResponses?.length ? */}
            <ModifySearch setShowSearchCard={setShowSearchCard} showSearchCard={showSearchCard} />
            {/* : null
            } */}

          </div>
          {
            showSearchCard ?
              <div className="">
                {request?.mode === "ONEWAY" ? (
                  <div className="flex flex-col">
                    <div className="p-4 bg-white border-b-4">
                      <OneWay flightReqBody={request} selectedDate={selectedDate} lang={lang} />
                    </div>
                    <CalenderTab onDateSelect={handleDateSelect} flightReqBody={request} />
                  </div>

                ) : request?.mode === "ROUNDTRIP" ? (
                  <div className="p-4 bg-white ">
                    <RoundTrip flightReqBody={request} lang={lang} />
                  </div>
                ) : (
                  <div className="p-4 bg-white ">
                    <MultiCity flightReqBody={request} lang={lang} />
                  </div>
                )}
              </div> : null
          }
          {
            (searchData?.stopDc || searchData?.airlineDc || searchData?.departureTimeDc || searchData?.arrivalTimeDc || searchData?.priceMinMaxDc) &&
            <SelectedFilter searchData={searchData} />
          }
          {
            flightLoader ? (
              null
            ) :
              <div className='flex items-center justify-between mt-4'>
                {
                  searchResponses?.length ?
                    <h3 className='sm:text-base text-[13px] font-medium text-black '>{translation?.available_flights}</h3> : null
                }
                {
                  searchResponses?.length ?
                    <SortSection
                      setShowSearchCard={setShowSearchCard}
                      sort={sortItem}
                      searchData={searchData}
                      showSearchCard={showSearchCard}
                      setSort={setSortItem}
                      setSearchData={setSearchData}
                      filterFlights={(data) => filterFlights(data)}
                      request={request}
                      flightResults={flightResults}
                    />
                    : null
                }
              </div>
          }
          {
            flightLoader ?
              <LinearLoader
                text={translation?.flight_search_loading}
              /> : null
          }
          {flightLoader ?
            Array(10).fill(1).map((item, index) => (
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                className="w-full h-full "
                height={200}
                key={index}
              />
            ))
            :
            searchResponses &&
              searchResponses.length ?
              <InfiniteScroll
                dataLength={searchResponses && searchResponses?.length}
                next={handleNext}
                hasMore={flightResults?.totalPages > flightResults?.currentPage ? true : false}
                loader={<p className="mt-2 mb-2 text-lg font-semibold text-center text-stone-500">Loading Flights....</p>}
                className="flex flex-col gap-10 mb-12"
              >
                {searchResponses.map((flight, index) => {
                  return isTabletAndMobile ? (
                    <FlightCardMobile flight={flight} key={index} flightIndex={index} searchResponses={searchResponses} lang={lang} />
                  ) : (
                    <FlightCard flight={flight} key={index} flightIndex={index} searchResponses={searchResponses} lang={lang} />
                  );
                })}
              </InfiniteScroll> :
              <div className="flex items-center justify-center w-full h-96">
                {/* {
                  flightLoader ?
                  flightResults.alertMsg ?
                    <AlertMessage message={flightResults.alertMsg} /> :
                    <h1 className="text-2xl font-semibold text-center text-stone-500">Uh-oh! No Flights Found</h1>
                    :null
                } */}
                {flightLoader?.alertMsg ? (
                  <AlertMessage message={flightResults.alertMsg} />
                ) : (
                  <AlertMessage message={"Uh-oh! No Flights Found"} />
                )}

              </div>
          }


        </div>
      </div>
    </div>
  );
};

const FlightResults = (props) => {
  return (
    <StoreProvider>
      <FlightResultsChild {...props} />
    </StoreProvider>

  )
};

export default FlightResults;
