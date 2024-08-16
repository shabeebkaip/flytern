"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SideBar = ({ sideBarList }) => {
  const pathname = usePathname()
  const [activeRoute, setActiveRoute] = useState(pathname)

  useEffect(() => {
    setActiveRoute(pathname)
  }, [pathname])
  const activeColor = 'rgba(255, 145, 44, 1)'
  return (
    <div className='container flex-col hidden px-4 mx-auto overflow-hidden bg-white rounded-lg 2xl:px-8 lg:flex'>
      {sideBarList.map((item, index) => {
        const isActive = item.route.toLowerCase() === activeRoute.toLowerCase()
        return (
          <Link href={item.route} key={index}>
            <div className='flex items-center w-full gap-2 py-5 border-b cursor-pointer border-zinc-100'>
              {React.cloneElement(item.image, { color: isActive ? activeColor : 'currentColor' })}
              <h3 className={`transition-colors ${isActive ? 'text-[#FF901C]' : ''}`}>{item.name}</h3>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default SideBar