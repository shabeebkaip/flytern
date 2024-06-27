import React from 'react'
import { useSelector } from 'react-redux';
import { InclusionIconSvg } from '@/app/shared/components/SVG';
import TitleCard from '@/app/shared/components/TitleCard';

const Inclusion = () => {
    const { packageDetails: { packagesDtl = [] } } = useSelector((state) => state.packageState);
    const  { translation} = useSelector((state) =>  state.sharedState)
    return (
        <TitleCard
            topMargin='mt-0'
            title={
                <>
                    <div className='flex items-center gap-2 '>
                        <InclusionIconSvg color={'#066651'} />
                        <h4>{translation?.inclusion}</h4>
                    </div>

                </>
            }
        >
            <div className='container p-5 mx-auto'>
                    <div className='text-sm sm:text-base' dangerouslySetInnerHTML={{ __html: packagesDtl[0] && packagesDtl[0].inclusion && packagesDtl[0].inclusion }}></div>
                  

            </div>


        </TitleCard>
    )
}

export default Inclusion