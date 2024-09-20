import React from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, } from 'react-redux';
import { setFlightSearch } from '@/lib/slices/exploreSlice';
import { useAppSelector } from '@/lib/hooks';

const PassengerAndCabin = ({ open, onClose, onApply, allowedCabin, cabinList,  child, infants,  }) => {
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  const { translation } = useAppSelector(state => state.sharedState)

  const dispatch = useDispatch();
  const { flightSearch } = useAppSelector(state => state.exploreState);
  const handleAdultsChange = (newAdultsValue) => {
    const adjustedAdults = Math.max(1, Math.min(9, newAdultsValue)); 
    dispatch(setFlightSearch({
      ...flightSearch,
      adults: adjustedAdults,
      child: 0,
      infants: 0
    }));
  };
  
  const handleChildsChange = (newChildsValue) => {
    const maxAllowedChildren = 9 - flightSearch.adults;
    const newValue = Math.max(0, Math.min(maxAllowedChildren, newChildsValue));
    dispatch(setFlightSearch({
      ...flightSearch,
      child: newValue,
      infants: 0
    }))
  };

  const handleInfantsChange = (newInfantsValue) => {
    const maxInfants = Math.min(9 - flightSearch.adults - flightSearch.child, flightSearch.adults);
    const newValue = Math.max(0, Math.min(maxInfants, newInfantsValue));
    dispatch(setFlightSearch({
      ...flightSearch,
      infants: newValue
    }))
  };


  return (
    <>
      <div
        open={open}
        handler={onClose}
      >
        <div className={`flex flex-col items-center justify-between gap-5 p-2 cursor-pointer ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'}`}>
          <div className="grid grid-cols-2 gap-5 p-2">
            <div className="grid grid-cols-1 gap-5 p-0 md:grid-cols-1 w-100">
              <div className="w-full ">
                <h6 className="text-black-500 text-[8px] md:text-[16px] font-normal font-['Inter']">
                  {translation.adults}
                </h6>
                <span className="text-sm">{translation.adult_description}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 p-0 md:grid-cols-1 w-100">
              <div className="flex flex-row w-full gap-10">
                <RemoveCircleOutlineIcon
                  style={{ color: "#065F46" }}
                  fontSize='large'
                  onClick={() => handleAdultsChange(flightSearch?.adults - 1)}
                />
                <span className='text-base'>{flightSearch?.adults}</span>
                <AddCircleOutlineIcon
                  style={{ color: "#065F46" }}
                  fontSize='large'
                  onClick={() => handleAdultsChange(flightSearch?.adults + 1)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 p-2 ">
            <div className="grid grid-cols-1 gap-5 p-0 md:grid-cols-1 w-100">
              <div className="w-full">
                <h6 className="text-black-500 text-[8px] md:text-[16px] font-normal font-['Inter']">
                  {translation.children}
                </h6>
                <span className="text-sm">{translation.children_description}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 p-0 md:grid-cols-1 w-100">
              <div className="flex flex-row w-full gap-10">
                <RemoveCircleOutlineIcon
                  style={{ color: "#065F46" }}
                  fontSize='large'
                  onClick={() => handleChildsChange(flightSearch?.child - 1)}
                />
                <span className='text-base'>{flightSearch?.child}</span>
                <AddCircleOutlineIcon
                  style={{ color: "#065F46" }}
                  fontSize='large'
                  onClick={() => handleChildsChange(flightSearch?.child + 1)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 p-2">
            <div className="grid grid-cols-1 gap-5 p-0 md:grid-cols-1 w-100">
              <div className="w-full ">
                <h6 className="text-black-500 text-[13px] md:text-[16px] font-normal font-['Inter']">
                  {translation.infants}
                </h6>
                <span className="text-sm">{translation.infant_description}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 p-0 md:grid-cols-1 w-100">
              <div className="flex flex-row w-full gap-10">
                <RemoveCircleOutlineIcon
                  style={{ color: "#065F46" }}
                  fontSize='large'
                  onClick={() => handleInfantsChange(flightSearch?.infants - 1)}
                />
                <span className='text-base'>{flightSearch?.infants}</span>
                <AddCircleOutlineIcon
                  style={{ color: "#065F46" }}
                  fontSize='large'
                  onClick={() => handleInfantsChange(flightSearch?.infants + 1)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between w-full p-2 cursor-pointer ">
            <div className="flex items-start justify-center w-full ">
              <div className="w-full p-0">
                <h6 className="mb-2 text-lg border-b">{translation.chooseClass}</h6>
                <RadioGroup
                  value={flightSearch?.allowedCabins && flightSearch?.allowedCabins[0]?.name}
                  onChange={(e) => {
                    const selectedCabin = cabinList.find(cabin => cabin.name === e.target.value);
                    dispatch(setFlightSearch({
                      ...flightSearch,
                      allowedCabins: [selectedCabin]
                    }));
                    //   setOpenPopover3(false);
                  }}
                >
                  {cabinList?.map((data, index) => (
                    <FormControlLabel
                      key={index}
                      value={data.name}
                      control={<Radio style={{ color: 'green' }} />}
                      label={data.name}
                    />
                  ))}
                </RadioGroup>
              </div>

            </div>
          </div>

          <div className="grid w-full grid-cols-1">
            <button
              className="py-2 text-white rounded-md bg-emerald-800 px-7"
              onClick={() => {
                // onApply();
                onClose();
              }}
            >
              {translation.apply}
            </button>
          </div>
          <p className="text-font-gray">{ }</p>
        </div>
      </div>
    </>
  )
}

export default PassengerAndCabin