import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/lib/hooks'
import SuspenseLoader from '@/app/shared/components/SuspenseLoader'
import { getProfileDetailApi } from '../../api'
import ProfileInputs from '../components/ProfileInputs'

const EditProfile = () => {
    const dispatch = useDispatch()
    const { loading, profile } = useAppSelector(state => state.profileState)
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            dispatch(getProfileDetailApi)
        }
    }, [dispatch])

    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div className={`${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} `}>
            {
                loading ?
                    <SuspenseLoader /> :
                    <>
                        <div className='flex text-neutral-400 text-[13px] font-normal gap-1 mt-12'>
                            <h3 className='cursor-pointer' onClick={() => typeof window !== 'undefined' && (window.location.href = '/')}>{translation?.home}</h3>
                            <h3>/</h3>
                            <h3 className='cursor-pointer' onClick={() => typeof window !== 'undefined' && (window.location.href = '/profile')}>{translation?.my_profile}</h3>
                            <h3>/</h3>
                            <h3 className=' text-black text-[13px] font-medium '>{translation?.edit_profile}</h3>
                        </div>
                        <div className='overflow-hidden bg-white rounded-md mt-[30px] mb-10 container mx-auto p-4 grid grid-cols-10'>
                            <div className='col-span-9'>
                                {Object.keys(profile).length && <ProfileInputs />}
                            </div>
                            <div></div>
                        </div>
                    </>
            }
        </div>
    )
}

export default EditProfile