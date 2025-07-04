import { Copy, Loader2, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../escrow/pageHeader";
import DashboardLayout from "@/layout/dash-board-layout";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiRequestHandler } from "@/api/api-request-handler";
import { userDetailsProps, UserKYCData } from "@/lib/types";
import { extractFirstName } from "@/lib/utils";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { useAdminDetails } from "@/store/admin-details-store";
import { useFetch } from "@/lib/use-fetch";
import { HiOutlineShieldCheck, HiXMark } from "react-icons/hi2";
import Avatar from "@/components/ui/Avatar";

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAdminDetails();
  const { blockUser } = useFetch();

  // Function to copy the user ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText("20921123"); // Replace with dynamic userID if necessary
    toast.info('User UID copied to clipboard');
  };

  const userConfig = useApiConfigWithToken({
    method: 'get',
    url: `admin/get-user-detail-by-id/${id}`
  });

  const userKycConfig = useApiConfigWithToken({
    method: 'get',
    url: `admin/get-kyc-details/${id}/id`
  });

  console.log(userKycConfig)

  const kycProceedingConfig = useApiConfigWithToken({
    method: 'get',
    url: 'kyc-proceeding'
  });

  const fetchUsers = () => axios.request(userConfig);
  const fetchKyc = () => axios.request(userKycConfig);
  const fetchKycProceeding = () => axios.request(kycProceedingConfig);

  const { data:userDetailsResponse, status:userDetailStatus } = useQuery({
    queryKey: ['user-details', id],
    queryFn: () =>apiRequestHandler(fetchUsers)
  });

  const { data:userKycResponse, status:userKycStatus } = useQuery({
    queryKey: ['user-kyc', id],
    queryFn: () =>apiRequestHandler(fetchKyc)
  });

  const { data:kycProceedingResponse } = useQuery({
    queryKey: ['kyc-proceeding'],
    queryFn: () =>apiRequestHandler(fetchKycProceeding)
  });

  const [viewImage, setViewImage] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');

  const toggleImage = (image:string) => {
    setViewImage(true);
    setImageUrl(image);
  }

  const closeImage = () => {
    setViewImage(false);
    setImageUrl('');
  }

  console.log(kycProceedingResponse?.data);

  const userDetail = userDetailsResponse?.data.data as userDetailsProps
  const userKycDetail = userKycResponse?.data as UserKYCData;
  console.log(userKycDetail)

  function hasProfileImage(imageUrl: string): boolean {
    const base = 'https://api.olamax.io/storage/app/public/';
    return imageUrl.startsWith(base) && imageUrl.length > base.length;
  }

  const profileImagePresent = hasProfileImage(userDetail?.profile_image ?? '');

  const [detailStatus, setDetailStatus] = React.useState<string>(userKycDetail ? userKycDetail.status : '');
  const [videoStatus, setVideoStatus] = React.useState<string>(userKycDetail ? userKycDetail.kyc_documents_video_status : '');
  const [documentStatus, setDocumentStatus] = React.useState<string>(userKycDetail?.kyc_documents_status);

  const updateUserKyc = async (status:string) => {

    const formdata = {
      label: 'users',
      target: 'status',
      status: status
    }

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/update-kyc-status`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: formdata,
    };

    const updateUser = () => axios.request(config);
    const response = await apiRequestHandler(updateUser);
    if (response && response.status === 200) {
      toast.success('User status updated successfully');
      setDetailStatus(status)
    };
  };

  const updateDocumentKyc = async (status:string) => {

    const formdata = {
      label: 'kyc_documents',
      target: 'status',
      status: status
    }

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/update-kyc-status`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: formdata,
    };

    const updateUser = () => axios.request(config);
    const response = await apiRequestHandler(updateUser);
    if (response && response.status === 200) {
      toast.success('User status updated successfully');
      setDocumentStatus(status);
    };
  }
  const updateVideoKyc = async (status:string) => {

    const formdata = {
      label: 'kyc_documents',
      target: 'video_status',
      status: status
    }

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/update-kyc-status`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: formdata,
    };

    const updateUser = () => axios.request(config);
    const response = await apiRequestHandler(updateUser);
    if (response && response.status === 200) {
      toast.success('User status updated successfully');
      setVideoStatus(status)
    };
  }

  if (userDetailStatus === 'pending' && userKycStatus === 'pending') {
   return (
    <DashboardLayout>
      <div className="flex w-full min-h-screen items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    </DashboardLayout>
   ) 
  };

  if (userDetailStatus === 'error' && userKycStatus === 'error') {
    <DashboardLayout>
      <div className="w-full min-h-screen flex justify-center py-24">
        Error occurred while loading user details
      </div>
    </DashboardLayout>
  };

  if ((userDetailStatus === 'success' && !userDetail) && (userDetailStatus === 'success' && !userKycDetail)) {
    <DashboardLayout>
      <div className="w-full flex justify-center py-24">
        User detail not available, refresh page
      </div>
    </DashboardLayout>
  }

  if ((userDetailStatus === 'success' && userDetail)) {
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
                { userKycDetail && userKycDetail.status !== 'verified' &&
                  <div className="w-full flex items-center justify-between gap-4">
                    <p className="text-sm text-[#5C5C5C] leading-[22px] flex-1">
                      Manage User's Information
                    </p>
                    <div className="flex-1">
                      <Select value={detailStatus} onValueChange={(value) => updateUserKyc(value)}>
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder="Select KYC Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="reject">Reject</SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                }
              </div>
  
              <div className="flex items-center gap-4 pb-6 border-b mb-6">
                {profileImagePresent ?
                  <div className="size-16 overflow-hidden items-center justify-center rounded-full">
                    <img
                      src={userDetail && userDetail.profile_image }
                      alt="User"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div> :
                  <Avatar email={userDetail.email}/>
                }
                <div>
                  <h4 className="font-bold  text-[#121826] text-[18px] capitalize">
                    {extractFirstName(userDetail.first_name)  ?? ''} {extractFirstName(userDetail?.last_name) ?? ''}
                  </h4>
                  <div className="flex items-center gap-2 text-[16px] cursor-pointer leading-[150%] text-[#121826]">
                    <span>{userDetail?.uid}</span>
                    <button
                      className="text-[#121826] cursor-pointer"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {userDetail?.status === 'verified' && (
                  <span className="ml-auto border-[#FF9C00] text-green-600 flex items-center gap-1">
                    <HiOutlineShieldCheck className="w-[24px] h-[24px] text-textDark cursor-pointer" />
                    Verified
                  </span>
                )}
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-2">
                    Last Name
                  </label>
                  <input
                    value={extractFirstName(userDetail.last_name)  ?? ''}
                    type="text"
                    placeholder="last name"
                    className="w-full xl:h-14 h-10 rounded-sm px-3 leading-[27px] mt-0 text-[16px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px] capitalize "
                  />
                </div>
                <div className="w-full ">
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-2">
                    First Name
                  </label>
                  <input
                    value={extractFirstName(userDetail.first_name)  ?? ''}
                    type="text"
                    placeholder="first name"
                    className="w-full rounded-sm px-3 leading-[27px] mt-0 text-[16px] xl:h-14 h-10 xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px] capitalize "
                  />
                </div>
                <div className="w-full ">
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-2">
                    Middle Name
                  </label>
                  <input
                    value={extractFirstName(userDetail.middle_name)  ?? ''}
                    type="text"
                    placeholder="middle name"
                    className="w-full rounded-sm px-3 leading-[27px] mt-0 text-[16px] xl:h-14 h-10 xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px] capitalize "
                  />
                </div>
                <div className="w-full">
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-2">
                    Email
                  </label>
                  <input
                    value={userDetail?.email ?? ''}
                    type="text"
                    placeholder="name@email.com"
                    className="w-full rounded-sm px-3 leading-[27px] mt-0 text-[16px] xl:h-14 h-10 xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px]"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-2">
                    Phone Number
                  </label>
                  <input
                    value={userDetail?.phone_number ?? ''}
                    type="text"
                    placeholder="phone"
                    className="w-full rounded-sm p-2 leading-[27px] mt-0 text-[16px] xl:h-14 h-10 xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none  focus:outline-none font-bold font-Inter xl:leading-[34.5px] px-3"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-2">
                    Date Of Birth
                  </label>
                  <input
                    value={userDetail?.date_of_birth ?? ''}
                    type="text"
                    placeholder="5/8/1987"
                    className="w-full xl:h-14 h-10 leading-[27px] mt-0 text-[16px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none rounded-sm p-2 focus:outline-none font-bold font-Inter xl:leading-[34.5px] px-3"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-2">
                    Gender
                  </label>
                  <input
                    value={userDetail?.gender ?? ''}
                    type="text"
                    placeholder="male"
                    className="w-full xl:h-14 h-10 leading-[27px] mt-0 text-[16px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none rounded-sm p-2 focus:outline-none font-bold font-Inter xl:leading-[34.5px] px-3"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-[#1C1C1C] leading-[100%] mb-2">
                    Nationality
                  </label>
                  <input
                    value={userDetail?.nationality ?? ''}
                    type="text"
                    placeholder="America"
                    className=" w-full xl:h-14 h-10 leading-[27px] mt-0 text-[16px] xl:text-[18px] text-[#121826] bg-[#f5f5f5f5] border-none rounded-sm p-2 focus:outline-none font-bold font-Inter xl:leading-[34.5px] px-3"
                  />
                </div>
              </div>
            </div>
  
            {/* ID Card Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-3">
                <h3 className="text-lg font-bold  leading-[150%] text-[#1C1C1C]">
                  Document Information
                </h3>
                {userKycDetail && userKycDetail.kyc_documents_status !== 'verified' &&
                  <div className="w-full flex items-center justify-between gap-4">
                    <p className="text-sm text-[#5C5C5C] leading-[22px] flex-1">
                      Manage User's Information
                    </p>
                    <div className="flex-1">
                      <Select value={documentStatus} onValueChange={(value) => updateDocumentKyc(value)}>
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder="Select KYC Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="reject">Reject</SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                }
              </div>
  
              <div className="space-y-4">
                {/* If there is any specific data here, you can map through it */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-[140px] border rounded overflow-hidden flex items-center justify-center cursor-pointer" onClick={() =>toggleImage(userKycDetail?.kyc_documents_front)}>
                      <img src={userKycDetail?.kyc_documents_front} alt="document_front" className="object-contain w-fit h-auto" />
                    </div>
                    <div className="w-full h-[140px] border rounded overflow-hidden flex items-center justify-center cursor-pointer" onClick={() =>toggleImage(userKycDetail?.kyc_documents_back)}>
                      <img src={userKycDetail?.kyc_documents_back} alt="document_back" className="object-contain w-fit h-auto" />
                    </div>
                    <div className="w-full h-[140px] border rounded overflow-hidden flex items-center justify-center cursor-pointer" onClick={() =>toggleImage(userKycDetail?.kyc_documents_hold)}>
                      <img src={userKycDetail?.kyc_documents_hold} alt="document_hold" className="object-contain w-fit h-auto" />
                    </div>
                  </div>
                  { viewImage &&
                    <div className="absolute left-0 top-0 w-full 2xl:h-[500px] h-[400px] bg-black/40 z-40 rounded-md flex items-center justify-center">
                      <div className="absolute right-2 top-2 text-white cursor-pointer border rounded p-1 border-transparent hover:border-white/60" onClick={closeImage}>
                        <HiXMark className="size-7"/>
                      </div>
                      <img src={imageUrl} className="object-contain w-[180px] 2xl:w-[230px] h-auto"/>
                    </div>
                  }
                </div>
                <hr/>
                <div className="mb-6">
                  <h3 className="text-lg font-bold  leading-[150%] text-[#1C1C1C]">
                    Video Information
                  </h3>
                  {userKycDetail && userKycDetail.kyc_documents_video_status !== 'verified' &&
                    <div className="w-full flex items-center justify-between gap-4">
                      <p className="text-sm text-[#5C5C5C] leading-[22px] flex-1">
                        Manage User's Information
                      </p>
                      <div className="flex-1">
                        <Select value={videoStatus} onValueChange={(value) => updateVideoKyc(value)}>
                          <SelectTrigger className="w-full h-11">
                            <SelectValue placeholder="Select KYC Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="reject">Reject</SelectItem>
                              <SelectItem value="verified">Verified</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  }
                </div>
                <div>
                  <video src={userKycDetail?.kyc_documents_short_video} controls className="h-[160px] w-full"/>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="container px-4 py-6">
            <div className="rounded-lg px-4 py-6 grid grid-cols-4 gap-3  bg-white shadow-sm">
              <div className="w-full">
                <Select value={labels} onValueChange={(value) => setLabels(value)}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select KYC Labels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Labels</SelectLabel>
                      <SelectItem value="kyc_documents">KYC Documents</SelectItem>
                      <SelectItem value="kyc_user_details">KYC User Details</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Select value={targets} onValueChange={(value) => setTargets(value)}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select Targets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Targets</SelectLabel>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="video_status">Video Status</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Select value={status} onValueChange={(value) => setStatus(value)}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select KYC Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="reject">Reject</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <button className="w-full border-primary rounded-lg flex items-center justify-center bg-primary" onClick={() => updateUserKyc()}>
                <p className="text-sm text-white leading-[22px] cursor-pointer">Update {labels === '' ? 'User' : labels.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
              </button>
            </div>
          </div> */}
        </div>
      </DashboardLayout>
    );
  }

}
