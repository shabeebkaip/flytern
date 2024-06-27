import SideBar from '@/app/shared/components/SideBar'
import React from 'react'
import ChangePasswordForm from '../components/ChangePasswordForm'
import { profileSidebarData } from '@/lib/constants'
import { useAppSelector } from '@/lib/hooks'


const ChangePassword = () => {
    const  { translation} = useAppSelector((state) =>  state.sharedState)
    return (
        <div className='mt-12 mb-8'>
            <div className='flex items-center gap-1 text-sm font-normal text-neutral-400'>
                <h3 className='cursor-pointer' onClick={()=>navigate('/')}>{translation?.home}</h3>
                <h3>/</h3>
                <h3 className='font-medium text-black cursor-pointer'>{translation?.change_password}</h3>
            </div>
            <div className="grid grid-cols-10 gap-8 mt-8">
               <div className='hidden col-span-2 lg:block'>
                   <SideBar sideBarList={profileSidebarData}/>
               </div>
               <div className='col-span-10 lg:col-span-8'>
                   <ChangePasswordForm/>
               </div>
            </div>
        </div>
    )
}

export default ChangePassword