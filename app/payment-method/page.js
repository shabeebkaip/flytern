import { cookies } from 'next/headers';
import axios from 'axios';
import { decryptId } from '@/lib/utils';
import PaymentMethod from './contents/PaymentMethod';


const page = async ({ searchParams }) => {
  const refrence  = searchParams?.ref;
  try {
    if (!refrence) {
      throw new Error('Missing ref parameter');
    }
    const decryptedRef = decryptId(refrence);
    
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken');
    if (!accessTokenCookie) {
      throw new Error('Missing accessToken cookie');
    }
    const myCookie = accessTokenCookie.value.replace(/(^")|("$)/g, '');
    let gatewayList;
 
    
    try {
      

      const response = await axios.post(`https://flytern.com/coreapi/api/Payments/GetGateways`, { bookingRef: decryptedRef },
        {
          headers: {
            Authorization: `Bearer ${myCookie}`,
          },
        });


      gatewayList = response.data.data;
  
      
    } catch (error) {
      console.error('Error calling getgatewayApi:', error);
      gatewayList = []; // or handle the error as appropriate
    }
    

    return (
      <div className=' container mx-auto'>
        <PaymentMethod gatewayList={gatewayList} refrence={decryptedRef}  />
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <div>Error: {error.message}</div>
    );
  }
};

export default page;
