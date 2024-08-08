"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import PopularDestinationMain from './contents/PopularDestinationMain'

const page = () => {
  return (
    <div className='container px-4 mx-auto md:px-0'>
        <StoreProvider>
            <PopularDestinationMain />
        </StoreProvider>
    </div>
  )
}

export default page