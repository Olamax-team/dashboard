import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OTPVerification from "./otpVerification"; // Import OTPVerification component

type manageitem = {
  user: string;
  uid: string;
  email: string;
  phoneNumber: string;
  referralBy: string;
  transactionAmount: number;
  Status: "Verified" | "UnVerified";
  referrerBonus: string | number;
  action: "Finish" | "Unverified";
};

const ManageReferralHistory = ({
  visibleFilter,
}: {
  visibleFilter: Record<string, boolean>;
}) => {
  const [showOTP, setShowOTP] = useState(false);

  const transaction: manageitem[] = [
    {
      user: "Mason Mount",
      uid: "22110976",
      email: "Masonmount@gmail.com",
      phoneNumber: "09134736322",
      referralBy: "Olu Willaims",
      transactionAmount: 100000,
      Status: "Verified",
      referrerBonus: 1000,
      action: "Finish",
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
            {visibleFilter.referralBy && (
              <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                Referral By
              </TableHead>
            )}
            {visibleFilter.transactionAmount && (
              <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                Transaction Amount
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
              className="cursor-pointer odd:bg-gray-100 even:bg-gray-200 border-b h-[50px] hover:bg-gray-300 transition-all"
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
              {visibleFilter.referralBy && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.referralBy}
                </TableCell>
              )}
              {visibleFilter.transactionAmount && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  {transaction.transactionAmount}
                </TableCell>
              )}
              {visibleFilter.Status && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  <span
                    className={`px-2 py-1 rounded-sm text-xs font-medium ${
                      transaction.Status === "Verified"
                        ? "text-[#121826]"
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
                  <span
                    className={`px-2 py-1 rounded-sm text-xs font-medium ${
                      transaction.action === "Finish"
                        ? "text-[#0073AD]"
                        : transaction.action === "Unverified"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                    onClick={() => setShowOTP(true)}
                  >
                    {transaction.action}
                  </span>
                  {showOTP && <OTPVerification setShowOTP={setShowOTP} />}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageReferralHistory;
