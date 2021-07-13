import * as actionTypes from '../../actionTypes';

export const addUsersMessages = (data) => {
    return{
        type : actionTypes.ADD_MESSAGES_USERS ,
        data
    }
}

export const addUser = (user) => {
    return{
        type : actionTypes.ADD_USER ,
        user
    }
}

export const addMessage = (data) => {
    return{
        type : actionTypes.ADD_MESSAGE ,
        data
    }
}