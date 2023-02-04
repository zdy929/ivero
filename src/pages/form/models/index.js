import { history } from 'umi';
import api from '@/services';


// 全局
export default {
    namespace: 'form',

    state: {
        dataSource: [], // 保存表格数据
        count: 0, // 保存总条数
        data: {}
    },

    reducers: {
        setData(state, { payload }) {
            const { list, count } = payload;
            const value = list.map((v) => {
                return {...v, ...JSON.parse(v.info) };
            })
            console.log(value, '1231132');

            return {
                ...state,
                dataSource: value,
                count
            }
        },

        // 监听表单 实时修改 DataSource
        setDataSource(state, { payload }) {
            const { dataSource } = state
            const { id, name, value } = payload;
            const index = dataSource.findIndex((v) => {
                return v.id === id
            })
            dataSource[index][name] = value

            return {
                ...state,
                dataSource: [...dataSource],
            }
        },

        setDatas(state, { payload }) {
            // console.log(payload, 'payload');
            // console.log(JSON.parse(payload.info));
            return {
                ...state,
                data: {
                    ...payload,
                    ...JSON.parse(payload.info)
                }
            }
        }
    },

    effects: {
        // 列表数据渲染
        * fetchList({ payload }, { call, put, select }) {
            const res = yield call(() => api.getTable(payload));
            // console.log(res);
            if (!res.code) {
                yield put({
                    type: "setData",
                    payload: res.result
                })
            }
        },


        // 上传图片功能
        * fetchUpload({ payload }, { call, put, select }) {
            const res = yield call(() => api.getUpload(payload))
            if (!res.code) {
                return res.result;
            }
        },
        // 表格添加功能
        * fetchAddtable({ payload }, { call, put, select }) {
            const res = yield call(() => api.getAddList(payload));
            if (!res.code) {
                yield put({
                    type: "fetchTable",
                    payload: {
                        token: "yKVp8WvwJLVt4KcxlN69lEjtHHTby8Nu",
                        page: 1,
                        limit: 5
                    }
                })
            }
        },

        // 编辑回填接口
        * fetchsampleInfo({ payload }, { call, put, select }) {
            const res = yield call(() => api.getsampleInfo(payload));
            // return res.result
            if (!res.code) {
                yield put({
                    type: "setDatas",
                    payload: res.result
                })
            }
        },

        // 删除接口


    },
};