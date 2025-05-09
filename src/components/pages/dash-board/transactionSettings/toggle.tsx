import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Edit, InfoIcon, X } from "lucide-react";
import { HiFolderArrowDown } from "react-icons/hi2";
import { Input } from "@/components/ui/input";

const coins = ['BTC', 'ETH', 'BNB', 'STEEM', 'LTC', 'SBD', 'HBD', 'TRX', 'HIVE', 'DOGE', 'USDT', 'BUSD'];

const Toggle = () => {
  const [referralBonus, setReferralBonus] = useState("0.2");
  const [editReferralBonus, setEditReferralBonus] = useState(false);
  const [bonusesEnabled, setBonusesEnabled] = useState(true);
  const [referralEnabled, setReferralEnabled] = useState(true);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  
  const [buyingRates, setBuyingRates] = useState<Record<string, boolean>>(
    coins.reduce((acc, coin) => ({ ...acc, [coin]: true }), {})
  );
  
  const [sellingRates, setSellingRates] = useState<Record<string, boolean>>(
    coins.reduce((acc, coin) => ({ ...acc, [coin]: true }), {})
  );

  const handleBuyingToggle = (coin: string) => {
    setBuyingRates((prev) => ({ ...prev, [coin]: !prev[coin] }));
  };
  
  const handleSellingToggle = (coin: string) => {
    setSellingRates((prev) => ({ ...prev, [coin]: !prev[coin] }));
  };
  

  const handleReferralToggle = () => {
    setReferralEnabled((prev) => !prev);
  };

  const handleSave = () => {
    console.log('Saving settings...');
    console.log('Buying Rates:', buyingRates);
    console.log('Selling Rates:', sellingRates);
    console.log('Referral System Enabled:', referralEnabled);
  };

  return (
    <div className="p-6 space-y-10">
      {/* Bonuses and Maintenance */}
      <div className="flex flex-col md:flex-row gap-14 pb-12 border-b-2">
        {/* Toggle Bonuses */}
        <div className="flex-1 w-full">
          <h1 className="text-lg font-semibold mb-4">Toggle Bonuses</h1>
          <div className="rounded-sm bg-white py-6 px-8 space-y-4">
            <Button
              variant={bonusesEnabled ? "default" : "destructive"}
              className={`p-4 rounded-sm ${bonusesEnabled ? "bg-black text-white" : "bg-red-500 text-white"}`}
              onClick={() => setBonusesEnabled(!bonusesEnabled)}
            >
              {bonusesEnabled ? "Enable" : "Disable"} {bonusesEnabled ? <Check /> : <X className="text-white" />}
            </Button>
            <p className="text-sm text-black flex items-start gap-2">
              <InfoIcon size={28} />
              Click the button above to disable or enable the bonuses temporarily. <br />
              Please note the bonuses if disabled would still appear on this page above, but would not reflect in the calculations on the user end.
            </p>
          </div>
        </div>

        {/* Toggle Maintenance */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold mb-4">Toggle Maintenance Mode</h1>
          <div className="rounded-sm bg-white py-6 px-8 space-y-4">
            <Button
              variant={maintenanceEnabled ? "default" : "destructive"}
              className={`p-4 rounded-sm ${maintenanceEnabled ? "bg-black text-white" : "bg-red-500 text-white"}`}
              onClick={() => setMaintenanceEnabled(!maintenanceEnabled)}
            >
              {maintenanceEnabled ? "Enable" : "Disable"} {maintenanceEnabled ? <Check /> : <X className="text-white" />}
            </Button>
            <p className="text-sm flex items-start gap-2">
              <InfoIcon size={28} />
              Click the button above to disable or enable maintenance mode and make the site inaccessible to users. <br />
              Please note that signed-in users would not be able to perform any transactions on the website till you turn off maintenance mode.
            </p>
          </div>
        </div>
      </div>

      {/* Live Rates Buying and Selling */}
      <div className="space-y-10 border-b-2 pb-12 flex flex-row flex-wrap gap-14">
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-lg font-semibold">Toggle Live Rates Display (Buying)</h1>
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
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full ${buyingRates[coin] ? 'bg-green-600' : 'bg-gray-300'}`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${buyingRates[coin] ? 'translate-x-6' : 'translate-x-1'}`} />
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
          <h1 className="text-lg font-semibold">Toggle Live Rates Display (Selling)</h1>
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
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full ${sellingRates[coin] ? 'bg-green-600' : 'bg-gray-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${sellingRates[coin] ? 'translate-x-6' : 'translate-x-1'}`} />
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

      {/* Referral System Toggle */}
      <div className="flex flex-col md:flex-row gap-14 pb-12 border-b-2">
        {/* Toggle Referral */}
        <div className="flex-1 w-full">
          <h1 className="text-lg font-semibold mb-4">Toggle Referral System</h1>
          <div className="rounded-sm bg-white py-6 px-8 space-y-4">
            <Button
              variant={referralEnabled ? "default" : "destructive"}
              className={`p-4 rounded-sm ${referralEnabled ? "bg-black text-white" : "bg-red-500 text-white"}`}
              onClick={() => handleReferralToggle()}
            >
              {referralEnabled ? "Enable" : "Disable"} {referralEnabled ? <Check /> : <X className="text-white" />}
            </Button>
            <p className="text-sm text-black flex items-start gap-2">
              <InfoIcon size={28} />
              Click the button above to disable or enable the referral system on the site accessible to users. <br />
              Please note that transactions on the site would not incur referral bonuses and users would not be able to withdraw existing funds till you turn it back on.
            </p>
          </div>
        </div>

        {/* Referral Bonuses */}
        <div className="flex-1">
          <div className="w-full space-y-4">
            <p className="font-inter font-bold xl:text-[16px] xl:leading-[150%]">Referral Bonuses</p>
            <div className="bg-white w-full h-[110px] rounded-sm px-6 py-5 space-y-2">
                <h1 className="font-inter font-medium xl:text-[14px] xl:leading-[150%]">In Percentage</h1>
                <div className="flex flex-wrap md:flex-nowrap justify-between">
                    <Input 
                        value={referralBonus}
                        disabled={!editReferralBonus}
                        onChange={(e) => setReferralBonus( e.target.value)}
                        type="text"
                        placeholder={`${referralBonus} %`}
                        className="w-2/5 font-normal xl:text-[16px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
                    />
                    <div className="flex gap-4">
                        <Button 
                            onClick={() => setEditReferralBonus(true)}
                            className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer">Edit <Edit size={16}/></Button>
                        <Button 
                            onClick={() => setEditReferralBonus(false)}
                            disabled={!editReferralBonus}
                            className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer">Save <HiFolderArrowDown size={16}/></Button>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
