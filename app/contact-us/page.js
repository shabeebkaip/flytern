"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import ContactUs from './contents/ContactUs'

const page = () => {
  return (
    <div className='container px-4 mx-auto  md:px-0'>
        <StoreProvider>
            <ContactUs />
        </StoreProvider>
    </div>
  )
}

export default page