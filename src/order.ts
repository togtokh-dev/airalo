import { config } from ".";
import { axiosMasterLogger } from "axios-master";
import FormData from "form-data";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getToken } from "./auth";
import { Order } from "./types/order";

type ApiResponse<T> = {
  data: T;
  meta: {
    message: string;
  };
};

export const SubmitOrder = async (body: {
  quantity: string; //Required. The quantity of items in the order. Maximum of 50.
  package_id: string; //Required. The package ID associated with the order. You can obtain this from the "Packages / Get Packages" endpoint.
  type: string; //Optional. The only possible value for this endpoint is "sim". If left empty, default "sim" value will be used.
  description?: string; //Optional. A custom description for the order, which can help you identify it later.
  brand_settings_name?: string; //Nullable. The definition under what brand the eSIM should be shared. Null for unbranded.
}): Promise<{
  success: boolean;
  data: Order;
  message: string;
}> => {
  try {
    const data = new FormData();

    data.append("client_id", config.auth.client_id);
    data.append("quantity", body.quantity);
    data.append("package_id", body.package_id);
    data.append("type", body.type);

    if (body.description) {
      data.append("description", body.description);
    }

    if (body.brand_settings_name) {
      data.append("brand_settings_name", body.brand_settings_name);
    }
    const result: ApiResponse<Order> = await axiosMasterLogger(
      {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${config.host}/v2/orders`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.token}`,
        },
        data: data,
      },
      {
        name: "SubmitOrder",
        timeout: 20000,
        retryFunction: getToken,
        shouldRetry: true,
        shouldRetryStatus: [401],
        logger: (data) =>
          config.logger && console.log("SubmitOrder:", data.json),
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

export default { SubmitOrder };
