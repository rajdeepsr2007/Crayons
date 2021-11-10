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
            return { loading : false , user : action.userId , success : action.success , userObject : action.userObject , token : action.token }

        case actionTypes.AUTH_USER_FAILED :
            return { loading :  false , error : action.error }

        case actionTypes.LOGOUT_SUCCESS :
            return {...initialState}

        case actionTypes.EDIT_AVATAR_START :
            return {...state, loading : true}

        case actionTypes.EDIT_AVATAR_FAILED :
            return {...state , loading : false}

        case actionTypes.EDIT_AVATAR_SUCCESS :
            return {...state , loading : false , userObject : {...state.userObject , avatar : action.avatar} }

        case actionTypes.ADD_AVATAR_SUCCESS :
            return {...state , loading : false , userObject : {...state.userObject , picture : action.picture}}

        case actionTypes.DELETE_AVATAR_SUCCESS :
            return {...state , loading : false , userObject : {...state.userObject , picture : null}}

        default : 
            return state;
    }
}

export default reducer;