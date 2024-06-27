import SuspenseLoader from "@/app/shared/components/SuspenseLoader";
import React, { useEffect, useState } from "react";
import { viewCoPaxApi } from "../api";
import { useAppSelector } from "@/lib/hooks";
import TitleCard from "@/app/shared/components/TitleCard";
import EditCopax from "../components/EditCopax";

const CopaxEdit = (params) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0); // scroll to top of page
      viewCoPaxApi(params.params, setData, setLoader);
    }
  }, []);
  const { translation } = useAppSelector((state) => state.sharedState)
  return (
    <>
      {loader ? (
        <SuspenseLoader />
      ) : (
        <div className={`${selectedLanguageAndCountry?.language?.code === "ar"  ? 'rtl font-arabic' : 'font-inter'} mt-8`}>
          <div className="flex text-neutral-400 text-[10px] sm:text-[13px] font-normal gap-1">

            {" "}
            <h3 onClick={() => typeof window !== 'undefined' && (window.location.href = '/')} className="cursor-pointer">{translation?.home}</h3>

            <h3>/</h3>

            {" "}
            <h3 onClick={() => typeof window !== 'undefined' && (window.location.href = '/profile')} className="cursor-pointer">{translation?.my_profile}</h3>

            <h3>/</h3>

            {" "}
            <h3 onClick={() => typeof window !== 'undefined' && (window.location.href = '/profile/co-pax')} className="cursor-pointer"  >{translation?.copax}</h3>

            <h3>/</h3>
            <h3 className=" text-black text-[10px] sm:text-[13px] font-medium ">
              {translation?.edit_copax}
            </h3>
          </div>
          <TitleCard title={translation?.edit_copax}>
            <div>
              <EditCopax coPax={data} />
            </div>
          </TitleCard>
        </div>
      )}
    </>
  );
};

export default CopaxEdit;
