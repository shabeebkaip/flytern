import { cookies } from 'next/headers';
import axios from 'axios';
import PaymentMethod from './contents/PaymentMethod';
import CryptoJS from 'crypto-js';
import { decrypt, decryptUrl } from '@/lib/utils';

const page = async ({ searchParams }) => {
  try {
    const reference = searchParams?.ref;
    if (!reference) {
      throw new Error('Missing ref parameter');
    }

    const decryptedRef = decryptUrl(reference);
    console.log(decryptedRef, 'kk');

    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken');
    if (!accessTokenCookie) {
      throw new Error('Missing accessToken cookie');
    }

    const myCookie = accessTokenCookie.value.replace(/(^")|("$)/g, '');

    let gatewayList;
    try {
      const response = await axios.post(
        `https://flytern.com/coreapi/api/Payments/GetGateways`,
        { bookingRef: decryptedRef },
        {
          headers: {
            Authorization: `Bearer ${myCookie}`,
          },
        }
      );

      gatewayList = response.data.data;
    } catch (error) {
      console.error('Error calling getGatewayApi:', error);
      gatewayList = []; // or handle the error as appropriate
    }

    return (
      <div className='container mx-auto'>
        <PaymentMethod gatewayList={gatewayList} reference={decryptedRef} />
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error: {error.message}</div>;
  }
};

export default page;


