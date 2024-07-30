import { cookies } from 'next/headers';
import axios from 'axios';
import PaymentMethod from './contents/PaymentMethod';
import CryptoJS from 'crypto-js';


const page = async ({ searchParams }) => {

  const secretKey = 'crypto@123#';


  const decrypt = (ciphertext) => {
    console.log(ciphertext);
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  try {
    const refrence = searchParams?.ref;
    if (!refrence) {
      throw new Error('Missing ref parameter');
    }
    const encodedRef = encodeURIComponent(refrence);
    const decryptedRef = decrypt(encodedRef);
    console.log(encodedRef);
    console.log(decryptedRef);

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
        <PaymentMethod gatewayList={gatewayList} refrence={decryptedRef} />
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
