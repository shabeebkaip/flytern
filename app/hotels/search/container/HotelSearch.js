"use client";
import React, { useEffect, useState } from "react";
import HotelFilter from "@/app/hotels/search/components/HotelFilter";
import HotelCard from "@/app/hotels/search/components/HotelCard";
import SortSection from "@/app/hotels/search/components/SortSection";
import { getLocalStorageInfo } from "@/lib/utils";
import { getFilterHotelsApi, getHotelsApi } from "@/app/hotels/api";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Skeleton } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import AlertMessage from "@/app/shared/components/AleartMessage";
import SelectedFilter from "@/app/hotels/search/components/SelectedFilter";
import { setHotels } from "@/lib/slices/hotelSlice";
import HotelSummary from "@/app/hotels/search/components/HotelSummary";
import HotelBookingCard from "@/app/home/components/HotelBookingCard";
import ModifySearch from "@/app/shared/components/ModifySearch";
import LinearLoader from "@/app/shared/components/LinearLoader";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";

const HotelSearch = (props) => {
  const { hotelsList, objectID, hotels } = props;
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);

  const [sortItem, setSortItem] = useState();
  const { hotelLoader } = useSelector((state) => state.hotelState || {});
  const initialSearchData = {
    pageId: null,
    objectId: null,
    priceMinMaxDc: null,
    locationDcs: null,
    ratingDcs: null,
    sortingDc: null,
  };
  const [searchData, setSearchData] = useState(initialSearchData);
  const [showSearchCard, setShowSearchCard] = useState(false);
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const hotelSearch = getLocalStorageInfo("hotelSearch");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      dispatch(getHotelsApi(hotelSearch)); // Updated function call
    }
  }, []);
  useEffect(() => {
    return () => {
      dispatch(setHotels({}));
    };
  }, []);

  useEffect(() => {
    if (hotelLoader) {
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "default";
    }
  }, [hotelLoader]);

  const handleNext = () => {
    if (hotels?.currentPage < hotels?.totalPages) {
      dispatch(
        getFilterHotelsApi(
          {
            ...searchData,
            pageId: hotels?.currentPage + 1,
            objectId: objectID,
          },
          hotels
        )
      );
    }
  };

  const filterHotels = (_searchData) => {
    dispatch(
      getFilterHotelsApi(
        {
          ..._searchData,
          priceMinMaxDc: _searchData.priceMinMaxDc,
          pageId: 1,
          objectId: objectID,
        },
        hotels
      )
    );
  };
  const { translation } = useSelector((state) => state.sharedState);
  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} container mx-auto px-4`}>
      <div className="grid grid-cols-10 gap-6 mt-12">
        {
          <div
            className={`${hotelLoader
              ? "lg:col-span-3"
              : hotelsList?.length || objectID
                ? "lg:col-span-3"
                : "hidden"
              }  col-span-6  md:mb-8 `}
          >
            <div className="flex flex-col gap-3">
              {hotelLoader ? (
                <Skeleton
                  sx={{ bgcolor: "grey.300" }}
                  variant="rectangular"
                  className="w-full h-full bg-stone-50"
                // height={200}
                />
              ) : (
                <h3 className="text-xl font-bold text-black">
                  {translation?.hotel}
                </h3>
              )}
              {hotelLoader ? (
                <Skeleton
                  sx={{ bgcolor: "grey.300" }}
                  variant="rectangular"
                  className="w-full h-full bg-stone-50"
                // height={200}
                />
              ) : (
                <div className="flex items-center gap-1 text-sm font-normal text-neutral-400">
                  <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/"}}}>
                    <h3 className="cursor-pointer">{translation?.hotel}</h3>
                  </div>
                  <h3>/</h3>
                  <h3 className="font-medium text-black">
                    {translation?.search_results}
                  </h3>
                </div>
              )}
            </div>

            <div>
              <HotelFilter
                setSearchData={setSearchData}
                searchData={searchData}
                filterHotels={filterHotels}
                hotelLoader={hotelLoader}
              />
            </div>
          </div>
        }
        <div
          className={`col-span-10 ${hotelLoader
            ? "lg:col-span-7"
            : hotelsList?.length || objectID
              ? "lg:col-span-7"
              : "lg:col-span-10"
            }`}
        >
          <div className="flex items-center justify-between">
            <HotelSummary />
            {hotelLoader ? null : (
              <ModifySearch
                setShowSearchCard={setShowSearchCard}
                showSearchCard={showSearchCard}
              />
            )}
          </div>
          {showSearchCard && (
            <div className="mt-2">
              <HotelBookingCard />
            </div>
          )}
          <div className="flex items-center justify-between mt-4">
            {hotelLoader ? null : hotelsList?.length ? (
              <h3 className="hidden text-base font-medium text-black md:flex ">
                {translation?.available_hotel}
              </h3>
            ) : null}
            {hotelLoader ? null : hotelsList?.length ? (
              <SortSection
                setSearchData={setSearchData}
                searchData={searchData}
                filterHotels={filterHotels}
                sort={sortItem}
                setSort={setSortItem}
                hotelLoader={hotelLoader}
                hotelsList={hotelsList}
              />
            ) : null}
          </div>
          {hotelLoader ? null : (
            <SelectedFilter searchData={searchData} hotel={hotels} />
          )}
          {hotelLoader ? (
            <LinearLoader text={translation?.hotel_search_loading} />
          ) : null}
          {hotelLoader ? (
            Array(10)
              .fill(1)
              .map((item, index) => (
                <Skeleton
                  sx={{ bgcolor: "grey.300", marginTop: "10px" }}
                  variant="rectangular"
                  className="w-full h-full mt-3 bg-stone-50"
                  height={200}
                  key={index}
                />
              ))
          ) : hotelsList?.length ? (
            <InfiniteScroll
              dataLength={hotelsList.length}
              next={handleNext}
              hasMore={hotels?.totalPages > hotels?.currentPage}
              loader={
                <p className="mt-2 mb-2 text-lg font-semibold text-center text-stone-500">
                  Loading Hotels...
                </p>
              }
              className="flex flex-col gap-10 my-8 max-[500px] overflow-hidden scroll-m-0 "
            >
              {hotelsList?.map((hotel, index) => (
                <HotelCard hotel={hotel} key={index} objectID={objectID} />
              ))}
            </InfiniteScroll>
          ) : (
            <div className="flex items-center justify-center w-full h-96">
              {hotels?.alertMsg ? (
                <AlertMessage message={hotels.alertMsg} />
              ) : (
                <AlertMessage message={"Uh-oh! No Hotels Found"} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    hotelsList: state?.hotelState?.hotels?._lst,
    objectID: state?.hotelState?.hotels?.objectID,
    hotels: state?.hotelState?.hotels,
  };
}

export default connect(mapStateToProps)(HotelSearch);
