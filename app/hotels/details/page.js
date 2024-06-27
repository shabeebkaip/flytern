import React from "react";
import dynamic from "next/dynamic";
import StoreProvider from "@/app/StoreProvider";


const HorelDetails = dynamic(() => import("@/app/hotels/details/container/HotelDetails"));

const page = ({ searchParams }) => {
  const { objId, ind } = searchParams

  return (
    <div className="container mx-auto px-4">
      <StoreProvider>
        <HorelDetails objId={objId} ind={ind} />
      </StoreProvider>
    </div>
  );
};

export default page;