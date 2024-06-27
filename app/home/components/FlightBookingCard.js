import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { RoundTripSvg, OneWaySvg, MultiCitySvg } from '@/app/shared/components/SVG';
import { setFlightSearch } from '@/lib/slices/exploreSlice';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { de } from 'date-fns/locale';


const FlightServiceOption = dynamic(() => import('@/app/home/components/FlightServiceOption'))
const OneWay = dynamic(() => import('@/app/home/components/OneWay'))
const RoundTrip = dynamic(() => import('@/app/home/components/RoundTrip'))
const MultiCity = dynamic(() => import('@/app/home/components/MultiCity'))


const FlightBookingCard = ({ lang }) => {
  const dispatch = useAppDispatch()
  const { flightSearch } = useAppSelector(state => state.exploreState);
  const { data } = useAppSelector(state => state.exploreState)
  const { translation } = useAppSelector(state => state.sharedState)
  const [selectedService, setSelectedService] = useState('roundTrip')
  const cabinList = useAppSelector((data) => data?.exploreState?.data?.cabinClass);
  const defaultCabin = cabinList?.filter((data) => data?.isDefault === true);

  const updateFlightSearch = useCallback(() => {
    if (data?.cabinClass?.length > 0) {
      dispatch(setFlightSearch({
        ...flightSearch,
        mode: 'ROUNDTRIP',
        allowedCabins: defaultCabin,
        searchList: [flightSearch?.searchList?.[0]].map((item) => ({
          ...item,
          returnDate: format(
            new Date(new Date(item?.departureDate).getTime() + 24 * 60 * 60 * 1000),
            "yyyy-MM-dd"
          )
        }))
      }));
    }
  }, [data?.cabinClass]);

  useEffect(() => {
    updateFlightSearch();
  }, [updateFlightSearch]);
  const handleService = (service) => {
    setSelectedService(service)
    if (service === 'roundTrip') {
      dispatch(setFlightSearch({
        ...flightSearch,
        mode: 'ROUNDTRIP',
        searchList: [flightSearch?.searchList?.[0]].map((item, index) => ({
          ...item,
          returnDate: format(
            new Date(new Date(item?.departureDate).getTime() + 24 * 60 * 60 * 1000),
            "yyyy-MM-dd"
          )
        }))
      }))
    } else if (service === 'oneWay') {
      dispatch(setFlightSearch({
        ...flightSearch,
        mode: 'ONEWAY',
        searchList: [flightSearch?.searchList?.[0]].map((item, index) => ({
          ...item,
          returnDate: null,
          returnAnchorEl: null
        }))
      }))
    } else {
      dispatch(setFlightSearch({
        ...flightSearch,
        mode: 'MULTICITY',
        searchList: flightSearch?.searchList?.map((item, index) => ({
          ...item,
          departureDate: format(new Date(), "yyyy-MM-dd"),
          fromOpen: false,
          toOpen: false,
        }))
      }))
    }
  }
  return (
    <div className='relative w-full p-4 duration-300 ease-in-out bg-white rounded-lg '>
      <div className='absolute flex items-center gap-4 -top-4 '>
        <FlightServiceOption
          svgColor={selectedService === "oneWay" ? 'white' : '#707581'}
          backgorundColor={selectedService === "oneWay" ? 'bg-orange-400' : 'bg-white'}
          textColor={selectedService === "oneWay" ? 'text-white' : ' text-gray-500'}
          handleService={() => handleService('oneWay')} SvgComp={OneWaySvg}
          service={translation?.one_way}

        />
        <FlightServiceOption
          svgColor={selectedService === "roundTrip" ? '#ffffff' : '#707581'}
          backgorundColor={selectedService === "roundTrip" ? 'bg-orange-400' : 'bg-white'}
          textColor={selectedService === "roundTrip" ? 'text-white' : ' text-gray-500'}
          handleService={() => handleService('roundTrip')} SvgComp={RoundTripSvg}
          service={translation?.round_trip}
        />
        <FlightServiceOption
          svgColor={selectedService === "multiCity" ? 'white' : '#707581'}
          backgorundColor={selectedService === "multiCity" ? 'bg-orange-400' : 'bg-white'}
          textColor={selectedService === "multiCity" ? 'text-white' : ' text-gray-500'}
          handleService={() => handleService('multiCity')} SvgComp={MultiCitySvg}
          service={translation?.multi_city}
        />
      </div>
      {selectedService === "oneWay" && <OneWay />}
      {selectedService === "roundTrip" && <RoundTrip />}
      {selectedService === "multiCity" && <MultiCity />}
    </div >
  )
}

export default FlightBookingCard