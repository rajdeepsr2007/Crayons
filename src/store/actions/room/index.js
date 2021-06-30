import * as actionTypes from '../actionTypes';
import axiosInstance from '../../../axiosInstance';

const createRoomStart = () => {
    return{
        type : actionTypes.CREATE_ROOM_START
    }
}

const createRoomSuccess = (roomId) => {
    return{
        type : actionTypes.CREATE_ROOM_SUCCESS ,
        roomId
    }
}

const createRoomFailed = (error) => {
    return{
        type : actionTypes.CREATE_ROOM_FAILED,
        error
    }
}

export const createRoom = (rounds , drawingTime , words , user) => {
    return dispatch => {
        dispatch(createRoomStart());
        axiosInstance.post('/api/room/create',{ rounds , drawingTime , words , user })
        .then( response => {
            if( response ){
                dispatch( createRoomSuccess( response.data.roomId ) )
            }else{
                dispatch( createRoomFailed('Network Error') )
            }
        })
        .catch( error => {
            dispatch( createRoomFailed(error.message) );
        } )
    }
}