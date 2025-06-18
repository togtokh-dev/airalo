import auth from "./auth";
export const jsonToQueryString = (params: { [key: string]: any }) => {
  const query = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");
  return query ? `?${query}` : "";
};
const ObjectId = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};
export const config: {
  token: string;
  env: "PROD" | "STAGING";
  host: string; // https://sandbox-partners-api.airalo.com
  auth: {
    client_id: string;
    client_secret: string;
  };
  logger: boolean;
} = {
  token: "",
  env: "STAGING",
  host: "https://sandbox-partners-api.airalo.com", // https://sandbox-partners-api.airalo.com, https://partners-api.airalo.com
  auth: {
    client_id: "",
    client_secret: "",
  },
  logger: false,
};
// Function to set the host URL for API requests
export const setHost = (url: string) => {
  config.host = url;
  if (url == "https://partners-api.airalo.com") {
    config.env = "PROD";
  }
  console.log("Host set to:", url);
};

// Function to enable or disable logging
export const setLogger = (status: boolean) => {
  config.logger = status;
  console.log("Logger status set to:", status);
};
export default {
  auth,
  config,
  ObjectId,
  setHost,
  setLogger,
};
export { default as Package } from "./package";
export { default as Order } from "./order";
