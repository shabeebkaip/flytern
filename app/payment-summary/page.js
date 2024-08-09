import React from 'react'
import axios from 'axios';
import { cookies } from 'next/headers';
import PaymentSummary from './contents/PaymentSummary';
import { decryptId } from '@/lib/utils';

const page = async ({ searchParams, params }) => {
    const { ref } = searchParams;
    const [extractedRef, bookingNumber] = ref ? ref.split('/') : [null, null];
    const decryptedRef = decryptId(ref);
    console.log(decryptedRef,'ll');
   
    
    
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken');
    if (!accessTokenCookie) {
        throw new Error('Missing accessToken cookie');
    }
    const myCookie = accessTokenCookie.value.replace(/(^")|("$)/g, '');

    let paymentSummary;
    let bookingRef;
    let redirection = null;

    try {
        if (bookingNumber) {
            console.log(bookingNumber);
            
            const response = await axios.post(`https://flytern.com/coreapi/api/Payments/CheckGatewayStatus`, { bookingRef: bookingNumber },
                {
                    headers: {
                        Authorization: `Bearer ${myCookie}`,
                    },
                }
            )
            bookingRef = response.data.data.bookingRef
            console.log(response.data.data);
            
            if (response.data.data.isSuccess) {
                const response = await axios.post(`https://flytern.com/coreapi/api/Payments/Confirmation`, { bookingRef: bookingRef },
                    {
                        headers: {
                            Authorization: `Bearer ${myCookie}`,
                        },
                    }
                );
                paymentSummary = response.data.data
                console.log(paymentSummary);
                
            } else {
                console.log("error");
                const decryptedRefs = decryptId(bookingRef);
                console.log(decryptedRefs);
                
                redirection=`/payment-method/?ref=${decryptedRefs}`;
                
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
            <PaymentSummary paymentStatus={paymentSummary} redirection={redirection} />
        </div>
    )
}

export default page