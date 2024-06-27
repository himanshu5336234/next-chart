export const REQUEST_TYPE = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch"
};

export const envVariable = () => {
  return process.env.VITE_BUILD_TYPE;
};
export const deploymentEnv = {
  PROD: "production",
  STAGING: "staging",
  DEV: "development"
};

export const BASE_URL = () => {
  let densityBaseUrl;
  let binanceWsBase;

  switch (envVariable()) {
    case deploymentEnv.PROD:
    case deploymentEnv.STAGING:
      densityBaseUrl = "https://api-coin.density.exchange";
      binanceWsBase ="wss://fstream.binance.com/stream"
      break;
    case deploymentEnv.DEV:
    default:
      densityBaseUrl = "https://api-coin.density.exchange";
      binanceWsBase ="wss://fstream.binance.com/stream"
      break;
  }
  return {
    densityBaseUrl,
    binanceWsBase
  };
};
