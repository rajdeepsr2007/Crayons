import * as actionTypes from '../../../actions/actionTypes';

const initialState = {
    users : {} ,
    messages : []
}

const copyState = (state) => {
    const updatedState = {
        users : {} ,
        messages : []
    }
    for( const userId in state.users ){
        updatedState.users[userId] = {
            ...state.users[userId]
        }
    }
    for( const message of state.messages ){
        updatedState.messages.push({
            ...message
        })
    }
    return updatedState;
}

const reducer = (state=initialState , action) => {
    let updatedState;
    switch(action.type){
        case actionTypes.ADD_MESSAGES_USERS :
            const {users , messages} = action.data;
            return { users , messages }
        case actionTypes.ADD_USER :
            updatedState = copyState(state);
            updatedState.users[action.user.userId] = action.user;
            return updatedState;
        case actionTypes.ADD_MESSAGE :
            updatedState = copyState(state);
            updatedState.messages.push(action.data);
            return updatedState;
        default  :
            return state;
    }
}

export default reducer;