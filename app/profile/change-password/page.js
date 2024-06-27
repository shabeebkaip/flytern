"use client"
import React from 'react'
import ChangePassword from './contents/ChangePassword'
import { SnackbarProvider } from 'notistack'
import StoreProvider from '@/app/StoreProvider'

const page = () => {
    return (
        <div className=' container mx-auto'>
            <SnackbarProvider>
                <StoreProvider>
                    <ChangePassword />
                </StoreProvider>
            </SnackbarProvider>

        </div>
    )
}

export default page