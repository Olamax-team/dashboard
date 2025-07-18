import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup,  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiRequestHandler } from "@/api/api-request-handler";
import { userDetailsProps } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { cn, extractFirstName } from "@/lib/utils";
import { toast } from "sonner";
import { useAdminDetails } from "@/store/admin-details-store";
import { useFetch } from "@/lib/use-fetch";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const VerifiedUsers = ({visibleFilter}: {visibleFilter: Record<string, boolean>}) => {
  const { token } = useAdminDetails();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const paramsString = searchParams.toString();
  const fullUrl = paramsString ? `admin/users?${paramsString}` : 'admin/users?status=verified';

  const userConfig = useApiConfigWithToken({
    method: 'post',
    url: fullUrl
  });

  const fetchUsers = () => axios.request(userConfig);

  const { data:usersResponse, status:allUserStatus } = useQuery({
    queryKey: ['verified-users', paramsString],
    queryFn: () =>apiRequestHandler(fetchUsers)
  });

  interface UsersResponse {
    data: {
      data: Partial<userDetailsProps>[];
    };
  };

  const allRoles = [
    {
      id: 1,
      name: 'superAdmin'
    },
    {
      id: 2,
      name: 'admin'
    },
    {
      id: 3,
      name: 'user'
    },
    {
      id: 4,
      name: 'creator'
    },
    {
      id: 5,
      name: 'author'
    }
  ];

  const assignRole = async (userId: number, role: string) => {

    const assign: () => Promise<any> = () => axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/assign-role`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: {
        user_id: userId,
        role: role,
      },
    });

    const assignRoleResult = await apiRequestHandler(assign);
    if (assignRoleResult && assignRoleResult.status === 200) {
      console.log(assignRoleResult)
      toast.success(assignRoleResult.data.message);
    }
  };

  const { deleteUser, blockUser } = useFetch();

  const verifiedUsers: Partial<userDetailsProps>[] | undefined = (usersResponse as UsersResponse | undefined)?.data.data.filter((user: Partial<userDetailsProps>) => user.status === 'verified');

  if (allUserStatus === "pending") {
    return (
      <div className="flex items-center justify-center h-full py-28">
        <Loader2 className="animate-spin size-8 text-gray-500" />
      </div>
    );
  };

  if (allUserStatus === "error") {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 py-28">
        Error loading verified users.
      </div>
    );
  };

  if (allUserStatus === 'success' && verifiedUsers && verifiedUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 py-28">
        {paramsString ? `No verified user for the query "${searchParams.get('search')}" was found` : 'No verified users found.'}
      </div>
    );
  };

  if (allUserStatus === 'success' && verifiedUsers && verifiedUsers.length > 0) {
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
              {visibleFilter.referrerBonus && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Referral Bonus
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
            {verifiedUsers.map((item, index) => (
              <TableRow
                key={index}// Navigate on row click
                className="cursor-pointer odd:bg-gray-100 even:bg-gray-200 border-b h-[50px] hover:bg-gray-300 transition-all"
              >
                {visibleFilter.user && (
                  <TableCell className="py-2 text-center border-r border-gray-300 group" onClick={() => navigate(`/dashboard/user-information/user-details/${item.id}`)} >
                    <div className="group-hover:underline capitalize">{extractFirstName(item.first_name)} {extractFirstName(item.last_name)}</div>
                    <div className="text-xs text-[#121826] group-hover:underline">
                      UID {item.uid}
                    </div>
                  </TableCell>
                )}

                {visibleFilter.email && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {item.email}
                  </TableCell>
                )}
                {visibleFilter.phoneNumber && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {item.phone_number}
                  </TableCell>
                )}
                {visibleFilter.referralCode && (
                  <TableCell className="py-2 text-center border-r border-gray-300 uppercase">
                    {item.referral_code || "N/A"}
                  </TableCell>
                )}
                {visibleFilter.verificationmethod && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {item.verification_method || "N/A"}
                  </TableCell>
                )}

                {visibleFilter.Status && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <span
                      className={`px-2 py-1 rounded-sm text-xs font-medium capitalize ${
                        item.status === "verified"
                          ? "text-green-700"
                          : item.status === "UnVerified"
                          ? "text-red-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                )}

                {visibleFilter.referrerBonus && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {item.referral_balance || "N/A"}
                  </TableCell>
                )}

                {visibleFilter.action && (
                  <TableCell className="text-center py-2">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger className="outline-none">
                        <button
                          type="button"
                          className="flex items-center justify-center h-full w-full p-2 hover:bg-gray-300 rounded-md transition-all duration-200"
                        >
                          <HiMiniEllipsisVertical className="text-[#121826] size-7" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="rounded-xl bg-white shadow-lg p-2 w-[180px] ring-1 ring-gray-200 transition-all duration-200 transform scale-95 hover:scale-100">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              navigate(`/dashboard/user-information/user-details/${item.id}`);
                            }}
                            className="rounded-lg py-2 px-2 text-sm pl-3 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                          >
                            <span className="text-sm">View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => { if (item.id !== undefined) blockUser(item.id); }}
                            className="rounded-lg py-2 px-2 text-sm pl-3 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                          >
                            <span className="text-sm">Block User</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => { if (item.id !== undefined) deleteUser(item.id); }}
                            className="rounded-lg py-2 px-2 text-sm pl-3 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                          >
                            <span className="text-sm">Delete User</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-lg py-2 px-2 text-sm pl-3 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                          >
                            <span className="text-sm">Export Details</span>
                          </DropdownMenuItem>
                          { allRoles && (allRoles as { id: number; name: string }[])
                          .filter((role: { id: number; name: string }) => role.name !== "user")
                          .map((role: { id: number; name: string }) => (
                          <DropdownMenuItem
                            key={role.id}
                            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                              e.stopPropagation();
                              if (item.id !== undefined) {
                                assignRole(item.id, role.name);
                              }
                            }}
                            className={cn("capitalize rounded-lg py-2 px-4 text-sm pl-6 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150", (item && item.role) === role.name ? 'hidden' : 'block' )}
                          >
                            <span className="text-sm">Assign {role.name}</span>
                          </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
};

export default VerifiedUsers;
