import React from 'react'
import axios from 'axios';
import { cookies } from 'next/headers';
import PaymentSummary from './contents/PaymentSummary';
import { decryptId } from '@/lib/utils';

const page = async ({ searchParams, params }) => {
    const { ref, mode } = searchParams;
    const [extractedRef, bookingNumber] = ref ? ref.split('/') : [null, null];
    const decryptedRef = decryptId(ref);


    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken');
    if (!accessTokenCookie) {
        throw new Error('Missing accessToken cookie');
    }
    const myCookie = accessTokenCookie.value.replace(/(^")|("$)/g, '');

    let paymentSummary;
    let bookingRef = bookingNumber ? extractedRef : decryptedRef;
    let isSuccess;
  


    try {
        if (mode && mode === "view") {
            const response = await axios.post(`https://flytern.com/coreapi/api/Payments/Confirmation`, { bookingRef: decryptedRef },
                {
                    headers: {
                        Authorization: `Bearer ${myCookie}`,
                    },
                }
            );
            paymentSummary = response.data.data
        } else {
            if (bookingNumber) {
                const response = await axios.post(`https://flytern.com/coreapi/api/Payments/CheckGatewayStatus`, { bookingRef: bookingNumber },
                    {
                        headers: {
                            Authorization: `Bearer ${myCookie}`,
                        },
                    }
                )
                bookingRef = response.data.data.bookingRef
                isSuccess = response.data.data.isSuccess
                if (response.data.data.isSuccess) {
                    const response = await axios.post(`https://flytern.com/coreapi/api/Payments/Confirmation`, { bookingRef: bookingRef },
                        {
                            headers: {
                                Authorization: `Bearer ${myCookie}`,
                            },
                        }
                    );
                    paymentSummary =  response.data.data
                  

                } else {
                    console.log("error");
                    // window.location.href = `${window.location.origin}/payment-method/?ref=${extractedRef}`
                }

            }
        }
    } catch (error) {
        console.error('Error calling getgatewayApi:', error);
        paymentSummary = [];
    }
    return (
        <div className=' container mx-auto'>
            <PaymentSummary paymentStatus={paymentSummary} isSuccess={isSuccess} bookingRef={bookingRef} />
        </div>
    )
}

export default page