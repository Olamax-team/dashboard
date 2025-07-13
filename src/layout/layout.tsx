import QueryProvider from '@/provider/query-provider';
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner';
import ModalLayout from './modal-layout';

const Layout = () => {
  

  return (
    <React.Fragment>
      <QueryProvider>
        <ModalLayout/>
        <Toaster richColors expand={true} />
        <Outlet/>
      </QueryProvider>
    </React.Fragment>
  )
}

export default Layout;