import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

type verifiedItem = {
  user: string;
  uid: string;
  email: string;
  phoneNumber: string;
  referralCode: string;
  verificationmethod: string;
  Status: "Verified" | "UnVerified";
  reason: string ;
  action:"Unblock" | "Block";
};

const ManageBlockedUser = ({ visibleFilter }: { visibleFilter: Record<string, boolean> }) => {
  const navigate = useNavigate()

  const transaction: verifiedItem[] = [
    {
      user: "Mason Mount",
      uid: "22110976",
      email: "Masonmount@gmail.com",
      phoneNumber: "09134736322",
      referralCode: "-",
      verificationmethod: "-",
      Status: "Verified",
      reason: "Malicious Transaction",
      action:"Unblock",
    },
  ];

  return (
    <div className="border-2 border-gray-300">
      <Table className="border-collapse">
        <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b">
          <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
            {visibleFilter.user && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">User</TableHead>}
            {visibleFilter.email && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Email</TableHead>}
            {visibleFilter.phoneNumber && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Phone Number</TableHead>}
            {visibleFilter.referralCode && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Referral Code</TableHead>}
            {visibleFilter.verificationmethod && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Verification Method</TableHead>}
            {visibleFilter.Status && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Status</TableHead>}
            {visibleFilter.reason && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Reason</TableHead>}
            {visibleFilter.action && <TableHead className="text-center font-bold text-[#121826]">Action</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {transaction.map((transaction, index) => (
            <TableRow
              key={index}

              className={`odd:bg-[#f3f3f3] cursor-pointer even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
            >
              {visibleFilter.user && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  <div>{transaction.user}</div>
                  <div className="text-xs text-[#121826]">UID {transaction.uid}</div>
                </TableCell>
              )}

              {visibleFilter.email && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.email}</TableCell>}
              {visibleFilter.phoneNumber && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.phoneNumber}</TableCell>}
              {visibleFilter.referralCode && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.referralCode}</TableCell>}
              {visibleFilter.verificationmethod && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.verificationmethod}</TableCell>}

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

              {visibleFilter.reason && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.reason}</TableCell>}

              {visibleFilter.action && (
                <TableCell className="text-center py-2">
                    <span

                     onClick={() => navigate(`/Unverified`)} 
                    className={`px-2 py-1 rounded-sm text-xs font-medium ${
                        transaction.action === "Unblock" ? "text-[#0073AD]" : transaction.action === "Block" ? "text-red-700" : "text-yellow-700"
                    }`}
                    >
                    {transaction.action}
                    </span>
                </TableCell>
                )}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageBlockedUser;
