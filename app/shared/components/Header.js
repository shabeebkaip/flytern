"use client"
import Image from 'next/image';
import translations from "@/lib/translations.json";
import HeaderMore from "@/app/shared/components/HeaderMore";
import HeaderProfile from "@/app/shared/components/HeaderProfile";
import HeaderNotifiction from "./HeaderNotification";
import StoreProvider from "@/app/StoreProvider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useEffect, useState } from "react";
import { checkApiStatus, getGlobalCookie } from "@/lib/utils";
import { getCountryApi, getIntialInfoApi, getProfileDetailApi, getlanguageSwitchApi, saveDeviceLanguage } from "../api";
import { setContactDetails, setLanguageAndCountry, setTranslation, sharedProfileSuccess, switchLanguageSucces } from "@/lib/slices/sharedSlice";
import { countryAndLanguageSuccess, initialInfoSucces } from "@/lib/slices/genaralSlice";
import { usePathname } from "next/navigation";
import { exploresSuccess } from '@/lib/slices/exploreSlice';

const authPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/otp"]
const validPaths = ["/", "/ar", "/flights", "/hotels", "/ar/flights", "/ar/hotels"];

const HeaderChild = ({ selectedLanguageAndCountry, exploresData, profileData, initialInfo }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isArabic = pathname.includes("/ar") ? true : false;
  const [isHome, setIsHome] = useState(false);
  const language = isArabic ? 'ar' : 'en';
  const notificationToken = isArabic ? 'ar' : 'en';
  const { profile, mobileCountryList, contactDc } = useAppSelector(state => state.sharedState)
  const { translation } = useAppSelector((state) => state.sharedState)
  let defaultCountry = mobileCountryList?.find(item => item.isDefault === 1)

  const saveLanguageAndDispatch = useCallback(async (language, notificationToken) => {
    const response = await saveDeviceLanguage({
      countryCode: 'KW',
      language,
      notificationEnabled: false,
      notificationToken
    });

    if (checkApiStatus(response)) {
      dispatch(countryAndLanguageSuccess({
        countryCode: 'KW',
        language,
        notificationEnabled: false,
        notificationToken
      }));
      const index = language === 'ar' ? 1 : 0;
      dispatch(setTranslation(translations[index].texts));
    }
  }, [dispatch]);


  useEffect(() => {
    if (Object.keys(selectedLanguageAndCountry).length) {
      dispatch(setLanguageAndCountry(selectedLanguageAndCountry))
    }
    dispatch(exploresSuccess(exploresData))
  }, [selectedLanguageAndCountry, dispatch, exploresData])
  const handleContactDc = useCallback(() => {
    if (profile && Object.keys(profile).length) {
      dispatch(
        setContactDetails({
          email: profile?.email,
          countryCode: profile?.phoneCountryCode,
          mobileNumber: profile?.phoneNumber,
        })
      );
    } else {
      if (defaultCountry) {
        dispatch(
          setContactDetails({
            ...contactDc,
            countryCode: defaultCountry?.code,
            mobileCntry: defaultCountry?.code,
          })
        );
      }
    }
  }, [profile]);


  useEffect(() => {
    saveLanguageAndDispatch(language, notificationToken);
  }, [language, notificationToken, saveLanguageAndDispatch]);

  useEffect(() => {
    dispatch(sharedProfileSuccess(profileData));
    dispatch(switchLanguageSucces(initialInfo));
  }, [profileData, dispatch, initialInfo]);


  useEffect(() => {
    dispatch(getCountryApi)
    dispatch(initialInfoSucces(initialInfo))
  }, [initialInfo, dispatch])

  useEffect(() => {
    handleContactDc()
  }, [handleContactDc])


  useEffect(() => {
    setIsHome(validPaths.some(path => pathname.endsWith(path)));
  }, [pathname]);
  const isAuth = authPaths.includes(pathname);

  if (isAuth) {
    return null;
  }
  return (
    <div
      className={`${isAuth ? 'hidden' : 'flex'} box-border items-center justify-between w-full h-20 border-b`}
      style={{ backgroundColor: isHome ? "#fff " : "#065f46" }}
    >
      <div className="container flex items-center justify-between px-4 mx-auto ">
        <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/" } }} className="cursor-pointer">
          <Image src={isHome ? "/header/logo-green.svg" : "/header/logo-white.svg"} alt="logo" width={150} height={50} />
        </div>
        {!isAuth && (
          <div className="items-center hidden md:flex gap-9"  >
            <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/" } }} className={`text-sm font-normal text-center cursor-pointer hover:text-orange-400  ${isHome ? "text-black" : "text-white"}`}>
              <div className="flex items-center gap-4 cursor-pointer">
                {translation?.home}
              </div>
            </div>
            <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/my-bookings" } }} className={`text-sm font-normal text-center cursor-pointer ${isHome ? "text-black" : "text-white"} hover:text-orange-400 `} >
              {selectedLanguageAndCountry?.language?.code === "ar" ? 'حجوزاتي' : 'My Bookings'}
            </div>
            <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/help-center" } }} className={`text-sm font-normal text-center cursor-pointer ${isHome ? "text-black" : "text-white"} hover:text-orange-400 `} >
              {selectedLanguageAndCountry?.language?.code === "ar" ? 'مركز المساعدة' : 'Help Center'}
            </div>
            <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/contact-us" } }} className={`text-sm font-normal text-center cursor-pointer ${isHome ? "text-black" : "text-white"} hover:text-orange-400 `} >
              {selectedLanguageAndCountry?.language?.code === "ar" ? 'اتصال' : 'Contact'}
            </div>
            <HeaderMore isHome={isHome} />
            <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/settings" } }}>
              <div className="flex items-center gap-2 cursor-pointer">
                {
                  selectedLanguageAndCountry?.country?.flag && (
                    <Image src={selectedLanguageAndCountry.country.flag} width={20} height={20} className="w-5 h-5" alt="Country flag" />
                  )
                }
                <h3 className={`text-sm font-normal text-center cursor-pointer ${isHome ? "text-black" : "text-white"
                  }`}>{selectedLanguageAndCountry?.language?.name ? selectedLanguageAndCountry?.language?.name : "English"} / {selectedLanguageAndCountry?.country?.countryName_Ar}</h3>
              </div>
            </div>
            <HeaderNotifiction />
            <HeaderProfile />
          </div>
        )}
      </div>
    </div>
  );
};
const Header = ({ selectedLanguageAndCountry, exploresData, profile, initialInfo, countries }) => {
  return (
    <StoreProvider>
      <HeaderChild
        selectedLanguageAndCountry={selectedLanguageAndCountry}
        exploresData={exploresData}
        profileData={profile}
        initialInfo={initialInfo}
        countries={countries}
      />
    </StoreProvider>
  )
}
export default Header;
