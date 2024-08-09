
import dynamic from 'next/dynamic'
import { fetchExploresApi } from '@/app/shared/api';
import { getCookie } from '@/lib/cookie';
const Home = dynamic(() => import('@/app/home/container/Home'))



const MainHome = async () => {
  const myCookie = getCookie('accessToken');
  if (!myCookie) {
    return null
  }
  const data = await fetchExploresApi(myCookie);
  return (
    <div>
      <Home service={"flight"} data={data} />
    </div>
  )
}

export default MainHome