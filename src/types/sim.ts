export type SimTopUpPackage = {
  id: string;
  type: string;
  price: number;
  amount: number;
  day: number;
  is_unlimited: boolean;
  title: string;
  data: string;
  short_info: string;
  voice: number;
  text: number;
};
export type SimDataUsage = {
  remaining: number;
  total: number;
  expired_at: string;
  is_unlimited: boolean;
  status: "NOT_ACTIVE" | "ACTIVE" | "FINISHED" | "UNKNOWN" | "EXPIRED";
  remaining_voice: number;
  remaining_text: number;
  total_voice: number;
  total_text: number;
};
