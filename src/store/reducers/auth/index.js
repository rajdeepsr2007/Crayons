import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    user : null ,
    error : null ,
    success : null ,
    loading : false
}

const reducer = (state=initialState , action) => {
    switch(action.type){

        case actionTypes.AUTH_USER_START :
            return {...initialState , loading : true};

        case actionTypes.AUTH_USER_SUCCESS :
            return { loading : false , user : action.userId , success : action.success , userObject : action.userObject }

        case actionTypes.AUTH_USER_FAILED :
            return {loading :  false , error : action.error }

        default : 
            return state;
    }
}

export default reducer;