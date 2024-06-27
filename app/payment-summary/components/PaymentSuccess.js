import React from 'react'
import Image from 'next/image'
import TitleCard from '@/app/shared/components/TitleCard'
import LabelValue from '@/app/shared/components/LabelValue'

const PaymentSuccess = ({ _paymentInfo }) => {
    let icon = _paymentInfo?.length ? _paymentInfo.find(item => item.title === "PaymentMethodIcon") : null
    let thankYou = _paymentInfo?.length ? _paymentInfo.find(item => item.title === "ThankyouMsg") : null
    let confirmMsg = _paymentInfo?.length ? _paymentInfo.find(item => item.title === "ConfirmIcon") : null
    let groupName = _paymentInfo?.length ? _paymentInfo.find(item => item.title === "groupName") : null 
    return (
        <>
            <TitleCard>
                <div class=" rounded  w-full p-5">
                    {
                        _paymentInfo?.length ? _paymentInfo.map((item, index) =>
                            item.groupName === "ThankyouMsg" ? (
                                <div className='flex flex-col items-center justify-center w-full gap-3' key={index}>
                                    <h3 className='text-lg text-green-500'>{thankYou?.information}</h3>
                                    <Image className='w-10 h-10' src={confirmMsg.information} alt=""  width={100} height={100} />
                                </div>
                            ) : null
                        )
                            : null
                    }
                </div>
            </TitleCard>
            <TitleCard>
                {
                    _paymentInfo?.length ? _paymentInfo.map((item, index) =>
                        ["PaymentMethodIcon","ThankyouMsg", "ConfirmMsg","ConfirmIcon" ].includes(item.title)  ?
                            null :
                            item.title === "Payment Method" ?
                                <LabelValue
                                    label={item.title}
                                    value={
                                        <div className='flex items-center justify-start gap-5'>
                                          <p>{item.information}</p>
                                          <Image className='w-10 h-10' src={icon?.information} alt="" width={100} height={100} />  
                                        </div>
                                        }
                                    styles={"mt-4"}  /> :
                                <LabelValue label={item.title} value={item.information} styles={"mt-4"} />
                    )
                        : null
                }
            </TitleCard>
        </>
    )
}

export default PaymentSuccess