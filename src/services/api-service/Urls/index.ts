import { REQUEST_TYPE } from "../Base";

export const CREATE_OTP = {
    url: "/v1/user/email-verification",
    reqType: REQUEST_TYPE.POST
  };
  
  export const CONSUME_OTP = {
    url: "/v1/user/email-verification/otp",
    reqType: REQUEST_TYPE.POST
  };
  export const AUTH_LOGIN = {
    url: "/v1/user/login",
    reqType: REQUEST_TYPE.POST
  };
