import axiosInstance from '../../../../axiosInstance';
import * as actionTypes from '../../actionTypes';

const loadRoomStart = () => {
    return{
        type : actionTypes.LOAD_ROOM_START
    }
}

const loadRoomSuccess = (room) => {
    return{
        type : actionTypes.LOAD_ROOM_SUCCESS,
        room
    }
}

const loadRoomFailed = (error) => {
    return{
        type : actionTypes.LOAD_ROOM_FAILED,
        error
    }
}

export const loadRoom = (roomId) => {
    return dispatch => {
        dispatch(loadRoomStart());
        axiosInstance.get(`/api/room/${roomId}`)
        .then(response => {
            if( response ){
                if(response.data.success)
                    dispatch(loadRoomSuccess(response.data.room))
                else
                    dispatch(loadRoomFailed(response.data.message))
            }else{
                dispatch(loadRoomFailed('Network Error'))
            }
        })
        .catch( error => {
            dispatch(loadRoomFailed(error.message));
        })
    }
}