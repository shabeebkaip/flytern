import { TermsAndConditionIconSvg } from '@/app/shared/components/SVG'
import TitleCard from '@/app/shared/components/TitleCard'
import React, { useEffect } from 'react'
import { useAppSelector } from '@/lib/hooks';



const About = ({ terms }) => {
    const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);
    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'}`}>
            <TitleCard
                title={
                    <>
                        <div className="flex items-center gap-2 ">
                            <TermsAndConditionIconSvg color={"#066651"} />
                            <h4>{translation?.about_us}</h4>
                        </div>
                    </>
                }
            >
                {terms && (
                    <div
                        className="mt-4 "
                        dangerouslySetInnerHTML={{ __html: terms }}
                    >

                    </div>
                )}
            </TitleCard>
        </div>
    )
}

export default About
