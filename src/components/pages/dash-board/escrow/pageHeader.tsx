import { Input } from "@/components/ui/input";
import rectangle from '../../../../assets/Rectangle 4871.svg';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { HiMail, HiLogout, HiX } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import NotificationsPanel from "../pending/notfication";

type UserDetails = {
  name: string;
  profilePicture: string;
}
const PageHeader = ({ title }: { title: string }) => {
    
  const user: UserDetails= 
    {
      name: "David Aluko",
      profilePicture: rectangle,
    };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailIsOpen, setEmailIsOpen] = useState(false)
    
  return (
    <div className="bg-white px-4 py-2 md:px-10 md:py-7 flex gap-6 xl:gap-24 w-full h-[80px] items-center justify-between sticky top-0 z-50">
      {/*Page Title */}
      <span>
        <h1 className="w-fit text-wrap xl:text-nowrap font-bold text-[16px] leading-[150%] font-inter">{title}</h1>
      </span>

      <div className="w-full flex items-center justify-between h-[48px] gap-3 xl:gap-10">
        {/* Search Input */}
        <div className="w-full flex bg-[#F8F9FA] space-x-2 px-2 items-center rounded-lg">
          <Search className="text-black size-6"/>
          <Input 
            type="text"
            placeholder="Search Users, Transactions..."
            className="font-normal xl:text-[16px] text-[12px] leading-[120%] xl:leading-[150%] border-none shadow-none px-0 focus-visible:ring-0"
          />
        </div>
        <div className="flex gap-2 xl:gap-8">
          <div className="flex items-center gap-3">
            <div className='h-[40px] w-[40px]  '> <img src={user.profilePicture} alt="User Avatar" className="w-[40px] h-[40px]" /></div>
              <span className="font-inter hidden lg:flex font-semibold text-[14px] text-nowrap">
                {user.name}
              </span>
              <span className="border-l-1 hidden lg:block border-gray-400 h-[30px]" />    
          </div>
        
          <div className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full px-2 bg-[#f5f5f5] cursor-pointer transition-all duration-200"
            onClick={() => setEmailIsOpen(true)}
          >
            <HiMail className="size-6" />
            <div className="absolute top-0 right-0 w-[16px] h-[16px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              1
            </div>
            { emailIsOpen &&  <NotificationsPanel setEmailIsOpen = {setEmailIsOpen}  /> }
          </div>
          <div className="w-[40px] hidden h-[40px] md:flex items-center justify-center rounded-full px-2 bg-[#f5f5f5] cursor-pointer transition-all duration-200">
              <IoIosSettings className="size-6 text-[#121826]" />
          </div>

          <div className="w-[40px] h-[40px] hidden lg:flex items-center justify-center rounded-full px-2 bg-[#f5f5f5] cursor-pointer transition-all duration-200">
              <HiLogout className="size-6 text-[#E41D03]" />
          </div>
          {/* Regularize Button */}
          <div className="w-fit hidden md:block">
            <Button className="bg-white w-[96px] h-[40px] hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer">
              Regularize
            </Button>
          </div>
        </div>
        
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#121826] text-2xl focus:outline-none"
          >
            {isMenuOpen ? <HiX className="size-6 text-white" /> : <ChevronDown  className="size-6 text-[#039AE4]" />}
          </button>
        </div>   
            {isMenuOpen && (
            <>
              <div className="fixed inset-0 bg-black w-1/2 z-40 p-4" onClick={() => setIsMenuOpen(false)} />
                <div className="lg:hidden fixed top-0 left-0 w-[180px] h-full bg-bg z-50 flex flex-col space-y-6 text-white">
                  <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
                    <HiX className="size-6 text-white" />
                  </button>
                  <div className="flex flex-col px-4 items-start justify-start space-y-3">
                    <div className="flex text-left gap-1 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200">
                      <IoIosSettings className="size-6 " />
                      <span>Settings</span>
                    </div>

                    <Button className=" w-[85px] h-[40px] text-[#039AE4] leading-[150%] rounded-sm bg-[#f5f5f5] font-medium text-[12px] xl:text-[14px] hover:bg-secondary focus:outline-none cursor-pointer transition-all duration-200">
                        Regularize
                    </Button>

                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-200">
                      <HiLogout className="size-6 text-[#E41D03]" />
                      <span>Logout</span>
                    </div>
                </div>
              </div>
            </>
          )}   
      </div>
    </div>
  );
};

export default PageHeader;
