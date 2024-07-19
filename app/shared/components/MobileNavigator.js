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

  if (isAuth) {
    return null;
  }

  return (
    <div className="w-full h-[55px] md:h-[90px] bg-emerald-800 shadow border-b border-neutral-200 text-white  bottom-0 z-10 fixed md:hidden">
      <div className="flex items-center justify-around h-full ">
        <div className="flex items-center justify-between gap-10 md:gap-28 w-full px-5">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/flights')}
          >
            <NavigatorFlightSvg color={isFlightPage ? "#FFA726" : '#fff'} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/hotels')}
          >
            <NavigatorHotelSvg color={isHotelPage ? "#FFA726" : '#fff'} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/packages')}
          >
            <NavigatorPackageSvg color={location?.pathname.includes('/packages') ? "#FFA726" : '#fff'} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/insurance")}
          >
            <NavigatorInsuranceSvg color={location?.pathname.includes('/insurance') ? "#FFA726" : '#fff'} />
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => typeof window !== 'undefined' && (window.location.href = '/activities')}
          >
            <NavigatorProfileSvg color={location?.pathname.includes('/profile') ? "#FFA726" : '#fff'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigator