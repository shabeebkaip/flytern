"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import HelpCenter from './contents/HelpCenter'
import { SnackbarProvider } from 'notistack'

const page = () => {
    return (
        <div className=' container mx-auto'>
            <SnackbarProvider maxSnack={3}>
                <StoreProvider>
                    <HelpCenter />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page