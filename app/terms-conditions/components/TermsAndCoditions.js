import { TermsAndConditionIconSvg } from '@/app/shared/components/SVG'
import TitleCard from '@/app/shared/components/TitleCard'
import { useAppSelector } from '@/lib/hooks';
import React from 'react'

const TermsAndCoditions = ({ terms }) => {
    const { translation } = useAppSelector((state) => state.sharedState)
    const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
    return (
        <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} container mx-auto`}>
            <TitleCard
                title={
                    <>
                        <div className='flex items-center gap-2 '>
                            <TermsAndConditionIconSvg color={'#066651'} />
                            <h4>{translation?.terms_conditions}</h4>
                        </div>

                    </>
                }
            >
                {terms && <div className='mt-4 ' dangerouslySetInnerHTML={{ __html: terms }}></div>}

            </TitleCard>
        </div>
    )
}

export default TermsAndCoditions
