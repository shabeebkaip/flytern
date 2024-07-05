import TitleCard from "@/app/shared/components/TitleCard";
import { useAppSelector } from "@/lib/hooks";

const RoomRateConditions = ({ data }) => {
  console.log(data,"j")
  const  { translation} = useAppSelector((state) =>  state.sharedState)
  return (
    <div>
      <TitleCard title={translation?.room_rate_conditions} >
        <div className='flex flex-col gap-5 mt-4'>
          <ul className='flex flex-col gap-5 ml-6 list-disc list-outside marker:text-green' >
            {
              data?.length ? data.map((item, index) => {
                const htmlData = item
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&amp;/g, '&') // Also convert &amp; to &
                  .replace(/&quot;/g, '"') // Convert &quot; to "
                  .replace(/&#39;/g, "'")
                  .replace(/&apos;/g, "'")
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&copy;/g, '©')
                  .replace(/&reg;/g, '®')
                  .replace(/&euro;/g, '€');
                return (
                  <li className='break-words list-disc marker:text-green-800 ' dangerouslySetInnerHTML={{ __html: htmlData }} key={index} />
                )
              }) : null
            }
          </ul>

        </div>
      </TitleCard>
    </div>
  )
}

export default RoomRateConditions