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

  switch (envVariable()) {
    case deploymentEnv.PROD:
    case deploymentEnv.STAGING:
      densityBaseUrl = "https://api-coin.density.exchange";
      break;
    case deploymentEnv.DEV:
    default:
      densityBaseUrl = "https://api-coin.density.exchange";
      break;
  }
  return {
    densityBaseUrl
  };
};
