import React from 'react';
import { FlyternLogo } from './SVG';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';

const Video = () => {
  const { translation } = useAppSelector((state) => state.sharedState);
  console.log(translation?.explore_plan, "translation?.explore_plan");
  
  return (
    <div className='hidden lg:relative lg:object-center lg:bg-blend-dark lg:block'>
  <div className='absolute bottom-0 left-0 right-0 z-10 w-full h-48 bg-gradient-to-t from-black to-transparent '></div>
  <Link href="/" className='absolute left-0 right-0 flex items-start justify-start px-10 md:px-32 top-10 '>
    <FlyternLogo color={"#066651"} width={'141px'} height={"33px"} />
    <div className="absolute left-0 right-0 flex flex-col items-start justify-start lg:px-32 px-10 md:px-20 xl:top-[360px] top-[300px] 2xl:top-[550px]">
      <div>
        <span className="text-white text-[30px] md:text-[24px] lg:text-[40px] font-bold">Explore, Plan, &<br />Discover with</span>
        <span className="text-orange-400 text-[30px] md:text-[24px] lg:text-[40px] font-bold"> Ease!</span>
      </div>
      <div className='grid justify-center grid-cols-1 text-left md:grid-cols-10'>
        <div className="col-span-1 font-normal leading-7 md:col-span-6 text-zinc-300 md:text-base lg:text-lg">
          Unleash your wanderlust with our intuitive trip planner app. Organize trips, uncover hidden gems, and create lasting memories effortlessly.
        </div>
      </div>
    </div>
  </Link>
  <video className='object-cover object-center w-screen h-screen md:w-full md:h-full' src="/auth_video.mp4" autoPlay loop muted />
</div>

  );
}

export default Video;
