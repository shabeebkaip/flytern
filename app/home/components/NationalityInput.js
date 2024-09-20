import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Image from 'next/image';


const NationalityInput = ({ data, handleRoomPopoever, onNatinalChange, setData }) => {
  const { country, translation } = useSelector(state => state.sharedState)
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [openList, setOpenList] = useState(false);

  const handleInputChange = (value) => {
    const inputValue = value?.trim().toLowerCase();
    const filtered = country?.filter(
      (country) =>
        country?.countryName?.toLowerCase().includes(inputValue) ||
        country?.countryCode?.toLowerCase().includes(inputValue)
    );
    setFilteredCountries(filtered);
    setOpenList(true);
    // Update the data.countryName when typing
    onNatinalChange(inputValue);
  };

  const handleSelectNationality = (selectedCountry) => {
    setData(selectedCountry)
    setOpenList(false);
  };

  return (
    <div
      className="px-2.5 bg-white rounded-[5px] border border-zinc-100 justify-start items-center gap-2.5 inline-flex cursor-pointer"
      id="nationality"
      onClick={() => handleRoomPopoever("nationality")}
    >
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex">
        <div className="justify-start items-center gap-2.5 inline-flex">
          <div className="relative w-5 h-5">
            <Image width={50} height={50} src={"/icons/Flag 2.svg"} alt="" />
          </div>
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-gray-500 text-[10px] md:text-xs xl:text-sm ">
              {translation?.nationality}
            </div>
            <div className="text-black text-[10px] md:text-xs xl:text-sm  font-medium">
              <input
                className="text-black text-[10px] md:text-xs xl:text-sm  w-full font-medium focus:outline-none"
                placeholder={translation?.enter_nationality}
                onChange={(e) => handleInputChange(e.target.value)}
                value={data?.countryName}
              />


            </div>
          </div>

        </div>
        {openList && filteredCountries?.length
          ? <div className="absolute z-20 flex flex-col  h-40 gap-3 w-[28%] overflow-y-auto bg-white rounded-md shadow-md top-[200px]  ">
            {filteredCountries?.map((country, index) =>
              <div
                className="flex items-center justify-between w-full p-4 cursor-pointer hover:bg-stone-50"
                onClick={() => handleSelectNationality(country)}
                key={index}
              >
                <div className="flex items-start justify-start w-full gap-2">
                  <div className="flex items-start justify-start w-full gap-2">
                    <div className="flex flex-col gap-1">
                      <p>{country?.countryName}</p>
                    </div>
                  </div>
                </div>
                <Image className="w-6" src={country?.flag} alt="" width={50} height={50} />
              </div>
            )}
          </div>
          : null}
      </div>
    </div>
  );
};

export default NationalityInput