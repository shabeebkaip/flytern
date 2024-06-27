"use client"
import React from 'react'
import Login from './contents/Login'
import StoreProvider from '../StoreProvider'
import { SnackbarProvider } from 'notistack'

const page = () => {
    return (
        <div>
            <SnackbarProvider>
                <StoreProvider>
                    <Login />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page