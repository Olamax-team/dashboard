import { apiRequestHandler } from "@/api/api-request-handler";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BlockedUserReport } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { cn, extractFirstName } from "@/lib/utils";
import { useAdminDetails } from "@/store/admin-details-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ManageBlockedUser = ({ visibleFilter }: {visibleFilter: Record<string, boolean>}) => {
  const navigate = useNavigate();
  const { token } = useAdminDetails();

  const queryClient = useQueryClient();

  const unBlock = async (id:number) => {

    const unblock = () => axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/block-unblock`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: {
        blocked: false, 
        description: "tsr",
        user_id: id
      }
    });

    const blockResult = await apiRequestHandler(unblock);

    if (blockResult && blockResult.status === 200) {
      console.log(blockResult)
      toast.success('User successfully unblocked');
      queryClient.invalidateQueries({queryKey: ['admin-blockUser']});
    };
  };

  const manageBlockConfig = useApiConfigWithToken({
    method: 'get',
    url: 'admin/blocked-users'
  });

  const fetchBlock = () => axios.request(manageBlockConfig)

  const { data , status } = useQuery({
    queryKey: ['admin-blockUser'],
    queryFn: () => apiRequestHandler(fetchBlock)
  })

  const transaction = data?.data.data.BlockedUsers as BlockedUserReport[] || [];

  if (status === 'pending') {
    return (
      <div className="w-full py-[200px] flex items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    );
  }

  if (status === 'error' && !transaction) {
    return (
      <div className="w-full py-[50px] flex items-center justify-center">
        <p className="text-red-500">Error fetching blocked users</p>
      </div>
    );
  };

  if (status === 'success' && transaction && transaction.length === 0) {
    return (
      <div className="w-full py-[50px] flex items-center justify-center">
        <p className="text-gray-500">No blocked users available</p>
      </div>
    );
  };


  if (status === 'success' && transaction && transaction.length > 0) {

    return (
      <div className="border-2 border-gray-300">
        <Table className="border-collapse">
          <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b">
            <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
              {visibleFilter.user && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  User
                </TableHead>
              )}
              {visibleFilter.email && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Email
                </TableHead>
              )}
              {visibleFilter.phoneNumber && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Phone Number
                </TableHead>
              )}
              {visibleFilter.referralCode && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Referral Code
                </TableHead>
              )}
              {visibleFilter.verificationmethod && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Verification Method
                </TableHead>
              )}
              {visibleFilter.Status && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Status
                </TableHead>
              )}
              {visibleFilter.reason && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Reason
                </TableHead>
              )}
              {visibleFilter.action && (
                <TableHead className="text-center font-bold text-[#121826]">
                  Action
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {transaction.map((transaction, index) => (
              <TableRow
                key={index}
                className={cn('odd:bg-[#f3f3f3] cursor-pointer even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5')}
              >
                {visibleFilter.user && (
                  <TableCell className="py-2 text-center border-r border-gray-300" onClick={() => navigate(`/dashboard/user-information/user-details/${transaction.user.user_id}`)}>
                    <div>{extractFirstName(transaction.user.first_name)} {extractFirstName(transaction.user.last_name)}</div>
                    <div className="text-xs text-[#121826]">
                      UID {transaction.user.uid}
                    </div>
                  </TableCell>
                )}
  
                {visibleFilter.email && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.user.email}
                  </TableCell>
                )}
                {visibleFilter.phoneNumber && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.user.phone}
                  </TableCell>
                )}
                {visibleFilter.referralCode && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.user.referral_code}
                  </TableCell>
                )}
                {visibleFilter.verificationmethod && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.user.verification_method}
                  </TableCell>
                )}
  
                {visibleFilter.Status && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <span
                      className={`px-2 py-1 rounded-sm text-xs font-medium ${
                        transaction.user.status === "Verified"
                          ? "text-[#121826]"
                          : transaction.user.status === "UnVerified"
                          ? "text-red-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {transaction.user.status}
                    </span>
                  </TableCell>
                )}
  
                {visibleFilter.reason && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.reason}
                  </TableCell>
                )}
  
                {visibleFilter.action && (
                  <TableCell className="text-center py-2">
                    <span
                      onClick={() => unBlock(transaction.user.user_id)}
                      className={`px-2 py-1 rounded-sm text-xs font-medium ${
                        transaction.user.is_blocked === 1
                          ? "text-[#0073AD]"
                          : transaction.user.is_blocked === 0
                          ? "text-red-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {transaction.user.is_blocked === 1 ? 'Unblock' : 'Block'}
                    </span>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default ManageBlockedUser;
