import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    creating : false ,
    error : null ,
    createdRoomId : null
}

const reducer = (state=initialState , action) => {
    switch( action.type ){
        case actionTypes.CREATE_ROOM_START :
            return { ...initialState , creating : true }

        case actionTypes.CREATE_ROOM_SUCCESS :
            return { ...initialState, creating : false , createdRoomId : action.roomId }

        case actionTypes.CREATE_ROOM_FAILED :
            return {...initialState , error : action.error }

        default : 
            return state;
    }
}

export default reducer;