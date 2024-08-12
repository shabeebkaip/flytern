"use client"
import React from 'react'
import RecomendedMain from './contents/RecomendedMain'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className='container px-4 mx-auto md:px-0'>
            <StoreProvider>
                <RecomendedMain />
            </StoreProvider>
        </div>
    )
}

export default page