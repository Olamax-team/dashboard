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

export interface pendingTransactionDataResponse {
  data: {
    bills: Bill[];
    buyings: Buying[];
    sell_transactions: SellTransaction[];
    topUp: TopUp[];
  };
  pagination: {
    bills: Pagination;
    buyings: Pagination;
    sell_transactions: Pagination;
  };
}

interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

interface User {
  user_id: number;
  uid: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  phone: string | null;
}

interface Bill {
  bills_transaction_id: number;
  user: User;
  coin: string | null;
  blockchain: string | null;
  coin_value: string | null;
  naira_value: string;
  method: string;
  status: string;
  finished: string;
  exchange_value: string | null;
  type: string;
  billtype: string;
  payment_made: string | null;
  amount_paid: string | null;
  product_number: string;
  customer_name: string | null;
  customernumber: string | null;
  notification_phone_number: string | null;
  invoice: string | null;
  ref: string;
  wallet_address: string | null;
  bank: string;
  receiving_number: string;
  network: string;
  created_at: string;
  updated_at: string;
}

interface Buying {
  buy_transaction_id: number;
  user: User;
  coin: {
    coin_id: number;
    coin_name: string;
    coin: string;
  };
  blockchain: {
    blobkchain_id: number;
    blockchain_name: string;
  };
  coin_price: string;
  amount: number;
  dollar_rate: string;
  total_naira_plus_fees: string;
  method: string;
  payment_status: string;
  finished: string;
  wallet_address: string;
  payment_made: string | null;
  amount_paid: string | null;
  transaction_contact: string;
  network_fees_dollar: string;
  referer: string | null;
  network_fees_naira: string;
  created_at: string;
  updated_at: string;
}

interface SellTransaction {
  sell_transaction_id: number;
  user: User;
  selling: {
    id: number;
    virtual_account_id: number;
    ref: string;
    currency: string;
    network: string;
    created_at: string;
    updated_at: string;
  };
  amount_sent: string;
  naira_value: string;
  status: string;
  coin: string;
  sell_details: SellDetail;
  referer: string | null;
  created_at: string;
  updated_at: string;
}

interface SellDetail {
  id: number;
  sell_transaction_id: number;
  account_name: string;
  account_number: string;
  bank_name: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

interface TopUp {
  bills_transaction_id: number;
  user: User;
  coin: string | null;
  blockchain: string | null;
  coin_value: string | null;
  naira_value: string;
  method: string;
  status: string;
  finished: string;
  exchange_value: string | null;
  type: string;
  billtype: string;
  payment_made: string | null;
  amount_paid: string | null;
  product_number: string;
  customer_name: string | null;
  customernumber: string | null;
  notification_phone_number: string | null;
  invoice: string | null;
  ref: string;
  wallet_address: string | null;
  bank: string;
  receiving_number: string;
  network: string;
  referer: string | null;
  created_at: string;
  updated_at: string;
}

interface TopUpTransaction {
  bills_transaction_id: number;
  user: User;
  coin: string | null;
  blockchain: string | null;
  coin_value: string | null;
  naira_value: string;
  method: string;
  status: string;
  finished: string;
  exchange_value: string | null;
  type: string;
  billtype: string;
  payment_made: string | null;
  amount_paid: string | null;
  product_number: string;
  customer_name: string | null;
  customernumber: string | null;
  notification_phone_number: string | null;
  invoice: string | null;
  ref: string;
  wallet_address: string | null;
  bank: string;
  receiving_number: string;
  network: string;
  referer: string | null;
  created_at: string;
  updated_at: string;
}

interface BillTransaction {
  bills_transaction_id: number;
  user: User;
  coin: string | null;
  blockchain: string | null;
  coin_value: string | null;
  naira_value: string;
  method: string;
  status: string;
  finished: string;
  exchange_value: string | null;
  type: string;
  billtype: string;
  payment_made: string | null;
  amount_paid: string | null;
  product_number: string;
  customer_name: string | null;
  customernumber: string | null;
  notification_phone_number: string | null;
  invoice: string | null;
  ref: string;
  wallet_address: string | null;
  bank: string;
  receiving_number: string;
  network: string;
  referer: string | null;
  created_at: string;
  updated_at: string;
}

interface Coin {
  coin_id: number;
  coin_name: string;
  coin: string;
}

interface Blockchain {
  blobkchain_id: number;
  blockchain_name: string;
}

interface BuyingTransaction {
  buy_transaction_id: number;
  user: User;
  coin: Coin;
  blockchain: Blockchain;
  coin_price: string;
  amount: number;
  dollar_rate: string;
  total_naira_plus_fees: string;
  method: string;
  payment_status: string;
  finished: string;
  wallet_address: string;
  payment_made: string | null;
  amount_paid: string | null;
  transaction_contact: string | null;
  network_fees_dollar: string;
  referer: string | null;
  network_fees_naira: string;
  created_at: string;
  updated_at: string;
}

interface Selling {
  id: number;
  virtual_account_id: number;
  ref: string;
  currency: string;
  network: string;
  created_at: string;
  updated_at: string;
}

interface SellDetails {
  id: number;
  sell_transaction_id: number;
  account_name: string;
  account_number: string;
  bank_name: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

interface SellTransaction {
  sell_transaction_id: number;
  user: User;
  selling: Selling;
  amount_sent: string;
  naira_value: string;
  status: string;
  coin: string;
  sell_details: SellDetails;
  referer: string | null;
  created_at: string;
  updated_at: string;
}

export interface AllTransactionsData {
  topUp: TopUpTransaction[];
  bills: BillTransaction[];
  buyings: BuyingTransaction[];
  sell_transactions: SellTransaction[];
}

interface BlockUser {
  user_id: number;
  uid: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string;
  referral_code: string;
  is_blocked: number;
  verification_method: string | null;
  status: string | null;
}

export interface BlockedUserReport {
  id: number;
  user: BlockUser;
  reason: string;
  created_at: string;
  updated_at: string;
}

export interface UserKYCData {
  user_id: number;
  uid: string;
  email: string;
  referral_code: string;
  verification_method: string;
  fname: string;
  mname: string | null;
  status: string;
  phone_number: string;
  gender: string;
  dateOfBirth: string; // format: YYYY-MM-DD
  nationality: string;
  documents_id: number;
  front: string;
  back: string;
  hold: string;
  short_video: string | null;
  kyc_documents_created_at: string; // format: YYYY-MM-DD HH:mm:ss
  kyc_documents_updated_at: string; // format: YYYY-MM-DD HH:mm:ss
  kyc_documents_video_status: string;
  kyc_documents_status: string;
  kyc_user_details_id: number | null;
  kyc_user_details_status: string | null;
  kyc_fname: string | null;
  kyc_lname: string | null;
  kyc_gender: string | null;
  kyc_dateOfBirth: string | null;
  kyc_phone_number: string | null;
  kyc_picture: string | null;
  kyc_user_details_created_at: string | null;
  kyc_user_details_updated_at: string | null;
}

export interface ReferralBonus {
  id: number;
  pause_bonus: number;
  referral_system: string;
  bonus_parameters: string;
  min_transaction_amt: string,
  min_withdrawable_amt: string,
  max_bonus_limit: string,
  expiry_period_in_days: number,
  updated_at: string;
  created_at: string;
}
