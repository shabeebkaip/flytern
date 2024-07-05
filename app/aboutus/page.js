"use client"
import React from 'react'
import AboutUs from './contents/AboutUs'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className='container mx-auto'>
            <StoreProvider>
                <AboutUs />
            </StoreProvider>

        </div>
    )
}

export default page
