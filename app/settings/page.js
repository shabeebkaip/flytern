"use client"
import React from 'react'
import Settings from './contents/Settings'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className=' container mx-auto'>
            <StoreProvider>
                <Settings />
            </StoreProvider>
        </div>
    )
}

export default page