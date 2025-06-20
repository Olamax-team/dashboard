import { Copy, Loader2, MoveLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "../../../../assets/avatar.svg";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../escrow/pageHeader";
import idcard from "../../../../assets/idCard.svg";
import DashboardLayout from "@/layout/dash-board-layout";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiRequestHandler } from "@/api/api-request-handler";
import { userDetailsProps } from "@/lib/types";
import { extractFirstName } from "@/lib/utils";
import { toast } from "sonner";
import { useFetch } from "@/lib/use-fetch";

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to copy the user ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText("20921123"); // Replace with dynamic userID if necessary
    toast.info('User UID copied to clipboard');
  };

  const userConfig = useApiConfigWithToken({
    method: 'get',
    url: `admin/get-user-detail-by-id/${id}`
  });

  const fetchUsers = () => axios.request(userConfig);

  const { data:userDetailsResponse, status } = useQuery({
    queryKey: ['user-details', id],
    queryFn: () =>apiRequestHandler(fetchUsers)
  });

  const userDetail = userDetailsResponse?.data.data as userDetailsProps
  const { blockUser } = useFetch();
  if (status === 'pending') {
   return (
    <DashboardLayout>
      <div className="flex w-full min-h-screen items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    </DashboardLayout>
   ) 
  };

  if (status === 'error') {
    <DashboardLayout>
      <div className="w-full min-h-screen flex justify-center py-24">
        Error occurred while loading user details
      </div>
    </DashboardLayout>
  };

  if (status === 'success' && !userDetail) {
    <DashboardLayout>
      <div className="w-full flex justify-center py-24">
        User detail not available, refresh page
      </div>
    </DashboardLayout>
  }

  if (status === 'success' && userDetail) {
    return (
      <DashboardLayout>
        <div className="flex flex-col min-h-screen">
          <PageHeader title="User Information" />
  
          {/* User Profile Header */}
          <div className="container px-4 py-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="flex gap-4 items-center text-black/50 xl:ml-5 cursor-pointer"
                  onClick={() => navigate(-1)}
                  type="button"
                >
                  <div className="w-[20px]">
                    <MoveLeft className="size-6 text-[#000000]" />
                  </div>
                  <h2 className="text-xl font-semibold leading-[150%] text-[#121826] capitalize">
                    {extractFirstName(userDetail.first_name)  ?? ''} {extractFirstName(userDetail?.last_name) ?? ''}
                  </h2>
                </button>
              </div>
  
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="text-[#E41D03]  text-[13px] border-[#E41D03] hover:bg-red-50 font-medium"
                  onClick={() => { if (userDetail.id !== undefined) blockUser(userDetail.id); }}
                >
                  Block User
                </Button>
                <Button className="font-medium  text-[13px] leading-[150%] bg-[#039AE4]  text-[#FFFFFF]">
                  Save
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
                <div className="h-16 w-16 overflow-hidden items-center justify-center rounded-full">
                  <img
                    src={userDetail ? userDetail.profile_image : Avatar }
                    alt="User"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold  text-[#121826] text-[18px] capitalize">
                    {extractFirstName(userDetail.first_name)  ?? ''} {extractFirstName(userDetail?.last_name) ?? ''}
                  </h4>
                  <div className="flex items-center gap-2 text-[16px] cursor-pointer leading-[150%] text-[#121826]">
                    <span>{userDetail?.uid}</span>
                    <button
                      className="text-[#121826] cursor-pointer"
                      onClick={copyToClipboard} // Enable copy function
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {userDetail?.status === 'verified' && (
                  <span className="ml-auto border-[#FF9C00] text-[#FF9C00] flex items-center gap-1">
                    <ShieldCheck className="w-[24px] h-[24px] text-textDark cursor-pointer" />
                    Verified
                  </span>
                )}
              </div>
  
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                    Last Name
                  </label>
                  <input
                    value={extractFirstName(userDetail.last_name)  ?? ''}
                    type="text"
                    placeholder="last name"
                    className="xl:w-[230px] w-[100px] h-[30px] rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px] capitalize "
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                    First Name
                  </label>
                  <input
                    value={extractFirstName(userDetail.first_name)  ?? ''}
                    type="text"
                    placeholder="first name"
                    className="xl:w-[230px] w-[100px] h-[30px] rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px] capitalize "
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                    Email
                  </label>
                  <input
                    value={userDetail?.email ?? ''}
                    type="text"
                    placeholder="name@email.com"
                    className="xl:w-[230px] w-[100px] h-[30px]  rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                    Phone Number
                  </label>
                  <input
                    value={userDetail?.phone_number ?? ''}
                    type="text"
                    placeholder="phone "
                    className="xl:w-[230px] w-[100px] h-[30px]  rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-[60px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-1">
                    Date Of Birth
                  </label>
                  <input
                    value={userDetail?.date_of_birth ?? ''}
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
                    value={userDetail?.gender ?? ''}
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
                    value={userDetail?.nationality ?? ''}
                    type="text"
                    placeholder="America"
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

}
