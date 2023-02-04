import { history } from 'umi';
import api from '@/services';


// 全局
export default {
    namespace: 'login',

    state: {
        token: ""
    },

    reducers: {
        setToken(state, { payload }) {
            console.log(payload, '4444');
            return {
                ...state,
                token: payload
            }
        }
    },

    effects: {
        * fetchLogin({ payload }, { call, put, select }) {
            const res = yield call(() => api.getLogin(payload))
            console.log(res, "res");
            if (!res.code) {
                yield put({
                    type: "setToken",
                    payload: res.result.userInfo.token,
                })
                console.log(res.result.userInfo.token, 333333);
                localStorage.setItem('token', res.result.userInfo.token)
                history.push('/detail')
            }
        }
    },
};