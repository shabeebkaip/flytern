"use client"
import React from 'react'
import TravelStories from './contents/TravelStories'
import StoreProvider from '@/app/StoreProvider'

const page = () => {
    return (
        <div className=' container mx-auto px-3 md:px-0'>
            <StoreProvider>
                <TravelStories />
            </StoreProvider>
        </div>
    )
}

export default page