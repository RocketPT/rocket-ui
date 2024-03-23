import request from '../utils/request';
import {BASE_URI} from "./base";


//相当于结构体？
export interface ForgotPassWordParam {
  email: string;
  code: string;
  uuid: string;
}

export function forgotPassWord(data: ForgotPassWordParam) {
  return request({
    url: `${BASE_URI}/forgot-password`,
    method: "post",
    data,
  });
}
