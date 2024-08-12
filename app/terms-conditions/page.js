"use client"
import React from 'react'
import TermsConditions from './contents/TermsConditions'
import StoreProvider from '../StoreProvider'

const page = () => {
  return (
    <div className='px-4 py-8 md:px-0'>
         <StoreProvider>
         <TermsConditions/>
         </StoreProvider>
       
    </div>
  )
}

export default page