import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { setGlobalCookie } from '@/lib/utils';
import { generalSidebarData } from '@/lib/constants';
import Link from 'next/link';
import TitleCard from '@/app/shared/components/TitleCard';
import SideBar from '@/app/shared/components/SideBar';


const ContactUs = () => {
  const { languages } = useSelector((item) => item.sharedState);

  const [selectedLanguages, setSelectedLangauages] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [data, setData] = useState({
    "countryCode": "",
    "language": "",
    "notificationEnabled": false,
    "notificationToken": ""
  })

  const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
  useEffect(() => {
    // Set the default language to English when the component mounts
    setSelectedLanguage('English');
  }, []);

  const changeLanguage = (language) => {
    setSelectedLanguage(language.name);
    setSelectedLangauages(language)
    setGlobalCookie('language', JSON.stringify(language.code))

  };
  const { translation } = useSelector((state) => state.sharedState)
  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} mt-12`}>
      <div className='flex gap-1 mt-1 text-sm font-normal text-neutral-400'>
        <div onClick={() => window.location.href = "/"}><h3 className='cursor-pointer' >{translation?.home}</h3></div>
        <h3>/</h3>
        <h3 className='font-medium text-black cursor-pointer ' >{translation?.contact_us}</h3>

      </div>
      <div className="grid grid-cols-10 gap-8 mt-8 mb-8">
        <div className='hidden col-span-2 lg:block'>
          <SideBar sideBarList={generalSidebarData} />
        </div>
        <div className='flex flex-col col-span-10 gap-5 lg:col-span-8'>
          <TitleCard title={translation?.contact_us}>
            <div className='grid grid-cols-1 mt-10'>
              <div>
                <h2 className='mb-4 font-bold text-blue-700 '>{translation?.for_any}</h2>
                <div className="mb-2">
                  <h3 className='mb-2 font-bold'>{translation?.office_address}</h3>
                  <p className='mb-2'>Flytern for travel & tourism, Fahad Al Salm Street, Rehab, Kuwait City, Kuwait</p>
                </div>
                <div className='mb-2'>
                  <h3 className='mb-2 font-bold'>{translation?.phone_number}</h3>
                  <p><a href="tel:+965-22240111">+965-22240111</a></p>
                </div>
                <div className='mb-2'>
                  <h3 className='mb-2 font-bold t'>{translation?.email}: <a href='mailto:support@Flytern.com'>support@Flytern.com</a> </h3>
                </div>
              </div>
            </div>
          </TitleCard>
        </div>
      </div>
    </div>
  )
}

export default ContactUs