import React from 'react'
import TitleCard from '@/app/shared/components/TitleCard';
import { ExclusionIconSvg } from '@/app/shared/components/SVG';
import { useAppSelector } from '@/lib/hooks';

const Exclusion = () => {
    const { packageDetails: { packagesDtl = [] } } = useAppSelector((state) => state.packageState);
    const { translation } = useAppSelector((state) => state.sharedState)
    return (
        <>
        {
            packagesDtl[0]?.notIncluded ? 
            <TitleCard

            topMargin='mt-0'
            title={
                <>
                    <div className='flex items-center gap-2 '>
                        <ExclusionIconSvg color={'#066651'} />
                        <h4>{translation?.exclusion}</h4>
                    </div>

                </>
            }
        >
            <div className='container p-5 mx-auto'>
                <div className='text-sm sm:text-base' dangerouslySetInnerHTML={{ __html: packagesDtl[0] && packagesDtl[0].notIncluded && packagesDtl[0].notIncluded }}></div>
            </div>

        </TitleCard> : null
        }
           
        </>

    )
}

export default Exclusion