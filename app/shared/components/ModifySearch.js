import React from 'react'
import { EditIconSvg } from '@/app/shared/components/SVG'
import { Tooltip } from '@mui/material'

const ModifySearch = ({ setShowSearchCard, showSearchCard }) => {
  return (
    <>
      <Tooltip title="Modify Search" arrow>
        <div
          className="items-center justify-center hidden w-16 h-12 bg-white rounded-md cursor-pointer lg:flex md:w-10 md:h-10 lg:block"
          onClick={() => setShowSearchCard(!showSearchCard)}
        >
          <EditIconSvg color="black" />
        </div>
      </Tooltip>
    </>
  )
}

export default ModifySearch
