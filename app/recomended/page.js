"use client"
import React from 'react'
import RecomendedMain from './contents/RecomendedMain'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className=' container mx-auto'>
            <StoreProvider>
                <RecomendedMain />
            </StoreProvider>
        </div>
    )
}

export default page