import { config } from "./";
import { axiosMasterMain } from "axios-master";
import FormData from "form-data";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getToken } from "./auth";
import { json } from "stream/consumers";

type ApiResponse<T> = {
  data: T;
  meta: {
    message: string;
  };
};

export const Balance = async (): Promise<{
  success: boolean;
  data: {
    balances: {
      name: "balance";
      availableBalance: {
        amount: number;
        currency: string;
      };
    };
  } | null;
  message: string;
}> => {
  try {
    const result: ApiResponse<{
      balances: {
        name: "balance";
        availableBalance: {
          amount: number;
          currency: string;
        };
      };
    }> = await axiosMasterMain(
      {
        method: "GET",
        maxBodyLength: Infinity,
        url: `${config.host}/v2/balance`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.token}`,
        },
      },
      {
        name: "Balance",
        timeout: 20000,
        retryFunction: getToken,
        shouldRetry: true,
        shouldRetryStatus: [401],
        logger: (data) => config.logger && console.log("Balance:", data.json),
      },
    );

    return {
      success: true,
      data: result?.data || null,
      message: "Successfully",
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<{}>>;
    if (axiosError?.response) {
      console.log(axiosError.response);
    } else {
      console.error("Balance Request Failed:", axiosError);
    }
    return {
      success: false,
      message:
        axiosError?.response?.data?.meta?.message || "An error occurred.",
      data: null,
    };
  }
};

export default { Balance };
