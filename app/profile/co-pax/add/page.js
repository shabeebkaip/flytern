"use client"
import StoreProvider from '@/app/StoreProvider'
import React from 'react'
import AddEditCoPax from './components/AddEditCoPax'
import { SnackbarProvider } from 'notistack'
import AddCoPax from './contents/AddCoPax'

const page = () => {
  return (
    <div className='container px-4 mx-auto md:px-0 '>
        <SnackbarProvider>
            <StoreProvider>
                <AddCoPax/>
            </StoreProvider>
        </SnackbarProvider>
    </div>
  )
}

export default page