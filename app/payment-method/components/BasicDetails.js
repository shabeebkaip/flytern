import TitleCard from "@/app/shared/components/TitleCard"
import { useAppSelector } from "@/lib/hooks"


const BasicDetails = ({ data }) => {
  const  { translation} = useAppSelector((state) =>  state.sharedState)
  return (
    <div>
      <TitleCard title={translation?.basic_details} >
        <div className='flex flex-col gap-3 mt-4'>
             {
              data?.length ? data.map((item, index) => {
                return (
                  <div className='flex flex-col gap-1' key={index} >
                      <h4 className='font-semibold'>{item.policyName}</h4>
                      <div dangerouslySetInnerHTML={{__html: item.policyText}} ></div>
                  </div>
                )
              }) : null
             } 
        </div>
      </TitleCard>
    </div>
  )
}

export default BasicDetails