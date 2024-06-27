import React from "react";
import dynamic from "next/dynamic";
import StoreProvider from "@/app/StoreProvider";

const HotelSearch = dynamic(() =>
  import("@/app/hotels/search/container/HotelSearch")
);

const page = ({searchParams}) => {
  const { objId, ind} =  searchParams
  return (
    <div className="container mx-auto">
      <StoreProvider>
        <HotelSearch />
      </StoreProvider>
    </div>
  );
};

export default page;
