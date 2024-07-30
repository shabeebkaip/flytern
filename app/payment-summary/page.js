import React from 'react'
import axios from 'axios';
import { cookies } from 'next/headers';
import PaymentSummary from './contents/PaymentSummary';
import { decrypt } from '@/lib/utils';

const page = async ({ searchParams,params }) => {
    const { ref } = searchParams;
    const decryptedRef = decrypt(searchParams.ref);

    console.log(decryptedRef);

    const [extractedRef, bookingNumber] = ref ? ref.split('/') : [null, null];
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken');
    if (!accessTokenCookie) {
        throw new Error('Missing accessToken cookie');
      }
      const myCookie = accessTokenCookie.value.replace(/(^")|("$)/g, '');

    let paymentSummary;
    let bookingRef;
    try {
        if (bookingNumber) {
            const response = await axios.post(`https://flytern.com/coreapi/api/Payments/CheckGatewayStatus`,{ bookingRef: bookingNumber },
                {
                    headers: {
                        Authorization: `Bearer ${myCookie}`,
                    },
                }
            )
            bookingRef = response.data.data.bookingRef 
            if (response.data.data) {
                const response = await axios.post(`https://flytern.com/coreapi/api/Payments/Confirmation`, { bookingRef: bookingRef },
                    {
                        headers: {
                            Authorization: `Bearer ${myCookie}`,
                        },
                    }
                );
                paymentSummary = response.data.data
              } else {
                console.log("error");
                // window.location.href = `${window.location.origin}/payment-method/?ref=${extractedRef}`
              }

        } else {
            const response = await axios.post(`https://flytern.com/coreapi/api/Payments/Confirmation`, { bookingRef: decryptedRef },
                {
                    headers: {
                        Authorization: `Bearer ${myCookie}`,
                    },
                }
            );
            paymentSummary = response.data.data
        }
    } catch (error) {
        console.error('Error calling getgatewayApi:', error);
        paymentSummary = [];
    }
    return (
        <div className=' container mx-auto'>
           <PaymentSummary paymentStatus={paymentSummary} />
        </div>
    )
}

export default page