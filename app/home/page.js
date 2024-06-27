"use client"
import dynamic from 'next/dynamic'
const Home = dynamic(() => import('@/app/home/container/Home'))

const MainHome = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default MainHome