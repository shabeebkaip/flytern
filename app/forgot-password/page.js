"use client"
import React from 'react'
import ForgotPassword from './contents/ForgotPassword'
import StoreProvider from '../StoreProvider'
import { SnackbarProvider } from 'notistack'

const page = () => {
    return (
        <div>
            <SnackbarProvider>
                <StoreProvider>
                    <ForgotPassword />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page