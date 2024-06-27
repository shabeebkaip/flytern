"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import PopularDestinationMain from './contents/PopularDestinationMain'

const page = () => {
  return (
    <div className=' container mx-auto'>
        <StoreProvider>
            <PopularDestinationMain />
        </StoreProvider>
    </div>
  )
}

export default page