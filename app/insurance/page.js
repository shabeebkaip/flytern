"use client"
import React from 'react'
import Insurance from './contents/Insurance'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className=' container mx-auto px-3 md:px-0'>
            <StoreProvider>
                <Insurance />
            </StoreProvider>
        </div>
    )
}

export default page