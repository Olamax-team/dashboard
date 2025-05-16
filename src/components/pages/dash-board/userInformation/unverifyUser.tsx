import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

type verifiedItem = {
  user: string;
  uid: string;
  email: string;
  phoneNumber: string;
  referralCode: string;
  verificationmethod: string;
  Status: "Pending" | "UnVerified";
  referrerBonus: string | null;
};

const Unverified = ({
  visibleFilter,
}: {
  visibleFilter: Record<string, boolean>;
}) => {
  const [completedMenu, setCompletedMenu] = React.useState("view");
  const navigate = useNavigate();

  const transaction: verifiedItem[] = [
    {
      user: "Mason Mount",
      uid: "22110976",
      email: "Masonmount@gmail.com",
      phoneNumber: "09134736322",
      referralCode: "-",
      verificationmethod: "-",
      Status: "Pending",
      referrerBonus: "-",
    },
  ];

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
          {transaction.map((transaction, index) => (
            <TableRow
              key={index}
              onClick={() => navigate(`/UserDetailsUnverified`)}
              className={`odd:bg-[#f3f3f3] cursor-pointer even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
            >
              {visibleFilter.user && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  <div>{transaction.user}</div>
                  <div className="text-xs text-[#121826]">
                    UID {transaction.uid}
                  </div>
                </TableCell>
              )}

              {visibleFilter.email && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.email}
                </TableCell>
              )}
              {visibleFilter.phoneNumber && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.phoneNumber}
                </TableCell>
              )}
              {visibleFilter.referralCode && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.referralCode}
                </TableCell>
              )}
              {visibleFilter.verificationmethod && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.verificationmethod}
                </TableCell>
              )}

              {visibleFilter.Status && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  <span
                    className={`px-2 py-1 rounded-sm text-xs font-medium ${
                      transaction.Status === "Pending"
                        ? "text-red-700"
                        : transaction.Status === "UnVerified"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {transaction.Status}
                  </span>
                </TableCell>
              )}

              {visibleFilter.referrerBonus && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.referrerBonus}
                </TableCell>
              )}

              {visibleFilter.action && (
                <TableCell className="text-center py-2">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="outline-none">
                      <button
                        type="button"
                        className="flex items-center justify-center h-full w-full p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-all duration-200"
                      >
                        <HiMiniEllipsisVertical className="text-[#121826] size-7" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="rounded-xl bg-white shadow-lg p-4 w-[180px] ring-1 ring-gray-200 transition-all duration-200 transform scale-95 hover:scale-100">
                      <DropdownMenuRadioGroup
                        value={completedMenu}
                        onValueChange={setCompletedMenu}
                      >
                        <DropdownMenuRadioItem
                          value="view"
                          className="rounded-lg py-2 px-4 text-sm pl-6 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                        >
                          View
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="block User"
                          className="rounded-lg py-2 px-4 text-sm pl-6 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                        >
                          Block User
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="delete User"
                          className="rounded-lg py-2 px-4 text-sm pl-6 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                        >
                          Delete User
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="export details"
                          className="rounded-lg py-2 px-4 text-sm pl-6 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                        >
                          Export Details
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
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

export default Unverified;
