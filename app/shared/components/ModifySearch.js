import React from 'react'
import { EditIconSvg } from '@/app/shared/components/SVG'
import { Tooltip } from '@mui/material'

const ModifySearch = ({ setShowSearchCard, showSearchCard }) => {
  return (
    <>
      <Tooltip  title="Modify Search" arrow>
        <div
          className="flex items-center justify-center w-10 h-10 bg-white rounded-md cursor-pointer"
          onClick={() => setShowSearchCard(!showSearchCard)}
        >
          <EditIconSvg color="black" />
        </div>

      </Tooltip>
    </>
  )
}

export default ModifySearch