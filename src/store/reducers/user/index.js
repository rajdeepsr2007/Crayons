import * as actionTypes from '../../../store/actions/actionTypes';

const initialState = {
    loading : {
        search : false , 
        friends : false ,
        friend : false
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
            for( const user of action.data.users ){
                for( const usr of updatedState.users.friends ){
                    if( usr._id === user.userId ){
                        usr.lastSeen = user.lastSeen
                    }
                }
            }
            return updatedState;
        
        case actionTypes.TOGGLE_FRIEND_START : 
            updatedState = copyState(state);
            updatedState.loading.friend = true;
            return updatedState;

        case actionTypes.TOGGLE_FRIEND_SUCCESS :
            updatedState = copyState(state);
            updatedState.loading.friend = false;
            let userObject = null;
            for( const user of updatedState.users.search ){
                if( user._id === action.user.userId ){
                    user.friend = action.user.friend
                    userObject = {...user};
                }
            }
            if( action.user.friend ){
                updatedState.users.friends.push(userObject);
            }else{
                updatedState.users.friends = updatedState.users.friends.filter( user => {
                    return user._id !== action.user.userId
                })
            }
            return updatedState;

        case actionTypes.TOGGLE_FRIEND_FAILED : 
            updatedState = copyState(state);
            updatedState.loading.friend = false;
            return updatedState;

        default :
            return state;
    }

}

export default reducer;