import React from 'react'
import Header from './Header'
import { fetchCountryApi, fetchExploresApi, fetchInitialInfoApi, fetchProfileDetailApi, getFetchLanguagesApi } from '@/app/shared/api'
import { getCookie } from '@/lib/cookie';

const HeaderParent = async () => {
  const accessToken = getCookie('accessToken')
  const isUserLoggedIn = getCookie('isUserLoggedIn')
  const selectedLanguageAndCountry = await getFetchLanguagesApi(accessToken)
  const exploresData = await fetchExploresApi(accessToken)
  let profile = {}
  if (isUserLoggedIn) {
    profile = await fetchProfileDetailApi(accessToken)
  }
  const initialInfo = await fetchInitialInfoApi(accessToken)
  const countries = await fetchCountryApi(accessToken)
  return (
    <div>
      <Header
        selectedLanguageAndCountry={selectedLanguageAndCountry}
        exploresData={exploresData}
        profile={profile}
        initialInfo={initialInfo}
        countries={countries}
      />
    </div>
  )
}

export default HeaderParent