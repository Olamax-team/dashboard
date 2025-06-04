// import { useState } from "react";
// import { Edit } from "lucide-react";
// import { HiFolderArrowDown } from "react-icons/hi2";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// type Action = "Buy" | "Sell";
// type Coin =
//   | "BTC"
//   | "LTC"
//   | "DOGE"
//   | "ETH"
//   | "HIVE"
//   | "HBD"
//   | "STEEM"
//   | "SBD"
//   | "BNB"
//   | "TRX"
//   | "BUSD"
//   | "USDT";

// const coins: Coin[] = [
//   "BTC",
//   "LTC",
//   "DOGE",
//   "ETH",
//   "HIVE",
//   "HBD",
//   "STEEM",
//   "SBD",
//   "BNB",
//   "TRX",
//   "BUSD",
//   "USDT",
// ];

// const OrderQuantity = () => {
//   const [values, setValues] = useState<Record<Coin, Record<Action, string>>>(
//     coins.reduce(
//       (acc, coin) => ({
//         ...acc,
//         [coin]: { Buy: "10000", Sell: "10000" },
//       }),
//       {} as Record<Coin, Record<Action, string>>
//     )
//   );

//   const [editMode, setEditMode] = useState<
//     Record<Coin, Record<Action, boolean>>
//   >(
//     coins.reduce(
//       (acc, coin) => ({
//         ...acc,
//         [coin]: { Buy: false, Sell: false },
//       }),
//       {} as Record<Coin, Record<Action, boolean>>
//     )
//   );

//   const handleEdit = (coin: Coin, type: Action) => {
//     setEditMode((prev) => ({
//       ...prev,
//       [coin]: {
//         ...prev[coin],
//         [type]: true,
//       },
//     }));
//   };

//   const handleSave = (coin: Coin, type: Action) => {
//     setEditMode((prev) => ({
//       ...prev,
//       [coin]: {
//         ...prev[coin],
//         [type]: false,
//       },
//     }));
//   };

//   const handleChange = (coin: Coin, type: Action, value: string) => {
//     setValues((prev) => ({
//       ...prev,
//       [coin]: {
//         ...prev[coin],
//         [type]: value,
//       },
//     }));
//   };

//   return (
//     <div className="flex flex-row w-full justify-between items-start flex-wrap space-y-3 pb-12 border-b-2">
//       {coins.map((coin) => (
//         <div
//           key={coin}
//           className="flex flex-col w-full justify-start space-y-3 md:w-[calc(50%-32px)]"
//         >
//           <h2 className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">
//             Minimum Order Quantity (For {coin} Transactions)
//           </h2>
//           {(["Sell", "Buy"] as Action[]).map((type) => (
//             <div
//               key={type}
//               className="w-full bg-white rounded-sm h-auto mx-auto space-y-6 px-[26px] py-[30px]"
//             >
//               <label className="block font-inter font-medium xl:text-[14px] xl:leading-[150%]">
//                 Set Minimum Order Quantity{" "}
//                 <span className="text-primary font-bold">({type})</span>
//               </label>
//               <div className="flex items-center justify-between space-x-2">
//                 <Input
//                   value={values[coin][type]}
//                   disabled={!editMode[coin][type]}
//                   onChange={(e) => handleChange(coin, type, e.target.value)}
//                   className="w-2/5 font-medium xl:text-[14px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
//                 />
//                 <div className="flex gap-4">
//                   <Button
//                     className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer"
//                     onClick={() => handleEdit(coin, type)}
//                   >
//                     Edit <Edit size={16} />
//                   </Button>
//                   <Button
//                     className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer"
//                     onClick={() => handleSave(coin, type)}
//                     disabled={!editMode[coin][type]}
//                   >
//                     Save <HiFolderArrowDown size={16} />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderQuantity;

import { useState } from "react";
import { Edit, Loader2 } from "lucide-react";
import { HiFolderArrowDown } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiRequestHandler } from "@/api/api-request-handler";
import { coinProps, minTransaction } from "@/lib/types";

type Action = "Buy" | "Sell";

/**
 * CoinOrderCard — A standalone card for one coin.
 * - Manages local state for “Buy” and “Sell” (value + edit mode).
 * - Has individual Edit/Save buttons per field.
 * - Has a “Save All Changes” button that you can wire up to your API.
 */
