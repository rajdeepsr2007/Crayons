import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

const authUserStart = () => {
    return{
        type : actionTypes.AUTH_USER_START
    }
}

const authUserSuccess = (userId , success) => {
    return{
        type : actionTypes.AUTH_USER_SUCCESS,
        userId,
        success
    }
}

const authUserFailed = (error) => {
    return{
        type : actionTypes.AUTH_USER_FAILED,
        error
    }
}

export const authUser = (username , password) => {
    return dispatch => {
        dispatch(authUserStart);
        axiosInstance.post('/api/auth', { username , password })
        .then( response => {
            if( response ){
                if( response.data.success )
                    dispatch(authUserSuccess(response.data.userId , response.data.message))
                else
                    dispatch(authUserFailed(response.data.message))
            }else{
                dispatch(authUserFailed('Network Error'))
            }
        })
        .catch(error => {
            dispatch(authUserFailed(error.message))
        })
    }
}