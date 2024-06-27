import { BASE_URL } from "@/services/api-service/Base";
import axios from "axios";
const axiosInstance:any = axios.create({
  withCredentials: true,
  baseURL: BASE_URL().densityBaseUrl
});

axiosInstance.defaults.headers.common.accept = "*/*";
axiosInstance.defaults.headers.common.rid = "anti-csrf";

axiosInstance.interceptors.request.use((req:any) => {
  req.meta = req.meta || {};
  req.meta.requestStartedAt = new Date().getTime();
  return req;
});

// axiosInstance.interceptors.response.use(
//   (res: any) => {

//     return Promise.resolve(res);
//   },
//   (error: any) => {

//     return Promise.reject(error);

//   }
// );

const axiosWithApiServer = ({ url, method, body = null, headers = null, isMultiPartData = false }:any) => {
  const requestBody = isMultiPartData === true ? body : JSON.parse(body);
  return axiosInstance[method](url, requestBody, headers);
};

export default axiosWithApiServer;
