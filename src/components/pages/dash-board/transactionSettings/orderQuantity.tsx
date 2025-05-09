import { useState } from "react";
import { Edit } from "lucide-react";
import { HiFolderArrowDown } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Action = "Buy" | "Sell";
type Coin =
  | "BTC"
  | "LTC"
  | "DOGE"
  | "ETH"
  | "HIVE"
  | "HBD"
  | "STEEM"
  | "SBD"
  | "BNB"
  | "TRX"
  | "BUSD"
  | "USDT";

const coins: Coin[] = [
  "BTC",
  "LTC",
  "DOGE",
  "ETH",
  "HIVE",
  "HBD",
  "STEEM",
  "SBD",
  "BNB",
  "TRX",
  "BUSD",
  "USDT",
];

const OrderQuantity = () => {
  const [values, setValues] = useState<Record<Coin, Record<Action, string>>>(
    coins.reduce(
      (acc, coin) => ({
        ...acc,
        [coin]: { Buy: "10000", Sell: "10000" },
      }),
      {} as Record<Coin, Record<Action, string>>
    )
  );

  const [editMode, setEditMode] = useState<
    Record<Coin, Record<Action, boolean>>
  >(
    coins.reduce(
      (acc, coin) => ({
        ...acc,
        [coin]: { Buy: false, Sell: false },
      }),
      {} as Record<Coin, Record<Action, boolean>>
    )
  );

  const handleEdit = (coin: Coin, type: Action) => {
    setEditMode((prev) => ({
      ...prev,
      [coin]: {
        ...prev[coin],
        [type]: true,
      },
    }));
  };

  const handleSave = (coin: Coin, type: Action) => {
    setEditMode((prev) => ({
      ...prev,
      [coin]: {
        ...prev[coin],
        [type]: false,
      },
    }));
  };

  const handleChange = (coin: Coin, type: Action, value: string) => {
    setValues((prev) => ({
      ...prev,
      [coin]: {
        ...prev[coin],
        [type]: value,
      },
    }));
  };

  return (
    <div className="flex flex-row w-full justify-between items-start flex-wrap space-y-3 pb-12 border-b-2">
      {coins.map((coin) => (
        <div
          key={coin}
          className="flex flex-col w-full justify-start space-y-3 md:w-[calc(50%-32px)]"
        >
          <h2 className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">
            Minimum Order Quantity (For {coin} Transactions)
          </h2>
          {(["Sell", "Buy"] as Action[]).map((type) => (
            <div
              key={type}
              className="w-full bg-white rounded-sm h-auto mx-auto space-y-6 px-[26px] py-[30px]"
            >
              <label className="block font-inter font-medium xl:text-[14px] xl:leading-[150%]">
                Set Minimum Order Quantity{" "}
                <span className="text-primary font-bold">({type})</span>
              </label>
              <div className="flex items-center justify-between space-x-2">
                <Input
                  value={values[coin][type]}
                  disabled={!editMode[coin][type]}
                  onChange={(e) => handleChange(coin, type, e.target.value)}
                  className="w-2/5 font-medium xl:text-[14px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
                />
                <div className="flex gap-4">
                  <Button
                    className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer"
                    onClick={() => handleEdit(coin, type)}
                  >
                    Edit <Edit size={16} />
                  </Button>
                  <Button
                    className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer"
                    onClick={() => handleSave(coin, type)}
                    disabled={!editMode[coin][type]}
                  >
                    Save <HiFolderArrowDown size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderQuantity;
