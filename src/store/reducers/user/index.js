import * as actionTypes from '../../../store/actions/actionTypes';

const initialState = {
    loading : {
        search : false , 
        friends : false 
    } ,
    error : {
        search : null ,
        friends : null
    } ,
    users : {
        search : [] ,
        friends : []
    }
}

const copyState = (state) => {
    const updatedState = {
        loading : {...state.loading} ,
        error : {...state.error} , 
        users : {
            search : [] ,
            friends : []
        }
    };
    for( const user of state.users.search )
        updatedState.users.search.push({...user});
    for( const user of state.users.friends )
        updatedState.users.friends.push({...user});
    return updatedState;
}

const reducer = (state=initialState , action) => {
    let updatedState;
    switch(action.type){
        case actionTypes.LOAD_USERS_START : 
            updatedState = copyState(state)
            updatedState.loading[action.filter.type] = true;
            updatedState.error[action.filter.type] = null;
            return updatedState;

        case actionTypes.LOAD_USERS_SUCCESS :
            updatedState = copyState(state);
            updatedState.loading[action.filter.type] = false;
            updatedState.users[action.filter.type] = action.users;
            return updatedState;

        case actionTypes.LOAD_USERS_FAILED :
            updatedState = copyState(state);
            updatedState.loading[action.filter.type] = false;
            updatedState.error[action.filter.type] = action.error;
            return updatedState;

        case actionTypes.UPDATE_USERS : 
            updatedState = copyState(state);
            for( const user of action.data.users ){
                for( const usr of updatedState.users.search ){
                    if( usr._id === user.userId ){
                        usr.lastSeen = user.lastSeen
                    }
                }
            }
            return updatedState;
        default :
            return state;
    }

}

export default reducer;