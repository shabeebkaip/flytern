import React, { useEffect, useState } from "react";
import { EditIconSvg } from "@/app/shared/components/SVG";
import { Popover, PopoverContent, PopoverHandler, } from "@material-tailwind/react";
import { Radio } from "@mui/material";
import { connect, useSelector } from "react-redux";
import MobileFilter from "@/app/flights/search/components/MobileFilter";
import Image from "next/image";

const SortSection = (props) => {
  const { setShowSearchCard, sortingDcs, setSearchData, filterFlights, searchData, showSearchCard, flightResults } = props;
  const [sort, setSort] = useState('');
  const handleRadioChange = (event) => {
    setSort(event.target.value);
    setSearchData({ ...setSearchData, sortingDc: event.target.value });
    filterFlights({ ...searchData, sortingDc: event.target.value })
  };
  const [open, setOpen] = useState(false)
  const [mobileSort, setMobileSort] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }


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

  useEffect(() => {
    // Filter flights when searchData changes
    // filterFlights(searchData);
  }, []);

  const matchingsortingDc = sortingDcs?.find((sortingDc) => sortingDc?.value === sort);
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <div className="flex flex-col justify-between gap-10 lg:justify-end md:flex-row md:items-center 2xl:gap-0">

      <div>
        <div className="flex flex-col justify-between gap-2 mt-4 lg:hidden md:justify-start md:mt-0">
          <div className="flex justify-center gap-1">
            <div
              className="flex items-center justify-center w-8 h-8 bg-white rounded-md cursor-pointer sm:h-10 sm:w-10"
              onClick={() => setShowSearchCard(!showSearchCard)}
            >
              <EditIconSvg color="black" />
            </div>
            <div className="lg:hidden">
              <MobileFilter
                setSearchData={setSearchData}
                searchData={searchData}
                filterFlights={filterFlights}
                flightResults={flightResults}
              />
            </div>
          </div>
          <div className="">
            <Popover placement="bottom-end" open={mobileSort} handler={setMobileSort}>
              <PopoverHandler>
                <div className="flex items-center justify-between h-10 px-3 bg-white rounded-md sm:h-10">
                  <div className="flex items-center gap-2">
                    <Image
                      width={24}
                      height={24}
                      className="w-4 h-4 sm:h-6 sm:w-6"
                      src={"/icons/sort.png"}
                      alt=""
                    />
                    <h3 className="sm:text-xs text-[11px]">{translation?.sort_by}{matchingsortingDc?.name}</h3>
                  </div>
                  <div>
                    <Image
                      width={24}
                      height={24}
                      className="w-6 h-6"
                      src={"/icons/dropdown.png"}
                      alt=""
                    />
                  </div>
                </div>
              </PopoverHandler>
              <PopoverContent className="flex flex-col w-72">
                <div className="flex items-center h-12 gap-4 mb-4 border-blue-gray-50">
                  <h3 className="text-base font-medium text-black">{translation?.sort_by}</h3>
                </div>
                <div className="flex justify-center w-full bg-white">
                  <div className="w-full p-0">
                    {sortingDcs &&
                      sortingDcs.map((sortItem, index) => {
                        return (
                          <div key={index} className="flex items-center justify-between w-full h-16 gap-5 p-0 text-sm font-normal border-b">
                            {sortItem.name}
                            <Radio
                              className="flex justify-end p-0"
                              style={{ color: "orange", padding: 0 }}
                              defaultChecked={false}
                              value={sortItem.value}
                              checked={sort === sortItem.value}
                              onChange={(e) => { handleRadioChange(e); handleClose() }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="justify-between hidden gap-5 mt-4 md:justify-start md:mt-0 lg:flex">
          <div className="">
            <Popover placement="bottom-end" open={open} handler={setOpen}>
              <PopoverHandler>
                <div className="flex items-center justify-between h-12 px-3 bg-white rounded-md ">
                  <div className="flex items-center gap-2">
                    <Image
                      width={24}
                      height={24}
                      className="w-6 h-6"
                      src={"/icons/sort.png"}
                      alt=""
                    />
                    <h3 className="flex   w-[150px] 2xl:w-[150px]">{translation?.sort_by} {matchingsortingDc?.name}</h3>
                  </div>
                  <div>
                    <Image
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6"
                      src={"/icons/dropdown.png"}
                      alt=""
                    />
                  </div>
                </div>
              </PopoverHandler>
              <PopoverContent className="flex flex-col w-72">
                <div className="flex items-center h-12 gap-4 mb-4 border-blue-gray-50">
                  <h3 className="text-base font-medium text-black">{translation?.sort_by}</h3>
                </div>
                <div className="flex justify-center w-full bg-white">
                  <div className="w-full p-0">
                    {sortingDcs &&
                      sortingDcs.map((sortItem, index) => {
                        return (
                          <div key={index} className="flex items-center justify-between w-full h-16 gap-5 p-0 text-sm font-normal border-b">
                            {sortItem.name}
                            <Radio
                              className="flex justify-end p-0"
                              style={{ color: "orange", padding: 0 }}
                              defaultChecked={false}
                              value={sortItem.value}
                              checked={sort === sortItem.value}
                              onChange={(e) => { handleRadioChange(e); handleClose() }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    sortingDcs: state.flightState?.flightResults?.sortingDcs,
  };
}

export default connect(mapStateToProps, null)(SortSection);
