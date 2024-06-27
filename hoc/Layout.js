import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <div className='container px-4 mx-auto'>
        {children}
      </div>
    </div>
  )
}

export default Layout