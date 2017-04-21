import {handleActions} from 'redux-actions'
import {WAITTIME_GET_REQUEST, WAITTIME_GET_SUCCESS, WAITTIME_GET_FAILURE} from '../constants/ActionTypes'

// 初期データ
const initialState = {
    data: []
}

export const waitTime = handleActions({

    // 通信が開始したことを表すフラグをtrueにします。 こちらのフラグを使用してローディングなどを表示します。
    [WAITTIME_GET_REQUEST]: (state, action) => {
        return Object.assign({}, state, {isFetching: true})
    },

    // 通信で取得したデータをStoreに返します。 通信が開始したことを表すフラグはfalseにします。
    // こちらのフラグを使用して表示していたローディングを閉じます。
    [WAITTIME_GET_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            data: action.payload,
            isFetching: false
        })
    },

    // 通信が開始したことを表すフラグはfalseにします。 こちらのフラグを使用して表示していたローディングを閉じます。
    [WAITTIME_GET_FAILURE]: (state, action) => {
        return Object.assign({}, state, {isFetching: false})
    }
}, initialState)