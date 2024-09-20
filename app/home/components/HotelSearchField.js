import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';

const HotelSearchField = ({ data, destinationList, onSearchChange, setData, setDestinationList, destinationError, destinationLoader, openSearch, setOpenSearch, setDestinationError }) => {
  const { translation } = useAppSelector((state) => state.sharedState)

  return (
    <div>
      <div className="px-2.5 py-1 bg-white rounded-[5px] border border-zinc-100 justify-start items-center gap-2.5 inline-flex relative cursor-pointer w-full">
        <div className="grow shrink basis-0 flex justify-between items-start gap-[7px] ">
          <div className="justify-start items-center gap-2.5 inline-flex w-full">
            <div className="w-5 h-5 relative">
              <Image width={50} height={50} src={"/icons/Point On Map.svg"} alt="" />
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex w-full" >
              <div className="text-gray-500 text-[8px] md:text-xs xl:text-sm  font-normal w-full">
                {translation?.bycity_country_hotel}
              </div>
              <input
                className="text-black text-[10px] md:text-xs xl:text-sm  w-full font-medium focus:outline-none"
                placeholder={translation?.select_destination}
                onChange={e => onSearchChange(e.target.value)}
                onFocus={()=> setDestinationError(false)}
                value={data.destination ? data.destination : data.destinationLabel}
              />
            </div>

          </div>
          <div>
            <CancelIcon className="mt-3 text-orange-500" fontSize="small" onClick={() => setData({
              ...data,
              destinationLabel: '',
              destination: '',
              HotelCode: '',
              CityCode: ''
            })} />
          </div>
        </div>

        {data.destinationLabel && openSearch
          ? <div className="absolute z-20 flex flex-col w-full h-40 gap-3 overflow-y-auto bg-white rounded-md shadow-md top-20 ">
            {destinationLoader ? <div className="flex items-center justify-center w-full h-full">
              <div className="w-10 h-10 border-t-2 border-b-2 border-orange-400 rounded-full animate-spin"></div>
            </div> :
              destinationList.map((destination, index) =>
                <div
                  className="flex items-center justify-between w-full p-4 cursor-pointer hover:bg-stone-50"
                  onClick={() => {
                    setData({
                      ...data,
                      destinationLabel: '',
                      destination: destination.uniqueCombination,
                      HotelCode: destination.hotelCode,
                      CityCode: destination.cityCode
                    });
                    setDestinationList([]);
                    setOpenSearch(false);
                  }}
                  key={index}
                >
                  <div className="flex items-start justify-start w-full gap-2">
                    <div className="flex flex-col gap-1">
                      <p>
                        {destination.uniqueCombination}
                      </p>
                    </div>
                  </div>
                  <Image className="w-6" src={destination.flag} alt="" width={50} height={50} />
                </div>
              )
            }
          </div>
          : null}
      </div>
      <div>
        {destinationError && (
          <p className="text-red-500 text-[10px] md:text-xs xl:text-sm font-medium mt-1">
            Please select a destination.
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelSearchField