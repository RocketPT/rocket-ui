import request from '../utils/request';
import {BASE_URI} from "./base";

export interface LoginInfo {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export function login(data: {
    username: string;
    password: string;
    code: string;
    uuid: string;
}) {
    return request({
        url: `${BASE_URI}/login`,
        method: 'post',
        data: data
    });
}

export function logout() {
    return request({
        url: `${BASE_URI}/logout`,
        method: 'post',
    });
}

export interface RegisterParams {
  /**
   * 注册类型
   * 1.开放注册
   * 2.受邀注册
   * 3.自助答题注册
   */
  type: number;
  username: string;
  nickname: string;
  email: string;
  password: string;
  /**
   * 验证码
   */
  code: string;
  emailCode: string;
  uuid: string;
  /**
   * 邀请码
   */
  invitationCode: string;
  /**
   * 国家地区
   */
  country: string;
  /**
   * 性别
   * 0 男
   * 1 女
   * 2 其他
   */
  sex: 0 | 1 | 2;
}

export function register(data: RegisterParams) {
  return request({
    url: `${BASE_URI}/register`,
    method: "post",
    data,
  });
}
