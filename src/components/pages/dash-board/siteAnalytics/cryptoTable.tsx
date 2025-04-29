import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import BTC from '../../../../assets/BTC.svg'
import ENTHERUM from '../../../../assets/ENTHERUM.svg';
import USTD from '../../../../assets/USTD.svg'

interface TransactionData {
  crypto: string
  cryptoCode: string
  totalMonthlySales: string
  totalAirtimePurchase: string
  totalDataPurchase: string
  totalBillPayment: string
}

const transactionData: TransactionData[] = [
  {
    crypto: "BITCOIN",
    cryptoCode: "BTC",
    totalMonthlySales: "NGN 2,000,234,988.00",
    totalAirtimePurchase: "-",
    totalDataPurchase: "-",
    totalBillPayment: "-",
  },
  {
    crypto: "BITCOIN",
    cryptoCode: "BTC",
    totalMonthlySales: "NGN 2,000,234,988.00",
    totalAirtimePurchase: "-",
    totalDataPurchase: "-",
    totalBillPayment: "-",
  },
  {
    crypto: "BITCOIN",
    cryptoCode: "BTC",
    totalMonthlySales: "NGN 2,000,234,988.00",
    totalAirtimePurchase: "-",
    totalDataPurchase: "-",
    totalBillPayment: "-",
  },
  {
    crypto: "BITCOIN",
    cryptoCode: "BTC",
    totalMonthlySales: "NGN 2,000,234,988.00",
    totalAirtimePurchase: "-",
    totalDataPurchase: "-",
    totalBillPayment: "-",
  },
  {
    crypto: "BITCOIN",
    cryptoCode: "BTC",
    totalMonthlySales: "NGN 2,000,234,988.00",
    totalAirtimePurchase: "-",
    totalDataPurchase: "-",
    totalBillPayment: "-",
  },
  {
    crypto: "BITCOIN",
    cryptoCode: "BTC",
    totalMonthlySales: "NGN 2,000,234,988.00",
    totalAirtimePurchase: "-",
    totalDataPurchase: "-",
    totalBillPayment: "-",
  },
  {
    crypto: "BITCOIN",
    cryptoCode: "BTC",
    totalMonthlySales: "NGN 2,000,234,988.00",
    totalAirtimePurchase: "-",
    totalDataPurchase: "-",
    totalBillPayment: "-",
  },
]

const CryptoTransactionTable =()=> {
  return (
    <Card className="w-full shadow-sm">
      <div className="flex flex-col lg:flex-row gap-5">
           
      <CardContent className="w-full overflow-x-auto">
         <div className="rounded-md border min-w-[60%] lg:min-w-full">
             <Table>
                    <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="font-bold text-[12px] text-[#121826]">Crypto</TableHead>
                        <TableHead className="font-bold text-[12px] text-[#121826]">Total Monthly Sales</TableHead>
                        <TableHead className="font-bold text-[12px] text-[#121826]">Total Airtime Purchase</TableHead>
                        <TableHead className="font-bold text-[12px] text-[#121826]">Total Data Purchase</TableHead>
                        <TableHead className="font-bold text-[12px] text-[#121826]">Total Bill Payment</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {transactionData.map((row, index) => (
                        <TableRow key={index}>
                        <TableCell>
                            <div className="font-medium text-[12px] text-[#121826]">{row.cryptoCode}</div>
                            <div className="text-[10px] text-[#121826]">{row.crypto}</div>
                        </TableCell>
                        <TableCell className="font-medium text-[12px] text-[#121826]">{row.totalMonthlySales}</TableCell>
                        <TableCell className="font-medium text-[12px] text-[#121826]">{row.totalAirtimePurchase}</TableCell>
                        <TableCell className="font-medium text-[12px] text-[#121826]">{row.totalDataPurchase}</TableCell>
                        <TableCell className="font-medium text-[12px] text-[#121826]">{row.totalBillPayment}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
            <div className="w-full lg:w-[40%] h-auto p-4 bg-white  rounded-lg">
            <h2 className="lg:text-[16px] font-bold text-[14px] text-[#141414]">Popular Top-Up & Bills</h2>

              <div className="space-y-4 mt-5">
                {/* USDT/NGN Option */}
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center  rounded-full">
                    <img src={BTC} className="w-5 h-5 " />
                    </div>
                    <div>
                    <p className="font-semibold text-[14px] text-[#121826]">USDT/NGN</p>
                    <p className="text-[10px] font-medium text-[#121826]">Tether</p>
                    </div>
                </div>
                <span className="text-[#121826] font-medium text-[14px]">Airtime</span>
                </div>

                {/* BTC/NGN Option */}
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center  rounded-full">
                    <img src={ENTHERUM} className="w-5 h-5 " />
                    </div>
                    <div>
                    <p className="font-semibold text-[14px] text-[#121826]">BTC/NGN</p>
                    <p className="text-[10px] font-medium text-[#121826]">BITCOIN</p>
                    </div>
                </div>
                <span  className="text-[#121826] font-medium text-[14px]">Data</span>
                </div>

                {/* ETH/NGN Option */}
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center  rounded-full">
                    <img src={USTD} className="w-5 h-5 " />
                    </div>
                    <div>
                    <p className="font-semibold text-[14px] text-[#121826]">ETH/NGN</p>
                    <p className="text-[10px] font-medium text-[#121826]">Ethereum</p>
                    </div>
                </div>
                <span  className="text-[#121826] font-medium text-[14px]">Bills</span>
                </div>
            </div>
            </div>

      </div>
    </Card>
  )
}
export default CryptoTransactionTable
