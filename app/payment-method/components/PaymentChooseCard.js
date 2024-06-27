import React, { useEffect, useState } from 'react';
import { Radio } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { saveSelectedPaymentDetails } from '@/lib/slices/paymentSlice';
import TitleCard from '@/app/shared/components/TitleCard';
import Image from 'next/image';


const PaymentChooseCard = ({ data, setData,_gatewaylist }) => {
  const [selectedProcessID, setSelectedProcessID] = useState(null);
  const dispatch = useAppDispatch()

  const handleRadioChange = (item,processID, paymentCode) => {
    setSelectedProcessID(processID);
    setData({ ...data, processID, paymentCode });
    dispatch(saveSelectedPaymentDetails(item))
    
  };
  useEffect((processID, paymentCode) => {
    if (_gatewaylist.length > 0) {
      setSelectedProcessID(_gatewaylist[0].processID);
      setData({ ...data, processID, paymentCode });
      dispatch(saveSelectedPaymentDetails(_gatewaylist[0]))
    }
  }, [dispatch,_gatewaylist]);

  const  { translation} = useAppSelector((state) =>  state.sharedState)
  return (
    <div className="flex flex-col gap-5">
      <TitleCard
      topMargin={0}
        title={
          <div className="flex items-center gap-5">
            <Image src="/icons/Card.svg" alt="" width={50} height={50} />
            <h4>{translation?.select_payment_method}</h4>
          </div>
        }
      >
        <div className="flex flex-col items-start gap-10 mt-10">
          {_gatewaylist?.map((item, index) => (
            <div className="flex items-center gap-10" key={index}>
              <Radio
                value={item.processID}
                name="radio-button-demo"
                inputProps={{ 'aria-label': item.name }}
                style={{ color: 'orange' }}
                onChange={() => handleRadioChange(item, item.processID, item.paymentCode)}
                checked={selectedProcessID === item.processID}
              />
              <Image src={item.gatewayImageUrl} alt="" className="w-12 sm:w-16" width={100} height={100}/>
              <h4 className="text-base font-normal text-black capitalize">{item.displayName}</h4>
            </div>
          ))}
        </div>
      </TitleCard>
    </div>
  );
};

export default PaymentChooseCard;
