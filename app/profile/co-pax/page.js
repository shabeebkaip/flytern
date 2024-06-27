"use client"
import React from 'react'
import CoPaxList from './contents/CoPaxList'
import StoreProvider from '@/app/StoreProvider'

const page = () => {
    return (
        <div className=' container mx-auto'>
            <StoreProvider>
                <CoPaxList />
            </StoreProvider>
        </div>
    )
}

export default page