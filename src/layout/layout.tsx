import QueryProvider from '@/provider/query-provider';
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  

  return (
    <React.Fragment>
      <QueryProvider>
        <Outlet/>
      </QueryProvider>
    </React.Fragment>
  )
}

export default Layout;