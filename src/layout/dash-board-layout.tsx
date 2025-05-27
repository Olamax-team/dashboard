import { cn } from '@/lib/utils'
import { MenuIcon, X } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import { FaRegHourglassHalf } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineClipboardList, HiAdjustments, HiUserCircle, HiUserAdd, HiMinusCircle, HiNewspaper, HiSpeakerphone, HiChartPie, HiStar, HiDesktopComputer, HiUserGroup } from "react-icons/hi";

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const NavLink = ({path, icon:Icon, label, isActive}:{path:string,icon:IconType, label:string, isActive: boolean}) => {
    return (
      <Link to={path} className={cn('text-white lg:p-4 p-3 rounded-r-xl flex items-center gap-2 hover:bg-white hover:text-black', isActive && 'bg-white text-black')}>
        <Icon className='size-5'/>
        <span className='text-sm lg:text-base'>{label}</span>
      </Link>
    )
  }

  const MobileSideBar = () => {
    return (
      <div className='fixed left-0 top-0 bg-black/30 w-full h-full slide-in-left overflow-hidden z-[80000]'>
        <div className={cn("right-0 top-0 absolute z-[80000] w-[60%] md:w-[50%] bg-black h-full",)}>
          <div className="w-full h-full pb-8 pl-4 pr-5">
            <div className="w-full h-[60px] flex items-center pr-4 justify-between text-white">
              <button onClick={() =>setIsOpen(false)}>
                <X className='size-7'/>
              </button>
            </div>
            <SidebarMenu/>
          </div>
        </div>
      </div> 
    )
  };

  const SidebarMenu = () => {
    return (
      <div className='lg:h-[calc(100%_-_80px)] h-[calc(100%_-_60px)] flex flex-col justify-around gap-3 pb-10'>
        <NavLink
          path='/dashboard'
          icon={FaRegHourglassHalf}
          label='Pending Deals'
          isActive = {location.pathname === '/dashboard'}
        />
        <NavLink
          path='/dashboard/escrow-deals'
          icon={FiRefreshCcw}
          label='Escrow Deals'
          isActive = {location.pathname === '/dashboard/escrow-deals'}
        />
        <NavLink
          path='/dashboard/transaction-history'
          icon={HiOutlineClipboardList}
          label='Transaction History'
          isActive = {location.pathname === '/dashboard/transaction-history'}
        />
        <NavLink
          path='/dashboard/transaction-settings'
          icon={HiAdjustments}
          label='Transaction Settings'
          isActive = {location.pathname === '/dashboard/transaction-settings'}
        />
        <NavLink
          path='/dashboard/user-information'
          icon={HiUserCircle}
          label='User Information'
          isActive = {location.pathname === '/dashboard/user-information' || location.pathname.startsWith('/dashboard/user-information')}
        />
        <NavLink
          path='/dashboard/manage-referrals'
          icon={HiUserAdd}
          label='Manage Referrals'
          isActive = {location.pathname === '/dashboard/manage-referrals'}
        />
        <NavLink
          path='/dashboard/block-unblock'
          icon={HiMinusCircle}
          label='Block & Unblock'
          isActive = {location.pathname === '/dashboard/block-unblock'}
        />
        <NavLink
          path='/dashboard/news'
          icon={HiNewspaper}
          label='News'
          isActive = {location.pathname === '/dashboard/news'}
        />
        <NavLink
          path='/dashboard/announcements'
          icon={HiSpeakerphone}
          label='Announcements'
          isActive = {location.pathname === '/dashboard/announcements'}
        />
        <NavLink
          path='/dashboard/site-analysis'
          icon={HiChartPie}
          label='Site Analysis'
          isActive = {location.pathname === '/dashboard/site-analysis'}
        />
        <NavLink
          path='/dashboard/reviews'
          icon={HiStar}
          label='Reviews'
          isActive = {location.pathname === '/dashboard/reviews'}
        />
        <NavLink
          path='/dashboard/adverts'
          icon={HiDesktopComputer}
          label='Adverts'
          isActive = {location.pathname === '/dashboard/adverts'}
        />
        <NavLink
          path='/dashboard/manage-admins'
          icon={HiUserGroup}
          label='Manage Admins'
          isActive = {location.pathname === '/dashboard/manage-admins'}
        />
      </div>
    )
  };
  
  return (
    <div className='flex min-h-screen'>
      <div className="lg:w-[15%] hidden lg:flex sticky top-0 bg-black overflow-hidden flex-col pr-6 h-full">
        <div className="h-[80px] w-full flex items-center justify-center">
          <div className="w-[138px] h-[24px]">
            <img src='/images/OLAMAX_logo_3.png' alt='logo_black' className='object-contain object-center'/>
          </div>
        </div>
        <SidebarMenu/>
      </div>
      <div className="lg:w-[85%] w-full flex-1 pt-[60px] lg:pt-0">
        <div className="w-full h-[60px] shadow-md lg:hidden flex items-center gap-3 px-6 fixed left-0 top-0 bg-white" onClick={() => setIsOpen(true)}>
          <MenuIcon/>
          <div className="lg:w-[154px] lg:h-[40px] w-[80px]">
            <img src="/images/OLAMAX_Logo_2.png" alt="auth_banner" className='w-full h-full object-contain object-center'/>
          </div>
        </div>
        {children}
        { isOpen && <MobileSideBar/> }
      </div>
    </div>
  )
}

export default DashboardLayout