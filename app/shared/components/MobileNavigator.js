"use client"
import React, { useEffect, useState } from 'react'
import { NavigatorFlightSvg, NavigatorHotelSvg, NavigatorInsuranceSvg, NavigatorPackageSvg, NavigatorProfileSvg } from '@/app/shared/components/SVG';
import { usePathname } from 'next/navigation';

const authPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/otp"]
// const validPaths = ["/", "/ar", "/flights", "/hotels", "/ar/flights", "/ar/hotels","/packages", "/profile", "/insurance"];
const validPaths = [''];


const MobileNavigator = () => {
  // const [isHome, setIsHome] = useState(false);
  const pathname = usePathname();
  const location = typeof window !== "undefined" ? window.location : null;
  // const isHotelPage = ["/", "/flights", "/ar/flights"].includes(location?.pathname)
  // const isFlightPage = location?.pathname === '/'
  const isAuth = authPaths.includes(pathname);

  // useEffect(() => {
  //   setIsHome(validPaths.some(path => pathname.endsWith(path)));
  // }, [pathname]);

  const isHome = validPaths.some(path => pathname.endsWith(path))

  if (isAuth) {
    return null;
  }

  console.log(isHome,"isHome")
  console.log(pathname,"isHome")
 
  return (
    <div className="w-full h-[55px] md:h-[90px] bg-emerald-800 shadow border-b border-neutral-200 text-white  bottom-0 z-[9999] fixed lg:hidden ">
      <div className="flex items-center justify-around h-full ">
        <div className="flex items-center justify-between w-full gap-10 px-5 md:gap-28">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/flights')}
          >
            <NavigatorFlightSvg color={pathname.includes('/flights') || pathname.endsWith('/') ? '#FFA726' : '#fff'} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/hotels')}
          >
            <NavigatorHotelSvg color={`${pathname.includes('/hotels') ? '#FFA726' : '#fff' }`} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/packages')}
          >
            <NavigatorPackageSvg color={`${pathname.includes('/packages') ? '#FFA726' : '#fff' }`} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.location.href = "/insurance"}
          >
            <NavigatorInsuranceSvg color={`${pathname.includes('/insurance') ? '#FFA726' : '#fff' }`} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/profile')}
          >
            <NavigatorProfileSvg color={`${pathname.includes('/profile') ? '#FFA726' : '#fff' }`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigator