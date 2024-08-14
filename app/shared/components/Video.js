import React from 'react';
import { FlyternLogo } from './SVG';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';

const Video = () => {
  const { translation } = useAppSelector((state) => state.sharedState);

  return (
    <div className='hidden lg:relative lg:object-center lg:bg-blend-dark lg:block'>
      <div className='absolute bottom-0 left-0 right-0 z-10 w-full h-48 bg-gradient-to-t from-black to-transparent'></div>
      <Link href="/" className='absolute left-0 right-0 flex items-center justify-start px-10 md:px-32 top-10'>
        <div className="flex flex-col items-start justify-start">
          {/* Adjust the width of the Flytern logo to match the alignment */}
          <FlyternLogo color={"#066651"} width={'150px'} height={"35px"} />
        </div>
        <div className="absolute left-0 right-0 flex flex-col items-center justify-center lg:px-32 px-10 md:px-20 xl:top-[360px] top-[300px] 2xl:top-[550px] overflow-hidden">
          <div>
            <span className="text-white text-[30px] md:text-[24px] lg:text-[40px] font-bold">Explore, Plan, &<br />Discover with</span>
            <span className="text-orange-400 text-[30px] md:text-[24px] lg:text-[40px] font-bold"> Ease!</span>
          </div>
          <div className='flex justify-center'>
            <div className='text-center '>
              <div className="font-normal leading-7 text-center text-zinc-300 md:text-base lg:text-lg">
                Unleash your wanderlust with our intuitive trip <br/> planner app. Organize trips, uncover hidden  <br/> gems,and create lasting memories effortlessly.
              </div>
            </div>
          </div>
        </div>
      </Link>
      <video className='object-cover object-center w-screen h-screen md:w-full md:h-full' src="/auth_video.mp4" autoPlay loop muted />
    </div>
  );
};

export default Video;
