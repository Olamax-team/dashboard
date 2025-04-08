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
import DashboardHome from './components/pages/dash-board/home.tsx'
import TransHistory from './components/pages/dash-board/transHistory/transHistory.tsx'
import UserInformation from './components/pages/dash-board/userInformation/userInformation.tsx'
import UserPreview from './components/pages/dash-board/userInformation/userDetailsVerified.tsx'
import UnVerifiedUserDetails from './components/pages/dash-board/userInformation/UserDetailsUnverified.tsx'


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
        element: <DashboardLayout> <TransHistory/>  </DashboardLayout> 
      },
      {
        path: '/dashboard/user-information',
        element: <DashboardLayout> <UserInformation  /> </DashboardLayout>
      },
      {
        path:"/userDetailsVerified",
        element: <DashboardLayout><UserPreview/> </DashboardLayout>  
      },
      {
        path:"/UserDetailsUnverified",
        element: <DashboardLayout><UnVerifiedUserDetails/> </DashboardLayout>  
      }
    ]
  }
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
