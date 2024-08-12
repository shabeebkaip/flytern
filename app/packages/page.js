"use client"
import React from 'react'
import Packages from './container/Packages'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className=' container mx-auto px-4 md:px-0'>
            <StoreProvider>
                <Packages />
            </StoreProvider>
        </div>
    )
}

export default page