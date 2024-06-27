"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import Reset from './contents/Reset'

const page = () => {
  return (
    <div>
        <StoreProvider>
            <Reset/>
        </StoreProvider>
    </div>
  )
}

export default page