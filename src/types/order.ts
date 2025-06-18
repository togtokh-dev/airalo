export type Order = {
  package_id: string;
  quantity: string;
  type: string;
  description: string;
  esim_type: string;
  validity: number;
  package: string;
  data: string;
  price: number;
  created_at: string;
  id: number;
  code: string;
  currency: string;
  manual_installation: string;
  qrcode_installation: string;
  installation_guides: {
    [langCode: string]: string;
  };
  brand_settings_name: string;
  sims: Sim[];
};

export type Sim = {
  id: number;
  created_at: string;
  iccid: string;
  lpa: string;
  imsis: string | null;
  matching_id: string;
  qrcode: string;
  qrcode_url: string;
  direct_apple_installation_url: string;
  airalo_code: string | null;
  apn_type: string;
  apn_value: string | null;
  is_roaming: boolean;
  confirmation_code: string | null;
};
