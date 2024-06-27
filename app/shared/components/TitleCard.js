
import Subtitle from "@/app/shared/components/Subtitle";
function TitleCard({ title, children, topMargin, TopSideButtons, target = "" }) {
  return (
    <div className={"card relative w-full p-6 bg-base-100 bg-white rounded-lg cursor-pointer" + (topMargin || "mt-6")} id={target} >
      {/* Title for Card */}
      <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
        {title}
        {/* Top side button, show only if present */}
        {TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>}
      </Subtitle>
      {
        title ?
          <div>
            <div className='w-[38px] h-[3px] bg-orange-400 mt-3'></div>
            <div className='w-full h-[1px] bg-slate-200'></div>
          </div> : null
      }


      {/** Card Body */}
      <div className='w-full pb-1 bg-base-100'>
        {children}
      </div>
    </div>
  )
}

export default TitleCard