import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import { HiFolderArrowDown } from 'react-icons/hi2';

const currencies = ['BTC', 'LTC', 'DOGE', 'STEEM', 'SBD', 'ETH'];

type charge = { [key: string]: string };
type EditMode = { [key: string]: boolean };

const Charges = () => {
  const [charge, setcharge] = useState<charge>(
    currencies.reduce((acc, curr) => ({ ...acc, [curr]: '0.0001' }), {})
  );

  const [editMode, setEditMode] = useState<EditMode>(
    currencies.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );

  const [activeCoin, setActiveCoin] = useState<Record<string, boolean>>(
    currencies.reduce((acc, coin) => ({ ...acc, [coin]: true }), {})
  );

  const handleEditClick = (currency: string) => {
    setEditMode((prev) => ({ ...prev, [currency]: true }));
  };

  const handleSaveClick = (currency: string) => {
    setEditMode((prev) => ({ ...prev, [currency]: false }));
  };

  const handleActiveToggle = (coin: string) => {
    setActiveCoin((prev) => ({ ...prev, [coin]: !prev[coin] }));
  };

  const handleChange = (currency: string, value: string) => {
    setcharge((prev) => ({ ...prev, [currency]: value }));
  };


  return (
    <div className='flex-1 w-1/2 items-start justify-start'>
      <h1 className="text-lg font-semibold mb-4">Charges in Crypto i.e 0.00001</h1>
      <div className="w-full bg-white rounded-sm h-auto mx-auto space-y-6 px-[26px] py-[30px]">
        {currencies.map((currency) => (
          <div key={currency} className="space-y-2 pb-4">
            <p className="font-inter font-medium xl:text-[14px] xl:leading-[150%]"><span className='text-lg font-bold'>{currency}</span> Set Charges</p>
            <div className="flex items-center justify-between space-x-2">
              <Input
                value={charge[currency]}
                disabled={!editMode[currency]}
                onChange={(e) => handleChange(currency, e.target.value)}
                className='w-2/5 font-normal xl:text-[16px] text-[12px] leading-[120%] xl:leading-[150%] border-gray-100 border-2 rounded-sm h-[40px] shadow-none px-4 py-2.5 focus-visible:ring-0'
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
            <div className='flex flex-col space-y-4'>
              <p>Current charges: {charge[currency]}</p>
              <div className='flex gap-2'>
                <h1>Active</h1>
                <button
                  onClick={() => handleActiveToggle(currency)}
                  className={`w-12 h-6 flex items-center bg-gray-300 rounded-full ${activeCoin[currency] ? 'bg-green-600' : 'bg-gray-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${activeCoin[currency] ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Charges;