import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from "@/components/ui/button"
import { HiDownload } from "react-icons/hi"
import { HiCalendar } from "react-icons/hi";
import { format } from "date-fns"
import FiscalYearTrade from "./fiscalYearTrade"

const TabSite = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)

  
  return (
    <div className="">

      <div className="flex  items-center justify-between  ">
        <h1 className=" font-bold lg:text-[16px] text-[13px] font-inter ">Platform Analytics</h1>
        <div className="flex items-center gap-3 relative">
            <span className="text-md font-medium text-[13px] leading-[150%] text-[#121826]">
                {format(selectedDate, "MMMM yyyy")}
            </span>
            <span 
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer p-2 rounded hover:bg-gray-100 transition"
          >
            <HiCalendar className="text-2xl text-[#000000]" />
          </span>
           
            {isOpen && (
            <div className="absolute top-10 z-10 ">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date as Date)
                  setIsOpen(false)
                }}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                inline
              />
            </div>
          )}
        
        

                <Button className="bg-[#039AE4] text-[#ffffff] w-[96px] leading-[150%] gap-1 text-[12px] lg:text-[16px] h-[40px] rounded-[5px] px-4 py-2 items-center cursor-pointer flex">
                    Export <HiDownload className="size-6 text-[#ffffff]" />
                </Button>
     </div>

       
      </div>

      <div> <FiscalYearTrade  /> </div>
    </div>
  )
}

export default TabSite
