"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import Mybookings from './contents/Mybookings'

const page = () => {
    return (
        <div className='container px-4 mx-auto md:px-0'>
            <StoreProvider>
                <Mybookings />
            </StoreProvider>
        </div>
    )
}

export default page