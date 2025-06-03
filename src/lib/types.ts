export interface userDetailsProps {
  id: number;
  uid: string;
  email: string;
  role: string;
  role_access: string;
  role_status: string;
  phone_number: string;
  status: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  profile_image: string;
  available_bonus: string;
  total_bonus: string;
  verification_method: string | null;
  is_blocked: number;
  is_suspended: number;
  is_deactivated: number;
  referral_code: string;
  referral_balance: string | null;
  newbie_bonus: string;
  newbie_seen: string;
  total_referred_users: number;
  unverified_referred_users: number;
  date_of_birth: string;
  gender: string;
  created_at: string;
  updated_at: string;
  referred_by: string | null;
  last_activity: string;
  nationality: string;
  profile_picture: string;
};

export interface coinProps {
  coin: string;
  coin_name: string;
  id: number;
  method: string,
  status: string;
  icon: string;
  stable_coins: string | null;
};

type coinType = {
  id: number,
  coin_name: string;
  shorthand: string;
  buy: string;
  sell: string;
  escrow: string;
  status: string;
  stable_coins: string;
  created_at: string;
  updated_at: string;
};

type limitType = {
  buying_limit: string;
  selling_limit: string;
  card_limit: string;
  data_limit: string;
  card_limit_active: number;
  data_limit_active: number;
};

export interface minTransaction {
  status: string;
  message: string;
  coin: coinType;
  limit: limitType;
  current_rate: number;
  transaction_charges: number;
  sell_naira_value: string;
  buy_naira_value: string;
  icon: string;
};