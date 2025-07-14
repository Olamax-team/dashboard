import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type liveRateCoin = {
  coin: string;
  symbol: string;
  price: string;
  icon: string;
  change: string;
  percentageChange: string;
  arrow: string;
  color: string;
}

const ExchangeTab = () => {
  const fetchLiveRates = async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/price-ticker`,
      headers: {'Content-Type':'application/json'}
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data as liveRateCoin[];
    return data;
  }

  const { data:exchangeType, status } = useQuery({
    queryKey: ['live-rates'],
    queryFn: fetchLiveRates,
  });

  if (status === 'pending') {
    return (
      <div className="bg-[#039AE4] lg:flex items-center justify-center hidden w-full h-[50px] flex-wrap text-white">
        <p>Loading...</p>
      </div>
    )
  };

  if (status === 'error') {
    return (
      <div className="bg-[#039AE4] lg:flex items-center justify-center hidden w-full h-[50px] flex-wrap text-white">
        <p>Error while loading liverates. Refresh the entire page</p>
      </div>
    )
  }


  return (
    <div className="bg-[#039AE4] lg:flex items-center justify-center hidden w-full h-[50px] flex-wrap">
      {exchangeType && exchangeType.length > 0 && exchangeType.map((exchange, index) => (
        <div key={index} className="flex items-center space-x-2">
          <p className="flex items-center justify-between gap-1 w-full">
            <span className="font-medium font-inter text-[13px] lg:text-[16px] leading-[150%] text-[#121826]">
              {exchange.symbol}
            </span>
            <span className="text-[#ffffff] font-medium font-inter text-[13px] lg:text-[16px] leading-[150%]">
              ${exchange.price}
            </span>
            {index !== exchangeType.length - 1 && (
              <span className="border-l-2 border-[#ffffff] h-6 mx-2"></span>
            )}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ExchangeTab