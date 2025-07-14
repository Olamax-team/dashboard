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
import UserInformation from './components/pages/dash-board/userInformation/user-information.tsx'
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
import DashboardBills from './components/pages/dash-board/pending/dashboard-bills.tsx'
import DashboardTopUp from './components/pages/dash-board/pending/dashboard-top-up.tsx'
import DashboardSelling from './components/pages/dash-board/pending/dasboard-selling.tsx'
import UserDetails from './components/pages/dash-board/userInformation/user-details.tsx'
import BuyingTransactionHistory from './components/pages/dash-board/transHistory/buying-transaction-history.tsx'
import SellingTransactionHistory from './components/pages/dash-board/transHistory/selling-transaction-history.tsx'
import BillsTransactionHistory from './components/pages/dash-board/transHistory/bill-transaction.tsx'
import TopUpTransactionHistory from './components/pages/dash-board/transHistory/top-up-transaction-history.tsx'
import AvailableCoin from './components/pages/dash-board/settings/availableCoin.tsx'
import MOQTransactionsContainer from './components/pages/dash-board/settings/MOQTransactionsContainer.tsx'
import Rates from './components/pages/dash-board/settings/rates.tsx'
import TransactionSettings2 from './components/pages/dash-board/settings/transactionSettings.tsx'
import Toggle from './components/pages/dash-board/settings/toggle.tsx'
import Charges from './components/pages/dash-board/settings/cryptoCharges.tsx'


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
        path: '/dashboard/bills',
        element: 
          <ProtectRoute>
            <DashboardBills/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/top-up',
        element: 
          <ProtectRoute>
            <DashboardTopUp/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/selling',
        element: 
          <ProtectRoute>
            <DashboardSelling/>
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
            <BuyingTransactionHistory/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-history/selling',
        element: 
          <ProtectRoute>
            <SellingTransactionHistory/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-history/top-up',
        element: 
          <ProtectRoute>
            <TopUpTransactionHistory/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-history/bills',
        element: 
          <ProtectRoute>
            <BillsTransactionHistory/>
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
        path:"/dashboard/user-information/user-details/:id",
        element: 
          <ProtectRoute>
            <UserDetails/>  
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-settings',
        element: 
          <ProtectRoute>
            <TransactionSettings2/>  
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
      {
        path: '/dashboard/transaction-settings/available-coins',
        element: 
          <ProtectRoute>
            <AvailableCoin/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-settings/moq',
        element: 
          <ProtectRoute>
            <MOQTransactionsContainer/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-settings/rate',
        element: 
          <ProtectRoute>
            <Rates/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-settings/referral',
        element: 
          <ProtectRoute>
            <Toggle/>
          </ProtectRoute>
      },
      {
        path: '/dashboard/transaction-settings/charges',
        element: 
          <ProtectRoute>
            <Charges/>
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
