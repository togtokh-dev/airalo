import { config } from ".";
import { axiosMasterLogger } from "axios-master";
import FormData from "form-data";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getToken } from "./auth";
import { CountryData } from "./types/package";

type ApiResponse<T> = {
  data: T;
  meta: {
    message: string;
  };
};

export const Packages = async (data: {
  filter?: any;
  limit?: number;
  page?: number;
  include?: string;
}): Promise<{
  success: boolean;
  data: CountryData[];
  message: string;
}> => {
  try {
    const result: ApiResponse<CountryData[]> = await axiosMasterLogger(
      {
        method: "GET",
        maxBodyLength: Infinity,
        url: `${config.host}/v2/packages`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.token}`,
        },
        params: data,
      },
      {
        name: "Packages",
        timeout: 20000,
        retryFunction: getToken,
        shouldRetry: true,
        shouldRetryStatus: [401],
        logger: (data) => config.logger && console.log("Packages:", data.json),
      },
    );

    return {
      success: true,
      data: result.data || null,
      message: "Successfully",
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<{}>>;
    if (axiosError?.response) {
      console.log(axiosError.response);
    } else {
      console.error("Packages Request Failed:", axiosError);
    }
    return {
      success: false,
      message:
        axiosError?.response?.data?.meta?.message || "An error occurred.",
      data: null,
    };
  }
};

export default { Packages };
