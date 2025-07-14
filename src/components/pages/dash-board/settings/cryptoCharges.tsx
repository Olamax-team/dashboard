import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Loader2 } from 'lucide-react';
import { HiFolderArrowDown } from 'react-icons/hi2';
import { Switch } from '@/components/ui/switch';
import { useApiConfigWithToken } from '@/lib/use-api-config';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequestHandler } from '@/api/api-request-handler';
import { coinProps, minTransaction } from '@/lib/types';
import { useAdminDetails } from '@/store/admin-details-store';
import { toast } from 'sonner';
import DashboardLayout from '@/layout/dash-board-layout';
import PageHeader from '../escrow/pageHeader';
import Tab from './Tab';

/**
 * ChargeCard — Manages state for a single currency:
 *  • charge (string)
 *  • editMode (boolean)
 *  • active (boolean)
 * 
 * Renders:
 *  • Input + Edit/Save for charge
 *  • Current charges text
 *  • Active switch + “Save All Changes” button
 */
const   ChargeCard = ({ currency, coinId }: { currency: string, coinId: number }) => {

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

  console.log(minTransaction);

  const [charge, setCharge] = useState<string>(minTransaction ? String(minTransaction.transaction_charges) : '0.0001');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleChange = (value: string) => {
    setCharge(value);
  };

  const handleActiveToggle = () => {
    setActive(prev => !prev);
  };

  const { token } = useAdminDetails();
  const queryClient = useQueryClient();

  const handleSaveAll = async () => {
    // Build payload: { currency, charge, active }
    console.log(`[${currency}] Saving all:`, {
      currency,
      coinId,
      charge: parseFloat(charge),
      active,
    });

// Construct payload to send to the backend
    const chargePayload = {
      coin_id: coinId,
      charges: parseFloat(charge),
    };

    const activatePayload = {
      coin_id: coinId,
      mode: active
    };

    //config for axios
    const chargeConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/set-charges`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: chargePayload,
    };

    const activateConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/update-charges`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: activatePayload,
    };

    //api calls
    const saveCharge = () => axios.request(chargeConfig);
    const saveActivate = () => axios.request(activateConfig);
    const activateResult = await apiRequestHandler(saveActivate);

    if (activateResult && activateResult.status === 200) {
        toast.success(activateResult.data.message);
        const chargeResult = await apiRequestHandler(saveCharge);

        if (chargeResult && chargeResult.status === 200) {
        toast.success(chargeResult.data.message);
      };
      queryClient.invalidateQueries({ queryKey: ['min-transaction']})
    };

    setEditMode(false);
  };

  return (
      <div className="space-y-4 bg-[#F8F9FA] px-4 py-2 md:px-10 md:py-4 gap-14 h-full">
        <h1 className="text-lg font-semibold mb-4">
          Charges in Crypto (e.g. 0.00001)
        </h1>
        {/* Currency Label */}
        <p className="font-inter font-medium xl:text-[14px] xl:leading-[150%]">
          <span className="text-lg font-bold">{currency}</span> Set Charges
        </p>

        {/* Input + Edit/Save Buttons */}
        <div className="flex items-center justify-between space-x-2">
          <Input
            value={charge}
            disabled={!editMode}
            onChange={(e) => handleChange(e.target.value)}
            className="w-2/5 font-normal xl:text-[16px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0"
          />

          <div className="flex gap-4">
            <Button
              className="bg-white w-[96px] h-[40px] flex items-center justify-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer"
              onClick={handleEditClick}
            >
              Edit <Edit size={16} />
            </Button>

            <Button
              className="bg-primary w-[96px] h-[40px] flex items-center justify-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer"
              onClick={handleSaveClick}
              disabled={!editMode}
            >
              Save <HiFolderArrowDown size={16} />
            </Button>
          </div>
        </div>

        {/* Current Charges + Active Switch + Save All Changes */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2 w-full">
            <p>Current charges: {charge}</p>
            <div className="flex items-center justify-between w-full"> 
              <div className="flex gap-3 items-center">
                <span>Active</span>
                <Switch
                  className="data-[state=checked]:bg-green-600"
                  onCheckedChange={handleActiveToggle}
                  checked={active}
                />
              </div>
              <Button
                className="bg-secondary text-white px-4 py-2 rounded-md shadow-none hover:bg-secondary/90"
                onClick={handleSaveAll}
              >
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};

/**
 * Charges — Parent component that maps through all currencies
 * and renders one <ChargeCard> per currency.
 */
const Charges = () => {
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
console.log(allCoin);
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
  if (status === "success" && allCoin && allCoin.length < 1) {
    return (
      <div className="flex items-center justify-center py-20 space-y-4 border-b-2">
        <p className="text-red-500">Minimum Order Quantities not available at the moment.</p>
      </div>
    );
  }

  // ─── Success State ───
  if (status === "success" && allCoin && allCoin.length > 0) {
    return (
      <DashboardLayout>
        <section className="w-full h-full mx-auto font-Inter text-[#121826] overflow-hidden">
          <PageHeader title="Transaction Settings" />
          <div className="flex items-center lg:gap-5 gap-2 justify-center px-4 py-2 md:px-10 md:py-4 w-fit lg:mt-3">
              <Tab label={"Rates"} to={"/dashboard/transaction-settings/rate"} isActive={location.pathname === "/dashboard/transaction-settings/rate" || location.pathname === "/dashboard/transaction-settings"}/>
              <Tab label={"Available Coins"} to={"/dashboard/transaction-settings/available-coins"} isActive={location.pathname === "/dashboard/transaction-settings/available-coins"}/>
              <Tab label={"Minimum Order Quantity"} to={"/dashboard/transaction-settings/moq"} isActive={location.pathname === "/dashboard/transaction-settings/moq"}/>
              <Tab label={"Bonuses & Referral"} to={"/dashboard/transaction-settings/referral"} isActive={location.pathname === "/dashboard/transaction-settings/referral"}/>
              <Tab label={"Charges"} to={"/dashboard/transaction-settings/charges"} isActive={location.pathname === "/dashboard/transaction-settings/charges"}/>
          </div>
          <div className="flex-1 w-1/2 items-start justify-start">
              {allCoin.filter((item) =>item.coin !== 'NGN').map((currency) => {
                return (
                  <ChargeCard key={currency.id} currency={currency.coin} coinId={currency.id} />
              )})}
          </div>
        </section>
      </DashboardLayout>
    );
  };
}

export default Charges;
