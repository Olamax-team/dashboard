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
import { useAdminDetails } from "@/store/admin-details-store";

// Define transaction types
type Action = "Airtime" | "Data" | "Bills";

/**
 * CoinMOQCard — A reusable card component for configuring
 * the Minimum Order Quantity (MOQ) for a single coin.
 * 
 * Props:
 * - coin: coin symbol/name (e.g., "BTC")
 * - coinId: unique identifier for the coin
 */
const CoinMOQCard = ({ coin, coinId }: { coin: string; coinId: number }) => {

  // API configuration for fetching minimum transactions
  const minTransactionConfig = useApiConfigWithToken({
    method: "get",
    url: `min-transaction/${coinId}`,
  });

  const fetchAllCoins = () => axios.request(minTransactionConfig);

  // React Query to fetch minimum transaction data
  const { data } = useQuery({
    queryKey: ["min-transaction"],
    queryFn: () => apiRequestHandler(fetchAllCoins),
    enabled: !!coinId
  });

  const minTransaction = data?.data as minTransaction;

  // ─────────────────────────────────────────────────────────────
  // Local States
  // ─────────────────────────────────────────────────────────────

  // Track MOQ values for each action type
  const [values, setValues] = useState<Record<Action, string>>({
    Airtime: minTransaction ? minTransaction?.limit?.card_limit : '1000',
    Data: minTransaction? minTransaction?.limit?.data_limit : '1000',
    Bills: "10000",
  });

  // Track whether each input is editable
  const [editMode, setEditMode] = useState<Record<Action, boolean>>({
    Airtime: false,
    Data: false,
    Bills: false,
  });

  // Track checkbox state (whether the service is enabled or not)
  const [checkedStates, setCheckedStates] = useState<Record<Action, boolean>>({
    Airtime: minTransaction ? (minTransaction?.limit?.card_limit_active === 1 ? true : false) : false,
    Data: minTransaction ? (minTransaction?.limit?.data_limit_active === 1 ? true : false) : false,
    Bills: false,
  });
 
  // ─────────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────────

  // Toggle checkbox state for a given action
  const handleCheckboxChange = (type: Action) => {
    setCheckedStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Enable editing for a specific action field
  const handleEdit = (type: Action) => {
    setEditMode((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  // Update the value of a specific action field
  const handleChange = (type: Action, value: string) => {
    setValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const { token } = useAdminDetails();

  // Save all changes for this single coin
  const handleSaveAll = async () => {
    if (!coinId) {
      console.warn(`Cannot save ${coin}: no coinId available`);
      return;
    }

    // Construct payload to send to the backend
    const payload = {
      coin_id: coinId,
      cardlimit: parseFloat(values.Airtime),
      card: checkedStates.Airtime,
      datalimit: parseFloat(values.Data),
      data: checkedStates.Data,
      billslimit: parseFloat(values.Bills),
      bills: checkedStates.Bills,
      escrow: false,
    };

    //config for axios
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/add-min-transaction`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: payload,
    };

    //api call
    const saveData = () => axios.request(config);
    const result = await apiRequestHandler(saveData);
    console.log(result);

    // Disable all edit modes after saving
    setEditMode({ Airtime: false, Data: false, Bills: false });
  };

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col w-full justify-start space-y-3 md:w-[calc(50%-32px)]">
      <h2 className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">
        Minimum Order Quantity (For {coin} Transactions)
      </h2>
      <div className="w-full bg-white rounded-sm h-auto mx-auto space-y-6 px-[26px] py-[30px]">
        
        {/* Input Fields for Airtime, Data, Bills */}
        {(["Data", "Bills", "Airtime"] as Action[]).map((type) => (
          <div key={type} className="w-full">
            <label className="block font-inter font-medium xl:text-[14px] xl:leading-[150%]">
              Set Minimum Order Quantity{" "}
              <span className="text-primary font-bold">({type})</span>
            </label>
            <div className="flex items-center justify-between space-x-2">
              <Input
                value={values[type]}
                disabled={!editMode[type]}
                onChange={(e) => handleChange(type, e.target.value)}
                className="w-2/5 font-normal xl:text-[14px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
              />
              <div className="flex gap-4">
                {/* Enable editing */}
                <Button
                  className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer"
                  onClick={() => handleEdit(type)}
                >
                  Edit <Edit size={16} />
                </Button>
                {/* Disable edit mode */}
                <Button
                  className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer"
                  onClick={() =>
                    setEditMode({ Airtime: false, Data: false, Bills: false })
                  }
                  disabled={!editMode[type]}
                >
                  Done <HiFolderArrowDown size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Checkboxes to enable/disable each service */}
        {(["Data", "Bills", "Airtime"] as Action[]).map((type) => (
          <div key={type} className="w-full flex items-center justify-start space-x-2 mx-auto">
            <input
              type="checkbox"
              checked={checkedStates[type]}
              onChange={() => handleCheckboxChange(type)}
              className="h-4 w-4"
            />
            <span className="font-inter text-sm">
              Set if <span className="text-primary font-bold">({type})</span> should be sold or not
            </span>
          </div>
        ))}

        {/* Save Button */}
        <div className="w-full flex justify-end">
          <Button
            className="bg-secondary text-white px-6 py-2 rounded-md shadow-none hover:bg-secondary/90"
            onClick={handleSaveAll}
          >
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * MOQTransactions — Parent component that:
 * - Fetches all available coins
 * - Renders <CoinMOQCard> for each coin (excluding NGN)
 */
const MOQTransactions = ({status, allCoin}:{status: 'pending' | 'error' | 'success', allCoin:coinProps[]}) => {
  // API configuration for fetching all buyable coins

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
        <p className="text-red-500">Error while loading Minimum Order Quantities for available coins.</p>
      </div>
    );
  }

  // ─── Empty State ───
  if (status === "success" && allCoin.length < 1) {
    return (
      <div className="flex items-center justify-center py-20 space-y-4 border-b-2">
        <p className="text-red-500">Minimum Order Quantities not available at the moment.</p>
      </div>
    );
  }

  // ─── Success State ───
  if (status === "success" && allCoin.length > 0) {
    return (
      <div className="flex flex-row w-full justify-between items-start flex-wrap pb-12 space-y-4 border-b-2">
        { allCoin
          .filter((item) => item.coin !== "NGN")
          .map((coin) => (
            <CoinMOQCard key={coin.id} coin={coin.coin} coinId={coin.id} />
          ))}
      </div>
    );
  }
};

export default MOQTransactions;
