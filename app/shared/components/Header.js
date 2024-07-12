"use client"
import Link from "next/link";
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import StoreProvider from "@/app/StoreProvider";
import { useCallback, useEffect } from "react";
import { authApiService } from "@/lib/authApi";
import { checkApiStatus, getGlobalCookie, setGlobalCookie } from "@/lib/utils";
import { getCountryApi, getFetchLanguageApi, getIntialInfoApi, getProfileDetailApi, getlanguageSwitchApi, saveDeviceLanguage } from "../api";
import { setContactDetails, setTranslation } from "@/lib/slices/sharedSlice";
import { countryAndLanguageSuccess } from "@/lib/slices/genaralSlice";
import translations from "@/lib/translations.json";
import HeaderMore from "@/app/shared/components/HeaderMore";
import HeaderProfile from "@/app/shared/components/HeaderProfile";
import { getExploresApi } from "@/app/home/api";
import HeaderNotifiction from "./HeaderNotification";


const HeaderChild = () => {
  const location =  typeof window !== "undefined" ? window.location?.pathname : '';
  const dispatch = useAppDispatch();
  const isArabic = getGlobalCookie('language');
  const language = isArabic === "ar" ? 'ar' : 'en';
  const notificationToken = isArabic ? 'ar' : 'en';
  const { profile, mobileCountryList, contactDc, selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  const { translation } = useAppSelector((state) => state.sharedState)
  let defaultCountry = mobileCountryList?.find(item => item.isDefault === 1)
  let accessToken = getGlobalCookie('accessToken');
  const handleToken = useCallback(() => {
    if (!accessToken) {
      authApiService()
        .then((response) => {
          setGlobalCookie('accessToken', JSON.stringify(response.data.data.accessToken));
          setGlobalCookie('refreshToken', JSON.stringify(response.data.data.refreshToken));
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    handleToken()
  }, [handleToken]);
  useEffect(() => {
    dispatch(getFetchLanguageApi)
    dispatch(getExploresApi())
  }, [])
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
    // Assuming notificationToken is based on language
    saveLanguageAndDispatch(language, notificationToken);
  }, []);
  useEffect(() => {
    dispatch(getProfileDetailApi);
    dispatch(getlanguageSwitchApi);
  }, []);
  useEffect(() => {
    handleContactDc()
    dispatch(getCountryApi)
    dispatch(getIntialInfoApi)
  }, [handleContactDc])

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
  }, []);

  // const { genericLoader } = useSelector(state => state.flightState)
  // const { saveTravellerLoader } = useSelector(state => state.insuranceState)
  // const { paymentWaitLoader } = useSelector(state => state.paymentState)
  // const isTabletAndMobile = useIsTabletAndMobile()
  // useEffect(() => {
  //   dispatch(getProfileDetailApi);
  //   dispatch(getlanguageSwitchApi);
  // }, []);

  // const location = useLocation();

  const authPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/otp"]

  const validPaths = ["/", "/ar", "/flights", "/hotels", "/ar/flights", "/ar/hotels"];
  const isHome = validPaths.some(path => location.endsWith(path));
  const isAuth = authPaths.includes(location);
 
  return (
    <div
      className={`${isAuth ? 'hidden' : 'flex'} box-border items-center justify-between w-full h-20 border-b`}
      style={{ backgroundColor: isHome ? "#fff " : "#065f46" }}
    >
      <div className="container flex items-center justify-between px-4 mx-auto ">
        <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/"}}} className="cursor-pointer">
          <Image src={isHome ? "/header/logo-green.svg" : "/header/logo-white.svg"} alt="logo" width={150} height={50} />
        </div>
        <div className="items-center hidden md:flex gap-9"  >
          <div  onClick={() => { if (typeof window !== "undefined") {window.location.href = "/"}}} className={`text-sm font-normal text-center cursor-pointer hover:text-orange-400  ${isHome ? "text-black" : "text-white"}`}>
            <div className="flex items-center gap-4 cursor-pointer">
              {translation?.home}
            </div>
          </div>
          <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/my-bookings"}}} className={`text-sm font-normal text-center cursor-pointer ${isHome ? "text-black" : "text-white"} hover:text-orange-400 `} >
            {selectedLanguageAndCountry?.language?.code === "ar" ? 'حجوزاتي' : 'My Bookings'}
          </div>
          <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/help-center"}}} className={`text-sm font-normal text-center cursor-pointer ${isHome ? "text-black" : "text-white"} hover:text-orange-400 `} >
            {selectedLanguageAndCountry?.language?.code === "ar" ? 'مركز المساعدة' : 'Help Center'}
          </div>
          <div onClick={() => { if (typeof window !== "undefined") {window.location.href = "/contact-us"}}} className={`text-sm font-normal text-center cursor-pointer ${isHome ? "text-black" : "text-white"} hover:text-orange-400 `} >
            {selectedLanguageAndCountry?.language?.code === "ar" ? 'اتصال' : 'Contact'}
          </div>
          <HeaderMore isHome={isHome}/>
          <div onClick={() =>  { if (typeof window !== "undefined") {window.location.href = "/settings"}}}>
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
      </div>
    </div>
  );
};
const Header = () => {
  return (
    <StoreProvider>
      <HeaderChild />
    </StoreProvider>
  )
}
export default Header;
