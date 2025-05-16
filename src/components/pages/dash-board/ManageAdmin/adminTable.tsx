import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

type transactions = {
  id: number;
  name: string;
  email: string;
  phoneNo: string;
  role: string;
  status: "Active" | "Inactive";
  roleDescription: string;
};

const AdminTable = ({
  visibleFilter,
}: {
  visibleFilter: Record<string, boolean>;
}) => {
  const [transaction, setUsers] = useState<transactions[]>([
    {
      id: 1,
      name: "Mason Mount",
      email: "Masonmount@gmail.com",
      phoneNo: "09134736322",
      role: "Super Admin",
      status: "Active",
      roleDescription: "Full Access",
    },
    {
      id: 2,
      name: "Mason Mount",
      email: "Masonmount@gmail.com",
      phoneNo: "09134736322",
      role: "Regular Staff",
      status: "Active",
      roleDescription: "-",
    },
    {
      id: 3,
      name: "Mason Mount",
      email: "Masonmount@gmail.com",
      phoneNo: "09134736322",
      role: "Regular Staff",
      status: "Active",
      roleDescription: "-",
    },
    {
      id: 4,
      name: "Mason Mount",
      email: "Masonmount@gmail.com",
      phoneNo: "09134736322",
      role: "Regular Staff",
      status: "Inactive",
      roleDescription: "-",
    },
  ]);

  const toggleUserStatus = (userId: number) => {
    setUsers(
      transaction.map((transactions) => {
        if (transactions.id === userId) {
          return {
            ...transactions,
            status: transactions.status === "Active" ? "Inactive" : "Active",
          };
        }
        return transactions;
      })
    );
  };

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
                Role Description
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
          {transaction.map((transaction) => (
            <TableRow
              key={transaction.id}
              className={`odd:bg-[#f3f3f3] cursor-pointer even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
            >
              {visibleFilter.name && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  <div className="text-xs text-[#121826]">
                    {transaction.name}
                  </div>
                </TableCell>
              )}

              {visibleFilter.email && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.email}
                </TableCell>
              )}
              {visibleFilter.phoneNo && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.phoneNo}
                </TableCell>
              )}
              {visibleFilter.role && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.role}
                </TableCell>
              )}
              {visibleFilter.status && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.status}
                </TableCell>
              )}

              {visibleFilter.roleDescription && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.roleDescription}
                </TableCell>
              )}

              {visibleFilter.action && (
                <TableCell className="text-center py-2">
                  <Switch
                    checked={transaction.status === "Active"}
                    onCheckedChange={() => toggleUserStatus(transaction.id)}
                    className="data-[state=checked]:bg-[#1FAF38] data-[state=unchecked]:bg-[#c3f0ca]"
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTable;
