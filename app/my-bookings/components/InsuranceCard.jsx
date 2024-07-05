import LabelValue from '@/app/shared/components/LabelValue'
import { HeartIconSvg } from '@/app/shared/components/SVG'
import TitleCard from '@/app/shared/components/TitleCard'
import React from 'react'
import { useSelector } from 'react-redux'


const InsuranceCard = ({ item }) => {
    const { selectedLanguageAndCountry } = useSelector(state => state.sharedState)
    return (
        <TitleCard
            topMargin='mt-0'
            title={
                <>
                    <div className='flex items-center gap-2 '>
                        <HeartIconSvg color={'#066651'} />
                        <h4>{selectedLanguageAndCountry?.language?.code === "ar" ? "قائمة السياسات" : "Policy List"}</h4>
                    </div>

                </>
            } >
            <div className='mt-8 '>
                <div className="grid w-full grid-cols-10 gap-5">
                    <div className="grid w-full grid-cols-2 col-span-8 gap-6 text-xs font-normal text-zinc-600 sm:text-base">
                        {item._Listrecords.map((items, index) => (
                            <div className='' key={index}>
                                <LabelValue label={items.title} value={items.information} />
                            </div>
                        ))}

                    </div>


                </div>

            </div>

        </TitleCard>
    )
}

export default InsuranceCard