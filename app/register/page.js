"use client"
import React from 'react'
import Register from './contents/Register'
import StoreProvider from '../StoreProvider'
import { SnackbarProvider } from 'notistack'

const page = () => {
    return (
        <div className=''>
            <SnackbarProvider>
                <StoreProvider>
                    <Register />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page