const CoinOrderCard = ({ coin, coinId }: { coin: string; coinId: number }) => {

  // API configuration for fetching minimum transactions
  const minTransactionConfig = useApiConfigWithToken({
    method: "get",
    url: `min-transaction/${coinId}`,
  });

  const fetchMinimumTransaction = () => axios.request(minTransactionConfig);

  // React Query to fetch minimum transaction data
  const { data } = useQuery({
    queryKey: ["min-transaction"],
    queryFn: () => apiRequestHandler(fetchMinimumTransaction),
  });

  const minTransaction = data?.data as minTransaction;
  console.log(parseFloat(minTransaction?.limit.buying_limit));

  // ─── Local state for values ───────────────────────────────────
  const [values, setValues] = useState<Record<Action, string>>({
    Buy: minTransaction ? minTransaction?.limit.buying_limit : '10000',
    Sell: minTransaction ? minTransaction?.limit.selling_limit : '10000',
  });

  // ─── Local state for edit modes ────────────────────────────────
  const [editMode, setEditMode] = useState<Record<Action, boolean>>({
    Buy: false,
    Sell: false,
  });

  // ─── Toggle a single field into edit mode ──────────────────────
  const handleEdit = (type: Action) => {
    setEditMode((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  // ─── Save (i.e. exit edit mode) for a single field ─────────────
  const handleSaveField = (type: Action) => {
    // Here, you could also call an API for this single field if needed.
    setEditMode((prev) => ({
      ...prev,
      [type]: false,
    }));
  };

  // ─── Update the value as the user types ────────────────────────
  const handleChange = (type: Action, value: string) => {
    setValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // ─── “Save All Changes” button handler ─────────────────────────
  const handleSaveAll = () => {
    // Build whatever payload you need:
    //   { coin, buyLimit: parseFloat(values.Buy), sellLimit: parseFloat(values.Sell) }
    console.log(`[${coin}] Saving all:`, {
      coin,
      buyLimit: parseFloat(values.Buy),
      sellLimit: parseFloat(values.Sell),
    });

    // ...call your API here, e.g. axios.post("/api/save-coin", payload)

    // After successful save, exit edit mode on both fields:
    setEditMode({ Buy: false, Sell: false });
  };

  return (
    <div className="flex flex-col w-full md:w-[calc(50%-32px)] space-y-3">
      <h2 className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">
        Minimum Order Quantity (For {coin} Transactions)
      </h2>

      {/* ────────────── Buy and Sell Sections ────────────── */}
      {(["Buy", "Sell"] as Action[]).map((type) => (
        <div
          key={type}
          className="w-full bg-white rounded-sm space-y-4 px-[26px] py-[30px]"
        >
          <label className="block font-inter font-medium xl:text-[14px] xl:leading-[150%]">
            Set Minimum Order Quantity{" "}
            <span className="text-primary font-bold">({type})</span>
          </label>

          <div className="flex items-center justify-between space-x-2">
            {/* Input field */}
            <Input
              value={values[type]}
              disabled={!editMode[type]}
              onChange={(e) => handleChange(type, e.target.value)}
              className="w-2/5 font-medium xl:text-[14px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
            />

            <div className="flex gap-4">
              {/* Edit button */}
              <Button
                className="bg-white w-[96px] h-[40px] flex items-center justify-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer"
                onClick={() => handleEdit(type)}
              >
                Edit <Edit size={16} />
              </Button>

              {/* Save button (for this single field) */}
              <Button
                className="bg-primary w-[96px] h-[40px] flex items-center justify-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer"
                onClick={() => handleSaveField(type)}
                disabled={!editMode[type]}
              >
                Save <HiFolderArrowDown size={16} />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* ────────────── Save All Changes Button ────────────── */}
      <div className="w-full flex justify-end">
        <Button
          className="bg-secondary text-white px-6 py-2 rounded-md shadow-none hover:bg-secondary/90"
          onClick={handleSaveAll}
        >
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

/**
 * OrderQuantity — Parent component that simply maps through all coins.
 * Renders one <CoinOrderCard> per coin.
 */
const OrderQuantity = () => {

  // API configuration for fetching all buyable coins
  const allCoinConfig = useApiConfigWithToken({
    method: "get",
    url: "all-coins/buy",
  });

  const fetchAllCoins = () => axios.request(allCoinConfig);

  // React Query to fetch coin data
  const { data, status } = useQuery({
    queryKey: ["all-coins"],
    queryFn: () => apiRequestHandler(fetchAllCoins),
  });

  const allCoin = data?.data.coin as coinProps[];

  // ─── Loading State ───
  if (status === "pending") {
    return (
      <div className="flex items-center justify-center py-20 space-y-4 border-b-2">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  // ─── Error State ───
  if (status === "error") {
    return (
      <div className="flex items-center justify-center py-20 space-y-4 border-b-2">
        <p className="text-red-500">Error while loading Order Quantities for all available coins.</p>
      </div>
    );
  }

  // ─── Empty State ───
  if (status === "success" && allCoin.length < 1) {
    return (
      <div className="flex items-center justify-center py-20 space-y-4 border-b-2">
        <p className="text-red-500">Order Quantities not available at the moment.</p>
      </div>
    );
  }
  
  // ─── Success State ───
  if (status === "success" && allCoin.length > 0) {
    return (
      <div className="flex flex-row w-full justify-between items-start flex-wrap space-y-3 pb-12 border-b-2">
        {allCoin.filter((item) => item.coin !== 'NGN').map((coin) => (
          <CoinOrderCard key={coin.id} coin={coin.coin} coinId={coin.id} />
        ))}
      </div>
    );
  }
}

export default OrderQuantity;

