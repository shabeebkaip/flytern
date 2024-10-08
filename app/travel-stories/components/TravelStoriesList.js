import React, { useEffect, useState } from 'react';
import { Rating, Skeleton } from '@mui/material';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import TitleCard from '@/app/shared/components/TitleCard';
import { displayDateFormatShort } from '@/lib/constants';
import Image from 'next/image';
import { getMyTravelStoriesApi } from '@/app/profile/api';
import { useAppSelector } from '@/lib/hooks';
import SuspenseLoader from '@/app/shared/components/SuspenseLoader';

const TravelStoriesList = ({ type }) => {
  const { data: { travelStories = [] }, loading } = useAppSelector((state) => state.exploreState);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //     setData(travelStories);
  //     setLoader(false);
    
  // }, [type, travelStories]);

  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  const  { translation} = useAppSelector((state) =>  state.sharedState)
  return (
    <>
      {loader ? (
        <SuspenseLoader />
      ) : (
        
        // Usage in a component
<TitleCard
  topMargin='0'
  title={<h4 className="font-inter text-18px font-medium leading-21.78 text-left">{translation?.travel_stories}</h4>}>

          {loading ?
            <div className='grid gap-10 mt-5 sm:grid-cols-2'>
              {
                Array(4).fill().map((_, index) => (
                  <Skeleton
                    key={index}
                    sx={{ bgcolor: 'grey.300' }}
                    variant="rectangular"
                    className="w-full h-full bg-stone-50"
                    height={200} />
                ))
              }
            </div>
            :
            <div className='grid gap-10 mt-5 sm:grid-cols-2'>
              {data & data?.length === 0 ? (
                <p>No items to display</p>
              ) : (
                travelStories?.map((story, index) => (
                  <div className='flex flex-col justify-start gap-3' key={index}>
                    {type === 'profile' ? (
                      <div className='w-[300px] h-[300px]'>
                        <Image src={story?.fileUrl} alt='image' className='object-cover w-full h-full rounded-md' width={1000} height={1000}  />
                      </div>
                    ) : story.urlType === 'VIDEO' ? (
                      <ReactPlayer url={story?.url} width='100%' height='100%' controls />
                    ) : (
                      <Image src={story?.url} alt='' className=' w-full h-40 rounded-md sm:h-48 md:h-[400px]  ' width={10000} height={10000} />
                    )}
                    <div className='flex flex-col gap-5'>
                      <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                        <div className='flex items-center gap-3'>
                          <Image src={story?.profileUrl} alt='' className='w-6 h-6 rounded-full' width={10000} height={10000} />
                          <p className='text-xs font-medium text-black'>{story?.firstName}</p>
                        </div>
                        <div>
                          <p className='text-xs font-normal tracking-tight text-stone-500'>
                            {moment(story.createdon).format(displayDateFormatShort)}
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-col gap-3'>
                        {type === 'profile' ? (
                          <Rating name='read-only' value={story?.rating} readOnly precision={0.5} />
                        ) : (
                          <Rating name='read-only' value={story?.ratings} readOnly precision={0.5} />
                        )}
                        <h4 className='text-sm font-medium text-black'>{story?.title}</h4>
                        <p className='text-stone-500 text-[13px] font-normal leading-[200%] tracking-tight'>{story?.tripSummary}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          }
        </TitleCard>
      )}
    </>
  );
};

export default TravelStoriesList;
