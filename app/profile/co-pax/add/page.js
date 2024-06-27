"use client"
import StoreProvider from '@/app/StoreProvider'
import React from 'react'
import AddEditCoPax from './components/AddEditCoPax'
import { SnackbarProvider } from 'notistack'

const page = () => {
  return (
    <div className=' container mx-auto'>
        <SnackbarProvider>
            <StoreProvider>
                <AddEditCoPax/>
            </StoreProvider>
        </SnackbarProvider>
    </div>
  )
}

export default page