import { encryptId} from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
// import { format } from 'date-fns'



const FlightBookingDetailsList = ({ flight }) => {
    const encryptedBookingRef = encryptId(flight.bookingRef)
    
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    return (
        <div className="container grid items-center justify-between w-full grid-cols-12 p-4 mx-auto overflow-hidden bg-white rounded-md ">
            <div className="col-span-2 h-7 w-28">
                <Image className="w-full h-full ml-10 bg-center bg-cover rounded-md object-contain w-10" src={flight.airlineImgUrl} alt="" width={1000} height={1000} />
            </div>
            <div className="flex flex-col col-span-7 gap-4 ">
                {
                    flight._Listflight.map((item, index) => (
                        <div className="grid grid-cols-12 gap-3" key={index}>
                            <div className='col-span-3 '>
                                <h3 className="text-sm font-normal text-font-gray">{item.deptAirportDtl}</h3>
                                <h1 className="text-xl font-medium text-black ">{item.deptAirport}</h1>
                                <h3 className="text-sm font-normal text-font-gray"> {item.depDate}</h3>
                            </div>
                            <div className="flex items-center col-span-5 ">
                                <Image className="w-full h-7 " src="/misc/flight.png" alt="" width={600} height={300} />
                            </div>
                            <div className="col-span-3 ">
                                <h3 className="text-sm font-normal text-font-gray">{item.arvlAirportDtl}</h3>
                                <h1 className="text-xl font-medium text-black ">{item.arvlAirport}</h1>
                                <h3 className="text-sm font-normal text-font-gray">{item.depArvlDate}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col items-end col-span-3 gap-6">
                <div>
                    <h4 className='text-xl font-semibold text-tag-color-two '><span className='text-sm font-medium'>{flight.currency} </span>{parseFloat(flight.paidAmount).toFixed(3)}</h4>
                </div>
                <div>
                    <h4 className='font-medium text-sm  '>Booking ID :<span className='text-xl text-tag-color-two font-semibold'>{flight?.bookingRef} </span></h4>
                </div>
                <div>
                    {
                        flight.status === "ISSUED" ?
                            <button
                                className='w-32 h-10 text-white rounded-md bg-dark-green relative z-10'
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        window.location.href = `/payment-summary/?ref=${encryptedBookingRef}`;
                                    }
                                }}
                            >
                                {selectedLanguageAndCountry?.language?.code === "ar" ? "عرض الحجز" : "View Booking"}
                            </button>
                            : flight.status === "PENDING" ?
                                <button
                                    className='w-32 h-10 text-white rounded-md bg-dark-green'
                                    onClick={() => {
                                        if (typeof window !== 'undefined') {
                                            window.location.href = `/payment-method/?ref=${encryptedBookingRef}`;
                                        }
                                    }}
                                >
                                    {selectedLanguageAndCountry?.language?.code === "ar" ? "ادفع الآن" : "Pay Now"}
                                </button>
                                : null
                    }
                    {/* <h5 className='text-red-500 underline cursor-pointer text-end md:mt-3'>Cancel</h5> */}

                </div>
            </div>
        </div>
    )
}

export default FlightBookingDetailsList