"use client"
import React from 'react'
import PrivacyAndPolicy from '../components/PrivacyAndPolicy'
import StoreProvider from '@/app/StoreProvider'

const PrivacyPolicy = () => {
    return (
        <div className='container mx-auto'>
            <StoreProvider>
                <PrivacyAndPolicy />
            </StoreProvider>
        </div>
    )
}

export default PrivacyPolicy