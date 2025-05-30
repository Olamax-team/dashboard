import QueryProvider from '@/provider/query-provider';
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner';

const Layout = () => {
  

  return (
    <React.Fragment>
      <QueryProvider>
        <Toaster richColors expand={true} />
        <Outlet/>
      </QueryProvider>
    </React.Fragment>
  )
}

export default Layout;