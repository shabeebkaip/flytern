
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers';
import { fetchExploresApi } from '@/app/shared/api';
import { Suspense } from 'react';
const Home = dynamic(() => import('@/app/home/container/Home'))



const MainHome = async () => {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken');
  if (!accessTokenCookie) {
    throw new Error('Missing accessToken cookie');
  }
  const myCookie = accessTokenCookie.value.replace(/(^")|("$)/g, '');
  const data = await fetchExploresApi(myCookie);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Home service={"flight"} data={data} />
      </div>
    </Suspense>
  )
}

export default MainHome