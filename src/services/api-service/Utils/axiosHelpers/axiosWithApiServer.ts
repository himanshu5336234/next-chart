import { BASE_URL } from "@/services/api-service/Base";
import axios from "axios";
const axiosInstance: any = axios.create({
  baseURL: BASE_URL().binanceBaseUrl,
});

const axiosWithApiServer = ({
  url,
  method,
  body = null,
  headers = null,
}: any) => {

  return axiosInstance[method](url,  JSON.parse(body), headers);
};

export default axiosWithApiServer;
