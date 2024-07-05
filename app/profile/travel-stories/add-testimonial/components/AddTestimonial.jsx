"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import SideBar from '@/app/shared/components/SideBar.js'
import TestimonialForm from './TestimonialForm'
import Link from 'next/link.js'
import { profileSidebarData } from '@/lib/constants'


const AddTestimonial = ({ type }) => {
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    const { translation } = useSelector((state) => state.sharedState)
    return (
        <div className='mt-12 mb-8'>

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1 text-[11px] sm:text-sm font-normal text-neutral-400'>
                    <h3 className='cursor-pointer' ><div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/" } }} >{translation?.home}</div></h3>
                    <h3>/</h3>
                    <h3>{type === "general" ? '' : 'My'} Travel Stories</h3>
                    <h3>/</h3>
                    <h3 className='font-medium text-black'>{selectedLanguageAndCountry?.language?.code === "ar" ? arabic_translation.add_testmonial : 'Add Testimonials'}</h3>
                </div>

            </div>
            <div className="grid grid-cols-10 gap-8 mt-8">
                <div className='col-span-2 '>
                    <SideBar sideBarList={type === "general" ? generalSidebarData : profileSidebarData} />
                </div>
                <div className='col-span-10 lg:col-span-8'>
                    <TestimonialForm />
                </div>
            </div>
        </div>
    )
}

export default AddTestimonial