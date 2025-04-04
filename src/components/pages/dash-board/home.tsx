import { Search, ChevronDown } from 'lucide-react';
import rectangle from'../../../assets/Rectangle 4871.svg';
import { HiMail,  HiX, HiLogout } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import PendingButton from './pending/pendingButton';
import { useState } from 'react';
import NotificationsPanel from './emailNotification/notfication';

const DashboardHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailIsOpen, setEmailIsOpen] = useState(false)

  const exchangeType = [
    { label: "BTC", amount: "$87375" },
    { label: "ETH", amount: "$3155.2" },
    { label: "LTC", amount: "$77.2" },
    { label: "STEEM", amount: "$0.2135" },
    { label: "SDB", amount: "$3155.2" },
    { label: "DOGE", amount: "$0.3746" },
    { label: "HIVE", amount: "$0.2786" },
    { label: "HBD", amount: "$3155.2" },
    { label: "BNB", amount: "$3155.2" },
  ];

  return (
    <div>
      <div className="bg-[#039AE4] lg:flex items-center justify-center hidden w-full h-[50px] flex-wrap"> 
        {exchangeType.map((exchange, index) => (
          <div key={index} className="flex items-center space-x-2">
            <p className="flex items-center justify-between gap-1 w-full">
              <span className="font-medium font-inter text-[13px] lg:text-[16px] leading-[150%] text-[#121826]">
                {exchange.label}
              </span>
              <span className="text-[#ffffff] font-medium font-inter text-[13px] lg:text-[16px] leading-[150%]">
                {exchange.amount}
              </span>
              {index !== exchangeType.length - 1 && (
                <span className="border-l-2 border-[#ffffff] h-6 mx-2"></span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="font-Inter bg-white px-4 py-2 md:px-10 md:py-7 flex gap-6 xl:gap-24 w-full h-[80px] items-center justify-between sticky top-0 z-50">
        <div className="">
          <h1 className="w-fit text-wrap xl:text-nowrap font-bold text-[16px] leading-[150%] font-inter">
            Pending Deals
          </h1>
        </div>

        <div className="flex items-center justify-between bg-white rounded-sm w-full lg:w-[430px] p-2">
          <div className="flex items-center justify-center mr-2">
            <Search className="text-[#121826] size-6" />
          </div>
          <input
            placeholder="Search Users, Transactions..."
            className="font-normal lg:text-[16px] text-[12px] leading-[150%] text-[#000000] opacity-80 placeholder:text-[#121826] w-full bg-transparent border-none focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 justify-center bg-white ">
          <div className="flex items-center gap-3 mr-2">
           <div className='h-[40px] w-[40px]  '> <img src={rectangle} alt="User Avatar" className="w-[40px] h-[40px]" /></div>
            <span className="font-inter hidden xl:flex-nowrap lg:flex font-semibold text-[14px]">
              David Aluko
            </span>
            <span className="border-l-2 hidden  lg:block border-gray-400 h-[30px]" />            
          </div>

          <div className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#f5f5f5] cursor-pointer transition-all duration-200"
             onClick={() => setEmailIsOpen(true)}
          >
            <HiMail className="size-6" />
            <div className="absolute top-0 right-0 w-[16px] h-[16px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              1
            </div>
            { emailIsOpen &&  <NotificationsPanel setEmailIsOpen = {setEmailIsOpen}  /> }

          </div>

          <div className="w-[40px]  hidden    h-[40px] lg:flex items-center justify-center rounded-full bg-[#f5f5f5] cursor-pointer transition-all duration-200">
            <IoIosSettings className="size-6 text-[#121826]" />
          </div>

          <div className="w-[40px] h-[40px]  hidden  lg:flex items-center justify-center rounded-full bg-[#f5f5f5] cursor-pointer transition-all duration-200">
            <HiLogout className="size-6 text-[#E41D03]" />
          </div>

          <button className=" hidden lg:block px-4 py-2 border-2 w-[80px] lg:w-[96px] h-[40px] border-[#039AE4] text-[#039AE4] leading-[150%] rounded-sm bg-[#f5f5f5] font-medium text-[10px] xl:text-[14px] hover:bg-[#039AE4] focus:outline-none cursor-pointer transition-all duration-200">
          Regularize
          </button>
        </div>


        
        <div className="lg:hidden ">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#121826] text-2xl focus:outline-none"
          >
            {isMenuOpen ? <HiX className="size-6 text-white" /> : <ChevronDown  className="size-6 text-[#039AE4]" />}
          </button>
        </div>      

      </div>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-white bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className="lg:hidden fixed top-0 left-0 w-[180px] h-full bg-[#121826] z-50 p-6 flex flex-col space-y-6 text-white">
            
            <div className="self-end">
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
                <HiX className="size-6 text-white" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200">
                <IoIosSettings className="size-6 " />
                <span>Settings</span>
              </div>

              <button className="px-4 py-2 border-2 w-[85px] xl:w-[96px] h-[40px] border-[#039AE4] text-[#039AE4] leading-[150%] rounded-sm bg-[#f5f5f5] font-medium text-[12px] xl:text-[14px] hover:bg-[#039AE4] focus:outline-none cursor-pointer transition-all duration-200">
                  Regularize
               </button>

              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200">
                <HiLogout className="size-6 text-[#E41D03]" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </>
      )}

      <div><PendingButton /></div>
    </div>
  );
};

export default DashboardHome;
