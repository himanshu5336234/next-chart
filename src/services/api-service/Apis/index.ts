import { Format } from "@/helpers/CurrencyLogo";
import { CONSUME_OTP, CREATE_OTP } from "../Urls";
import axiosWithApiServer from "../Utils/axiosHelpers/axiosWithApiServer";

export const createOTP = (email: string) => {
  const url = Format(CREATE_OTP.url);
  return axiosWithApiServer({
    url,
    method: CREATE_OTP.reqType,
    body: JSON.stringify({ email }),
  });
};
export const consumeOTP = (payload: any) => {
  const url = Format(CONSUME_OTP.url);
  return axiosWithApiServer({
    url,
    method: CONSUME_OTP.reqType,
    body: JSON.stringify(payload),
  });
};
