import request from '../utils/request';
import {BASE_URI} from "./base";


export interface AddTorrentParam {
    name: string
    title: string
    subheading: string
    cover: string
    description: string
    category: number
    status: number
    anonymous: number
    remark: string
}
export const fetchList = (data: any) => {
    return request({
        url: `${BASE_URI}/torrent/list`,
        method: 'post',
        data: data
    });
}

export const addTorrent = (data: AddTorrentParam) => {
    data.status=0
    return request({
        url: `${BASE_URI}/torrent/add`,
        method: 'post',
        data: data
    });
}

export const upTorrentFileUri = `${BASE_URI}/torrent/upload`
