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
import DashboardHome from './components/pages/dash-board/home.tsx'
import TransHistory from './components/pages/dash-board/transHistory/transHistory.tsx'
import UserInformation from './components/pages/dash-board/userInformation/user-information.tsx'
import UserPreview from './components/pages/dash-board/userInformation/userDetailsVerified.tsx'
import UnVerifiedUserDetails from './components/pages/dash-board/userInformation/UserDetailsUnverified.tsx'
import TransactionSettings from './components/pages/dash-board/transactionSettings/transactionSettings.tsx'
import ManageRerrals from './components/pages/dash-board/manageReferrals/manageRefferrals.tsx'
import BlockUser from './components/pages/dash-board/blockUser/blockUser.tsx'
import Unverified from './components/pages/dash-board/blockUser/unverified.tsx'
import News from './components/pages/dash-board/news/news.tsx'
import Announcement from './components/pages/dash-board/announcement/announcement.tsx'
import SiteAnalysis from './components/pages/dash-board/siteAnalytics/siteAnalysis.tsx'
import Review from './components/pages/dash-board/review/review.tsx'
import Advert from './components/pages/dash-board/advert/advert.tsx'
import MangeAdmin from './components/pages/dash-board/ManageAdmin/mangeAdmin.tsx'
import ProtectAuthRoutes from './layout/protect-auth-routes.tsx'
import ProtectRoute from './layout/protect-routes.tsx'
import UnverifiedUserInformation from './components/pages/dash-board/userInformation/unverified-user-information.tsx'
import PendingUserInformation from './components/pages/dash-board/userInformation/pending-user-information.tsx'


const router = createBrowserRouter([
  
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: 
          <ProtectAuthRoutes>
            <App/>
          </ProtectAuthRoutes>
      },
      {
        path: '/authenticate',
        element: 
          <ProtectAuthRoutes>
            <Authenticate/>
          </ProtectAuthRoutes>
      },
      {
        path: '/passphrase',
        element: 
          <ProtectAuthRoutes>
            <Passphrase/>
          </ProtectAuthRoutes>
      },
      {
        path: '/dashboard',
        element: 
          <ProtectRoute>
            <DashboardHome/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/escrow-deals',
        element:
         <ProtectRoute>
           <Escrow/>
         </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-history',
        element: 
          <ProtectRoute>
            <TransHistory/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/user-information',
        element: 
          <ProtectRoute>
            <UserInformation/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/user-information/unverified',
        element: 
          <ProtectRoute>
            <UnverifiedUserInformation/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/user-information/pending',
        element: 
          <ProtectRoute>
            <PendingUserInformation/>
          </ProtectRoute>
      },
      {
        path:"/dashboard/user-information/user-details-verified",
        element: 
          <ProtectRoute>
            <UserPreview/>  
          </ProtectRoute>
      },
      {
        path:"/dashboard/user-information/user-details-unverified",
        element: 
          <ProtectRoute>
            <UnVerifiedUserDetails/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-settings',
        element: 
          <ProtectRoute>
            <TransactionSettings/>  
          </ProtectRoute>
      },
      {
        path:"/dashboard/manage-referrals",
        element:
          <ProtectRoute>
            <ManageRerrals/>
          </ProtectRoute>
      },
      {
        path:"/dashboard/block-unblock",
        element:
          <ProtectRoute>
            <BlockUser />
          </ProtectRoute>
      },
      {
        path:"/Unverified",
        element: 
          <ProtectRoute>
            <Unverified/>
          </ProtectRoute>
      },
      {
        path:"/dashboard/news",
        element:
          <ProtectRoute>
            <News />
          </ProtectRoute>
      },
      {
        path:"/dashboard/announcements",
        element:
          <ProtectRoute>
            <Announcement />
          </ProtectRoute>
      },
      {
        path:"/dashboard/site-analysis",
        element:
          <ProtectRoute>
            <SiteAnalysis />
          </ProtectRoute>
      },
      {
        path:"/dashboard/reviews",
        element:
          <ProtectRoute>
            <Review />
          </ProtectRoute>
      },
      {
        path:"/dashboard/adverts",
        element:
          <ProtectRoute>
            <Advert />
          </ProtectRoute>
      },
      {
        path:"/dashboard/manage-admins",
        element:
          <ProtectRoute>
            <MangeAdmin />
          </ProtectRoute>
      },
    ]
  }
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
