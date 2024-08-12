"use client"
import React from 'react'
import AboutUs from './contents/AboutUs'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className='container px-4 py-8 mx-auto md:px-0'>
            <StoreProvider>
                <AboutUs />
            </StoreProvider>

        </div>
    )
}

export default page
