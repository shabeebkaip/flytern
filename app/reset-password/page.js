"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import Reset from './contents/Reset'
import { SnackbarProvider } from 'notistack'

const page = () => {
  return (
    <div>
        <StoreProvider>
          <SnackbarProvider>
            <Reset/>
          </SnackbarProvider>
        </StoreProvider>
    </div>
  )
}

export default page