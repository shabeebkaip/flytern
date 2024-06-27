"use client"
import React from 'react'
import PackageDetails from './contents/PackageDetails';
import StoreProvider from '@/app/StoreProvider';

const page = ({ params }) => {
  return (
    <div>
      <StoreProvider>
        <PackageDetails id={params} />
      </StoreProvider>
    </div>
  )
}

export default page