import { arabic_translation } from '@/lib/constants'
import { useAppSelector } from '@/lib/hooks'
import React from 'react'

const PaymentSummary = () => {
  const { insurancePaymentSummary } = useAppSelector(state => state.insuranceState)
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  return (
    <div className='grid grid-cols-3 gap-8 p-5 overflow-hidden bg-white rounded-lg'>
      <h4 className='col-span-2 text-sm text-black sm:text-lg'>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.payment_summary : 'Payment Summary'}</h4>
      <h4 className='col-span-1 text-xs font-medium  text-right text-gray-950 sm:text-base '>{insurancePaymentSummary.code} {parseFloat(insurancePaymentSummary.price).toFixed(3)}</h4>
    </div>
  )
}

export default PaymentSummary