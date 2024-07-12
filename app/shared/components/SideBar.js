"use client"
import Link from 'next/link'
import React, { useState } from 'react'
// import { BookingIconSvg, ChangePasswordIconSvg, ExtraMilesIconSvg, FaqIconSvg, CardSvg, RatingIconSvg, SettingsIconSvg, TravelAssistanceIconSvg, TravelStoriesIconSvg, TravelTipsIconSvg } from '../../../assets/svg'
// import { useLocation, useNavigate } from 'react-router-dom'

const SideBar = ({ sideBarList }) => {
  // const navigate = useNavigate()
  const location = typeof window !== 'undefined' ? window.location.href : '';
  const pathSegments = location?.pathname
  const [data, setData] = useState([
    ...sideBarList
  ])


  const copiedData = JSON.parse(JSON.stringify(sideBarList));

  const indexToUpdate = copiedData.findIndex((item) => item?.route?.toLowerCase() === pathSegments?.toLowerCase());
  if (indexToUpdate !== -1) {
    // Update the color of the found item

    copiedData[indexToUpdate].image.props.color = 'orange';

    // Update the state with the modified data


  }
  return (
    <div className='container flex-col hidden px-8 mx-auto overflow-hidden bg-white rounded-lg lg:flex '>
      {
        data.map((item, index) => {
          return (
            <div onClick={() => { if (typeof window !== "undefined")  {window.location.href = item.route }}} key={index}> 
            <div className='flex w-full gap-2 py-5 border-b cursor-pointer tems-center border-zinc-100'  key={index}>
              {item.image}
              <h3 className={`${item?.route.toLowerCase() === pathSegments?.toLowerCase() ? 'text-orange-500' : ''}`}>{item.name}</h3>
            </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default SideBar