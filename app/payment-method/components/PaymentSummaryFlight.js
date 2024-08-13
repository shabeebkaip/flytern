import LabelValue from "@/app/shared/components/LabelValue"
import { useAppSelector } from "@/lib/hooks"


const PaymentSummaryFlight = () => {
  const { selectedPrice } = useAppSelector(state => state.paymentState)
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  const  { translation} = useAppSelector((state) =>  state.sharedState)

  return (
    <div className='flex flex-col items-start justify-start gap-10 p-4 bg-white rounded-lg'>
      <div className='flex flex-col gap-3'>
        <h4 className="text-lg font-bold text-black capitalize">{translation?.payment_summary}</h4>
      </div>

      <div className='grid w-full grid-cols-1 gap-4 text-lg'>
  <LabelValue label={translation?.payment_method} value={selectedPrice.displayName} />
  {selectedPrice.discount > 0 && <LabelValue label="Discount" value={`${parseFloat(selectedPrice.discount).toFixed(3)} ${selectedPrice.currencyCode}`} />}
  <LabelValue label={translation?.processing_fee} value={`${parseFloat(selectedPrice.processingFee).toFixed(3)} ${selectedPrice.currencyCode}`} />
  <LabelValue label={translation?.price} value={` ${parseFloat(selectedPrice.totalAmount).toFixed(3)} ${selectedPrice.currencyCode}`} />
  <div className={`border-t py-3`}>
    <LabelValue label={translation?.total_amount} value={`${parseFloat(selectedPrice.finalAmount).toFixed(3)} ${selectedPrice.currencyCode}`} pStyles={"font-semibold text-lg sm:text-lg"} />
  </div>
</div>


    </div>
  )
}

export default PaymentSummaryFlight