import React, { useEffect } from 'react'
import TermsAndCoditions from '../components/TermsAndCoditions'
import { useDispatch, useSelector } from 'react-redux'
import { getTermsApi } from '../api'
import { Termssuccess } from '@/lib/slices/genaralSlice'

const TermsConditions = () => {

    const dispatch  = useDispatch()
    

   
    useEffect(()=>{
      const getTerms=async()=>{
          const data = await getTermsApi()
          if(data){
              dispatch(Termssuccess(data))
          }
      }
     getTerms()
    },[]) 
    const terms = useSelector((item)=>item?.generalState?.Terms?.information?.[0]?.content)

    console.log(terms,"r")
  return (
    
    <div>
      <TermsAndCoditions terms={terms}/>
    </div>
  )
}

export default TermsConditions
