"use client"
import React from 'react'
import { NavigatorFlightSvg, NavigatorHotelSvg, NavigatorInsuranceSvg, NavigatorPackageSvg, NavigatorProfileSvg } from '@/app/shared/components/SVG';
import { usePathname } from 'next/navigation';

const authPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/otp"]

const MobileNavigator = () => {
  const pathname = usePathname();
  const location = typeof window !== "undefined" ? window.location : null;
  const isHotelPage = ["/", "/flights", "/ar/flights"].includes(location?.pathname)
  const isFlightPage = location?.pathname === '/'
  const isAuth = authPaths.includes(pathname);
  console.log(location.pathname,"location");

  if (isAuth) {
    return null;
  }
 
  return (
    <div className="w-full h-[55px] md:h-[90px] bg-emerald-800 shadow border-b border-neutral-200 text-white  bottom-0 z-10 fixed lg:hidden">
      <div className="flex items-center justify-around h-full ">
        <div className="flex items-center justify-between w-full gap-10 px-5 md:gap-28">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/flights')}
          >
            <NavigatorFlightSvg color={location?.pathname.endsWith('/flights') ? "#FFA726" : '#ffffff'}  />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/hotels')}
          >
            <NavigatorHotelSvg color={location?.pathname.endsWith('/hotels') ? "#FFA726" : '#ffffff'} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/packages')}
          >
            <NavigatorPackageSvg color={location?.pathname.endsWith('/packages') ? "#FFA726" : '#ffffff'} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.location.href = "/insurance"}
          >
            <NavigatorInsuranceSvg color={location?.pathname.endsWith('/insurance') ? "#FFA726" : '#ffffff'} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/profile')}
          >
            <NavigatorProfileSvg color={location?.pathname.endsWith('/profile') ? "#FFA726" : '#ffffff'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigator