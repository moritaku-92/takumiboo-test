import {createAction} from 'redux-actions'
import {CALL_API} from 'redux-api-middleware'
import {WAITTIME_GET_REQUEST, WAITTIME_GET_SUCCESS, WAITTIME_GET_FAILURE} from '../constants/ActionTypes'

export const getWaitTime = () => {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:3001/getData',
            method: 'GET',
            types: [
                WAITTIME_GET_REQUEST,
                WAITTIME_GET_SUCCESS,
                WAITTIME_GET_FAILURE
            ]
        }
    }    
}