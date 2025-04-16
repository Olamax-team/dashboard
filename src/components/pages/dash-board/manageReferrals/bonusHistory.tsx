import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


type manageitem = {
  user: string;
  uid: string;
  email: string;
  phoneNumber: string;
  referralBy: string;
  withdrawalMethod: string;
  Status: "Verified" | "UnVerified";
  referrerBonus: string | number;
  accountNo: string;
  bankName:string;
  Timestamp:string;

};

const BonusHistory = ({ visibleFilter }: { visibleFilter: Record<string, boolean> }) => {

  const transaction: manageitem[] = [
    {
      user: "Mason Mount",
      uid: "22110976",
      email: "Masonmount@gmail.com",
      phoneNumber: "09134736322",
      referralBy: "Olu Willaims",
      withdrawalMethod: "bank transfer",
      Status: "Verified",
      referrerBonus: 1000,
       accountNo: "023857362",
       bankName:"GTBank",
       Timestamp:"2025-03-12T10:09:00Z",
    },
    
  ];

  const formatTimestamp = (timestamp: string) => { const date = new Date(timestamp); return date.toLocaleString();

  };

  return (
    <div className="border-2 border-gray-300">
      <Table className="border-collapse">
        <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b">
          <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
            {visibleFilter.user && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">User</TableHead>}
            {visibleFilter.email && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Email</TableHead>}
            {visibleFilter.phoneNumber && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Phone Number</TableHead>}
            {visibleFilter.referralBy && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Referral By</TableHead>}
            {visibleFilter.withdrawalMethod && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Withdrawal Method</TableHead>}
            {visibleFilter.Status && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Status</TableHead>}
            {visibleFilter.referrerBonus && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Referral Bonus</TableHead>}
            {visibleFilter.accountNo && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Account No</TableHead>}
            {visibleFilter.bankName && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Bank Name</TableHead>}
            {visibleFilter.Timestamp && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">TimeStamp</TableHead>}



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
                  <div className="text-xs text-[#121826]">UID {transaction.uid}</div>
                </TableCell>
              )}

              {visibleFilter.email && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.email}</TableCell>}
              {visibleFilter.phoneNumber && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.phoneNumber}</TableCell>}
              {visibleFilter.referralBy && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.referralBy}</TableCell>}
              {visibleFilter.withdrawalMethod && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.withdrawalMethod}</TableCell>}

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

              {visibleFilter.referrerBonus && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.referrerBonus}</TableCell>}
              {visibleFilter.accountNo && (<TableCell className="text-center py-2 border-r border-gray-300">{transaction.accountNo}</TableCell>)}
              {visibleFilter.bankName && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.bankName}</TableCell>}
              {visibleFilter.Timestamp && <TableCell className="py-2 text-center border-r border-gray-300">{formatTimestamp(transaction.Timestamp)}</TableCell>}


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BonusHistory;
