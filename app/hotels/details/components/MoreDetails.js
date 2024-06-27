import React from 'react'
import TitleCard from '../../../shared/components/TitleCard'
import { useSelector } from 'react-redux';
const Detail = ({ item }) => {
  const [expand, setExpand] = React.useState(true)
  return (
    <div className='p-3 transition bg-white shadow-sm'>
      <div
        className='flex items-center justify-between cursor-pointer'
        onClick={() => setExpand(!expand)}
      >
        <p className='font-semibold capitalize'>{item.policyName}</p>
        <button className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transform ${expand ? "rotate-0" : "-rotate-180"} transition-transform duration-300`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {expand && (
        <div className='py-4 transition-all duration-300'>
          {
            item?.policyText?.includes('<') ?
              <div className='flex flex-col gap-5 my-tailwind-styles' dangerouslySetInnerHTML={{ __html: item.policyText }} ></div> : <p>{item.policyText}</p>
          }

        </div>
      )}
    </div>
  )
}

const MoreDetails = ({ moreDetails }) => {
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <div className='mt-4'>
      <TitleCard title={translation?.more_details}>
        <div className='flex flex-col gap-5 mt-4'>
          {
            moreDetails?.length ? moreDetails.map((item, index) => (
              <Detail item={item} key={index} />
            )) : null
          }
        </div>
      </TitleCard>
    </div>

  )
}

export default MoreDetails