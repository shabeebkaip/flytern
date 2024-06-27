import TitleCard from "@/app/shared/components/TitleCard"
import { useAppSelector } from "@/lib/hooks"

const CabinCard = ({ cabin }) => {
  const  { translation} = useAppSelector((state) =>  state.sharedState)
  return (
    <TitleCard
      title={
        <>
          <div className='flex items-center gap-2 flex-start '>
            <h4 className='text-base font-medium text-black sm:text-lg '> {translation?.selected_cabin} </h4>

          </div>
        </>
      }
    >
      <h4 className='mt-4 font-semibold'>{cabin}</h4>
    </TitleCard>

  )
}

export default CabinCard