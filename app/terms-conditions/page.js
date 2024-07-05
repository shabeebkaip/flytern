"use client"
import React from 'react'
import TermsConditions from './contents/TermsConditions'
import StoreProvider from '../StoreProvider'

const page = () => {
  return (
    <div>
         <StoreProvider>
         <TermsConditions/>
         </StoreProvider>
       
    </div>
  )
}

export default page