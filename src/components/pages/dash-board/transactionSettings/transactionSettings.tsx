import DashboardLayout from "@/layout/dash-board-layout";
import PageHeader from "@/components/pages/dash-board/escrow/pageHeader";
import { Button } from "@/components/ui/button";
import { HiOutlineSortDescending, HiFilter, HiDownload } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { HiFolderArrowDown } from "react-icons/hi2";

const TransactionSettings = () => {

  return (
    <DashboardLayout>
      <section className="w-full h-full mx-auto font-Inter">
        <PageHeader title="Transaction Settings" />
        <div className="flex flex-col bg-[#F8F9FA] px-4 py-2 md:px-10 md:py-4 gap-14 h-full">
             {/* Head Tab */}
            <div className="flex w-full space-y-16 md:space-y-0 justify-between flex-wrap items-center">
                <p className="text-wrap w-1/3">Set Transaction Rate and Bonuses</p>
                <div className="flex justify-center items-center space-x-6 py-1">
                {/* Sort Button */}
                <div
                    className="text-black flex items-center justify-center space-x-2"
                    aria-disabled
                >
                    <h1 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">
                    Sort in descending order
                    </h1>
                    <HiOutlineSortDescending className="size-5 my-auto" />
                </div>

                {/* Filter Button */}
                <div className="relative">
                    <span
                    className="text-black flex items-center justify-center space-x-2"
                    aria-disabled
                    >
                    <button className="text-black">Filter</button>
                    <HiFilter className="size-5" />
                    </span>
                </div>

                {/* Export Button */}
                <Button className="cursor-pointer rounded-sm bg-primary hover:bg-secondary text-white w-[96px] h-[40px]">
                    Export
                    <HiDownload className="size-5 text-[#ffffff]" />
                </Button>
                </div>
            </div>
             {/* Bonuses and Charges */}
             <div className="flex w-full items-center justify-between gap-16 flex-wrap md:flex-nowrap">
                <div className="md:w-1/2 w-full space-y-4">
                    <p>Coin Bonuses (in Naira)</p>
                    <div className="bg-white w-full h-[110px] rounded-sm px-6 py-5 space-y-2">
                        <h1>In Percentage</h1>
                        <div className="flex flex-wrap md:flex-nowrap justify-between">
                            <Input 
                                type="text"
                                placeholder="0.15%"
                                className="w-2/5 font-normal xl:text-[16px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
                            />
                            <div className="flex gap-4">
                                <Button className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer">Edit <Edit size={16}/></Button>
                                <Button className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer">Save <HiFolderArrowDown size={16}/></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start md:w-1/2 w-full flex-col space-y-4">
                    <p>Escrow Charges (in Crypto)</p>
                    <div className="bg-white w-full h-[110px] rounded-sm px-6 py-5 space-y-2">
                        <h1>In Percentage</h1>
                        <div className="flex flex-wrap md:flex-nowrap justify-between">
                            <Input 
                                type="text"
                                placeholder="0.15%"
                                className="w-2/5 font-normal xl:text-[16px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
                            />
                            <div className="flex gap-4">
                                <Button className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer">Edit <Edit size={16}/></Button>
                                <Button className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer">Save <HiFolderArrowDown size={16}/></Button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
             {/*Dollar Rates*/}
             <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-16">
                <div className="flex w-full justify-start">
                    <h1>Dollar Rate (We <span className="text-primary">Sell</span> at)</h1>
                </div>
                <div className="flex w-full justify-start">
                    <h1>Dollar Rate (We <span className="text-primary">Buy</span> at)</h1>
                </div>
             </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default TransactionSettings;
