"use client"
import React from 'react'
import EditProfile from './contents/EditProfile'
import { SnackbarProvider } from 'notistack'
import StoreProvider from '@/app/StoreProvider'

const page = () => {
    return (
        <div className='container px-4 mx-auto md:px-0'>
            <SnackbarProvider>
                <StoreProvider>
                    <EditProfile />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page