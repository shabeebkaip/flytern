import React from 'react'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers';
import { fetchExploresApi } from '@/app/shared/api';
import { Suspense } from 'react';

const HotelHome = dynamic(() => import('@/app/home/container/Home'))

const page = async () => {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken');
  if (!accessTokenCookie) {
    throw new Error('Missing accessToken cookie');
  }
  const myCookie = accessTokenCookie.value.replace(/(^")|("$)/g, '');
  const data = await fetchExploresApi(myCookie);
  return (
    <div><HotelHome service="hotel" data={data} /></div>
  )
}

export default page