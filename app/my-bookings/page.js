"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import Mybookings from './contents/Mybookings'
import { SnackbarProvider } from 'notistack'

const page = () => {
    return (
        <div className='container px-4 mx-auto  md:px-0'>
            <SnackbarProvider>
                <StoreProvider>
                    <Mybookings />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page