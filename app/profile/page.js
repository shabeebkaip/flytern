"use client"
import { SnackbarProvider } from 'notistack'
import React from 'react'
import Profile from './contents/Profile'
import StoreProvider from '../StoreProvider'

const page = () => {
    return (
        <div className='container px-4 mx-auto  md:px-0'>
            <SnackbarProvider>
                <StoreProvider>
                    <Profile />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page