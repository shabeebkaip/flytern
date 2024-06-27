"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import ContactUs from './contents/ContactUs'

const page = () => {
  return (
    <div className=' container mx-auto'>
        <StoreProvider>
            <ContactUs />
        </StoreProvider>
    </div>
  )
}

export default page