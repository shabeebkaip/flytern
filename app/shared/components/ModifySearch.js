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
          className="flex items-center justify-center w-16 h-12 bg-white rounded-md cursor-pointer md:w-10 md:h-10"
          onClick={() => setShowSearchCard(!showSearchCard)}
        >
          <EditIconSvg color="black" />
        </div>

      </Tooltip>
    </>
  )
}

export default ModifySearch