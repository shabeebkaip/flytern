"use client"
import React from 'react'
import TravelStories from './contents/TravelStories'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className='container px-4 mx-auto sm:px-0'>
            <StoreProvider>
                <TravelStories />
            </StoreProvider>
        </div>
    )
}

export default page