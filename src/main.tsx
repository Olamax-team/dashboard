import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Layout from './layout/layout.tsx'
import Authenticate from './components/pages/auth/authenticate.tsx'
import Passphrase from './components/pages/auth/passphrase.tsx'

import Escrow from './components/pages/dash-board/escrow/escrow.tsx'
import DashboardLayout from './layout/dash-board-layout.tsx'
import DashboardHome from './components/pages/dash-board/pending/home.tsx'
import TransHistory from './components/pages/dash-board/transHistory/transHistory.tsx'


const router = createBrowserRouter([
  
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <App/>
      },
      {
        path: '/authenticate',
        element: <Authenticate/>
      },
      {
        path: '/passphrase',
        element: <Passphrase/>
      },
      {
        path: '/dashboard',
        element: <DashboardLayout><DashboardHome/> </DashboardLayout>
      },
      {
        path: '/dashboard/escrow-deals',
        element: <Escrow/>
      },
      {
        path: '/dashboard/transaction-history',
        element: <TransHistory/>  
      }
    ]
  }
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
