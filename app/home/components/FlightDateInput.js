import Image from "next/image";


const FlightDateInput = ({ label, value, openCalendar, id }) => {
  return (
    <div className=" h-14 p-2  w-full relative bg-white rounded-[5px] border border-zinc-100 justify-start items-center gap-2.5 inline-flex cursor-pointer" onClick={openCalendar} id={id} >
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-[7px] inline-flex">
        <div className="justify-start items-center gap-2.5 inline-flex">
          <div className="flex items-center justify-center w-5 h-5">
            <div className="relative w-5 h-5">
              <Image width={50} height={50} src={"/icons/calendar.svg"} alt='' />
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-xs font-normal text-gray-500 xl:text-sm ">{label}</div>
            <div className="text-xs font-medium text-black xl:text-sm">{value}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightDateInput;