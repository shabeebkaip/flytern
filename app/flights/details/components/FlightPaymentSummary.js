import { useAppSelector } from '@/lib/hooks'

const FlightPaymentSummary = () => {
    const { flightDetails: { _lstCabinInfos = [] } } = useAppSelector(state => state.flightState)
    const { selectedPriceOption } = useAppSelector(state => state.flightState)
    const  { translation} = useAppSelector((state) =>  state.sharedState)
    return (
        <>
            {
                _lstCabinInfos?.length ?
                    <div className='grid grid-cols-3 gap-8 p-5 overflow-hidden bg-white rounded-lg'>

                        <h3 className='col-span-2 text-base font-bold text-black md:text-lg'>{translation?.price_details}</h3>
                        {
                            selectedPriceOption?.adultBase ?
                                <div className='flex justify-between col-span-3'>
                                    <h3 className='text-xs font-normal text-zinc-600 md:text-base'>{translation?.adult_base_fare}</h3>
                                    <h4 className='text-xs font-medium text-center text-gray-950 md:text-base'>{selectedPriceOption?.currency} {selectedPriceOption?.adultBase.toFixed(3)}</h4>
                                </div> : null
                        }
                        {
                            selectedPriceOption.childBase ?
                                <div className='flex justify-between col-span-3'>
                                    <h3 className='text-xs font-normal text-zinc-600 md:text-base'>{translation?.child_base_fare}</h3>
                                    <h4 className='text-xs font-medium text-center text-gray-950 md:text-base'>{selectedPriceOption?.currency} {selectedPriceOption?.childBase.toFixed(3)}</h4>
                                </div> : null
                        }
                        {
                            selectedPriceOption.infantBase ?
                                <div className='flex justify-between col-span-3'>
                                    <h3 className='text-xs font-normal text-zinc-600 md:text-base'>{translation?.infant_base_fare}</h3>
                                    <h4 className='text-xs font-medium text-center text-gray-950 md:text-base'>{selectedPriceOption?.currency} {selectedPriceOption?.infantBase?.toFixed(3)}</h4>
                                </div> : null
                        }
                        {
                            selectedPriceOption?.totalTax ?
                                <div className='flex justify-between col-span-3'>
                                    <h3 className='text-xs font-normal text-zinc-600 md:text-base'>{translation?.tax_fare}</h3>
                                    <h4 className='text-xs font-medium text-center text-gray-950 md:text-base '>{selectedPriceOption?.currency} {selectedPriceOption?.totalTax.toFixed(3)}</h4>
                                </div> : null
                        }
                        {
                            selectedPriceOption?.totalPrice ?
                                <div className='flex justify-between col-span-3'>
                                    <h3 className='text-xs font-normal text-zinc-600 md:text-base'>{translation?.total_fare}</h3>
                                    <h4 className='text-xs font-medium text-center text-gray-950 md:text-base '>{selectedPriceOption?.currency} {selectedPriceOption?.totalPrice?.toFixed(3)}</h4>
                                </div> : null
                        }
                        {
                            selectedPriceOption?.discount ?
                                <div className='flex justify-between col-span-3'>
                                    <h3 className='text-xs font-normal text-zinc-600 md:text-base'>{translation?.discount} </h3>
                                    <h4 className='text-xs font-medium text-center text-gray-950 md:text-base '>{selectedPriceOption?.currency} {selectedPriceOption?.discount?.toFixed(3)}</h4>
                                </div> : null
                        }
                        <div className='flex items-center justify-between col-span-3 pt-4 text-base font-bold text-black border-t border-zinc-100 md:text-lg'>
                            <h3>{translation?.grand_total}</h3>
                            <h3>{selectedPriceOption?.currency} {selectedPriceOption?.finalAmount?.toFixed(3)}</h3>
                        </div>
                    </div> : null

            }
        </>

    )
}

export default FlightPaymentSummary