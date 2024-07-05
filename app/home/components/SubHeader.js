"use client"
import Image from 'next/image';
import { useAppSelector } from "@/lib/hooks";
import StoreProvider from "@/app/StoreProvider";

const SubHeaderChild = ({ }) => {
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <div className="w-full h-[55px] bg-emerald-800 shadow border-b border-neutral-200 text-white hidden md:block">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        <div className="flex items-center justify-between gap-10">
          <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/flights" } }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Image width={20} height={20} src={"/icons/flight.svg"} alt="flight" className=" flight" />
            <p className="">
              {translation?.flights}
            </p>
          </div>
          <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/hotels" } }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Image width={20} height={20} src={"/icons/Buildings.svg"} alt="flight" className=" hotel" />
            <p className="">
              {translation?.hotels}
            </p>
          </div>
          <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/packages" } }} >
            <div
              className="flex items-center gap-3 cursor-pointer"
            //  onClick={() => lang ? navigate(`/${lang}/packages`) : navigate("/packages")}
            >
              <Image width={20} height={20} src={"/icons/Suitcase Tag.svg"} alt="flight" className="packages" />
              <p className="">
                {translation?.packages}
              </p>
            </div>
          </div>
          <div onClick={() => { if (typeof window !== "undefined") { window.location.href = "/insurance" } }}>
            <div
              className="flex items-center gap-3 cursor-pointer"
            // onClick={() => lang ? navigate(`/${lang}/insurance`) : navigate("/insurance")}
            >
              <Image width={20} height={20} src={"/icons/Heart Pulse.svg"} alt="flight" className="insurance" />
              <p className="cursor-pointer">
                {translation?.travel_insurance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

const SubHeader = () => {
  return (
    <StoreProvider>
      <SubHeaderChild />
    </StoreProvider>
  );
};

export default SubHeader;
