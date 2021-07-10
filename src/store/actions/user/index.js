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

export const loadUsers = (filter , user) => {
    return dispatch => {
        dispatch(loadUsersStart(filter));
        axiosInstance.get('/api/users/' + filter.type + '/' + filter.value + '/' + user )
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

export const updateUsers = (data) => {
    return{
        type : actionTypes.UPDATE_USERS ,
        data
    }
}

const toggleFriendStart = () => {
    return{
        type : actionTypes.TOGGLE_FRIEND_START 
    }
}
const toggleFriendSuccess = (user) => {
    return{
        type : actionTypes.TOGGLE_FRIEND_SUCCESS,
        user
    }
}
const toggleFriendFailed = () => {
    return{
        type : actionTypes.TOGGLE_FRIEND_FAILED
    }
}
export const toggleFriend = (userId , friendId) => {
    return dispatch => {
        dispatch(toggleFriendStart());
        axiosInstance.get(`/api/users/friend/${userId}/${friendId}`)
        .then(response => {
            if( response ){
                dispatch(toggleFriendSuccess({ userId : friendId ,  friend : response.data.friend }))
            }else{
                dispatch(toggleFriendFailed());
            }
        })
        .catch(error => {
            dispatch(toggleFriendFailed());
        })
    }
}

export const reset = () => {
    return{
        type : actionTypes.RESET
    }
}

