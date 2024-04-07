import request from '../utils/request';
import {BASE_URI} from "./base";

export const fetchList = (data: any) => {
    return request({
        url: `${BASE_URI}/torrent/list`,
        method: 'post',
        data: data
    });
}

export const addTorrent = (data:any) => {
    return request({
        url: `${BASE_URI}/torrent/add`,
        method: 'post',
        data: data
    });
}
