import { apiRequestHandler } from "@/api/api-request-handler";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { userProps } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { extractFirstName } from "@/lib/utils";
import { useAdminDetails } from "@/store/admin-details-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";


const AdminTable = ({ visibleFilter }: {visibleFilter: Record<string, boolean>}) => {

  const [completedMenu, setCompletedMenu] = useState("view");
  const [active, setActive] = useState(false)


  const userConfig = useApiConfigWithToken({
    method: 'get',
    url: 'users'
  });

  const roleSetUpConfig = useApiConfigWithToken({
    method: 'get',
    url: 'admin/setup-roles'
  });

  const listRolesConfig = useApiConfigWithToken({
    method: 'get',
    url: 'admin/list-roles'
  });

  const fetchUsers = () => axios.request(userConfig);
  const setUpRoles = () => axios.request(roleSetUpConfig);
  const listRoles = () => axios.request(listRolesConfig)

  const { data:usersResponse, status } = useQuery({
    queryKey: ['all-users'],
    queryFn: () =>apiRequestHandler(fetchUsers)
  });

  const { data:roleResponse } = useQuery({
    queryKey: ['setup-roles'],
    queryFn: () =>apiRequestHandler(setUpRoles)
  });

  const { data:rolesList } = useQuery({
    queryKey: ['setup-permission'],
    queryFn: () =>apiRequestHandler(listRoles)
  });

  const allUsers:userProps[] = usersResponse?.data.data.filter((user: userProps) => user.uid !== null) || [];
  const allRoles = rolesList?.data[0];

  console.log(roleResponse);
  console.log(allUsers);
  console.log(allRoles);
  
  const { token } = useAdminDetails();

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
    console.log(assignRoleResult);
  };

  const toggleUserStatus = (role:boolean) => {
    setActive(role);
  };

  if (status === 'pending') {
    return (
      <div className="w-full py-[200px] flex items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    );
  }

  if (status === 'error' && !allUsers) {
    return (
      <div className="w-full py-[50px] flex items-center justify-center">
        <p className="text-red-500">Error fetching data</p>
      </div>
    );
  }

  if (status === 'success' && allUsers && allUsers.length === 0) {
    return (
      <div className="w-full py-[50px] flex items-center justify-center">
        <p className="text-gray-500">No users available</p>
      </div>
    );
  }
  if (status === 'success' && allUsers && allUsers.length > 0) {
    return (
      <div className="border-2 border-gray-300">
        <Table className="border-collapse">
          <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b">
            <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
              {visibleFilter.name && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Name
                </TableHead>
              )}
              {visibleFilter.email && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Email
                </TableHead>
              )}
              {visibleFilter.phoneNo && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Phone Number
                </TableHead>
              )}
              {visibleFilter.role && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Role
                </TableHead>
              )}
              {visibleFilter.status && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Status
                </TableHead>
              )}
              {visibleFilter.roleDescription && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Role Access
                </TableHead>
              )}
              {visibleFilter.action && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Activate
                </TableHead>
              )}
              <TableHead className="text-center font-bold text-[#121826]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers && allUsers.length > 0 && allUsers.map((user) => (
              <TableRow
                key={user.id}
                className={`odd:bg-[#f3f3f3] cursor-pointer even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
              >
                {visibleFilter.name && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <div className="text-sm text-[#121826] capitalize">
                      {extractFirstName(user.first_name)} {extractFirstName(user.last_name)}
                    </div>
                  </TableCell>
                )}
  
                {visibleFilter.email && (
                  <TableCell className="py-2 text-center border-r border-gray-300 text-sm">
                    {user.email}
                  </TableCell>
                )}
                {visibleFilter.phoneNo && (
                  <TableCell className="py-2 text-center border-r border-gray-300 text-sm">
                    {user.phone_number}
                  </TableCell>
                )}
                {visibleFilter.role && (
                  <TableCell className="py-2 text-center border-r border-gray-300 text-sm">
                    {user.role ? user.role : null}
                  </TableCell>
                )}
                {visibleFilter.status && (
                  <TableCell className="py-2 text-center border-r border-gray-300 text-sm">
                    {user.role_status}
                  </TableCell>
                )}
  
                {visibleFilter.roleDescription && (
                  <TableCell className="py-2 text-center border-r border-gray-300 text-sm">
                    {user.role_access}
                  </TableCell>
                )}
  
                {visibleFilter.action && (
                  <TableCell className="text-center py-2 border-r border-gray-300">
                      <Switch
                      checked={active}
                      onCheckedChange={() =>toggleUserStatus(!active)}
                      className="data-[state=checked]:bg-[#1FAF38] data-[state=unchecked]:bg-[#c3f0ca]"
                    />
                  </TableCell>
                )}
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
                      <DropdownMenuRadioGroup
                        value={completedMenu}
                        onValueChange={setCompletedMenu}
                      >
                        {allRoles && (allRoles as { id: number; name: string }[])
                          .filter((role: { id: number; name: string }) => role.name !== "user")
                          .map((role: { id: number; name: string }) => (
                          <DropdownMenuRadioItem
                            key={role.id}
                            value={role.name}
                            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            e.stopPropagation();
                            assignRole(user.id, role.name);
                            }}
                            className="capitalize rounded-lg py-2 px-4 text-sm pl-6 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                          >
                            Assign {role.name}
                          </DropdownMenuRadioItem>
                          ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

};

export default AdminTable;
