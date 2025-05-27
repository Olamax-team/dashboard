import { useState } from "react";
import { Copy, MoveLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "../../../../assets/avatar.svg";
import { useNavigate } from "react-router-dom";
import PageHeader from "../escrow/pageHeader";
import idcard from "../../../../assets/idCard.svg";
import DashboardLayout from "@/layout/dash-board-layout";

export default function Unverified() {
  const navigate = useNavigate();

  // Function to copy the user ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText("20921123");
    alert("User ID copied!");
  };

  // User data
  const [userData] = useState({
    id: "20921123",
    firstName: "Mason",
    lastName: "mount",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    occupation: "",
    verified: true,
  });


  

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen">
        <PageHeader title="Blocked User" />

        {/* User Profile Header */}
        <div className="container px-4 py-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="flex gap-4 items-center text-black/50 xl:ml-5 cursor-pointer"
                onClick={() => navigate("/dashboard/user-information")}
                type="button"
              >
                <div className="w-[20px]">
                  <MoveLeft className="size-6 text-[#000000]" />
                </div>
                <h2 className="text-xl font-semibold leading-[150%] text-[#121826] ">
                  {userData.firstName} {userData.lastName}
                </h2>
              </button>
            </div>

            <div className="px-4">
              <Button
                variant="outline"
                className="text-[#E41D03]  text-[13px] border-[#E41D03] hover:bg-red-50 font-medium"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container px-4  py-6 grid grid-cols-1  md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold  leading-[150%] text-[#1C1C1C]">
                Personal Details
              </h3>
              <p className="text-sm text-[#5C5C5C] leading-[22px]">
                Manage User's Information
              </p>
            </div>

            <div className="flex items-center gap-4 pb-6 border-b mb-6">
              <div className="h-16 w-16">
                <img
                  src={Avatar}
                  alt="User"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold  text-[#121826] text-[18px] ">
                  {userData.firstName} {userData.lastName}
                </h4>
                <div className="flex items-center gap-2 text-[16px] cursor-pointer leading-[150%] text-[#121826]">
                  <span>{userData.id}</span>
                  <button
                    className="text-[#121826] "
                    onClick={copyToClipboard} // Enable copy function
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {userData.verified && (
                <span className="ml-auto border-[#FF9C00] text-[#FF9C00] flex items-center gap-1">
                  <ShieldCheck className="w-[24px] h-[24px] text-textDark cursor-pointer" />
                  UnVerified
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                  Last Name
                </label>
                <input
                  value={userData.lastName}
                  type="text"
                  placeholder="Mason"
                  className="xl:w-[230px] w-[100px] h-[30px] rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />
              </div>
              <div>
                <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                  First Name
                </label>
                <input
                  value={userData.firstName}
                  type="text"
                  placeholder="mount"
                  className="xl:w-[230px] w-[100px] h-[30px] rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />
              </div>
              <div>
                <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                  Email
                </label>
                <input
                  value={userData.email}
                  type="text"
                  placeholder="mount@gmail.com"
                  className="xl:w-[230px] w-[100px] h-[30px]  rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />
              </div>
              <div>
                <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                  Phone Number
                </label>
                <input
                  value={userData.phoneNumber}
                  type="text"
                  placeholder="0987654321"
                  className="xl:w-[230px] w-[100px] h-[30px]  rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />
              </div>
              <div>
                <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                  Date Of Birth
                </label>
                <input
                  value={userData.dateOfBirth}
                  type="text"
                  placeholder="5/8/1987"
                  className="xl:w-[230px] w-[100px] h-[30px] leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none rounded-sm p-2 focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />
              </div>
              <div>
                <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                  Gender
                </label>
                <input
                  value={userData.gender}
                  type="text"
                  placeholder="male"
                  className="xl:w-[230px] w-[100px] h-[30px] leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none rounded-sm p-2 focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />
              </div>
              <div>
                <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                  Nationality
                </label>
                <input
                  value={userData.nationality}
                  type="text"
                  placeholder="American"
                  className="xl:w-[230px] w-[100px] h-[30px] leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none rounded-sm p-2 focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />
              </div>
              <div>
                <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                  Occupation
                </label>
                <input
                  value={userData.occupation}
                  type="text"
                  placeholder="student"
                  className="xl:w-[230px] w-[100px] h-[30px] leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none rounded-sm p-2 focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                />
              </div>
            </div>
          </div>

          {/* ID Card Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold  leading-[150%] text-[#1C1C1C]">
                ID Card Information
              </h3>
              <p className="text-sm text-[#5C5C5C] leading-[22px]">
                Manage User's Information
              </p>
            </div>

            <div className="space-y-4">
              {/* If there is any specific data here, you can map through it */}
              <div className="border  overflow-hidden">
                <div>
                  <img src={idcard} alt="User ID" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
