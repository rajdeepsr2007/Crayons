import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

const authUserStart = () => {
    return{
        type : actionTypes.AUTH_USER_START
    }
}

const authUserSuccess = (userId , success , userObject) => {
    return{
        type : actionTypes.AUTH_USER_SUCCESS,
        userId,
        userObject,
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
        dispatch(authUserStart());
        axiosInstance.post('/api/auth', { username_email : username , password })
        .then( response => {
            if( response ){
                if( response.data.success ){
                    setUserToLocalStorage(  response.data.userObject , response.data.token  )
                    dispatch(authUserSuccess(response.data.userId , response.data.message , response.data.userObject))
                }
                else{
                    dispatch(authUserFailed(response.data.message))
                }
            }else{
                dispatch(authUserFailed('Network Error'))
            }
        })
        .catch(error => {
            dispatch(authUserFailed(error.message))
        })
    }
}

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('crayons-token');
        if( token ){
            axiosInstance.post('/api/auth/auto', { } , {
                headers : {
                    "Authorization" : "Bearer " + token
                }
            })
            .then( response => {
                if( response ){
                    if( response.data.success ){
                        setUserToLocalStorage(  response.data.userObject , response.data.token  )
                        dispatch(authUserSuccess(response.data.userId , response.data.message , response.data.userObject ))
                    }
                }
            })
            .catch(error => {
                console.log('auto login error')
            })
        }    
    }
}

const setUserToLocalStorage = (user , token) => {
    localStorage.setItem('crayons-token' , token);
    localStorage.setItem('username' , user.username);
    localStorage.setItem('crayons-avatar' , user.avatar);
}

const logoutSuccess = () => {
    return{
        type : actionTypes.LOGOUT_SUCCESS
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.clear('crayons-token');
        localStorage.clear('username');
        localStorage.clear('crayons-avatar');
        dispatch(logoutSuccess());
    }
}