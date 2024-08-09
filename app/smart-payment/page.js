"use client"
import React from 'react'
import SmartPayment from './contents/SmartPayment'
import StoreProvider from '../StoreProvider'
import { SnackbarProvider } from 'notistack'

const page = () => {
  return (
    <div className=' container mx-auto px-4 md:px-0'>
      <SnackbarProvider>
        <StoreProvider>
          <SmartPayment />
        </StoreProvider>
      </SnackbarProvider>
    </div>
  )
}

export default page