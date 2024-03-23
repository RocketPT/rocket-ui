import request from '../utils/request';
import {BASE_URI} from "./base";


//相当于结构体？
export interface ForgotPassWordParam {
  email: string;
  code: string;
  uuid: string;
}
export interface ResetPasswordParam{
    checkCode: string;
    newPassword: string;
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
export function resetPassword(data: ResetPasswordParam) {
    return request({
        url: `${BASE_URI}/reset-password`,
        method: "post",
        data
    })
}
