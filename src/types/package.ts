export type CountryData = {
  slug: string;
  country_code: string;
  title: string;
  image: Image;
  operators: Operator[];
};

type Image = {
  width: number;
  height: number;
  url: string;
};

type Operator = {
  id: number;
  style: string;
  gradient_start: string;
  gradient_end: string;
  type: string;
  is_prepaid: boolean;
  title: string;
  esim_type: string;
  warning: string | null;
  apn_type: string;
  apn_value: string | null;
  is_roaming: boolean;
  info: string[];
  image: Image;
  plan_type: string;
  activation_policy: string;
  is_kyc_verify: boolean;
  rechargeability: boolean;
  other_info: string | null;
  coverages: Coverage[];
  install_window_days: number | null;
  topup_grace_window_days: number | null;
  apn: {
    ios: APN;
    android: APN;
  };
  packages: Package[];
  countries: {
    country_code: string;
    title: string;
    image: Image;
  }[];
};

type Coverage = {
  name: string;
  code: string;
  networks: {
    name: string;
    types: string[];
  }[];
};

type APN = {
  apn_type: string;
  apn_value: string | null;
};

type Package = {
  id: string;
  type: string;
  price: number;
  amount: number;
  day: number;
  is_unlimited: boolean;
  title: string;
  short_info: string | null;
  qr_installation: string;
  manual_installation: string;
  is_fair_usage_policy: boolean;
  fair_usage_policy: string | null;
  data: string;
  voice: string | null;
  text: string | null;
  net_price: number;
  prices: {
    net_price: CurrencyPrice;
    recommended_retail_price: CurrencyPrice;
  };
};

type CurrencyPrice = {
  [currency: string]: number;
};
