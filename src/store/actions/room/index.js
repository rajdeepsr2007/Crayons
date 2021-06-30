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



const findRoomsStart = () => {
    return{
        type : actionTypes.FIND_ROOMS_START
    }
}

const findRoomsSuccess = (rooms) => {
    return{
        type : actionTypes.FIND_ROOMS_SUCCESS,
        rooms
    }
}

const findRoomsFailed = (error) => {
    return{
        type : actionTypes.FIND_ROOMS_FAILED ,
        error
    }
}

export const findRooms = () => {
    return dispatch => {
        dispatch(findRoomsStart());
        axiosInstance.get('/api/room/find')
        .then(response => {
            if( response ){
                console.log(response.data.rooms);
                dispatch(findRoomsSuccess(
                    response.data.rooms
                ))
            }else{
                dispatch(findRoomsFailed(
                    'Network Error'
                ))
            }
        })
        .catch(error => {
            dispatch(findRoomsFailed(
                error.message
            ))
        })
    }
}

export const resetRoomId = () => {
    return{
        type : actionTypes.RESET_ROOMID
    }
}