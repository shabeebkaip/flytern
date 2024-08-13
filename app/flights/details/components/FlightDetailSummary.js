import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useSelector } from 'react-redux';

const FlightDetailSummary = ({ item, isRefund }) => {
  const { translation } = useSelector(state => state.sharedState)

  //flight
  return (
    <div className='flex flex-wrap gap-2 flex-start '>
      <div className="flex items-center justify-center px-2 text-xs font-medium rounded-md h-7 bg-tag-color text-tag-color">
        {item?.stops > 1 ? `${item?.stops - 1} Stops` : 'Direct'}
      </div>
      <div className="flex items-center justify-center gap-1 px-2 text-xs font-medium rounded-md h-7 bg-tag-color text-tag-color">
        <span>
          <AccessTimeIcon style={{ color: '#066651' }} fontSize="small" /> {" "}
        </span>
        <span>

          {item?.travelTime}
        </span>
      </div>
      {
        item?.baggage?.map((bag, index) =>
          <div className="flex items-center justify-center gap-1 px-2 text-xs font-medium rounded-md h-7 bg-tag-color text-tag-color" key={index}>
            <span>
              <BusinessCenterIcon style={{ color: '#066651' }} fontSize="small" /> {" "}
            </span>
            <span >{bag?.passTy}, {bag?.cabin}</span>
          </div>
        )
      }
      <div>
        {
          isRefund ?
            <div className={`p-2 h-7 bg-tag-color text-tag-color  rounded-md text-[9px] md:text-xs font-medium flex justify-center items-center`}>
              {translation?.refundable}
            </div> : <div className={`p-2 h-7 bg-red-200 text-red-500  rounded-md text-[9px] md:text-xs font-medium flex justify-center items-center`}>
              {translation?.non_refundable}
            </div>
        }
      </div>

    </div>
  )
}

export default FlightDetailSummary