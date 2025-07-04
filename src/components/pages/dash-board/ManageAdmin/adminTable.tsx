import { apiRequestHandler } from "@/api/api-request-handler";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { AdminUserData } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { cn } from "@/lib/utils";
import { useAdminDetails } from "@/store/admin-details-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { toast } from "sonner";


const AdminTable = ({ visibleFilter }: {visibleFilter: Record<string, boolean>}) => {

  const [completedMenu, setCompletedMenu] = useState("view");
  
  
  const AdminCard = ({user}:{user:AdminUserData}) => {
    const [active, setActive] = useState(false);

    const toggleUserStatus = (role:boolean) => {
      setActive(role);
    };

    return (
      <TableRow
        key={user.user_id}
        className={`odd:bg-[#f3f3f3] cursor-pointer even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
      >
        {visibleFilter.name && (
          <TableCell className="py-2 text-center border-r border-gray-300">
            <div className="text-sm text-[#121826] capitalize">
              {user.name}
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
            {user.phone}
          </TableCell>
        )}
        {visibleFilter.role && (
          <TableCell className="py-2 text-center border-r border-gray-300 text-sm capitalize">
            {user.roles.map(role => role.role).join(', ')}
          </TableCell>
        )}
        {visibleFilter.status && (
          <TableCell className="py-2 text-center border-r border-gray-300 text-sm capitalize">
            {user.roles.map(role => role.is_active).join(', ')}
          </TableCell>
        )}

        {visibleFilter.roleDescription && (
          <TableCell className="py-2 text-center border-r border-gray-300 text-sm">
            {user.roles.map(role => role.access_right).join(', ')}
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
                { allRoles && (allRoles as { id: number; name: string }[])
                  .filter((role: { id: number; name: string }) => role.name !== "user")
                  .map((role: { id: number; name: string }) => (
                  <DropdownMenuItem
                    key={role.id}
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    e.stopPropagation();
                    assignRole(user.user_id, role.name);
                    }}
                    className={cn(
                      "capitalize rounded-lg py-2 px-2 text-sm pl-3 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150",
                      user.roles.some(r => r.role === role.name) ? 'hidden' : 'block'
                    )}
                  >
                    <span className="text-sm">Assign {role.name}</span>
                  </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="capitalize rounded-lg py-2 px-2 text-sm pl-3 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150" onClick={() => toggleRole(user.user_id)}>
                    <span className="text-sm">Remove Admin</span>
                  </DropdownMenuItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    )
  }


  const userConfig = useApiConfigWithToken({
    method: 'get',
    url: 'admin/list-admin'
  });

  const fetchUsers = () => axios.request(userConfig);

  const { data:usersResponse, status } = useQuery({
    queryKey: ['all-users'],
    queryFn: () =>apiRequestHandler(fetchUsers)
  });

  const allAdmins:AdminUserData[] = usersResponse?.data.data || [];

  const { token } = useAdminDetails();

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
      console.log(assignRoleResult);
      toast.success(assignRoleResult.data.message);
    }
  };

  const toggleRole = async (userId: number) => {

    const assign: () => Promise<any> = () => axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/toggle-role-status`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: {
        user_id: userId,
        role_id: 3,
      },
    });

    const assignRoleResult = await apiRequestHandler(assign);
    console.log(assignRoleResult);
    if (assignRoleResult && assignRoleResult.status === 200) {
      console.log(assignRoleResult);
      toast.success(assignRoleResult.data.message);
    }
  };

  if (status === 'pending') {
    return (
      <div className="w-full py-[200px] flex items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    );
  }

  if (status === 'error' && !allAdmins) {
    return (
      <div className="w-full py-[50px] flex items-center justify-center">
        <p className="text-red-500">Error fetching data</p>
      </div>
    );
  };

  if (status === 'success' && allAdmins && allAdmins.length === 0) {
    return (
      <div className="w-full py-[50px] flex items-center justify-center">
        <p className="text-gray-500">No users available</p>
      </div>
    );
  };

  if (status === 'success' && allAdmins && allAdmins.length > 0) {
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
            { allAdmins && allAdmins.length > 0 && allAdmins.map((user) => (
              <AdminCard user={user}/>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

};

export default AdminTable;
