"use client"
import React from 'react'
import Otp from './contents/Otp'
import StoreProvider from '@/app/StoreProvider'

const page = () => {
    return (
        <div>
            <StoreProvider>
                <Otp />
            </StoreProvider>
        </div>
    )
}

export default page