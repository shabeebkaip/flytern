import React from 'react'
import Header from './Header'
import { getFetchLanguagesApi } from '@/app/shared/api'
import { getCookie } from '@/lib/cookie';

const HeaderParent = async () => {
  const accessToken = getCookie('accessToken')
  const selectedLanguageAndCountry = await getFetchLanguagesApi(accessToken)
  return (
    <div>
      <Header selectedLanguageAndCountry={selectedLanguageAndCountry} />
    </div>
  )
}

export default HeaderParent