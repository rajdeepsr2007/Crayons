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
        console.log(userId , token , avatar);
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