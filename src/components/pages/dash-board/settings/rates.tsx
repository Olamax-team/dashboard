import PageHeader from "@/components/pages/dash-board/escrow/pageHeader";
import { Button } from "@/components/ui/button";
import {  HiDownload } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { HiFolderArrowDown } from "react-icons/hi2";
import BuyRate from "./buyRate";
import SellRate from "./sellRate";
import { useState } from "react";
import Tab from "./Tab";
import DashboardLayout from "@/layout/dash-board-layout";
import { useLocation } from "react-router-dom";

const Rates = () => {
    const location = useLocation();
    const [coinBonus, setCoinBonus] = useState("0.15");
    const [editCoinBonus, setEditCoinBonus] = useState(false);
    const [escrowCharges, setEscrowCharges] = useState("0.15");
    const [editEscrowCharges, setEditEscrowCharges] = useState(false);


  return (
    <DashboardLayout>
        <section className="w-full h-full mx-auto font-Inter text-[#121826] overflow-hidden">
        <PageHeader title="Transaction Settings" />
        <div className="flex items-center lg:gap-5 gap-2 justify-center px-4 py-2 md:px-10 md:py-4 w-fit lg:mt-3">
            <Tab label={"Rates"} to={"/dashboard/transaction-settings/rate"} isActive={location.pathname === "/dashboard/transaction-settings/rate" || location.pathname === "/dashboard/transaction-settings"}/>
            <Tab label={"Available Coins"} to={"/dashboard/transaction-settings/available-coins"} isActive={location.pathname === "/dashboard/transaction-settings/available-coins"}/>
            <Tab label={"Minimum Order Quantity"} to={"/dashboard/transaction-settings/moq"} isActive={location.pathname === "/dashboard/transaction-settings/moq"}/>
            <Tab label={"Bonuses & Referral"} to={"/dashboard/transaction-settings/referral"} isActive={location.pathname === "/dashboard/transaction-settings/referral"}/>
            <Tab label={"Charges"} to={"/dashboard/transaction-settings/charges"} isActive={location.pathname === "/dashboard/transaction-settings/charges"}/>
        </div>
        <div className="flex flex-col bg-[#F8F9FA] px-4 py-2 md:px-10 md:py-4 gap-14 h-full">
            {/* Head Tab */}
            <div className="flex w-full space-y-16 md:space-y-0 justify-between flex-wrap items-center">
            <p className="text-wrap w-1/3 font-inter font-bold xl:text-[16px] xl:leading-[150%]">
                Set Transaction Rate and Bonuses
            </p>
            <div className="flex justify-center items-center space-x-6 py-1">

                {/* Export Button */}
                <Button className="cursor-pointer rounded-sm bg-primary hover:bg-secondary text-white w-[96px] h-[40px]">
                Export
                <HiDownload className="size-5 text-[#ffffff]" />
                </Button>
            </div>
            </div>
            {/* Bonuses and Charges */}
            <div className="flex w-full items-center justify-between gap-16 flex-wrap md:flex-nowrap pb-12">
            <div className="md:w-1/2 w-full space-y-4">
                <p className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">
                Coin Bonuses (in Naira)
                </p>
                <div className="bg-white w-full h-[110px] rounded-sm px-6 py-5 space-y-2">
                <h1 className="font-inter font-medium xl:text-[14px] xl:leading-[150%]">
                    In Percentage
                </h1>
                <div className="flex flex-wrap md:flex-nowrap justify-between">
                    <Input
                    value={coinBonus}
                    disabled={!editCoinBonus}
                    onChange={(e) => setCoinBonus(e.target.value)}
                    type="text"
                    placeholder="0.15%"
                    className="w-2/5 font-normal xl:text-[16px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
                    />
                    <div className="flex gap-4">
                    <Button
                        onClick={() => setEditCoinBonus(true)}
                        className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer"
                    >
                        Edit <Edit size={16} />
                    </Button>
                    <Button
                        onClick={() => setEditCoinBonus(false)}
                        disabled={!editCoinBonus}
                        className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer"
                    >
                        Save <HiFolderArrowDown size={16} />
                    </Button>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex justify-start md:w-1/2 w-full flex-col space-y-4">
                <p className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">Escrow Charges (in Crypto)</p>
                <div className="bg-white w-full h-[110px] rounded-sm px-6 py-5 space-y-2">
                    <h1 className="font-inter font-medium xl:text-[14px] xl:leading-[150%]">In Percentage</h1>
                    <div className="flex flex-wrap md:flex-nowrap justify-between">
                        <Input
                            value={escrowCharges}
                            disabled={!editEscrowCharges}
                            onChange={(e) => setEscrowCharges(e.target.value)} 
                            type="text"
                            placeholder={`${escrowCharges}%`}
                            className="w-2/5 font-normal xl:text-[16px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
                        />
                        <div className="flex gap-4">
                            <Button 
                                onClick={() => setEditEscrowCharges(true)}
                                className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer">Edit <Edit size={16}/></Button>
                            <Button 
                                onClick={() => setEditEscrowCharges(false)}
                                disabled={!editEscrowCharges}
                                className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer">Save <HiFolderArrowDown size={16}/></Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            {/*Dollar Rates*/}
            <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-16 pb-12">
            <div className="flex flex-col w-full justify-start space-y-3">
                <h1 className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">Dollar Rate (We <span className="text-primary">Sell</span> at)</h1>
                <SellRate/>
            </div>
            <div className="flex flex-col w-full justify-start space-y-3">
                <h1 className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">Dollar Rate (We <span className="text-primary">Buy</span> at)</h1>
                <BuyRate/>
            </div>
            </div>
        </div>
        </section>
    </DashboardLayout>
  );
};

export default Rates;
