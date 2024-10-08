"use client"
import React from 'react'
import CoPaxList from './contents/CoPaxList'
import StoreProvider from '@/app/StoreProvider'

const page = () => {
    return (
        <div className='container px-4 mx-auto  sm:px-0'>
            <StoreProvider>
                <CoPaxList />
            </StoreProvider>
        </div>
    )
}

export default page