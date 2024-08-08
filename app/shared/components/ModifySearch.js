import React from 'react'
import { EditIconSvg } from '@/app/shared/components/SVG'
import { Tooltip } from '@mui/material'

const ModifySearch = ({ setShowSearchCard, showSearchCard }) => {
  console.log(setShowSearchCard);
  console.log(showSearchCard);
  return (
    <>
      <Tooltip  title="Modify Search" arrow>
        <div
          className="flex items-center justify-center w-20 h-10 bg-white rounded-md cursor-pointer sm:h-12 sm:w-16 md:w-10 md:h-10"
          onClick={() => setShowSearchCard(!showSearchCard)}
        >
          <EditIconSvg color="black" />
        </div>

      </Tooltip>
    </>
  )
}

export default ModifySearch