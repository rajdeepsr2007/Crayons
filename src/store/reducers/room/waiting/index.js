import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
    room : null ,
    error : null ,
    loading : false
}

const reducer = (state=initialState , action) => {
    switch(action.type){
        case actionTypes.LOAD_ROOM_START :
            return {...initialState , loading : true}
        
        case actionTypes.LOAD_ROOM_SUCCESS :
            return {...initialState , room : action.room}

        case actionTypes.LOAD_ROOM_FAILED :
            return {...initialState , error : action.error}

        default:
            return state;
    }
}

export default reducer;