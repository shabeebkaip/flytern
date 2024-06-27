import React from "react";

const FlightServiceOption = ({ svgColor, handleService, SvgComp, backgorundColor, textColor, service }) => {


  return (
    <div className={` h-10 p-1 sm:p-5 flex justify-center items-center gap-1 sm:gap-2 rounded ${backgorundColor}   shadow-md ease-in duration-300 cursor-pointer hover:scale-105 `} onClick={handleService}  >
      <div className="block sm:hidden">
        <SvgComp color={svgColor} width='10' height="10" />
      </div>
      <div className="hidden sm:block">
        <SvgComp color={svgColor} width='20' height="20" />
      </div>
      <p className={`text-center ${textColor} text-[8px] sm:text-[13px] font-medium  capitalize`} >{service}</p>
    </div>
  )
}

export default FlightServiceOption;