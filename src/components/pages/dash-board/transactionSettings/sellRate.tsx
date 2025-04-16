import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import { HiFolderArrowDown } from 'react-icons/hi2';

const currencies = ['BTC', 'LTC', 'DOGE', 'STEEM', 'SBD', 'ETH'];

type Rates = { [key: string]: string };
type EditMode = { [key: string]: boolean };

const SellRate = () => {
  const [rates, setRates] = useState<Rates>(
    currencies.reduce((acc, curr) => ({ ...acc, [curr]: 'NGN 1750' }), {})
  );

  const [editMode, setEditMode] = useState<EditMode>(
    currencies.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );

  const handleEditClick = (currency: string) => {
    setEditMode((prev) => ({ ...prev, [currency]: true }));
  };

  const handleSaveClick = (currency: string) => {
    setEditMode((prev) => ({ ...prev, [currency]: false }));
    // Add save logic here (e.g., API call)
  };

  const handleChange = (currency: string, value: string) => {
    setRates((prev) => ({ ...prev, [currency]: value }));
  };

  return (
    <div className="w-full bg-white rounded-sm h-auto mx-auto space-y-6 px-[26px] py-[30px]">
      {currencies.map((currency) => (
        <div key={currency} className="space-y-2">
          <p className="font-inter font-medium xl:text-[14px] xl:leading-[150%]">Current Dollar Rates {currency}</p>
          <div className="flex items-center justify-between space-x-2">
            <Input
              value={rates[currency]}
              disabled={!editMode[currency]}
              onChange={(e) => handleChange(currency, e.target.value)}
              className='w-2/5 font-medium xl:text-[14px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0'
            />
            <div className="flex gap-4">
                <Button 
                  className="bg-white w-[96px] h-[40px] items-center hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer" 
                  onClick={() => handleEditClick(currency)}>Edit <Edit size={16}/></Button>
                <Button 
                  className="bg-primary w-[96px] h-[40px] items-center hover:bg-secondary shadow-none text-white border-1 rounded-sm border-primary cursor-pointer"
                  onClick={() => handleSaveClick(currency)}
                  disabled={!editMode[currency]}>Save <HiFolderArrowDown size={16}/></Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellRate;