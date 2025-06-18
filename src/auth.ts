import { config } from "./";
import { axiosMasterLogger } from "axios-master";
import FormData from "form-data";
import axios, { AxiosResponse, AxiosError } from "axios";

type ApiResponse<T> = {
  data: T;
  meta: {
    message: string;
  };
};

type AuthType = {
  client_id: string;
  client_secret: string;
};

type TokenResponse = {
  success: boolean;
  message: string;
};

const TOKEN = async (auth: AuthType): Promise<TokenResponse> => {
  try {
    let data = new FormData();
    data.append("client_id", auth.client_id);
    data.append("client_secret", auth.client_secret);
    data.append("grant_type", "client_credentials");

    const response: ApiResponse<{
      token_type: string;
      expires_in: number;
      access_token: string;
    }> = await axiosMasterLogger(
      {
        method: "POST",
        url: `${config.host}/v2/token`,
        headers: {
          Accept: "application/json",
          ...data.getHeaders(),
        },
        data: data,
      },
      {
        name: "Token",
        timeout: 20000,
        logger: (data) => {
          if (config.logger) console.log(data);
        },
      },
    );

    if (response?.data?.access_token) {
      config.token = response?.data?.access_token;
      config.auth = auth;
      return {
        success: true,
        message: "Token retrieved successfully.",
      };
    }

    return {
      success: false,
      message: "Failed to retrieve token.",
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<{}>>;
    if (axiosError?.response) {
      console.log(axiosError.response);
    } else {
      console.error("Token Request Failed:", axiosError);
    }
    return {
      success: false,
      message:
        axiosError?.response?.data?.meta?.message || "An error occurred.",
    };
  }
};

export const getToken = async (): Promise<string> => {
  try {
    const data = new FormData();
    data.append("client_id", config.auth.client_id);
    data.append("client_secret", config.auth.client_secret);
    data.append("grant_type", "client_credentials");
    const response: ApiResponse<{
      token_type: string;
      expires_in: number;
      access_token: string;
    }> = await axiosMasterLogger(
      {
        method: "POST",
        url: `${config.host}/v2/token`,
        headers: {
          Accept: "application/json",
          ...data.getHeaders(),
        },
        data: data,
      },
      {
        name: "Token",
        timeout: 20000,
        logger: (data) => {
          if (config.logger) console.log(data);
        },
      },
    );

    if (response?.data?.access_token) {
      config.token = response?.data?.access_token;
      return response?.data?.access_token;
    }

    return "";
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<{}>>;
    if (axiosError?.response) {
      console.log(axiosError.response);
    } else {
      console.error("Token Request Failed:", axiosError);
    }
    return "";
  }
};

export default { TOKEN };
