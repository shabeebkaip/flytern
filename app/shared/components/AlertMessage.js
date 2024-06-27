import React from 'react'

const AlertMessage = ({message}) => {
  return (
    <div className='w-full p-3 text-center text-orange-400 bg-orange-400 rounded-md bg-opacity-10' >
      <div dangerouslySetInnerHTML={{__html : message}}>
      </div>
    </div>
  )
}

export default AlertMessage