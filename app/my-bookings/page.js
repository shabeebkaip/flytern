"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import Mybookings from './contents/Mybookings'

const page = () => {
    return (
        <div className=' container mx-auto'>
            <StoreProvider>
                <Mybookings />
            </StoreProvider>
        </div>
    )
}

export default page