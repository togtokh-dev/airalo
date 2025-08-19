import { config } from ".";
import { axiosMasterLogger } from "axios-master";
import FormData from "form-data";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getToken } from "./auth";
import { Order } from "./types/order";
import { SimDataUsage, SimTopUpPackage } from "./types/sim";

type ApiResponse<T> = {
  data: T;
  meta: {
    message: string;
  };
};

export const GetDataUsage = async ({
  sim_iccid,
}: {
  sim_iccid: string;
}): Promise<{
  success: boolean;
  data: SimDataUsage;
  message: string;
}> => {
  try {
    const result: ApiResponse<SimDataUsage> = await axiosMasterLogger(
      {
        method: "GET",
        maxBodyLength: Infinity,
        url: `${config.host}/v2/sims/${sim_iccid}/usage`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${config.token}`,
        },
      },
      {
        name: "Get Data Usage",
        timeout: 20000,
        retryFunction: getToken,
        shouldRetry: true,
        shouldRetryStatus: [401],
        logger: (data) =>
          config.logger && console.log("Get Data Usage:", data.json),
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
export const GetTopUpPackageList = async ({
  sim_iccid,
}: {
  sim_iccid: string;
}): Promise<{
  success: boolean;
  data: SimTopUpPackage[];
  message: string;
}> => {
  try {
    const result: ApiResponse<SimTopUpPackage[]> = await axiosMasterLogger(
      {
        method: "GET",
        maxBodyLength: Infinity,
        url: `${config.host}/v2/sims/${sim_iccid}/topups`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${config.token}`,
        },
      },
      {
        name: "Get  Top-up Package List",
        timeout: 20000,
        retryFunction: getToken,
        shouldRetry: true,
        shouldRetryStatus: [401],
        logger: (data) =>
          config.logger && console.log("Get  Top-up Package List:", data.json),
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
export const UpdateESIMBrand = async (
  sim_iccid: string,
  {
    brand_settings_name,
  }: {
    brand_settings_name: string;
  },
): Promise<{
  success: boolean;
  data: any;
  message: string;
}> => {
  try {
    const data = new FormData();

    data.append("brand_settings_name", brand_settings_name);

    const result: ApiResponse<any> = await axiosMasterLogger(
      {
        method: "PUT",
        maxBodyLength: Infinity,
        url: `${config.host}/v2/sims/${sim_iccid}/brand`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.token}`,
        },
        data: data,
      },
      {
        name: "Update eSIM Brand",
        timeout: 20000,
        retryFunction: getToken,
        shouldRetry: true,
        shouldRetryStatus: [401],
        logger: (data) =>
          config.logger && console.log("Get Update eSIM Brand:", data.json),
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
export default { GetDataUsage, GetTopUpPackageList, UpdateESIMBrand };
