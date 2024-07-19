import React, { useEffect } from 'react'
import About from '../components/About'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAboutApi } from '../api';
import { Aboutsuccess } from '@/lib/slices/genaralSlice';

const AboutUs = () => {

    const dispatch = useAppDispatch();
 

    useEffect(() => {
      const getTerms = async () => {
        const data = await getAboutApi();
  
        if (data) {
          dispatch(Aboutsuccess(data));
        }
      };
      getTerms();
    }, []);
    const terms = useAppSelector(
      (item) => item?.generalState?.aboutus?.information?.[0]?.content
    );
  return (
    <div>
        <About terms={terms}/>
    </div>
  )
}

export default AboutUs