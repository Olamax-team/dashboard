import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"
import { useState } from "react";
import { HiFolderArrowDown } from "react-icons/hi2"


const coins = ['BTC', 'ETH', 'BNB', 'STEEM', 'LTC', 'SBD', 'HBD', 'TRX', 'HIVE', 'DOGE', 'USDT', 'BUSD'];

const AvailableCoin = () => {
    const [buyingCoin, setBuyingCoin] = useState<Record<string, boolean>>(
      coins.reduce((acc, coin) => ({ ...acc, [coin]: true }), {})
    );
    
    const [sellingCoin, setSellingCoin] = useState<Record<string, boolean>>(
      coins.reduce((acc, coin) => ({ ...acc, [coin]: true }), {})
    );
  
    const handleBuyingToggle = (coin: string) => {
      setBuyingCoin((prev) => ({ ...prev, [coin]: !prev[coin] }));
    };
    
    const handleSellingToggle = (coin: string) => {
      setSellingCoin((prev) => ({ ...prev, [coin]: !prev[coin] }));
    };

    const handleSave = () => {
      console.log('Saving settings...');
      console.log('Buying Coins:', buyingCoin);
      console.log('Selling Coins:', sellingCoin);
    };
  return (
    <>
      {/* Available Buying and Selling coins */}
      <div className="space-y-10 border-b-2 pb-12 flex flex-row flex-wrap md:flex-nowrap gap-14">
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-lg font-semibold">Available coin (Buying)</h1>
          {/* Buying Section */}
          <div className="space-y-6 bg-white rounded-sm p-6">
            <div className="flex gap-2">
              <InfoIcon size={28} />
              <p className="text-sm text-black text-wrap">
                Toggle live display rates for each coin. Click the update button after checking/unchecking the live rates display for each coin. This applies to users that want to <span className="text-primary font-semibold">Buy</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {coins.map((coin) => (
                <div key={coin} className="flex items-center space-x-3">
                  <span className="font-bold">{coin}</span>
                  <button
                    onClick={() => handleBuyingToggle(coin)}
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full ${buyingCoin[coin] ? 'bg-green-600' : 'bg-gray-300'}`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${buyingCoin[coin] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
            {/* Save Button */}
            <div className="flex w-full items-center justify-center">
              <Button 
                className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none mt-3 text-white border-1 rounded-sm border-primary cursor-pointer"
                onClick={() => handleSave}
                >Save <HiFolderArrowDown size={16}/></Button>            
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-lg font-semibold">Available Coin (Selling)</h1>
          {/* Selling Section */}
          <div className="space-y-6 bg-white p-6 rounded-sm">
            <div className="flex gap-2">
              <InfoIcon size={28} />
              <p className="text-sm text-black text-wrap">
                Toggle live display rates for each coin. Click the update button after checking/unchecking the live rates display for each coin. This applies to users that want to <span className="text-primary font-semibold">Sell</span>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {coins.map((coin) => (
                <div key={coin} className="flex items-center space-x-3">
                  <span className="font-bold">{coin}</span>
                  <button
                    onClick={() => handleSellingToggle(coin)}
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full ${sellingCoin[coin] ? 'bg-green-600' : 'bg-gray-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${sellingCoin[coin] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
            {/* Save Button */}
            <div className="flex w-full items-center justify-center">
              <Button 
                className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none mt-3 text-white border-1 rounded-sm border-primary cursor-pointer"
                onClick={() => handleSave}
                >Save <HiFolderArrowDown size={16}/></Button>            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvailableCoin
