"use client"
import React from 'react'
import CopaxEdit from './contents/CopaxEdit'
import StoreProvider from '@/app/StoreProvider'
import { SnackbarProvider } from 'notistack'

const page = ({params}) => {
    return (
        <div className='container px-4 mx-auto  md:px-0'>
            <SnackbarProvider>
                <StoreProvider>
                    <CopaxEdit params={params.id} />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page