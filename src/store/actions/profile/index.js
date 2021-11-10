import * as actionTypes from '../actionTypes';
import axiosInstance from '../../../axiosInstance';

const editAvatarStart = () => {
    return {
        type : actionTypes.EDIT_AVATAR_START
    }
}

const editAvatarSuccess = (avatar) => {
    return {
        type : actionTypes.EDIT_AVATAR_SUCCESS,
        avatar
    }
}

const editAvatarFailed = () => {
    return {
        type : actionTypes.EDIT_AVATAR_FAILED
    }
}


export const changeAvatar = ( userId , token , avatar ) => {
    return dispatch => {
        dispatch(editAvatarStart());
        axiosInstance.post('/api/profile/avatar' , { userId , avatar } ,{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then( response => {
            if( response && response.data.success )
                dispatch(editAvatarSuccess(avatar))
            else
                dispatch(editAvatarFailed())
        })
        .catch(error => {
            dispatch(editAvatarFailed())
        })
    }
}

const addAvatarSuccess = (picture) => {
    return{
        type : actionTypes.ADD_AVATAR_SUCCESS,
        picture
    }
}

export const uploadAvatar = ( image , token ) => {
    return dispatch => {
        dispatch(editAvatarStart());
        axiosInstance.post('/api/profile/upload' , image , {
            headers : {
                "Authorization" : "Bearer " + token,
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then( response => {
            if( response && response.data.success ){
                dispatch(addAvatarSuccess(response.data.picture))
            }else{
                dispatch(editAvatarFailed())
            }
        })
        .catch(error => {
            dispatch(editAvatarFailed())
        })
    }
}

const deleteAvatarSuccess = () => {
    return{
        type : actionTypes.DELETE_AVATAR_SUCCESS
    }
}

export const deleteAvatar = (token) => {
    return dispatch => {
        dispatch(editAvatarStart());
        axiosInstance.get('/api/profile/delete',{
            headers : {
                "Authorization" : "Bearer " + token
            }
        })
        .then(response => {
            if( response && response.data.success )
                dispatch(deleteAvatarSuccess())
            else
                dispatch(editAvatarFailed())
        })
        .catch(error => {
            dispatch(editAvatarFailed())
        })
    }
}