import React from 'react'
import { EditIconSvg } from '@/app/shared/components/SVG'
import { Tooltip } from '@mui/material'
import { useAppDispatch } from '@/lib/hooks'
import { setFlightSearch } from '@/lib/slices/exploreSlice'
import { getLocalStorageInfo } from '@/lib/utils'

const ModifySearch = ({ setShowSearchCard, showSearchCard, searchDatas }) => {
  const dispatch = useAppDispatch()
  const requestBody = getLocalStorageInfo("searchData")
  console.log(setShowSearchCard);
  console.log(showSearchCard);
  const handleModifySearch = () => {
    setShowSearchCard(!showSearchCard)
    dispatch(setFlightSearch(requestBody))

  }
  return (
    <>
      <Tooltip title="Modify Search" arrow>
        <div
          className="items-center justify-center hidden w-16 h-12 bg-white rounded-md cursor-pointer lg:flex md:w-10 md:h-10 "
          onClick={() => handleModifySearch()}
        >
          <EditIconSvg color="black" />
        </div>

      </Tooltip>
    </>
  )
}

export default ModifySearch