import request from "@/utils/request";
import api from "./api";


// 登录接口
export const getLogin = payload => request.post(api.Login, payload);

// 上传接口
export const getUpload = payload => request.uploadPost(api.Upload, payload);

// 添加接口
export const getAddList = payload => request.post(api.addList, payload);


// 列表接口
export const getTable = payload => request.get(api.TableList, payload);


// 详情接口
export const getsampleInfo = payload => request.get(api.sampleInfo, payload);