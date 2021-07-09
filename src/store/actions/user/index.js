import axiosInstance from '../../../axiosInstance';
import * as actionTypes from '../actionTypes';

const loadUsersStart = (filter) => {
    return{
        type : actionTypes.LOAD_USERS_START ,
        filter
    }
}
const loadUsersSuccess = (users , filter) => {
    return{
        type : actionTypes.LOAD_USERS_SUCCESS ,
        users,
        filter
    }
}

const loadUsersFailed = (error , filter) => {
    return{
        type : actionTypes.LOAD_USERS_FAILED, 
        filter,
        error
    }
}

export const loadUsers = (filter) => {
    return dispatch => {
        dispatch(loadUsersStart(filter));
        axiosInstance.get('/api/users/' + filter.type + '/' + filter.value )
        .then( response => {
            if( response ){
                dispatch(loadUsersSuccess(response.data.users , filter));
            }else{
                dispatch(loadUsersFailed('Network' , filter))
            }
        })
        .catch(error => {
            dispatch(loadUsersFailed(error.message , filter))
        })
    } 
}