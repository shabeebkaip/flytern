import React from 'react';
import dynamic from 'next/dynamic';

const FlightResults = dynamic(() => import('@/app/flights/search/container/FlightResults'));

const Page =  () => {
  return (
    <div>
      <FlightResults />
    </div>
  );
};

export default Page;