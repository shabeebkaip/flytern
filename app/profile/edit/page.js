"use client"
import React from 'react'
import EditProfile from './contents/EditProfile'
import { SnackbarProvider } from 'notistack'
import StoreProvider from '@/app/StoreProvider'

const page = () => {
    return (
        <div className=' container mx-auto'>
            <SnackbarProvider>
                <StoreProvider>
                    <EditProfile />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page